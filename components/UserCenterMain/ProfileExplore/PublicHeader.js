import React from "react";
import { useRouter } from "next/router";
import ProfileCircle from "../../BasicComponents/ProfileCircle";
import useOnlyUserData from "../../Queries/USERS/useOnlyUserData";
import useGetPortfolio from "../utils/useGetPortfolio";
import useFollow from "../utils/useFollow";

function PublicHeader({ targetId, portfolioData, directive }) {
  const {userData} = useOnlyUserData(); //Own Data
  
  const { followMutation } = useFollow(userData.data.uid, targetId, directive);
  const following = userData.data.following.includes(targetId)

    return (
      <div className="py-4 px-8 w-full flex flex-col  justify-between items-center bg-custom-pink-400 dark:bg-cb-4 dark:border-cb-3 text-gray-600 dark:text-gray-200   rounded-md border-2 border-gray mb-5">
        <div className="w-20 h-20">
          <ProfileCircle imageURL={portfolioData.data.primaryProfileImage} />
        </div>
        <div className="h-full flex justify-between items-center ">
          <b className=""> {portfolioData.data.displayName}</b>
        </div>
        <div className="my-2  w-full text-center border-t-4 dark:border-gray-500">
          <p className="text-center ">
            {portfolioData.data.profileDescription}
          </p>
        </div>
        <ul className="h-full  justify-between  flex items-center text-gray-600 dark:text-gray-200  text-xs lg:text-base ">
          <li className="px-2 text-center">
            {" "}
            {portfolioData.data.numberOfPosts} Posts
          </li>
          <li className="px-2 text-center">
            {" "}
            {portfolioData.data.followers.length - 1} Followers{" "}
          </li>
          <li className="px-2 text-center">
            {" "}
            {portfolioData.data.following?.length - 1} Following{" "}
          </li>
        </ul>
        <div className="">
          <button
             onClick={() => followMutation.mutate(!following)}
            className="px-2 mx-2  rounded-md text-white py-1  my-2 font-bold text-sm  bg-custom-pink-1000"
          >
            {following ? "Unfollow" : "Follow" }
          </button>
        </div>
      </div>
    );
  
}

export default PublicHeader;
