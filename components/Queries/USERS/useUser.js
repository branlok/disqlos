import {useQuery} from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";
import {useState, useEffect, createContext, useContext} from "react";



export default function useUser() {
    const {userId} = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      if (userId) {setIsReady(true)}
      console.log("i ran")
    }, [userId])
    
    const [refetchInterval, setRefetchInterval] = useState(1000);
    const userData = useQuery("selfData", () => db.collection("USERS").doc(userId).get(), {enabled: isReady, refetchInterval: refetchInterval, refetchOnMount: false, staleTime:1800000, cacheTime: 1800000})

    useEffect(() => {
        if (userData.isSuccess && userData.data.data().userId ) {
            setRefetchInterval(false);
        } else if (userData.isSuccess && !userData.data.data().userId) {
            setRefetchInterval(1000)
        } else {
            setRefetchInterval(false);
        }
    }, [userData])
    
    return {userData}

}