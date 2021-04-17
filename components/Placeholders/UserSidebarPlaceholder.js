import React from "react";
import LeftSidebarProfilePlaceholder from "./BasicElements/LeftSidebarProfilePlaceholder";

function UserSidebarPlaceholder() {
  return (
    <div className="relative h-full w-64 flex-none  bg-custom-pink-500 p-2 justify-between flex-col flex ">
      <div>
        <LeftSidebarProfilePlaceholder />
        <div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md"></div>
        <div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md"></div>
        <div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md"></div>
        <div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md"></div>
      </div>
      <div className="w-full h-16 bg-custom-pink-550  rounded-md"></div>
    </div>
  );
}

export default UserSidebarPlaceholder;
