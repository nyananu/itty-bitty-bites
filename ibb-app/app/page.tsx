"use client";

import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'; // Import User type
import { useRouter } from 'next/navigation';
import { firebaseApp } from '../firebase';
import LandingPage from "./LandingPage/page";

const Home = () => {
  const [user, setUser] = useState<User | null>(null); // Declare state type
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push("/LandingPage");
    } catch (error) {
      console.log("error signing in with google", error);
    }
  };

  return (
    <div>
      {user ? (
        <LandingPage />
      ) : (
        <button onClick={signInWithGoogle}>
          SignIn
        </button>
      )}
    </div>
  );
};

export default Home;
