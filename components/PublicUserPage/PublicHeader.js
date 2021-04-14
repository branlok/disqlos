import React from "react";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import {useRouter} from "next/router";
import useUser from "../Queries/USERS/useUser";
function PublicHeader({ targetUserData }) {
  const router = useRouter();
  const {uid} = router.query;
  const {userData} = useUser();
  console.log(userData, "heyo")
  const numberOfFollowers = targetUserData.numberOfFollowers;
  const numberOfFollowing =
    targetUserData.following.length - 1 ? targetUserData.following.length - 1 : "0";

  const handleFollowButton = () => {

    if (!userData.data) {
      router.push("/signup")
    } else if (userData.data) {
      console.log("followed!")
    }

  }

  return (
    <div className="py-4 px-8 w-full flex flex-col  justify-between items-center bg-custom-pink-400 rounded-md border-2 border-gray mb-5">
      <div className="w-20 h-20">
        <ProfileCircle imageURL={targetUserData.primaryProfileImage} />
      </div>
      <div className="h-full flex justify-between items-center ">
        <b className=" text-gray-600"> {targetUserData.displayName}</b>
      </div>
      <div className="border-t-4">
        <p className="text-gray-700">{targetUserData.profileDescription}</p>
      </div>
      <ul className="h-full flex items-center justify-end text-gray-600 text-xs lg:text-base ">
        <li className="px-2 text-center"> {targetUserData.numberOfPosts} Posts</li>
        <li className="px-2 text-center"> {numberOfFollowers} Followers </li>
        <li className="px-2 text-center"> {numberOfFollowing} Following </li>
      </ul>
      <div className="">
          <button onClick={() => handleFollowButton()} className="px-2 mx-2  rounded-md text-white py-1  my-2 font-bold text-sm  bg-custom-pink-1000">
            Follow
          </button>
        </div>
    </div>
  );
}

export default PublicHeader;
