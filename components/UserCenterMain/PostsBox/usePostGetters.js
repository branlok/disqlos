import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";
import useUser from "../../Queries/USERS/useUser";

export default function usePostGetters() {
  let { userId } = useAuth();
  let { userData } = useUser();
  let [snapshot, setSnapshot] = useState(false);

  const followersArray = userData.data.following
    ? userData.data.following
    : [""];

  const ownPostsResponse = useInfiniteQuery(
    "fetchOwnPosts",
    ({ pageParam = false }) => {
      if (pageParam) {
        return db
          .collection("PUBLIC_POSTS")
          .where("userId", "==", userId)
          .orderBy("createdOn", "desc")
          .startAfter(pageParam)
          .limit(2)
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
          .limit(2)
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
      refetchOnMount: false,
      staleTime: 1800000,
      cacheTime: 1800000,
    }
  );

  const followPostsResponse = useInfiniteQuery(
    ["fetchFollowingPosts"],
    ({ pageParam = false }) => {
      if (pageParam) {
        return db.collection("PUBLIC_POSTS")
          .where("userId", "in", followersArray)
          .orderBy("createdOn", "desc")
          .startAfter(pageParam)
          .limit(5)
          .get()
          .then((querySnapshot) => {
            let docArray = [];
            console.log("followerPosted");
            querySnapshot.forEach((item) => {
              docArray.push(item.data());
            });
            return docArray;
          });
      } else {
        return db.collection("PUBLIC_POSTS")
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
          });
      }
    },
    {
      refetchOnMount: false,
      staleTime: 1800000,
      cacheTime: 1800000,
      getNextPageParam: (lastPage, allPage) =>
        lastPage.length == 0
          ? undefined
          : lastPage[lastPage.length - 1].createdOn,
    }
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
