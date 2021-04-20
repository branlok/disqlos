import { useInfiniteQuery, useQuery } from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";

export default function useQueuedPostGetters(userId) {


  const ownQueuePostsResponse = useInfiniteQuery(
    "fetchQueuedPosts",
    ({ pageParam = false }) => {
      if (pageParam) {
        return fetchAfterInitialQueuePosts(userId, pageParam);
      } else {
        return fetchInitialQueuePosts(userId);
      }
    },
    {
      getNextPageParam: (lastPage, allPage) =>
        lastPage.length == 0
          ? undefined
          : lastPage[lastPage.length - 1].createdOn,
      refetchOnMount: true,
      staleTime: 1800000,
      cacheTime: 1800000,
    }
  );

//   const ownQueuePostsResponse = useQuery(
//     "fetchQueuedPosts",
//     () =>
//       db
//         .collection("USERS")
//         .doc(userId)
//         .collection("PRIVATE_POSTS")
//         .where("leadPost", "==", true)
//         .orderBy("createdOn", "desc")
//         .limit(10)
//         .get()
//         .then((querySnapshot) => {
//           let docArray = [];
//           console.log("fetchQueuedPosts");
//           querySnapshot.forEach((item) => {
//             docArray.push(item.data());
//           });
//           return docArray;
//         }),
//     { refetchOnMount: true, staleTime: 1800000, cacheTime: 1800000 }
//   );

  return {
    ownQueuePostsResponse,
  };
}

function fetchAfterInitialQueuePosts(userId, pageParam) {
  return db
    .collection("USERS")
    .doc(userId)
    .collection("PRIVATE_POSTS")
    .where("leadPost", "==", true)
    .orderBy("createdOn", "desc")
    .startAfter(pageParam)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      let docArray = [];
      console.log("fetchQueuedPosts");
      querySnapshot.forEach((item) => {
        docArray.push(item.data());
      });
      return docArray;
    });
}

function fetchInitialQueuePosts(userId) {
  return db
    .collection("USERS")
    .doc(userId)
    .collection("PRIVATE_POSTS")
    .where("leadPost", "==", true)
    .orderBy("createdOn", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      let docArray = [];
      console.log("fetchQueuedPosts");
      querySnapshot.forEach((item) => {
        docArray.push(item.data());
      });
      return docArray;
    });
}
