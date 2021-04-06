import React, { useEffect } from "react";
import SocialSidebar from "../../components/SocialSidebar";
import UserControlSidebar from "../../components/UserControlSidebar";
import UserCenterMain from "../../components/UserCenterMain/";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/auth";
import { useUser } from "../../components/Queries/USERS/firestoreUserSelf";
//user dashboard do not require prerendering. but serverside rendering can aide

function Dashboard() {
  const router = useRouter();
  const { userId } = useAuth();

  const { userData } = useUser();

  useEffect(() => {

    if (!userId) {
      router.push("/");
    }
  });

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
    return <div>Loading</div>
  } else {
    return <div>Error</div>
  }
}

//Seperation of Logic, we make new components, don't reuse the inner conditional components.
//so basically make a wrapper component that act as a toggler.

// <div className="flex flex-col h-screen w-screen ">
// <nav className="h-10 bg-base-gray flex-shrink-0">ayo</nav>
// <div className="w-full h-full  flex flex-row bg-red-300 flex-initial">
//   <div className="h-full w-48 flex-none xl:w-80 bg-custom-pink-500"> col </div>
//   <div className="h-full w-full flex-initial bg-custom-gray-500 shadow-lg z-0"> main </div>
//   <div className="h-full w-48  flex-none xl:w-80 bg-custom-pink-500">col 2</div>
// </div>
// </div>

export default Dashboard;
