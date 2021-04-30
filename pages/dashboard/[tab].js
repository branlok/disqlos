import React, { useEffect, useState } from "react";
import SocialSidebar from "../../components/SocialSidebar";
import UserControlSidebar from "../../components/UserControlSidebar";
import UserCenterMain from "../../components/UserCenterMain";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/auth";
import { useDark } from "../../utils/darkContext";
import useUser from "../../components/Queries/USERS/useUser";
import MoonSVG from "../../styles/svg/moon.svg";
import SunSVG from "../../styles/svg/sun.svg";

import { useQueryClient } from "react-query";
import UserSidebarPlaceholder from "../../components/Placeholders/UserSidebarPlaceholder";
import SocialSidebarPlaceholder from "../../components/Placeholders/SocialSidebarPlaceholder";
import CenterMainPlaceholder from "../../components/Placeholders/CenterMainPlaceholder";
import Footer from "../../components/Footer";
//user dashboard do not require prerendering. but serverside rendering can aide

function Dashboard() {
  const { userId } = useAuth();
  const { dark, setDark } = useDark();
  const { userData, isReady2 } = useUser();

  const [toggleLeftCol, setToggleLeftCol] = useState(false);
  const [toggleRightCol, setToggleRightCol] = useState(false);
  const footerProps = {
    toggleLeftCol,
    setToggleLeftCol,
    toggleRightCol,
    setToggleRightCol,
  };

  // const [trailing, setTrailing] = useState("...");
  // useEffect(() => {
  //   if (!isReady2) {
  //     let newState;
  //     if (trailing == "...") newState = ".";
  //     if (trailing == ".") newState = "..";
  //     if (trailing == "..") newState = "...";
  //     const interval = setInterval(() => {
  //       setTrailing(newState);
  //     }, 500);
  //     return () => clearInterval(interval);
  //   }
  // }, [trailing]);

  if (userData.isSuccess && isReady2) {
    return (
      <div className={`flex flex-col h-screen w-screen`}>
        <nav className="h-12 dark:bg-cb-2 bg-gray-100 flex  lg border-b dark:border-gray-500 dark:bg-cb-3  dark:text-white flex items-center px-4 flex justify-between items-center py-2 z-10">
          <div>
            <b>Disqlos</b>
          </div>
          <ToggleTheme dark={dark} setDark={setDark} />
        </nav>
        <div className="relative w-full h-full flex-initial flex bg-opacity-10 flex-row dark:bg-cb-1 flex-initial overflow-hidden">
          <UserControlSidebar
            userData={userData}
            toggleLeftCol={toggleLeftCol}
            setToggleLeftCol={setToggleLeftCol}
          />
          <UserCenterMain userId={userId} />
          <SocialSidebar
            toggleRightCol={toggleRightCol}
            setToggleRightCol={setToggleRightCol}
          />
        </div>
        <Footer footerProps={footerProps} />
      </div>
    );
    //verify there is content
  } else if (userData.isLoading || !isReady2) {
    return (
      <div className={` relative flex flex-col h-screen w-screen`}>
        <nav className="h-10 bg-base-gray flex-shrink-0 bg-base-gray flex items-center px-4">
          <div>
            <b>Disqlos</b>
          </div>
        </nav>
        <div className="w-full h-full flex flex-row flex-initial overflow-hidden ">
          <UserSidebarPlaceholder />
          <CenterMainPlaceholder />
          <SocialSidebarPlaceholder />
        </div>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
}

function ToggleTheme({ dark, setDark }) {
  const [style, setStyle] = useState("bg-gray-400 pl-1 text-red-400");

  const toggle = () => {
    if (dark) {
      setStyle("bg-gray-400 pl-1 text-red-400");
      setDark(!dark);
    } else {
      setStyle("bg-gray-600 pl-6 text-yellow-200 ");

      setDark(!dark);
    }
  };

  return (
    <div
      onClick={() => toggle()}
      className={`rounded-full  w-12 h-7 flex items-center px-0.5 transition-all cursor-pointer ${style}`}
    >
      <button
        className={`h-5 w-5 rounded-full ${
          dark ? " bg-blue-600 " : "bg-gray-100"
        } focus:outline-none transition-all flex items-center justify-center p-1 shadow-md `}
      >
        {dark ? (
          <MoonSVG className=" h-full w-full fill-current" />
        ) : (
          <SunSVG className=" h-full w-full  fill-current" />
        )}
      </button>
    </div>
  );
}

export default Dashboard;
