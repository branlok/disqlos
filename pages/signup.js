import React, { useEffect } from "react";
import SignupModal from "../components/AuthModal/SignUpModal";
import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import userFirestoreUserSelf from "../components/Queries/USERS/firestoreUserSelf";
function Signup() {
  const { userId, signup, signupResponse } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    if (userId) {
      router.push("/dashboard");
    }
  });

  if (userId) return <div></div>
  return (
    <div>
      <SignupModal handleSignUp={signup} />
    </div>
  );
}

export default Signup;
