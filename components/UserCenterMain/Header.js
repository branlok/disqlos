import React from "react";
import useUser from "../Queries/USERS/useUser";
import DotsSVG from "../../styles/svg/dots.svg";
function Header() {
  const { userData } = useUser();
  const userProfile = userData.data;

  //preemptive measures when firestore hasnt update yet.
  const numberOfPosts = userProfile.numberOfPosts
    ? userProfile.numberOfPosts
    : "0";
  const numberOfFollowers = userProfile.numberOfFollowers
    ? userProfile.numberOfFollowers
    : "0";
  const numberOfFollowing =
    userProfile.following?.length - 1 ? userProfile.following.length - 1 : "0";

  return (
    <div className="bg-gradient-to-r from-indigo-100  to-purple-100 dark:from-cb-1 dark:to-cb-2 relative min-h-14 w-full mt-2 flex flex-col justify-center md:flex-row md:justify-between items-center bg-custom-pink-400 dark:bg-cb-2 dark:border-cb-3 text-gray-800 dark:text-gray-200  p-4 rounded-md border-4 border-white mb-5">
      <div className=" justify-between items-center p-4 rounded-lg bg-gradient-to-bl from-indigo-500  to-purple-600 text-white">
        <b > {userProfile.displayName}</b>
      </div>
      <div className=" flex h-full w-full flex-col md:flex-row justify-center md:justify-end py-2 items-center ">
        <ul className=" h-full flex items-center justify-end text-sm font-light text-gray-500 dark:text-gray-300 ">
          <li className="px-2 text-center w-20 md:w-24 "> {numberOfPosts} <br/> <b> Posts</b></li>
          <li className="px-2 text-center w-20 md:w-24">
            {userProfile.followers.length - 1} <br/> <b>Followers</b>{" "}
          </li>
          <li className="px-2 text-center w-20 md:w-24"> {numberOfFollowing} <br/> <b>Following</b> </li>
        </ul>
        <div className="w-7 mt-2 md:mt-0 p-1 md:ml-2 flex justify-center items-center rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-gray-500">
          <DotsSVG className="h-full w-full transform md:rotate-90 fill-current" />
        </div>
      </div>
    </div>
  );
}

export default Header;
