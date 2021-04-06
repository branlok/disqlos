import Link from "next/link";
import React, { useEffect } from "react";



function ProfileNav({ setDirective, directive, setQueueId}) {


  return (
    <div className="w-full h-12 border-b-2 flex flex-between items-center">
      <div className={`h-full w-24 flex-none flex items-center mx-2 px-4  color-gray-600 ${directive == "feed" && "font-bold"} `} onClick={() => setDirective("feed")}>
        {/* Feed */}
        <Link shallow href="/dashboard/feed">Feed</Link>
      </div>
      <ul className="h-full w-full flex justify-end items-center">
        <li className={`px-4 mx-2 color-gray-600 cursor-pointer ${directive == "posts" && "font-bold"} `} onClick={() => setDirective("posts")}>   <Link shallow href="/dashboard/posts">Posts</Link></li>
        <li className={`px-4 mx-2 color-gray-600 cursor-pointer ${directive == "queue" && "font-bold"} `} onClick={() => {setDirective("queue"); {setQueueId && setQueueId(false)}}}><Link shallow href="/dashboard/queue">Space</Link></li>
      </ul>
    </div>
  );
}

export default ProfileNav;
