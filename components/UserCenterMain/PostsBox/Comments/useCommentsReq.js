import { useQuery } from "react-query";
import {db} from "../../../../utils/firebase"

export default function useCommentsReq(postId, viewerOpened = false) {  
      //fetches postId Comments
console.log(viewerOpened, "notice me");
    const commentsResponse = useQuery(["fetchComments", postId], () => db.collection("PUBLIC_POSTS").doc(postId).collection("comments").orderBy("createdOn", "desc").limit(10).get().then(querySnapshot => {
        let docArray = [];
        console.log("fetched Comments")
        querySnapshot.forEach((item) => {docArray.push(item.data())});
        console.log(docArray);
        return docArray;
    }), {enabled: viewerOpened, refetchOnMount: false, staleTime: 60 * 1000});


    return {
        commentsResponse,
    };

} 