import { useInfiniteQuery, useQuery } from "react-query";
import { db } from "../../../../utils/firebase";

export default function useCommentsReq(postId, viewerOpened = false) {
  //fetches postId Comments

  const commentsResponse = useInfiniteQuery(
    ["fetchComments", postId],
    ({ pageParam = false }) => {
      if (pageParam) {
        return db
          .collection("PUBLIC_POSTS")
          .doc(postId)
          .collection("comments")
          .orderBy("createdOn", "desc")
          .startAfter(pageParam)
          .limit(5)
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
          .doc(postId)
          .collection("comments")
          .orderBy("createdOn", "desc")
          .limit(5)
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
      enabled: viewerOpened,
      refetchOnMount: false,
      staleTime: 60 * 1000,
      cacheTime: 60 * 1000,
      getNextPageParam: (lastPage, allPage) => lastPage.length == 0 ? undefined : lastPage[lastPage.length - 1].createdOn,  //there is a chance the last item not
    }
  );

  return {
    commentsResponse,
  };
}

/* 
very simple comment fetch,
if there is more users, fetch for top comments instead would be more ideal.
also we are omitting replies for the moment.
*/