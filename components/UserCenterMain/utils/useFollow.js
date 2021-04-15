import firebase from "firebase";
import { db } from "../../../utils/firebase";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";

export default function useFollow(userId, targetUserId, directive) {
  const queryClient = useQueryClient();
  const followMutation = useMutation(
    (follow) => {
      console.log(userId, targetUserId, "what");
      if (follow) {
        return addFollower(userId, targetUserId);
      }
      if (!follow) {
        return unfollow(userId, targetUserId);
      }
    },
    {
      onSuccess: async (data, follow) => {
        invalidateFollowersAndUserData();
      },
    }
  );

  const invalidateFollowersAndUserData = () => {
    //unoptimized update, simple refetch rather than insert pieces of avaliable data;
    queryClient.invalidateQueries("selfData");
    queryClient.invalidateQueries("followerData");
    //directory conditions
    if (directive == "userPosts")
      queryClient.invalidateQueries(["portfolioData", targetUserId]);
  };

  return { followMutation };
}

function addFollower(userId, targetUserId) {
  return db
    .collection("USERS")
    .doc(userId)
    .set(
      {
        following: firebase.firestore.FieldValue.arrayUnion(targetUserId),
      },
      { merge: true }
    )
    .then((res) => {
      db.collection("USERS")
        .doc(targetUserId)
        .set(
          {
            followers: firebase.firestore.FieldValue.arrayUnion(userId),
          },
          { merge: true }
        );
    });
}

function unfollow(userId, targetUserId) {
  return db
    .collection("USERS")
    .doc(userId)
    .set(
      {
        following: firebase.firestore.FieldValue.arrayRemove(targetUserId),
      },
      { merge: true }
    )
    .then((res) => {
      db.collection("USERS")
        .doc(targetUserId)
        .set(
          {
            followers: firebase.firestore.FieldValue.arrayRemove(userId),
          },
          { merge: true }
        );
    });
}

// issue with this validation is not enough, as firestore users base on existance of follower list on the target  user profile
// look at SocialSidebar fetch logic.
// const updateCache = (follow) => {
//   if (follow) {
//     queryClient.setQueryData("selfData", (oldData) => {
//       oldData.following.push(targetUserId);
//       return oldData;
//     });
//   }
//   if (!follow) {
//     queryClient.setQueryData("selfData", (oldData) => {
//       let idx = oldData.following.indexOf(targetUserId);
//       oldData.following.splice(idx, 1);
//       return oldData;
//     });
//   }
// }
