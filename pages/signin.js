import React, {useEffect} from 'react'
import {useAuth} from '../utils/auth'
import {useRouter} from 'next/router';
import SignInModal from '../components/AuthModal/SignInModal'

function SignIn() {
    const {userId, signinResponse, signin} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            router.push('/dashboard/posts');
        }
        console.log(signinResponse.status)
    })

    const signIn = (email, pass) => {
        signin(email, pass)
        .then((value) => {
            console.log("Asdfasdf")
            router.push('/dashboard/posts');
        })
        .catch((error) => {
            console.log("failed");
            console.log(error)
        });
    }  

    if (userId) return <div></div>
    return (
        <div>
            {signinResponse.status}
            <SignInModal handleSignIn={signIn} />
        </div>
    )
}

export default SignIn;