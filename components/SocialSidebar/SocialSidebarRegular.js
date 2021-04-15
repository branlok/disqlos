import React, { useState } from "react";
import UserCard from "./UserCard";
import AddFollowerSvg from "../../styles/svg/personAdd.svg";
import FollowerSearch from "./FollowerSearch";

function SocialSidebarRegular({ followerDataQuery, setShowSearch }) {
  const [navigation, setNavigation] = useState("main");

  if (navigation == "main") {
    return (
      <div className="h-full w-full  bg-custom-pink-500 flex flex-col items-center ">
        <header className="h-16 p-2 w-full flex-none border-b">
          <h3 className="font-bold text-custom-pink-950 text-center rounded-md w-full h-full rounded-md flex justify-center items-center flex-initial">
            Following
          </h3>
        </header>
        <div className=" h-full  w-64  p-2.5 flex-initial z-10 items-center  overflow-y-scroll no-scrollbar">
          {followerDataQuery.data?.map((item) => {
            return (
              <UserCard
                key={item.uid}
                name={item.displayName}
                caption={item.profileDescription}
                imageURL={item.primaryProfileImage}
                targetId={item.uid}
              />
            );
          })}
        </div>
        <footer className="h-16 w-full flex items-center justify-center border-t">
          <div className=" rounded-md px-2 py-1 hover:bg-gray-300 cursor-pointer flex justify-center items-center ">
            <AddFollowerSvg
              className="fill-current text-gray-600"
              onClick={() => setNavigation("search")}
            />
          </div>
        </footer>
      </div>
    );
  } else if (navigation == "search") {
    return (
      <FollowerSearch navigation={navigation} setNavigation={setNavigation} />
    );
  }
}

export default SocialSidebarRegular;
