import firebase from "firebase";
import { db } from "../../../utils/firebase";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";

export default function useLikePost(postId) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const likeMutation = useMutation(
    ({ unlike }) => {
      console.log(unlike);
      if (unlike) {
        return db
          .collection("PUBLIC_POSTS")
          .doc(postId)
          .set(
            {
              likedBy: firebase.firestore.FieldValue.arrayRemove(userId),
            },
            { merge: true }
          );
      }
      return db
        .collection("PUBLIC_POSTS")
        .doc(postId)
        .set(
          {
            likedBy: firebase.firestore.FieldValue.arrayUnion(userId),
          },
          { merge: true }
        );
    },
    {
      onSuccess: (data, variables) => {
        if (variables.directory == "posts") {
           queryClient.setQueryData("fetchOwnPosts", (oldData) => {
            let { pageIdx, entryIdx } = variables.page;

            //we can directly mutate oldData variable reactquery will recognize even via mutation on the data.
            if (variables.unlike) {
              let newLikedByArray = oldData.pages[pageIdx][
                entryIdx
              ].likedBy.filter((id) => id !== userId);
              oldData.pages[pageIdx][entryIdx].likedBy = newLikedByArray;
              console.log(oldData);
              return oldData;
            } else {
              oldData.pages[pageIdx][entryIdx].likedBy.push(userId);
              console.log(oldData);
              return oldData;
            }
          });
        } else if (variables.directory == "feed") {
           queryClient.setQueryData("fetchFollowingPosts", (oldData) => {
            let { pageIdx, entryIdx } = variables.page;

            //we can directly mutate oldData variable reactquery will recognize even via mutation on the data.
            if (variables.unlike) {
              let newLikedByArray = oldData.pages[pageIdx][
                entryIdx
              ].likedBy.filter((id) => id !== userId);
              oldData.pages[pageIdx][entryIdx].likedBy = newLikedByArray;
              console.log(oldData);
              return oldData;
            } else {
              oldData.pages[pageIdx][entryIdx].likedBy.push(userId);
              console.log(oldData);
              return oldData;
            }
          });
        }
      },
    }
  );

  let mutateLikePost = (unlike, page, directory) => likeMutation.mutate({ unlike, page, directory });

  return { mutateLikePost, likeMutation };
}
