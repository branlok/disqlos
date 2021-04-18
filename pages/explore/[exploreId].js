import React, { useEffect } from "react";
import SocialSidebar from "../../components/SocialSidebar";
import UserControlSidebar from "../../components/UserControlSidebar";
import UserCenterMain from "../../components/UserCenterMain";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/auth";
import useUser from "../../components/Queries/USERS/useUser";

//user dashboard do not require prerendering. but serverside rendering can aide

function Explore() {

    //Logged In UserData
  const { userId } = useAuth();
  const { userData, isReady2 } = useUser();
  const router = useRouter();

  const {exploreId} = router.query;


  if (!userId) return null;


  if (userData.isSuccess && isReady2) {
    return (
      <div className="flex flex-col h-screen w-screen">
        <nav className="h-10 bg-base-gray flex-shrink-0 bg-base-gray dark:bg-cb-3  dark:text-white flex items-center px-4">
          <div>
            <b>Disqlos</b>
          </div>
        </nav>
        <div className="w-full h-full dark:bg-cb-1  flex flex-row bg-red-300 flex-initial overflow-hidden">
          <UserControlSidebar userData={userData}/>
          <UserCenterMain userData={userData} userId={userId} targetId={exploreId}/>
          {/* <ExploreMain targetId={exploreId}/> */}
          <SocialSidebar />
        </div>
      </div>
    );
  } else if (userData.isLoading) {
    return <div className="flex flex-col h-screen w-screen ">Loading</div>;
  } else {
    return <div>Error</div>;
  }
}

export default Explore;
