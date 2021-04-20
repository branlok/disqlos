import Link from "next/link";
import React, { useEffect } from "react";

function ProfileNav({ directive }) {
  return (
    <div className="w-full h-12 bg-custom-pink-550 rounded-lg dark:bg-cb-4 dark:text-white flex flex-between items-center font-bold">
      <div
        className={`h-full flex justify-center items-center border-b-4  border-transparent flex-none flex items-center mx-2 px-4  hover:animate-pulse  color-gray-600 dark:text-gray-300 ${
          directive == "feed" && " border-custom-pink-1200 dark:border-gray-300"
        } `}
      >
        <Link className="cursor-pointer" href="/dashboard/feed">
          Feed
        </Link>
      </div>
      <ul className="h-full w-full flex justify-end items-center">
        <li
          className={` flex justify-center border-b-4 border-transparent items-center h-full px-4 mx-2 color-gray-600 dark:text-gray-300 hover:animate-pulse transition-all  ${
            directive == "dashboardPosts" && "  border-custom-pink-1200 dark:border-gray-300 "
          } `}
        >
          <Link className="cursor-pointer" href="/dashboard/posts">
            <a>Posts</a>
          </Link>
        </li>
        <li
          className={`flex justify-center  border-b-4 border-transparent items-center  h-full px-4 mx-2 color-gray-600 hover:animate-pulse  dark:text-gray-300 ${
            directive == "queue" && " border-custom-pink-1200 dark:border-gray-300"
          } `}
        >
          <Link className="cursor-pointer" href="/dashboard/queue">
            <a>Space</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNav;
