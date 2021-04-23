import Link from "next/link";
import React, { useEffect } from "react";

function ProfileNav({ directive }) {
  return (
    <div className="w-full pt-1 h-14 bg-gradient-to-r from-indigo-600 to-purple-700  dark:to-indigo-700 dark:from-purple-700  text-white  rounded-lg dark:bg-cb-4 dark:text-white flex flex-between items-center font-bold">
      <div
        className={`h-full flex justify-center items-center border-b-4  border-transparent flex-none flex items-center mx-2 px-4  hover:animate-pulse   ${
          directive == "feed" && " border-white dark:border-gray-300"
        } `}
      >
        <Link className="cursor-pointer" href="/dashboard/feed">
          Feed
        </Link>
      </div>
      <ul className="h-full w-full flex justify-end items-center">
        <li
          className={` flex justify-center border-b-4 border-transparent items-center h-full px-4 mx-2   hover:animate-pulse transition-all  ${
            directive == "dashboardPosts" &&
            "  border-white dark:border-gray-300 "
          } `}
        >
          <Link className="cursor-pointer" href="/dashboard/posts">
            <a>Posts</a>
          </Link>
        </li>
        <li
          className={`flex justify-center  border-b-4 border-transparent items-center  h-full px-4 mx-2 hover:animate-pulse   ${
            directive == "queue" && " border-white dark:border-gray-300"
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
