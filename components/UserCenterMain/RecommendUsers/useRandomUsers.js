import { useQuery } from "react-query";
import { db } from "../../../utils/firebase";

//Temporary, should be upgraded to useInfiniteQuery to fulll encapsulate followers.
function useRandomUsers(userId) {
  const randomUserData = useQuery("randomUsers", () => getFollowerList(userId));

  return { randomUserData };
}

function getFollowerList(userId) {

  return db
    .collection("USERS")
    .where("recommended", "==", true)
    .limit(6)
    .get()
    .then((querySnapshot) => {
      let docArray = [];
      querySnapshot.forEach((item) => {
        docArray.push(item.data());
      });
      return docArray;
    });
}

export default useRandomUsers;
