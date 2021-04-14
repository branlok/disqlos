import { useInfiniteQuery } from "react-query";
import { db } from "../../../utils/firebase";

function useGetTargetPosts(targetId) {
  let paginatedPosts = useInfiniteQuery(
    ["getTargetPosts", targetId],
    ({ pageParam = false }) => {
      return (!pageParam
        ? fetchInitialUserPostsFromFirestore(targetId)
        : fetchUserPostsFromFirestore(targetId, pageParam))
    },
    {
      getNextpageParam: (lastPage, allPage) =>
        lastPage.length == 0
          ? undefined
          : lastPage[lastPage.length - 1].createdOn,
      refetchOnMount: false,
      staleTime: 1800000,
      cacheTime: 1800000,
    }
  );
  return { paginatedPosts };
}

//FIRESTORE QUERY FUNCTIONS

async function fetchInitialUserPostsFromFirestore(targetId) {
  //fetch first 4 posts from firestore
  return await db
    .collection("PUBLIC_POSTS")
    .where("userId", "==", targetId)
    .orderBy("createdOn", "desc")
    .limit(4)
    .get()
    .then((querySnapshot) => {
      let docArray = [];
      querySnapshot.forEach((item) => {
        docArray.push(item.data());
      });
      console.log(docArray)
      return docArray;
    });
}

async function fetchUserPostsFromFirestore(targetId, pageParam) {
  return await db
    .collection("PUBLIC_POSTS")
    .where("userId", "==", targetId)
    .orderBy("createdOn", "desc")
    .startAfter(pageParam)
    .limit(4)
    .get()
    .then((querySnapshot) => {
      let docArray = [];
      querySnapshot.forEach((item) => {
        docArray.push(item.data());
      });
      return docArray;
    });
}

export default useGetTargetPosts;
