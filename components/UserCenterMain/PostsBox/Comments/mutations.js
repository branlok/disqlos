import { useMutation, useQueryClient } from "react-query";
import { db } from "../../../../utils/firebase";
import firebase from "firebase";
import { nanoid } from "nanoid";
import useUser from "../../../Queries/USERS/useUser";

function postComment({ postId, userId, content, userDataContent }) {
  let commentId = nanoid();

  const payload = {
    commentId: commentId,
    targetId: postId,
    uid: userId, //security rule is needed to ensure this is the right value, although this value is for convienece
    content,
    createdOn: firebase.firestore.Timestamp.now(),
    likedBy: [], //better created by cloud function to avoid injection. or add security rules for create and update.
    primaryProfileImage: userDataContent.primaryProfileImage,
    uniqueDisplayName: userDataContent.uniqueDisplayName,
  };

  return db
    .collection("PUBLIC_POSTS")
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .set(payload);
}

export default function usePushPost(directory) {
  const queryClient = useQueryClient();
  const { userData } = useUser();
  let userDataContent = userData.data;

  let addCommentMutation = useMutation(postComment, {
    onSuccess: (data, variables) => {
      if (variables.directory == "posts") {
        queryClient.setQueryData("fetchOwnPosts", (oldData) => {
          let { pageIdx, entryIdx } = variables.page;
          oldData.pages[pageIdx][entryIdx].numberOfComments++;
          return oldData;
        });
      } else if (variables.directory == "feed") {
        queryClient.setQueryData("fetchFollowingPosts", (oldData) => {
          let { pageIdx, entryIdx } = variables.page;
          oldData.pages[pageIdx][entryIdx].numberOfComments++;
          return oldData;
        });
      }
    },
  });

  let addComment = (postId, userId, content, page) =>
    addCommentMutation.mutate({
      postId,
      userId,
      content,
      page,
      userDataContent,
      directory,
    });

  return {
    addCommentMutation,
    addComment,
  };
}
