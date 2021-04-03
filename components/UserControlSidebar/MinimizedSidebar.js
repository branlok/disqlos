import React from "react";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import CollapseSvg from "../../styles/svg/Collapse.svg";
import Explore from "../../styles/svg/explore.svg";
import Home from "../../styles/svg/home2.svg";
import Settings from "../../styles/svg/settings.svg";
function MinimizedSidebar({ setCollapse,showToggle }) {
  return (
    <div className="relative h-full w-20 flex-none bg-custom-pink-500 p-2 justify-between flex flex-col ">
      <div className="justify-between flex flex-col ">
        <div className="w-full h-24 mb-4">
          <ProfileCircle />
        </div>
        <div className="w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 hover:bg-gray-300 mt-2">
          <Home />
        </div>
        <div className="w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 hover:bg-gray-300 mt-2">
          <Explore />
        </div>

        <div className="w-full h-12 bg-gray flex justify-center items-center rounded-md bg-gray-200 hover:bg-gray-300 mt-2">
          <Settings />
        </div>
      </div>
{showToggle &&
      <div
        className="w-14 h-12 absolute bg-gray-300 top-2 -right-14 z-10 flex justify-center items-center rounded-tr-md rounded-br-md "
        onClick={() => setCollapse(false)}
      >
        <CollapseSvg className="grayFill cursor-pointer transform rotate-180 " />
      </div>}
    </div>
  );
}

export default MinimizedSidebar;
