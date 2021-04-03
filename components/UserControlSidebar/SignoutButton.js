import React from 'react'
import {useAuth} from '../../utils/auth';
import Link from 'next/link'
function SignoutButton() {
    const auth = useAuth();


    return (
        <div onClick={() => auth.signout()} className=" h-16 w-full rounded-sm bg-custom-pink-550 flex justify-center items-center mt-2 hover:bg-custom-pink-600 transition-all hover:shadow-sm cursor-pointer">
            <Link href="/">
                <a className="font-bold">Sign Out</a>
            </Link>
        </div>
        )
}

export default SignoutButton
