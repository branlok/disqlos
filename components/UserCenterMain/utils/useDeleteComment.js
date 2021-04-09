import firebase from "firebase";
import { db } from "../../../utils/firebase";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";

export default function useDeleteComment(
  postId,
  commentId,
  page,
  postCachedLocation,
  directory
) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation(
    () => {
      db.collection("PUBLIC_POSTS")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .delete();
    },
    {
      onSuccess: (data, variables) => {
        //Delete clientside cache comment without refetching server.
        queryClient.setQueryData(["fetchComments", postId], (oldData) => {
          let { pageIdx, commentIdx } = page;
          //NOTE
          //we could add logic to detect if it isn't the last comment deleted,
          //leave an indicator for useInifiniteQuery so it won't give the wrong indicaiton of hasNextPage
          console.log("deleting Comment from Cache");
          oldData.pages[pageIdx].splice(commentIdx, 1);
          return oldData;
        });

        if (variables == "posts") {
          queryClient.setQueryData("fetchOwnPosts", (oldData) => {
            console.log(postCachedLocation, "?");
            let { pageIdx, entryIdx } = postCachedLocation;

            console.log(pageIdx, entryIdx, oldData.pages[pageIdx][entryIdx]);

            oldData.pages[pageIdx][entryIdx].numberOfComments--;
            return oldData;
          });
        } else if (variables == "feed") {
          queryClient.setQueryData("fetchFollowingPosts", (oldData) => {
            console.log(postCachedLocation, "?");
            let { pageIdx, entryIdx } = postCachedLocation;

            console.log(pageIdx, entryIdx, oldData.pages[pageIdx][entryIdx]);

            oldData.pages[pageIdx][entryIdx].numberOfComments--;
            return oldData;
          });
        }
      },
    }
  );

  let deleteComment = () => deleteCommentMutation.mutate(directory);

  return { deleteCommentMutation, deleteComment };
}
