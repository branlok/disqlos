import React from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../../utils/auth";
import { getOwnUserData } from "./useUser";

function useOnlyUserData() {
  const { userId } = useAuth();
  const userData = useQuery("selfData", () => getOwnUserData(userId), {
    enabled: true,
    refetchOnMount: false, //subsequent calls on this function, if within staletime and cache time, it wont be called again.
    staleTime: 1800000,
    cacheTime: 1800000,
  });
  return { userData };
}

export default useOnlyUserData;
