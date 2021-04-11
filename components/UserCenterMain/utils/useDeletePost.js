import { useMutation, useQueryClient } from "react-query"
import { db } from "../../../utils/firebase"


export default function useDeletePost() {

    const queryClient = useQueryClient(); //does this cause rerender everytime theres a change here? also is it shallow
    const deletePostMutation = useMutation(({postId}) => db.collection("PUBLIC_POSTS").doc(postId).delete(), {
        onSuccess: (data, {postId, refetchTarget}) => {
            queryClient.refetchQueries(refetchTarget);
            console.log("deleted post", postId)
        }
    }) 

    const deletePostMutationWithQueue = useMutation(({userId, postId, refetchTarget}) => db.collection("USERS").doc(userId).collection("PRIVATE_POSTS").doc(postId).delete(), {
        onSuccess: (data, {postId, refetchTarget, queueId}) => {
            queryClient.refetchQueries([refetchTarget, queueId]);
            console.log("deleted post", postId)
        }
    }) 

    const deletePost = (postId, refetchTarget) => deletePostMutation.mutate({postId, refetchTarget})

    return {
        deletePostMutationWithQueue,
        deletePostMutation,
        deletePost
    }

}