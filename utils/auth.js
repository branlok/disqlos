import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import { useMutation, useQueryClient } from "react-query";
import "firebase/auth";
import "firebase/firestore";
import { auth, db } from "./firebase";
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  /* SIGN IN request */
  let signinResponse = useMutation(
    "email",
    ({ email, password }) => {
      return auth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          setUser(response.user);
          return response.user;
        });
    },
    false
  );

  let signin = (email, password) => signinResponse.mutate({ email, password });

  /* SIGN UP Request */
  let signupResponse = useMutation(
    "email",
    ({ email, password, displayName }) => {
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          db.collection("USERS")
            .doc(response.user.uid)
            .set({ displayName }, { merge: true });
          //db.collection('users').doc(response.user.uid).set({id: response.user.uid});
          setUser(response.user);
          signupResponse.reset(); //clear the state if another signup - useMutation
          return response.user;
        });
    },
    false
  );

  const signup = (email, password, displayName) =>
    signupResponse.mutate({ email, password, displayName });

  /* SIGN OUT Request */

  let signout = () => mutateSignout.mutate();
  const queryClient = useQueryClient();

  let mutateSignout = useMutation("signout", () => {
    return auth
      .signOut()
      .then(() => {
        queryClient.clear();
      })
      .then(() => {
        setUser(false);
      });
  });

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      console.log("happened");
      return true;
    });
  };

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString("oobCode");

    return auth.confirmPasswordReset(resetCode, password).then(() => {
      return true;
    });
  };

  useEffect(() => {
    //listening to authenticaiton server if users is on or off
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
    signinResponse,
    signupResponse,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
