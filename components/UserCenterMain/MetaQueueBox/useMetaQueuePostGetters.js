import { useQuery } from "react-query";
import {useAuth} from "../../../utils/auth";
import {db} from "../../../utils/firebase"

export default function useMetaQueuePostGetters(queueId) {
    let {userId} = useAuth();
    console.log(queueId, "targetAcq");
    const metaPosts = useQuery(["fetchMetaPosts", queueId], () => db.collection("USERS").doc(userId).collection("PRIVATE_POSTS").where("queueId", "==", queueId).where("leadPost", "==", false).orderBy("createdOn", "desc").limit(10).get().then(querySnapshot => {
        let docArray = [];
        console.log("fetchQueuedPosts")
        querySnapshot.forEach((item) => {docArray.push(item.data())});
        return docArray;
    }), {refetchOnMount: true, staleTime:1800000, cacheTime: 1800000});

    return {
        metaPosts,
    };

} 