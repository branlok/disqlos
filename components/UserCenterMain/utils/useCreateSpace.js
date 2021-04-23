import { nanoid } from "nanoid";
import React from "react";
import { useMutation } from "react-query";
import { db } from "../../../utils/firebase";
import firebase from "firebase";

function useCreateSpace({ userId, postOwner, postId, contentValue, type, imageUrl, myUserProfilePicture}) {
  const addSpaceMutation = useMutation(() => addToSpace(userId, postOwner, postId, contentValue, type, imageUrl, myUserProfilePicture), { onSuccess: () => {
      console.log("good")
  } });

  return { addSpaceMutation };
}

function addToSpace( userId, postOwner, postId, contentValue, type, imageUrl = "", myUserProfilePicture) {
    //this is not secure, only for demonstraion purposes.

    const queueId = nanoid();
    const id = nanoid();
    const payload = {
        content: contentValue,
        createdOn: firebase.firestore.Timestamp.now(),
        postId: id,
        userId: userId,
        type: type,
        numberOfComment: 0,
        numberOfChildren: 0,
        likedBy: [],
        imageUrl: imageUrl,
        queueId: queueId,
        leadPost: true,
        reblogged: true,
        sameOwner: postOwner == userId,
        previousOwner: postOwner,
        previousPostId: postId,
        primaryProfileImage: myUserProfilePicture,
    }

  return db
    .collection("USERS")
    .doc(userId)
    .collection("PRIVATE_POSTS")
    .doc(queueId)
    .set(payload);
}

export default useCreateSpace;
