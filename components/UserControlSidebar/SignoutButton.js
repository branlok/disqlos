import React from 'react'
import {useAuth} from '../../utils/auth';
import Link from 'next/link'
function SignoutButton() {
    const auth = useAuth();


    return (
        <div onClick={() => auth.signout()} className="flex-none h-12 w-full rounded-sm bg-custom-pink-550 flex justify-center items-center mt-2 hover:bg-custom-pink-600 dark:bg-cb-3 dark:text-red-500 transition-all hover:shadow-sm cursor-pointer">

                <a href="/" className="font-bold">Sign Out</a>

        </div>
        )
}

export default SignoutButton
