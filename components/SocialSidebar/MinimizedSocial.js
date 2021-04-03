import React from "react";
import MiniUserCard from "./MiniUserCard";
function MinimizedSocial() {
  return (
    <div className="relative h-full w-20 flex-none bg-custom-pink-500 p-2 flex flex-col ">
      <MiniUserCard />
      <MiniUserCard />
      <MiniUserCard />
      <MiniUserCard />
      <MiniUserCard />
      <MiniUserCard />
    </div>
  );
}

export default MinimizedSocial;
