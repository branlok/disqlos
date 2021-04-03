import {useMutation} from "react-query";
import {db} from '../../../../utils/firebase';
import firebase from "firebase";
import {nanoid} from "nanoid";


function postComment({postId, userId, content}) {
    let commentId = nanoid();
    console.log("posted")
    const payload = {
        commentId: commentId,
        targetId: postId,
        ownerId: userId, //security rule is needed to ensure this is the right value, although this value is for convienece
        content,
        createdOn: firebase.firestore.Timestamp.now(),
        likedBy: [] //better created by cloud function to avoid injection. or add security rules for create and update.
    }
    
    return db.collection("PUBLIC_POSTS").doc(postId).collection("comments").doc(commentId).set(payload)
}

export default function usePushPost() {
    let addCommentMutation = useMutation(postComment);
    let addComment = (postId, userId, content) => addCommentMutation.mutate({postId, userId, content});

    return {
        addCommentMutation,
        addComment
    }
}