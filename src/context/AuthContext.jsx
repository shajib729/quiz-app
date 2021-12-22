import React, { useState, useContext, useEffect, createContext } from 'react'
import '../firebase.js'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    signInWithPopup
} from 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe=onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe        
    }, [])
    
    // signin with gmail
    async function gmailSignin() {
        const auth=getAuth()
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)

        const user = auth.currentUser;
        
        setCurrentUser({...user});
    }
    
    // signup function
    async function signup (email, password, username) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
        
        // update profile
        await updateProfile(auth.currentUser, {
            displayName: username
        });

        const user = auth.currentUser;
        setCurrentUser({...user})
    }

    // login function 
    function login(email, password) {
        const auth = getAuth()
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout function
    function logout() {
        const auth = getAuth()
        return signOut(auth)
    }

    const value = {
        currentUser,
        gmailSignin,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}