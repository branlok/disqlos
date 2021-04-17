import React from "react";
import UserCardPlaceholder from "./BasicElements/UserCardPlaceholder";

function SocialSidebarPlaceholder() {
  return (
    <div className="h-full  w-64 bg-custom-pink-500  flex-none flex-col items-center ">
      <header className="h-16 p-2 w-full flex-none border-b">
        <h3 className="font-bold text-custom-pink-950 text-center rounded-md w-full h-full rounded-md flex justify-center items-center flex-initial">
          Following
        </h3>
      </header>
      <div className=" h-full w-64  p-2.5 flex-initial z-10 items-center  overflow-y-scroll no-scrollbar">
        <UserCardPlaceholder/>
        <UserCardPlaceholder/>
        <UserCardPlaceholder/>
        <UserCardPlaceholder/>
        <div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md flex"></div>
        <div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md flex"></div>
        <div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md flex"></div>
      </div>
      <footer className="h-16 w-full flex items-center justify-center border-t">
        <div className=" rounded-md px-2 py-1 hover:bg-gray-300 cursor-pointer flex justify-center items-center "></div>
      </footer>
    </div>
  );
}

export default SocialSidebarPlaceholder;
