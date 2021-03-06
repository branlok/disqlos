import React, { useState } from "react";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import useOnlyUserData from "../Queries/USERS/useOnlyUserData";
import useUser from "../Queries/USERS/useUser";
import BasicProfilePl from "./placeholders/BasicProfilePl";
import ProfileUpdater from "./ProfileUpdater";

function BasicProfile() {
  // const { userData, isReady2} = useUser();
  const { userData } = useOnlyUserData();
  const userProfile = userData.data;
  const [showProfileUpdater, setShowProfileUpdater] = useState(false);
    

let primaryProfileImage =  userProfile.primaryProfileImage

    return (
      <div className="border-2 border-purple-600  w-full rounded-md  bg-purple-100 dark:bg-cb-3  dark:text-gray-200 flex flex-col items-center justify-center p-8">
        <div className="h-24 w-24">
          <ProfileCircle imageURL={primaryProfileImage} allowFullscreen={true}/>
        </div>
        <p className="text-xl">
          <b>{userProfile.displayName}</b>{" "}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-xs">{userProfile.uniqueDisplayName}</p>
        <p className="text-center text-xs rounded-md my-2 p-2 w-full bg-purple-200 dark:bg-cb-2 font-light">
          {userProfile.profileDescription}
        </p>
        <button
          type="button"
          onClick={() => setShowProfileUpdater(true)}
          className="transition-colors border w-full rounded-md px-2 py-1 bg-gray-100 dark:bg-cb-4 dark:border-cb-3 text-sm my-2 hover:bg-gray-800 hover:text-white "
        >
          Edit Profile
        </button>
        {showProfileUpdater && (
          <ProfileUpdater setShowProfileUpdater={setShowProfileUpdater} />
        )}
      </div>
    );
}

export default BasicProfile;
