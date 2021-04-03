import React from "react";

function ProfileNav({setDirective, directive}) {
    
  return (
    <div className="w-full h-12 border-b-2 flex flex-between items-center">
      <div className={`h-full w-24 flex-none flex items-center mx-2 px-4  color-gray-600 ${directive == "feed" && "font-bold"} `} onClick={() => setDirective("feed")}>
        Feed
      </div>

      <ul className="h-full w-full flex justify-end items-center">
        <li className={`px-4 mx-2 color-gray-600 ${directive == "posts" && "font-bold"} `} onClick={() => setDirective("posts")}>Posts</li>
        <li className="px-4 mx-2 color-gray-600 ">Queues</li>
      </ul>
    </div>
  );
}

export default ProfileNav;
