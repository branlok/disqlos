import { nanoid } from "nanoid";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { db } from "../../../../utils/firebase";
import firebase from "firebase";
function useAddComments(cacheTarget) {
  const queryClient = useQueryClient();
  const addCommentMutation = useMutation(addCommentsToPost, {
    onSuccess: (data, variables) => {
      updateCache(cacheTarget, variables);
    },
  });

  const updateCache = (cacheTarget, variables) => {
      console.log(cacheTarget)
    queryClient.setQueryData(cacheTarget, (oldData) => {
      let { pageIdx, entryIdx } = variables.page;
      oldData.pages[pageIdx][entryIdx].numberOfComments++;
      return oldData;
    });
  };

  return { addCommentMutation };
}

function addCommentsToPost({ postId, userId, content, userData }) {
  console.log(userData.uniqueDisplayName, userData.displayName, "#@");
  let commentId = nanoid();
  const payload = {
    commentId: commentId,
    targetId: postId,
    uid: userId,
    content,
    createdOn: firebase.firestore.Timestamp.now(),
    likedBy: [],
    primaryProfileImage: userData.primaryProfileImage,
    uniqueDisplayName: userData.uniqueDisplayName,
    displayName: userData.displayName,
  };

  return db
    .collection("PUBLIC_POSTS")
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .set(payload);
}

export default useAddComments;
