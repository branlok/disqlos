import { useMutation, useQueryClient } from "react-query";
import { db, storage } from "../../../utils/firebase";
import { nanoid } from "nanoid";
import { useAuth } from "../../../utils/auth";

export default function useProfileUpdate() {
  let { userId } = useAuth();
  let queryClient = useQueryClient();

  let profileMutation = useMutation(
    (values) => {
      return handleUploadRoutes({ ...values, userId });
    },
    {
      onSuccess: (data, variables) => {
        if (variables.newProfileImage) {
          queryClient.setQueryData("selfData", (oldData) => {
            oldData.primaryProfileImage = data;
            oldData.displayName = variables.displayName;
            oldData.profileDescription = variables.profileDescription;
            return oldData;
          });
        } else {
          queryClient.setQueryData("selfData", (oldData) => {
            oldData.displayName = variables.displayName;
            oldData.profileDescription = variables.profileDescription;
            return oldData;
          });
        }
      },
    }
  );

  return profileMutation;
}

async function handleUploadRoutes({
  newProfileImage,
  displayName,
  profileDescription,
  userId,
}) {
  //target firebase location
  const userRef = db.collection("USERS").doc(userId);

  const changeProfileTextOnly = {
    displayName,
    profileDescription,
  };

  //take use of uploadProfilePicture returning that url
  const ChangeProfileWithImageUrl = (imageUrl) => ({
    primaryProfileImage: imageUrl,
    displayName,
    profileDescription,
  });

  if (newProfileImage) {
    let contextUrl;
    return await uploadProfilePicture(newProfileImage, userId)
      .then((response) => {
        contextUrl = response;
        userRef.set(ChangeProfileWithImageUrl(response), { merge: true });
      })
      .then(() => contextUrl);
  } else {
    return await userRef.set(changeProfileTextOnly, { merge: true });
  }
}

async function uploadProfilePicture(file, userId) {
  const storageRef = storage.ref();
  const id = nanoid();
  const metadata = {
    cacheControl: "max-age=86400",
  };

  const imageToServer = storageRef
    .child(`${userId}/profilePicture/${id}`)
    .put(file, metadata);

  return await imageToServer.then((uploadTaskSnapshot) => {
    return uploadTaskSnapshot.ref.getDownloadURL();
  });
}
