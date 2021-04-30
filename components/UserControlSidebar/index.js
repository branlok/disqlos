import React, { useState, useEffect } from "react";
import BasicProfile from "./BasicProfile";
import Button from "./Button";
import SignoutButton from "./SignoutButton";
import MinimizedSidebar from "./MinimizedSidebar";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ControlSidebarRegular from "./ControlSidebarRegular";

function UserControlSidebar({ userData, toggleLeftCol, setToggleLeftCol }) {
  let [collapse, setCollapse] = useState(false); //Limits the sidebar view to minimze by force
  let { width } = useWindowDimensions();
  let [mobile, setMobile] = useState(width < 640 ? true : false); //switch between hidden sidebar or exapnded sidebar

  let [showToggle, setShowToggle] = useState(false); //switch between minimze sidebar or exapnded sidebar

  useEffect(() => {
    if (width < 640) {
      setMobile(true);
    }
    if (width >= 640) {
      //return to desktop behaviour
      setMobile(false);
      //make sure to collapse if it wasn't collapsed
      setToggleLeftCol(false);
    }
    if (width < 900) {
      setCollapse(true);
      setShowToggle(false);
    } else if (width > 900) {
      setShowToggle(true);
    }
  }, [width]);

  const ToggleSidebar = collapse ? (
    <MinimizedSidebar
      userData={userData}
      setCollapse={setCollapse}
      showToggle={showToggle}
    />
  ) : (
    <ControlSidebarRegular
      userData={userData}
      setCollapse={setCollapse}
      showToggle={showToggle}
    />
  );

  const slideIn = toggleLeftCol ? "" : " -left-full";

  if (mobile) {
    return (
      <div
        className={`${slideIn} absolute top-0 left-0 w-full h-full z-50 transition-all flex`}
      >
        <div
          className={` p-5   w-4/5  flex-none flex justify-center items-center   h-full sm:block bg-gray-100 dark:bg-cb-2`}
        >
          <ControlSidebarRegular
            userData={userData}
            setCollapse={setCollapse}
            showToggle={showToggle}
          />
        </div>
        <div className="w-full" onClick={() => setToggleLeftCol(false)}></div>
      </div>
    );
  } else {
    return (
      <div className="h-full bg-gray-100 dark:bg-cb-2 relative">
        {ToggleSidebar}
      </div>
    );
  }
}

export default UserControlSidebar;
