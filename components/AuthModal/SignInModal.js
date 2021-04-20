import React from 'react'
import AuthModal from './index';
function SignInModal({handleSignIn}) {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-custom-gray-500 dark:bg-cb-3 ">
            <AuthModal handleSignIn={handleSignIn}/>
        </div>
    )
}

export default SignInModal
