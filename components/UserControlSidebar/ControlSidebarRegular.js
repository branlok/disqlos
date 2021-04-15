import React from "react";
import BasicProfile from "./BasicProfile";
import Button from "./Button";
import SignoutButton from "./SignoutButton";
import CollapseSvg from "../../styles/svg/arrowLeft.svg";

function ControlSidebarRegular({userData, collapse, setCollapse, showToggle}) {
  return (
    <div className="relative h-full w-64 flex-none  bg-custom-pink-500 p-2 justify-between flex-col flex ">
      <div>
        <BasicProfile userData={userData} />
        <Button link="/dashboard/posts" name="Home" />
        <Button link="/dashboard/explore" name="Explore" />
        <Button link="/dashboard/queue" name="Space" />
        <Button name="Settings" />
      </div>
      <SignoutButton />
      {showToggle && (
        <div
          className="w-14 h-12 absolute top-2 -right-14 z-10 flex justify-center items-center "
          onClick={() => setCollapse(!collapse)}
        >
          <CollapseSvg className="grayFill cursor-pointer" />
        </div>
      )}
    </div>
  );
}

export default ControlSidebarRegular;
