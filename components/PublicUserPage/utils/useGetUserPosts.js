import { useInfiniteQuery } from "react-query";
import { db } from "../../../utils/firebase";

export default function useGetUserPosts(userId, userData) {

  const initialData = {pages: [userData], pageParam: true}
    
  const ownPostsResponse = useInfiniteQuery(
    "fetchUserProfilePosts",
    ({ pageParam = false }) => {
      if (pageParam) {
        return db
          .collection("PUBLIC_POSTS")
          .where("userId", "==", userId)
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
      } else {
        return db
          .collection("PUBLIC_POSTS")
          .where("userId", "==", userId)
          .orderBy("createdOn", "desc")
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
    },
    {
      //if length is zero, we will stop allowing the next pagination request.
      getNextPageParam: (lastPage, allPage) =>
        lastPage.length == 0
          ? undefined
          : lastPage[lastPage.length - 1].createdOn,
      enabled: false,
      refetchOnMount: false,
      staleTime: 1800000,
      cacheTime: 1800000,
      initialData: initialData,
    }
  );

  return {
    ownPostsResponse,
  };
}
