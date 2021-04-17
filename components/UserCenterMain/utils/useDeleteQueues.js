import { useMutation, useQueryClient } from "react-query";
import { db } from "../../../utils/firebase";

function useDeleteQueues(userId, queueId) {
    const queryClient = useQueryClient();
  const deleteQueueMutation = useMutation(() => deleteQueue(userId, queueId), {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchQueuedPosts");
      }
  });
  return {deleteQueueMutation};
}

function deleteQueue(userId, postId) {
  return db
    .collection("USERS")
    .doc(userId)
    .collection("PRIVATE_POSTS")
    .doc(postId)
    .delete();
}

export default useDeleteQueues;
