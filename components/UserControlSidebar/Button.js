import React from 'react'
import Link from 'next/link'
function Button({link = "/", name = "no name"}) {

    return (
        <div className=" h-16 w-full rounded-sm bg-custom-pink-550 flex justify-center items-center mt-2 hover:bg-custom-pink-600 transition-all hover:shadow-sm cursor-pointer">
            <Link href={link}>
                <a className="font-bold">{name}</a>
            </Link>
        </div>
    )
}

export default Button
