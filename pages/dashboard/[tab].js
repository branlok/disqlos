import React, { useEffect } from "react";
import SocialSidebar from "../../components/SocialSidebar";
import UserControlSidebar from "../../components/UserControlSidebar";
import UserCenterMain from "../../components/UserCenterMain";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/auth";
import useUser from "../../components/Queries/USERS/useUser";
import { useQueryClient } from "react-query";
//user dashboard do not require prerendering. but serverside rendering can aide

function Dashboard() {

  const { userId } = useAuth();

  const { userData } = useUser();

  const router = useRouter();
  const { tab } = router.query

  // useEffect(() => {
  //   console.log(userId, "logging");
  //   if (!userId) {

  //     router.push("/");
  //   }
  // });

  if (!userId) return null;


  if (userData.isSuccess) {
    return (
      <div className="flex flex-col h-screen w-screen ">
        <nav className="h-10 bg-base-gray flex-shrink-0 bg-base-gray flex items-center px-4">
          <div>
            <b>Disqlos</b>
          </div>
        </nav>
        <div className="w-full h-full  flex flex-row bg-red-300 flex-initial overflow-hidden">
          <UserControlSidebar />
          <UserCenterMain />
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

export default Dashboard;
