import React from "react";
import { useAuth } from "../../../utils/auth";
import ProfileCircle from "../../BasicComponents/ProfileCircle";
import PortfolioCardPl from "../../Placeholders/PortfolioCardPl";
import useUser from "../../Queries/USERS/useUser";
import displaySelection from "../helperFunctions/displaySelection";
function PortfolioCard({ postOwner, post }) {
  const { userData, isReady2 } = useUser();
  const { userId } = useAuth();


  if (isReady2) {
    if (userId == postOwner) {
        let primaryProfileImage =  userData.data.primaryProfileImage
      return (
        <div className=" w-28 flex-none bg-custom-pink-550 flex flex-col justify-center items-center rounded-md my-2 py-4">
          <div className="w-16 h-16">
            <ProfileCircle imageURL={primaryProfileImage} />
          </div>
          <div className="text-xs rounded p-1 px-2 m-1 text-custom-pink-900">
            Follow
          </div>
          <p className="text-xs font-bold text-gray-600">
            {userData.data.displayName}
          </p>
        </div>
      );
    } else {
        let primaryProfileImage = post.primaryProfileImage
      return (
        <div className=" w-28 flex-none bg-custom-pink-550 flex flex-col justify-center items-center rounded-md my-2 py-4">
          <div className="w-16 h-16">
            <ProfileCircle imageURL={primaryProfileImage} />
          </div>
          <div className="text-xs rounded p-1 px-2 m-1 text-custom-pink-900">
            Follow
          </div>
          <p className="text-xs font-bold text-gray-600">
            {userData.data.displayName}
          </p>
        </div>
      );
    }
  } else {
    //This is a fall back incase newly creater users are eager to post;
    return <PortfolioCardPl />;
  }
}

export default PortfolioCard;
