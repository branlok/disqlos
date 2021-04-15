import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";
import useUser from "../../Queries/USERS/useUser";

export default function usePostGetters(directive, targetId) {
  // let { userId } = useAuth();
  let { userData } = useUser();
  const followersArray = userData.data.following;
  // const followersArray = userData.data.following
  //   ? userData.data.following
  //   : [""];

  const getPosts = useInfiniteQuery(
    ["getPosts", directive, targetId],
    ({ pageParam = false }) => {
      if (pageParam) {
        if (directive == "dashboardPosts" || directive == "userPosts") return fetchAfterInitialPosts(targetId, pageParam);
        if (directive == "feed") return getPostsAfterInitialFromFollowers(followersArray, pageParam)
      } else {
        if (directive == "dashboardPosts" || directive == "userPosts") return fetchInitialPosts(targetId); 
        if (directive == "feed") return getInitialPostsFromFollowers(followersArray);
      }
    },
    {
      getNextPageParam: (lastPage, allPage) =>
        lastPage.length == 0
          ? undefined
          : lastPage[lastPage.length - 1].createdOn,
      enabled:  true,
      refetchOnMount: directive == "feed" ? true : false,
      staleTime: 60 * 1000,
      cacheTime: 60 * 1000,
    }
  )

  // const ownPostsResponse = useInfiniteQuery(
  //   "fetchOwnPosts",
  //   ({ pageParam = false }) => {
  //     if (pageParam) {
  //       return fetchAfterInitialPosts(userId, pageParam);
  //     } else {
  //       return fetchInitialPosts(userId);
  //     }
  //   },
  //   {
  //     //if length is zero, we will stop allowing the next pagination request.
  //     getNextPageParam: (lastPage, allPage) =>
  //       lastPage.length == 0
  //         ? undefined
  //         : lastPage[lastPage.length - 1].createdOn,
  //         enabled:  directive == "posts" ? true : false,
  //     refetchOnMount: false,
  //     staleTime: 1800000,
  //     cacheTime: 1800000,
  //   }
  // );

  // const followPostsResponse = useInfiniteQuery(
  //   ["fetchFollowingPosts"],
  //   ({ pageParam = false }) => {
  //     if (pageParam) {
  //       return getPostsAfterInitialFromFollowers(followersArray, pageParam)
  //     } else {
  //       return getInitialPostsFromFollowers(followersArray)
  //     }
  //   },
  //   {
  //     enabled: directive == "feed" ? true : false,
  //     refetchOnMount: true,
  //     staleTime: 5 * 1000,
  //     cacheTime: 5 * 1000,
  //     getNextPageParam: (lastPage, allPage) =>
  //       lastPage.length == 0
  //         ? undefined
  //         : lastPage[lastPage.length - 1].createdOn,
  //   }
  // );


  //instead of making it more reusable, we keep them seperate for having different configurations, and save states
  
  //1800000 = 30 minutes , refetchOnMount false == the query will not refetch on mount, we manually use refetch() outside of hook.

  // const startAfter = useQuery("pagination", (lastSnapshot) => db.collection("PUBLIC_POSTS").where('userId', "==", userId).orderBy("createdOn", "desc").startAfter(lastSnapshot).limit(5).get().then(querySnapshot => {
  //     let docArray = [];
  //     console.log("followerPosted")
  //     querySnapshot.forEach((item) => {docArray.push(item.data())});
  //     return docArray;
  // }), {refetchOnMount: false, staleTime:1800000, cacheTime: 1800000});

  return {
    getPosts,
  };
}

//Get own Posts
function fetchInitialPosts(userId) {
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

function fetchAfterInitialPosts(userId, pageParam) {
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
}

function getInitialPostsFromFollowers(followersArray) {
  return db
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
    });
}

function getPostsAfterInitialFromFollowers(followersArray, pageParam) {
  return db
    .collection("PUBLIC_POSTS")
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
}
