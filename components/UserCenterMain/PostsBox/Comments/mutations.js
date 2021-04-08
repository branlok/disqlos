import {useMutation, useQueryClient} from "react-query";
import {db} from '../../../../utils/firebase';
import firebase from "firebase";
import {nanoid} from "nanoid";
import useUser from "../../../Queries/USERS/useUser";


function postComment({postId, userId, content, usernameId}) {
    let commentId = nanoid();

    const payload = {
        commentId: commentId,
        targetId: postId,
        uid: userId, //security rule is needed to ensure this is the right value, although this value is for convienece
        content,
        userId: usernameId,
        createdOn: firebase.firestore.Timestamp.now(),
        likedBy: [] //better created by cloud function to avoid injection. or add security rules for create and update.
    }
    
    return db.collection("PUBLIC_POSTS").doc(postId).collection("comments").doc(commentId).set(payload)
}

export default function usePushPost() {
    const queryClient = useQueryClient();
    const {userData} = useUser();
    let usernameId = userData.data.data().userId;

    let addCommentMutation = useMutation(postComment, {
        onSuccess: (data, variables) => queryClient.setQueryData('fetchOwnPosts', (oldData) => {
          let {pageIdx, entryIdx} = variables.page
            oldData.pages[pageIdx][entryIdx].numberOfComments++;
            return oldData;
        })
      });
      
    let addComment = (postId, userId, content, page) => addCommentMutation.mutate({postId, userId, content, page, usernameId});

    return {
        addCommentMutation,
        addComment
    }
}