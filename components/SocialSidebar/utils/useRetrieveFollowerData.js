import { useQuery } from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";

function useRetrieveFollowerData() {
  const { userId } = useAuth();

  const followerDataQuery = useQuery("followerData", () => {
    return db
      .collection("USERS")
      .where("followers", "array-contains", userId)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        let docArray = [];
        querySnapshot.forEach((item) => {
          docArray.push(item.data());
        });
        return docArray;
      });
  });

  return followerDataQuery;
}

export default useRetrieveFollowerData;
