import React, { useState, useEffect } from "react";
import BasicProfile from "./BasicProfile";
import Button from "./Button";
import SignoutButton from "./SignoutButton";
import MinimizedSidebar from "./MinimizedSidebar";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ControlSidebarRegular from "./ControlSidebarRegular";

function UserControlSidebar({userData}) {
  let [collapse, setCollapse] = useState(false); //this is going to the redux/contextapi

  let [showToggle, setShowToggle] = useState(true);
  let { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 900) {
      setCollapse(true);
      setShowToggle(false);
    } else if (width > 900) {
      setShowToggle(true);
    }
  }, [width]);

  if (collapse) {
    return <MinimizedSidebar userData={userData} setCollapse={setCollapse} showToggle={showToggle} />;
  } else {
    return (
      <ControlSidebarRegular userData={userData} setCollapse={setCollapse} showToggle={showToggle}/>
    );
  }
}

export default UserControlSidebar;
