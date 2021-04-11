import React from "react";
import MiniUserCard from "./MiniUserCard";
import TriangleSvg from "../../styles/svg/trianglearrow.svg";
import AddFollowerSvg from "../../styles/svg/personAdd.svg";
import CollapseSvg from "../../styles/svg/collapse.svg";

function MinimizedSocial({collapse, setCollapse, followerDataQuery, showToggle}) {
  return (
    <div className="relative h-full w-20 flex-none bg-custom-pink-500 p-2 flex flex-col ">
      <MiniUserCard />
      <MiniUserCard />
      <MiniUserCard />
    </div>
  );
}

export default MinimizedSocial;
