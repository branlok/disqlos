import React from "react";
import { useQuery } from "react-query";
import { db } from "../../../utils/firebase";

function useGetLeadPost(userId, queueId) {
  const leadPost = useQuery(["fromMeta", queueId], () => fetchQueueLead(userId, queueId));
  return { leadPost };
}

function fetchQueueLead(userId, queueId) {
  return db
    .collection("USERS")
    .doc(userId, queueId)
    .collection("PRIVATE_POSTS")
    .doc(queueId)
    .get()
    .then((res) => res.data());
}

export default useGetLeadPost;
