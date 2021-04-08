import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";
import useUser from "../../Queries/USERS/useUser";

export default function usePostGetters() {
  let { userId } = useAuth();
  let { userData } = useUser();
  let [snapshot, setSnapshot] = useState(false);

  const followersArray = userData.data.data().following
    ? userData.data.data().following
    : [""];

  const ownPostsResponse = useInfiniteQuery(
    "fetchOwnPosts",
    ({pageParam = false}) => {
        console.log(pageParam, "red me")
      if (pageParam) {
        return db
          .collection("PUBLIC_POSTS")
          .where("userId", "==", userId)
          .orderBy("createdOn", "desc")
          .startAfter(pageParam)
          .limit(2)
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot.docs, "vaezlues");
            let docArray = [];
            console.log("fetchOwnPosts");
            querySnapshot.forEach((item) => {
              docArray.push(item.data());
            });
            return docArray;
          });
      } else {
        return db.collection("PUBLIC_POSTS")
          .where("userId", "==", userId)
          .orderBy("createdOn", "desc")
          .limit(2)
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot, "values");
            //for pagination
            let docArray = [];
            console.log("fetchOwnPosts");
            querySnapshot.forEach((item) => {
              docArray.push(item.data());
            });
            return docArray;
          });
      }
    },
    {
        //if length is zero, we will stop allowing the next pagination request.
        getNextPageParam: (lastPage, allPage) => lastPage.length == 0 ? undefined : lastPage[lastPage.length - 1].createdOn, 
      refetchOnMount: false,
      staleTime: 1800000,
      cacheTime: 1800000,
    }
  );

//   const ownPostsResponsePag = useQuery(
//     ["ownPostsResponsePag", snapshot],
//     () =>
//       db
//         .collection("PUBLIC_POSTS")
//         .where("userId", "==", userId)
//         .orderBy("createdOn", "desc")
//         .startAfter(snapshot)
//         .limit(2)
//         .get()
//         .then((querySnapshot) => {
//           console.log(querySnapshot.docs, "vaezlues");
//           //for pagination
//           //   setSnapshot(
//           //     querySnapshot.docs[querySnapshot.docs.length - 1].data().createdOn
//           //   );
//           let docArray = [];
//           console.log("fetchOwnPosts");
//           querySnapshot.forEach((item) => {
//             docArray.push(item.data());
//           });
//           return docArray;
//         }),
//     {
//       enabled: !!snapshot,
//       refetchOnMount: false,
//       staleTime: 1800000,
//       cacheTime: 1800000,
//       keepPreviousData: true,
//     }
//   );

  // let followersArray = ["ylkv3cgZTwfbC7oPa4Q1f36HxNr1", "zo5cGdkQsQW0c50p7bfc3wn80Ci2"]

  const followPostsResponse = useQuery(
    ["fetchFollowingPosts"],
    () =>
      db
        .collection("PUBLIC_POSTS")
        .where("userId", "in", followersArray)
        .orderBy("createdOn", "desc")
        .limit(5)
        .get()
        .then((querySnapshot) => {
          let docArray = [];
          console.log("followerPosted");
          querySnapshot.forEach((item) => {
            docArray.push(item.data());
          });
          return docArray;
        }),
    { refetchOnMount: false, staleTime: 1800000, cacheTime: 1800000 }
  ); //1800000 = 30 minutes , refetchOnMount false == the query will not refetch on mount, we manually use refetch() outside of hook.

  // const startAfter = useQuery("pagination", (lastSnapshot) => db.collection("PUBLIC_POSTS").where('userId', "==", userId).orderBy("createdOn", "desc").startAfter(lastSnapshot).limit(5).get().then(querySnapshot => {
  //     let docArray = [];
  //     console.log("followerPosted")
  //     querySnapshot.forEach((item) => {docArray.push(item.data())});
  //     return docArray;
  // }), {refetchOnMount: false, staleTime:1800000, cacheTime: 1800000});

  return {
    ownPostsResponse,
    followPostsResponse,
    setSnapshot,
  };
}
