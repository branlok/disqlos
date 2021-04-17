import React from "react";
import { useAuth } from "../../utils/auth";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import useUser from "../Queries/USERS/useUser";
import useFollow from "../UserCenterMain/utils/useFollow";
import { useRouter } from "next/router";

function UserCard({
  name,
  caption,
  imageURL,
  link,
  active,
  followButton,
  targetId,
}) {
  let dynamicBorder = active
    ? "border-custom-pink-900"
    : "border-custom-pink-550";
  let dynamicBg = active ? "bg-custom-pink-600" : "bg-gray-200";
  const { userId } = useAuth();
    const {userData} = useUser();
  const { followMutation } = useFollow(userId, targetId);
    const following = userData.data.following.includes(targetId);

    const router = useRouter();

  //const baseColor = "bg-custom-pink-550"
  // const baseColor = "bg-gray-200"
  //Notification Active
  //active -- border-custom-pink-900, bg-bg-custom-pink-550

  return (
    <div
      className={`w-full h-20 mb-2 p-0.5 rounded-md border-2 border-custom-pink-300  dark:bg-cb-3 dark:border-cb-3 dark:text-gray-200 bg-gray-200 hover:shadow-md dark:hover:border-gray-400   transition-shadow duration-250 flex-none`}
    >
      <div
        className={`w-full h-full px-1 bg-gray-200 dark:bg-cb-3 dark:text-gray-200  dark:hover:bg-cb-4 transition-colors rounded-sm flex flex-row items-center justify-between cursor-pointer`}
      >
        <div onClick={() => router.push(`/explore/${targetId}`) } className="flex flex-row items-center justify-start">
          <div className="h-12 w-12 flex-none">
            <ProfileCircle imageURL={imageURL} />
          </div>
          <div className="flex-initial px-2 flex flex-col justify-center ">
            <p className="font-bold text-gray-600 dark:text-gray-200 text-sm">{name}</p>
            <p className="text-xs text-gray  text-gray-400">{caption}</p>
          </div>
        </div>
        {followButton && (
          <button
            onClick={() => followMutation.mutate(!following)}
            className="border rounded-md bg-gray-800 text-xs text-white py-1 px-2 mr-2 "
          >
            {following ? "unfollow" : "follow"}
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
