import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";
import { useState, useEffect } from "react";

//thoughts, i think this should be used as context because it is tighted closely to userId

export default function useUser() {
  const { userId } = useAuth();
  const [isReady, setIsReady] = useState(false);

  const [isReady2, setIsReady2] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsReady(true);
      console.log(isReady, "readme")
    }
  }, [userId]);


  const [refetchInterval, setRefetchInterval] = useState(1000);
  
  const userData = useQuery(
    "selfData",
    () =>
      db
        .collection("USERS")
        .doc(userId)
        .get()
        .then((response) => response.data()),
    {
      enabled: isReady,
      refetchInterval: refetchInterval,
      refetchOnMount: false, //subsequent calls on this function, if within staletime and cache time, it wont be called again.
      staleTime: 1800000,
      cacheTime: 1800000,
    }
  );

  useEffect(() => {
    //Set interval for refetch until firestore cloud function adds users
    if (userData.isSuccess && userData.data.uniqueDisplayName) {
      setRefetchInterval(false);
      setIsReady2(true);
    } else if (userData.isSuccess && !userData.data.uniqueDisplayName) {
      setRefetchInterval(1000);
    }
  }, [userData]);


  return { userData, isReady2 };
}
