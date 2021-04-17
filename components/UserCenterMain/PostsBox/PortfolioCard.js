import React from "react";
import { useQueryClient } from "react-query";
import { useAuth } from "../../../utils/auth";
import ProfileCircle from "../../BasicComponents/ProfileCircle";
import useOnlyUserData from "../../Queries/USERS/useOnlyUserData";
import useUser from "../../Queries/USERS/useUser";
import useFollow from "../utils/useFollow";
function PortfolioCard({ postOwner, post }) {
  //const { userData, isReady2 } = useUser();
  const { userData } = useOnlyUserData();
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { followMutation } = useFollow(userId, postOwner);

  //does my own profile include this username?
  let following = userData.data.following.includes(postOwner);
  
  if (userId == postOwner) {
    let primaryProfileImage = userData.data.primaryProfileImage;
    return (
      <div className=" w-28 flex-none bg-custom-pink-550  dark:bg-cb-3 dark:text-gray-200  flex flex-col justify-center items-center rounded-md my-2 py-4">
        <div className="w-16 h-16">
          <ProfileCircle imageURL={primaryProfileImage} />
        </div>
        <div
          onClick={() => followMutation.mutate(!following)}
          className={`text-xs rounded p-1 px-2 m-1 text-custom-pink-900 cursor-pointer`}
        >
          {following ? "Unfollow" : "Follow"}
        </div>
        <p className="text-xs font-bold text-gray-600  dark:text-gray-300 ">
          {userData.data.displayName}
        </p>
      </div>
    );
  } else {
    let primaryProfileImage = post.primaryProfileImage;
    return (
      <div className=" w-28 flex-none bg-custom-pink-550 dark:bg-cb-3 dark:text-gray-200  flex flex-col justify-center items-center rounded-md my-2 py-4">
        <div className="w-16 h-16 cursor-pointer">
          <ProfileCircle imageURL={primaryProfileImage} />
        </div>
        <div
          onClick={() => followMutation.mutate(!following)}
          className={`text-xs rounded p-1 px-2 m-1 text-custom-pink-900 cursor-pointer`}
        >
          {following ? "Unfollow" : "Follow"}
        </div>
        <p className="text-xs font-bold text-gray-600  dark:text-gray-300 ">{post.displayName}</p>
      </div>
    );
  }
}

export default PortfolioCard;
