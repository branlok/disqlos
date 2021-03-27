import React, {useEffect} from 'react'
import {useAuth} from '../utils/auth'
import {useRouter} from 'next/router';
import SignInModal from '../components/AuthModal/SignInModal'

function SignIn() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.userId) {
            router.push('/dashboard');
        }
        console.log(auth.mutateSignin.status)
    })

    const signIn = (email, pass) => {
        auth.signin(email, pass)
        .then((value) => {
            console.log("Asdfasdf")
            router.push('/dashboard');
        })
        .catch((error) => {
            console.log("failed");
            console.log(error)
        });
    }  

    return (
        <div>
            {auth.mutateSignin.status}
            <SignInModal handleSignIn={signIn} />
        </div>
    )
}

export default SignIn;