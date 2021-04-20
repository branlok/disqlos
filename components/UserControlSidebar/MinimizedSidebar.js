import React from "react";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import CollapseSvg from "../../styles/svg/arrowLeft.svg";
import Explore from "../../styles/svg/explore.svg";
import Home from "../../styles/svg/home2.svg";
import Settings from "../../styles/svg/settings.svg";
import Space from "../../styles/svg/folder.svg";
import Link from "next/link";
function MinimizedSidebar({ userData, setCollapse, showToggle }) {
  // let primaryProfileImage = userData.primaryProfileImage;

  return (
    <div className="relative h-full w-20 flex-none p-2 justify-between flex flex-col">
      <div className="justify-between flex flex-col ">
        <div className="w-full h-32 mb-4 border-b-2 pb-4 dark:border-cb-4">
          <ProfileCircle imageURL={userData.data.primaryProfileImage} />
        </div>

        <div className="relative w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 dark:bg-cb-3 dark:text-gray-200 dark:hover:text-gray-800 hover:bg-gray-300 mt-2">
          <div className="h-full w-full flex items-center justify-center  hover-trigger cursor-pointer">
            <Link href="/dashboard/posts">
              <Home className="fill-current hover-trigger " />
            </Link>
          </div>
          <div className="hover-target absolute left-20  w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700 cursor-default">
              Home
            </div>
          </div>
        </div>

        <div className="relative w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 dark:bg-cb-3  dark:text-gray-200  dark:hover:text-gray-800 hover:bg-gray-300 mt-2 ">
          <div className="h-full w-full flex items-center justify-center  hover-trigger cursor-pointer">
            <Link href="/dashboard/explore">
              <Explore className="fill-current" />
            </Link>
          </div>
          <div className="hover-target absolute left-20 w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700 cursor-default">
              Explore
            </div>
          </div>
        </div>

        <div className="relative w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 dark:bg-cb-3  dark:text-gray-200 dark:hover:text-gray-800 hover:bg-gray-300 mt-2">
          <div className="h-full w-full flex items-center justify-center  hover-trigger cursor-pointer">
            <Link href="/dashboard/queue">
              <Space className="fill-current" />
            </Link>
          </div>
          <div className="hover-target absolute left-20  w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700 cursor-default">
              Space
            </div>
          </div>
        </div>

        <div className=" relative w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 dark:bg-cb-3  dark:text-gray-200 dark:hover:text-gray-800 hover:bg-gray-300 mt-2">
          <div className="h-full w-full flex items-center justify-center  hover-trigger  cursor-pointer">
            <Settings className="fill-current" />
          </div>
          <div className=" hover-target  absolute left-20 w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700 cursor-default">
              Settings
            </div>
          </div>
        </div>
      </div>

      {showToggle && (
        <div
          className="w-14 h-12 absolute bg-gray-300 dark:bg-cb-3 dark:hover:text-gray-200 cursor-pointer text-white top-2 -right-14 z-10 flex justify-center items-center rounded-tr-md rounded-br-md "
          onClick={() => setCollapse(false)}
        >
          <CollapseSvg className="transform rotate-180 fill-current" />
        </div>
      )}
    </div>
  );
}

export default MinimizedSidebar;
