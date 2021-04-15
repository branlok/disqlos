import { useQuery } from "react-query";
import { getUserData } from "../../Queries/USERS/useUser";

export default function useGetPortfolio(userId) {
    //tagets anonymous portfolio Fetches
  const portfolioData = useQuery(["portfolioData", userId], () => getUserData(userId), {
    enabled: true,
    refetchOnMount: false, //subsequent calls on this function, if within staletime and cache time, it wont be called again.
    staleTime: 1800000,
    cacheTime: 1800000,
  });

  
  return { portfolioData };
}

//OPTIMIZATIONS TO BE DONE
/* 

Front end option:
Check to see followerData for the user exists already. Fetch from existing cache. 
Since we already optimistically fetched all those data.

Back end option:
Keep this as is, however need to consolidate followerData as one post from firestore.
so we can reduce the amount of reads. the option need to account for firestore cloud's cold start.

*/