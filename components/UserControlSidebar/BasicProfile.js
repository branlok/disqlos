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
      <div className="min-h-72 max-h-80 w-full rounded-md bg-custom-pink-550 dark:bg-cb-3  dark:text-gray-200 flex flex-col items-center justify-center p-8">
        <div className="h-24 w-24">
          <ProfileCircle imageURL={primaryProfileImage} allowFullscreen={true}/>
        </div>
        <p>
          <b>{userProfile.displayName}</b>{" "}
        </p>
        <p className="text-gray-600 dark:text-gray-600 text-sm">{userProfile.uniqueDisplayName}</p>
        <p className="text-center text-xs mt-1">
          {userProfile.profileDescription}
        </p>
        <button
          type="button"
          onClick={() => setShowProfileUpdater(true)}
          className="border rounded-md px-2 py-1 bg-gray-100 dark:bg-cb-4 dark:border-cb-3 text-sm my-2 hover:bg-gray-800 hover:text-white "
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
