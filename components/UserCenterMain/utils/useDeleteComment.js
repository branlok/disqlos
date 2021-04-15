import firebase from "firebase";
import { db } from "../../../utils/firebase";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";

export default function useDeleteComment(
  postId,
  commentId,
  page,
  postCachedLocation,
  directory,
  targetId,
) {

  const queryClient = useQueryClient();

  const updateCache = () => {
    queryClient.setQueryData(["fetchComments", postId], (oldData) => {
      let { pageIdx, commentIdx } = page;
      oldData.pages[pageIdx].splice(commentIdx, 1);
      return oldData;
    });
    queryClient.setQueryData(["getPosts", directory, targetId], (oldData) => {
      let { pageIdx, entryIdx } = postCachedLocation;
      oldData.pages[pageIdx][entryIdx].numberOfComments--;
      return oldData;
    });
  };

  const deleteCommentMutation = useMutation(
    () => {
      deleteComment(postId, commentId);
      // db.collection("PUBLIC_POSTS")
      //   .doc(postId)
      //   .collection("comments")
      //   .doc(commentId)
      //   .delete();
    },
    {
      onSuccess: (data, variables) => {
        updateCache();
      },
    }
  );


  return { deleteCommentMutation };
}

function deleteComment(postId, commentId) {
  return db
    .collection("PUBLIC_POSTS")
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .delete();
}
