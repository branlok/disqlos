import firebase from "firebase";
import { db } from "../../../utils/firebase";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";

export default function useFollow(userId, targetUserId) {
  const queryClient = useQueryClient();
  const followMutation = useMutation(
    (follow) => {
      if (follow) {
        return db
          .collection("USERS")
          .doc(userId)
          .set(
            {
              following: firebase.firestore.FieldValue.arrayUnion(targetUserId),
            },
            { merge: true }
          );
      }
      //unfollow
      if (!follow) {
        return db
          .collection("USERS")
          .doc(userId)
          .set(
            {
              following: firebase.firestore.FieldValue.arrayRemove(
                targetUserId
              ),
            },
            { merge: true }
          );
      }
    },
    {
      onSuccess: (data, follow) => {
        if (follow) {
          queryClient.setQueryData("selfData", (oldData) => {
            oldData.following.push(targetUserId);
            return oldData;
          });
        }
        if (!follow) {
          queryClient.setQueryData("selfData", (oldData) => {
            let idx = oldData.following.indexOf(targetUserId);
            oldData.following.splice(idx, 1);
            return oldData;
          });
        }
      },
    }
  );

  return { followMutation };
}
