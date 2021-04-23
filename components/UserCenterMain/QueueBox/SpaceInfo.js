import React from 'react'
import TimeAgo from "react-timeago"
function SpaceInfo({createdOn, numberOfChildren}) {
    
    return (
        <div className="text-gray-500 text-xs border-gray-300 dark:bg-cb-4 dark:text-gray-200 flex justify-center items mx-2 bg-gray-200 p-0.5 rounded-md z-10">
        <div className="mx-2">
          Created <TimeAgo date={createdOn.toDate()} minPeriod="30" />
        </div>
        <div className="mx-2"> {numberOfChildren} Posts</div>
      </div>
      
    )
}

export default SpaceInfo
