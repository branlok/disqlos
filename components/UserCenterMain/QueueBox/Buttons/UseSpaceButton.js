import Link from 'next/link'
import React from 'react'

function UseSpaceButton({queueId}) {
    return (
        <button className=" w-32 mx-2 rounded-md text-white py-2 text-sm my-1 font-bold bg-custom-pink-1000 hover:shadow-md">
          <Link href={`queue?id=${queueId}`}>
            <a>UseSpace</a>
          </Link>
        </button>
    )
}

export default UseSpaceButton
