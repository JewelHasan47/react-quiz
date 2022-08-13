import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import '../firebase';

const AuthContext = createContext( {} );

export const useAuth = () => {
    return useContext( AuthContext )
}

export const AuthProvider = ( { children } ) => {
    const [ loading, setLoading ] = useState( true );
    const [ currentUser, setCurrentUser ] = useState();

    useEffect( () => {
        const auth = getAuth();
        return onAuthStateChanged( auth, ( user ) => {
            setCurrentUser( user );
            setLoading( false );
        } );
    }, [] )

    // signup function
    const signup = async( email, password, username ) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword( auth, email, password );

        // update profile
        await updateProfile( auth.currentUser, {
            displayName: username
        } );

        const user = auth.currentUser;
        setCurrentUser( {
            ...user
        } )
    }

    // login function
    const login = ( email, password ) => {
        const auth = getAuth();
        return signInWithEmailAndPassword( auth, email, password )
    }

    // logout function
    const logout = () => {
        const auth = getAuth();
        return signOut( auth )
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={ value }>
            { !loading && children }
        </AuthContext.Provider>
    );
}