import React from "react";
import { useAuth } from "../../../utils/auth";
import ProfileCircle from "../../BasicComponents/ProfileCircle";
import useRandomUsers from "./useRandomUsers";
import XCloseSvg from "../../../styles/svg/close.svg";
function RecommendUsers({ setRecommended }) {
  const { userId } = useAuth();
  const { randomUserData } = useRandomUsers(userId);

  return (
    <div className="w-full h-32 px-4 py-2 bg-custom-pink-400 dark:bg-cb-2 dark:border-cb-3 rounded-md border my-4 flex flex-col">
      <div className="flex-initial w-full border-b-2 border-gray-600 text-custom-pink-1000 dark:text-gray-200 font-bold flex justify-between items-center px-0.5">
        <p>Recommended Users</p>
        <button
          onClick={() => setRecommended(false)}
          className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:hover:text-white cursor-pointer flex"
        >
          <XCloseSvg className="h-full w-full fill-current" />
        </button>
      </div>
      <div className="h-full flex items-center overflow-scroll no-scrollbar px-2">
        <div className="flex">
          {randomUserData.isSuccess &&
            randomUserData.data.map((item) => {
              return (
                <div className="h-16 w-16 mr-2">
                  <ProfileCircle
                    key={item.uid + "recommendation"}
                    imageURL={item.primaryProfileImage}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {randomUserData.isLoading && (
        <div className="w-full h-full border flex justify-center items-center font-bold animate-pulse">
          <p>Loading</p>
        </div>
      )}
    </div>
  );
}

export default RecommendUsers;
