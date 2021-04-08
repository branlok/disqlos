import firebase from "firebase";
import { db } from "../../../utils/firebase";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";

export default function useLikePost(postId) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const likeMutation = useMutation(({unlike}) => {
    console.log("fired")
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
  }, {
    onSuccess: (data, variables) => queryClient.setQueryData('fetchOwnPosts', (oldData) => {
      let {pageIdx, entryIdx} = variables.page

      console.log(pageIdx, entryIdx, oldData.pages[pageIdx][entryIdx]);
      
      if (variables.unlike) {
        let newLikedByArray = oldData.pages[pageIdx][entryIdx].likedBy.filter(id => id !== userId);
         oldData.pages[pageIdx][entryIdx].likedBy = newLikedByArray;
         console.log(oldData)
         return oldData;
      } else {
        oldData.pages[pageIdx][entryIdx].likedBy.push(userId)
        console.log(oldData)
        return oldData;
      }
      
      // let newArray = oldData.pages.map((item, idx) => {
      //   //item is an object
      //   console.log(item, idx, pageLocation)
      //   if (idx == pageIdx) {
      //     //if on the page with the target
      //     console.log(item)
      //     let newLikedByArray;
      //     if (variables.unlike) newLikedByArray = item.likedBy.filter(id => id !== userId); //remove userId
      //     if (!variables.unlike) newLikedByArray = [...item.likedBy].push(userId); //add userId
      //     console.log(newLikedByArray);
      //     return {...item, likedBy: newLikedByArray}
      //   } else {
      //     return item
      //   }
      // })

      // // let newData = {...oldData, pages: newArray}
      // // console.log(newData);
      // return oldData;
    })
  });

  let mutateLikePost = (unlike, page) => likeMutation.mutate({unlike, page});

  return { mutateLikePost, likeMutation};
}
