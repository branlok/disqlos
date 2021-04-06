import {useQuery} from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";
import {useState, useEffect, createContext, useContext} from "react";


const userContext = createContext();

export function ProvideUser({children}) {
    const user = userQuery();
    return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export const useUser = () => {
    return useContext(userContext);
};


function userQuery() {
    const {userId} = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      if (userId) {setIsReady(true)}
    }, [userId])

    
    
    const [refetchInterval, setRefetchInterval] = useState(1000);
    const userData = useQuery("selfData", () => db.collection("USERS").doc(userId).get(), {enabled: isReady, refetchInterval: refetchInterval})

    useEffect(() => {
        if (userData.isSuccess && userData.data.data().userId ) {
            setRefetchInterval(false);
        } else if (userData.isSuccess && !userData.data.data().userId) {
            setRefetchInterval(1000)
        } else {
            setRefetchInterval(false);
        }
    }, [userData])
    
    return {userData: userId && userData};
}

