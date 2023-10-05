import React, {createContext, useContext, useEffect, useState} from 'react';
import {googleLogout, TokenResponse, useGoogleLogin} from '@react-oauth/google';
import {
    clearProfileInfo,
    clearUserAuthInfo,
    clearUserEnteredPasscode,
    getProfileInfo,
    getUserAuthInfo,
    saveProfileInfo,
    saveUserAuthInfo
} from "../modules/LocalStorageManager";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type UserProfile = {
    picture: string;
    name: string;
    email: string;
    // Add other profile properties if needed
};

export type AuthContextType = {
    authenticated: boolean;
    user: any | null;
    profile: UserProfile | null;
    signIn: () => void;
    signOut: () => void;
};

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null); // Define UserType as needed

    const [profile, setProfile] = useState<UserProfile | null>(null);

    // Load authentication info from localStorage on component initialization
    useEffect(() => {
        const savedUserAuthInfo = getUserAuthInfo();
        let isAuthenticated, userData;
        if (savedUserAuthInfo) {
            const parsedAuthInfo = JSON.parse(savedUserAuthInfo);
            isAuthenticated = parsedAuthInfo.isAuthenticated;
            userData = parsedAuthInfo.userData;

            if (isAuthenticated) {
                setAuthenticated(true);
                setUser(userData.user);
                gapi?.client?.setToken(userData.user);
            }
        }

        const savedProfileAuthInfo = getProfileInfo();
        if (isAuthenticated && savedProfileAuthInfo) {
            const parsedAuthInfo = JSON.parse(savedProfileAuthInfo);
            const profileData = parsedAuthInfo.profileData;
            setProfile(profileData.profile);
        }
    }, [authenticated]);

    // Function to save authentication info to localStorage
    const saveUserAuthInfoToStorage = (
        isAuthenticated: boolean,
        userData?: { user: any }
    ) => {
        saveUserAuthInfo(isAuthenticated, userData);
    };

    // Function to save authentication info to localStorage
    const saveProfileAuthInfoToStorage = (
        profileData?: { profile: UserProfile }
    ) => {
        saveProfileInfo({profileData});
    };

    const fetchUserProfile = async () => {
        if (!gapi?.client) {
            return;
        }

        try {
            const token = gapi?.client?.getToken()

            if (token !== null) {
                // Fetch user profile data using the access token
                const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data as UserProfile);
                    saveProfileAuthInfoToStorage({profile: data as UserProfile});
                }
            }
        } catch (error) {
            // Handle any errors that occur during profile data fetch
            console.error('Error fetching user profile:', error);
        }
    };

    const onSuccess = (codeResponse: Omit<TokenResponse, "error">) => {
        setUser(codeResponse);
        setAuthenticated(true);
        saveUserAuthInfoToStorage(true, {user: codeResponse});
        fetchUserProfile().then(r => void 0);
    };

    const onError = (error: Pick<TokenResponse, "error">) => {
        // Handle login error, if needed
        console.log('Login Failed:', error);
    };

    const googleSignInScopes = [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets.readonly',
    ];

    const signIn = useGoogleLogin({
        onSuccess,
        onError,
        scope: googleSignInScopes.join(' '),
    });

    const signOut = () => {
        clearUserAuthInfo()
        clearUserEnteredPasscode();
        clearProfileInfo();

        const token = gapi?.client?.getToken();

        if (token !== null) {
            // google.accounts.oauth2.revoke(token.access_token, () => void 0);
            gapi?.client?.setToken(null);
        }

        googleLogout();
        setAuthenticated(false);
        setProfile(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{authenticated, user, profile, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context;
}