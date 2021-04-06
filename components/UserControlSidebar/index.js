import React, { useState, useEffect } from "react";
import BasicProfile from "./BasicProfile";
import Button from "./Button";
import SignoutButton from "./SignoutButton";
import MinimizedSidebar from "./MinimizedSidebar";
import CollapseSvg from "../../styles/svg/collapse.svg";
import useWindowDimensions from "../../utils/useWindowDimensions";

function UserControlSidebar({userData}) {
  let [collapse, setCollapse] = useState(false); //this is going to the redux/contextapi

  let [showToggle, setShowToggle] = useState(true);
  let { width } = useWindowDimensions();

  useEffect(() => {
    console.log(width);
    if (width < 900) {
      setCollapse(true);
      setShowToggle(false);
    } else if (width > 900) {
      setShowToggle(true);
    }
  }, [width]);

  if (collapse) {
    return <MinimizedSidebar setCollapse={setCollapse} showToggle={showToggle} />;
  } else {
    return (
      <div className="relative h-full w-64 flex-none  bg-custom-pink-500 p-2 justify-between flex-col flex ">
        <div>
          <BasicProfile userData={userData}/>
          <Button name="Home" />
          <Button name="Explore" />
          <Button name="Queue" />
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
}

export default UserControlSidebar;
