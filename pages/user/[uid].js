import { db } from "../../utils/firebase";
import PublicUserPage from "../../components/PublicUserPage/index";
import { useAuth } from "../../utils/auth";
import useUser from "../../components/Queries/USERS/useUser";
import UserControlSidebar from "../../components/UserControlSidebar";
import SocialSidebar from "../../components/SocialSidebar";
import UserCenterMain from "../../components/UserCenterMain";

function Page({ targetUserData, userPosts }) {
  const { userId } = useAuth();
  userPosts = JSON.parse(userPosts);

  return (
    <div className="flex flex-col h-screen w-screen">
      <nav className="h-10 bg-base-gray flex-shrink-0 bg-base-gray flex items-center px-4">
        <div>
          <b>Disqlos</b>
        </div>
      </nav>
      <div className="relative w-full h-full flex flex-initial overflow-hidden bg-custom-gray-500">
        <div>yo</div>
        {/* <PublicUserPage
          userId={userId}
          targetUserData={targetUserData}
          userPosts={userPosts}
        /> */}
        {/* <UserCenterMain targetUserData={targetUserData} userPosts={userPosts}/> */}
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const { uid } = params;
  const targetUserData = await db
    .collection("USERS")
    .doc(uid)
    .get()
    .then((res) => res.data());

  const userPosts = await db
    .collection("PUBLIC_POSTS")
    .where("userId", "==", uid)
    .orderBy("createdOn", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      let docArray = [];
      querySnapshot.forEach((item) => {
        docArray.push(item.data());
      });
      return docArray;
    })
    .then((response) => {
      return JSON.stringify(response);
    });

  // Pass data to the page via props
  return { props: { targetUserData, userPosts } };
}

export default Page;
