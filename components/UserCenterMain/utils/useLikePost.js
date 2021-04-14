import firebase from "firebase";
import { db } from "../../../utils/firebase";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";

export default function useLikePost(postId, directory) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const likeMutation = useMutation(
    ({ unlike }) => {
      return unlike
        ? removeLikeFromDocument(postId, userId)
        : addLikeToDocument(postId, userId);
    },
    {
      onSuccess: (data, variables) => {
        updateCache(directory, variables);
      },
    }
  );

  const updateCache = (directory, variables) => {
    queryClient.setQueryData(["getPosts", directory], oldData => {
      let { pageIdx, entryIdx } = variables.page;
      if (variables.unlike) {
        let newLikedByArray = oldData.pages[pageIdx][
          entryIdx
        ].likedBy.filter((id) => id !== userId);
        oldData.pages[pageIdx][entryIdx].likedBy = newLikedByArray;
        return oldData;
      } else {
        oldData.pages[pageIdx][entryIdx].likedBy.push(userId);
        return oldData;
      }
    })
  }

  return { likeMutation };
}

function addLikeToDocument(postId, userId) {
  return db
    .collection("PUBLIC_POSTS")
    .doc(postId)
    .set(
      {
        likedBy: firebase.firestore.FieldValue.arrayUnion(userId),
      },
      { merge: true }
    );
}

function removeLikeFromDocument(postId, userId) {
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
