import React, {useState} from "react";
import BasicProfile from "./BasicProfile";
import Button from "./Button";
import MinimizedSidebar from "./MinimizedSidebar";

function UserControlSidebar() {
    let [collapse, setCollapse] = useState(false); //this is going to the redux/contextapi 
  if (collapse) return (
  <MinimizedSidebar/>
  )
    return (
    <div className="relative h-full w-48 flex-none md:w-80 bg-custom-pink-500 p-2 justify-between flex-col flex">
      <div>
        <BasicProfile />
        <Button name="Home" />
        <Button name="Explore" />
        <Button name="Queue" />
        <Button name="Settings" />
      </div>
      <Button name="Logout" />
      <div className="absolute top-0 -right-10 z-10" onClick={() => setCollapse(!collapse)}>
          Minimize
      </div>
    </div>
  );
}

export default UserControlSidebar;
