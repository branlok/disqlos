import { useMutation, useQueryClient } from "react-query"
import { db } from "../../../utils/firebase"


export default function useDeletePost() {

    const queryClient = useQueryClient();
    const deletePostMutation = useMutation(({postId, refetchTarget}) => db.collection("PUBLIC_POSTS").doc(postId).delete(), {
        onSuccess: (data, {postId, refetchTarget}) => {
            queryClient.refetchQueries(refetchTarget);
            console.log("deleted post", postId)
        }
    }) 

    const deletePost = (postId, refetchTarget) => deletePostMutation.mutate({postId, refetchTarget})

    return {
        deletePostMutation,
        deletePost
    }

}