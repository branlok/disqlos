import React from "react";
import ProfileCircle from "../BasicComponents/ProfileCircle";
import useUser from "../Queries/USERS/useUser";

function BasicProfile() {
  const { userData } = useUser();
  const data = userData.data.data();

  return (
    <div className="h-60 w-full rounded-md bg-custom-pink-550 flex flex-col items-center justify-center p-8">
      <div className="h-24 w-24">
        <ProfileCircle imageURL="https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2FLauv-press-by-Lauren-Dunn-2020-billboard-1548-compressed.jpg?alt=media&token=ac524eac-c293-48b1-8497-a7bfdfe0a100" />
      </div>
      <p><b>{data.displayName}</b> </p> 
      <p className="text-gray-600 text-sm">{data.userId}</p>
      <p className="text-center text-xs">
          
        here is a short description of yourself can be placed
      </p>
    </div>
  );
}

export default BasicProfile;
