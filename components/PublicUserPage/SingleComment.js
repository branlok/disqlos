import React from 'react'
import TimeAgo from 'react-timeago';
 

function SingleComment({item}) {
    return (
        <div className="my-2 bg-custom-pink-300 rounded-sm flex flex-row justify-between items-center px-2 py-1 first:mt-0 last:mb-0">
          <div className="relative flex flex-col w-full">
            <header className="flex justify-between items-center w-full border-b-2 pb-1 ">
              <div className="flex justify-between items-center py-2 h-full flex-col md:flex-row w-full">
                <div className="flex-col md:flex-row flex justify-between items-center">
                  <img
                    className="w-7 h-7 object-cover rounded-full border"
                    src={item.primaryProfileImage}
                  />
                  <div className="text-sm font-bold text-gray-800 mx-2">
                    {item.uniqueDisplayName}
                  </div>
                </div>
                <TimeAgo
                  className="items-center text-xs text-gray-600"
                  date={item.createdOn.toDate()}
                  minPeriod="30"
                />
              </div>
            </header>
            <div className="relative text-sm mt-2 pl-2 pb-4 ">{item.content}</div>
          </div>
        </div>
      );
}

export default SingleComment
