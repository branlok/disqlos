import React from "react";
import MiniUserCard from "./MiniUserCard";
import TriangleSvg from "../../styles/svg/trianglearrow.svg";
import AddFollowerSvg from "../../styles/svg/personAdd.svg";
import CollapseSvg from "../../styles/svg/collapse.svg";

function MinimizedSocial({
  collapse,
  setCollapse,
  followerDataQuery,
  showToggle,
}) {
  return (
    <div className="relative h-full w-20 flex-none p-2 flex flex-col items-center ">
      {followerDataQuery.data?.map((item) => {
        return (
          <MiniUserCard
            key={item.uid}
            name={item.displayName}
            caption={item.profileDescription}
            imageURL={item.primaryProfileImage}
            targetId={item.uid}
          />
        );
      })}
{/* 
      <MiniUserCard />
      <MiniUserCard /> */}
    </div>
  );
}

export default MinimizedSocial;
