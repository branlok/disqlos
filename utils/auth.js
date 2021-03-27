import React, {useState, useEffect, useContext, createContext} from 'react';
import firebase from 'firebase/app';
import {useMutation} from 'react-query';
import 'firebase/auth';
import {useRouter} from 'next/router';
const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}



const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};


function useProvideAuth() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    let mutateSignin = useMutation("email", async ({email, password}) => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            setUser(response.user);
            router.push('/dashboard');
            // console.log(response.data);
            // return response.user;
        })
        .catch((error) => {
            console.log(error);
        })
    }, false )

    let signin = (email, password) => mutateSignin.mutate({ email, password })

    let mutateSignup = useMutation("email", ({email, password}) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    }, false )

    const signup = (email, password) => mutateSignup.mutate({email, password})



    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };

    const sendPasswordResetEmail = (email) => {
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };

    const confirmPasswordReset = (password, code) => {
        const resetCode = code || getFromQueryString('oobCode');

        return firebase
            .auth()
            .confirmPasswordReset(resetCode, password)
            .then(() => {
                return true;
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        userId: user && user.uid,
        signin,
        signup,
        signout,
        mutateSignin,
        mutateSignup,
        sendPasswordResetEmail,
        confirmPasswordReset
    };
}
