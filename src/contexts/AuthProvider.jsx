import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth } from '../services/firebase';
import useAxios from '../hooks/useAxios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const axios = useAxios();

    const refreshPremiumStatus = async (email = null) => {
        try {
            const targetEmail = email || user?.email;
            if (!targetEmail) return;

            const res = await axios.get(`/users/${targetEmail}/premium-status`);
            setIsPremium(res.data.isPremium);
        } catch (err) {
            console.error('Failed to refresh premium status:', err);
            setIsPremium(false);
        }
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profileInfo) => {
        return updateProfile(auth.currentUser, profileInfo);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                const { email, displayName: name, photoURL: photo } = currentUser;

                try {
                    const tokenRes = await axios.post('/jwt', { email, name, photo });
                    localStorage.setItem('access-token', tokenRes.data.token);

                    await refreshPremiumStatus(email);
                } catch (err) {
                    console.error('Error getting token or premium status:', err);
                }
            } else {
                localStorage.removeItem('access-token');
                setIsPremium(false);
            }
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        isPremium,
        createUser,
        updateUserProfile,
        signIn,
        signInWithGoogle,
        logOut,
        refreshPremiumStatus
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
