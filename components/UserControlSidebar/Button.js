import React from 'react'
import Link from 'next/link'
function Button({link = "/", name = "no name",}) {

    return (
        <div className=" h-12 w-full rounded-md  dark:bg-cb-3  dark:text-gray-200 dark:hover:bg-cb-4 dark:border-cb-3 dark:hover:border-gray-400 flex justify-center items-center mt-2 hover:bg-custom-pink-600 transition-all hover:shadow-sm cursor-pointer">
            <Link href={link}>
                <a className="font-bold  w-full h-full text-center flex justify-center items-center">{name}</a>
            </Link>
        </div>
    )
}

export default Button
