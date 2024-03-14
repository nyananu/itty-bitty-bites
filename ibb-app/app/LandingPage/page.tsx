"use client"

import React, { useState, useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { firebaseApp } from '../../firebase'

function LandingPage() {
    const auth = getAuth();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                router.push('/')
            }
        })

        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/')
        } catch(error) {
            console.log ('error')
        }
    };

    return (
        <div>
            <div>
                <h1>
                    Landing page {user ? user.displayName : "guest"}
                </h1>
                <button
                    onClick={handleLogout}
                >
                    logout
                </button>
            </div>
        </div>
    )
}

export default LandingPage;
