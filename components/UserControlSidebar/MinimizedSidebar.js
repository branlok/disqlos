import React from "react";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import CollapseSvg from "../../styles/svg/arrowLeft.svg";
import Explore from "../../styles/svg/explore.svg";
import Home from "../../styles/svg/home2.svg";
import Settings from "../../styles/svg/settings.svg";
import Space from "../../styles/svg/folder.svg";
import Link from 'next/link'
function MinimizedSidebar({ userData, setCollapse, showToggle }) {
  // let primaryProfileImage = userData.primaryProfileImage;
  console.log(userData);

  return (
    <div className="relative h-full w-20 flex-none bg-custom-pink-500 p-2 justify-between flex flex-col ">
      <div className="justify-between flex flex-col ">
        <div className="w-full h-32 mb-4 border-b-4 pb-4">
          <ProfileCircle imageURL={userData.data.primaryProfileImage} />
        </div>
        <div className=" tab-parent relative w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 hover:bg-gray-300 mt-2 cursor-pointer">
          <Link href="/dashboard/posts">
            <Home />
          </Link>
          <div className=" tab-subtitle absolute left-20  w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700">Home</div>
          </div>
        </div>
        <div className="relative tab-parent w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 hover:bg-gray-300 mt-2 cursor-pointer">
          <Link href="/dashboard/explore">
            <Explore />
          </Link>
          <div className=" tab-subtitle absolute left-20  w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700">Explore</div>
          </div>
        </div>
        <div className="relative tab-parent w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 hover:bg-gray-300 mt-2 cursor-pointer">
          <Link href="/dashboard/queue">
            <Space />
          </Link>
          <div className=" tab-subtitle absolute left-20  w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700">Space</div>
          </div>
        </div>
        <div className="relative tab-parent w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 hover:bg-gray-300 mt-2 cursor-pointer">
          <Settings />
          <div className=" tab-subtitle absolute left-20 w-24 text-center h-full z-20 flex justify-center items-center opacity-0 transition-all ">
            <div className="font-bold py-0.5 w-full rounded-md bg-gray-200 shadow-sm text-gray-700">Settings</div>
          </div>
        </div>
      </div>
      {showToggle && (
        <div
          className="w-14 h-12 absolute bg-gray-300 top-2 -right-14 z-10 flex justify-center items-center rounded-tr-md rounded-br-md "
          onClick={() => setCollapse(false)}
        >
          <CollapseSvg className="grayFill cursor-pointer transform rotate-180 " />
        </div>
      )}
    </div>
  );
}

export default MinimizedSidebar;
