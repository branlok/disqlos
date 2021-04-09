import React, { useState } from "react";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import useUser from "../Queries/USERS/useUser";
import displaySelection from "../UserCenterMain/helperFunctions/displaySelection";
import BasicProfilePl from "./placeholders/BasicProfilePl";
import ProfileUpdater from "./ProfileUpdater";

function BasicProfile() {
  const { userData, isReady2} = useUser();
  const userProfile = userData.data;
  const [showProfileUpdater, setShowProfileUpdater] = useState(false);
    

let primaryProfileImage =  userProfile.primaryProfileImage

  if (!isReady2) {
    return <BasicProfilePl />;
  } else
    return (
      <div className="h-72 w-full rounded-md bg-custom-pink-550 flex flex-col items-center justify-center p-8">
        <div className="h-24 w-24">
          <ProfileCircle imageURL={primaryProfileImage} />
        </div>
        <p>
          <b>{userProfile.displayName}</b>{" "}
        </p>
        <p className="text-gray-600 text-sm">{userProfile.uniqueDisplayName}</p>
        <p className="text-center text-xs">
          here is a short description of yourself can be placed
        </p>
        <button
          type="button"
          onClick={() => setShowProfileUpdater(true)}
          className="border rounded-md px-2 py-1 bg-gray-100 text-sm my-2 hover:bg-gray-800 hover:text-white "
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
