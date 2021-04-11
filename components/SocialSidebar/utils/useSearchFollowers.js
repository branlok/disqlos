import { useState } from "react";
import { useQuery } from "react-query";
import { db } from "../../../utils/firebase";

export default function useSearchFollowers() {
  const [search, setSearch] = useState(false);
    //if receive serach, will fetch.
  const searchFollowerQuery = useQuery(
    ["searchFollowers", search],
    () => {

      return db.collection("USERS")
        .where("uniqueDisplayName", ">=", search)
        .where('uniqueDisplayName', '<=', search + '\uf8ff')
        .limit(5)
        .get()
        .then((querySnapshot) => {
          let docArray = [];
          querySnapshot.forEach((item) => {
            docArray.push(item.data());
          });
          return docArray;
        });
    },
    {
      enabled: search ? true : false,
      refetchOnMount: false,
    }
  );

  return { searchFollowerQuery,  setSearch };
}
