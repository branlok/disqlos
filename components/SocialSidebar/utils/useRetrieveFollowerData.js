import { useQuery } from "react-query";
import { useAuth } from "../../../utils/auth";
import { db } from "../../../utils/firebase";


//Temporary, should be upgraded to useInfiniteQuery to fulll encapsulate followers.
function useRetrieveFollowerData() {
  const { userId } = useAuth();
  const followerDataQuery = useQuery("followerData", () => {
    return getFollowerList(userId)
  });

  return {followerDataQuery};
}

function getFollowerList(userId) {
  return db
      .collection("USERS")
      .where("followers", "array-contains", userId)
      .limit(10)
      .get()
      .then((querySnapshot) => {
        let docArray = [];
        querySnapshot.forEach((item) => {
          docArray.push(item.data());
        });
        return docArray;
      });
}

export default useRetrieveFollowerData;
