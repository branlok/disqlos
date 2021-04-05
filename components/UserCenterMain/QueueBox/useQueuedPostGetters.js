import { useQuery } from "react-query";
import {useAuth} from "../../../utils/auth";
import {db} from "../../../utils/firebase"

export default function useQueuedPostGetters() {
    let {userId} = useAuth();
    
    const ownQueuePostsResponse = useQuery("fetchQueuedPosts", () => db.collection("USERS").doc(userId).collection("PRIVATE_POSTS").where("leadPost", "==", true).orderBy("createdOn", "desc").limit(10).get().then(querySnapshot => {
        let docArray = [];
        console.log("fetchQueuedPosts")
        querySnapshot.forEach((item) => {docArray.push(item.data())});
        return docArray;
    }), {refetchOnMount: true, staleTime:1800000, cacheTime: 1800000});

    return {
        ownQueuePostsResponse,
    };

} 