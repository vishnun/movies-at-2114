const USER_ENTERED_SECRET_LOCAL_STORAGE_KEY = 'userEnteredSecret';
const PROFILE_LOCAL_STORAGE_KEY = 'profileAuthInfo';
const USER_LOCAL_STORAGE_KEY = 'userAuthInfo'; // Key to store authentication info in localStorage

export const saveUserEnteredPasscode = (inputValue: string) => {
    return localStorage.setItem(USER_ENTERED_SECRET_LOCAL_STORAGE_KEY, inputValue);
};
export const getUserEnteredPasscode = () => {
    return localStorage.getItem(USER_ENTERED_SECRET_LOCAL_STORAGE_KEY);
};
export const clearUserEnteredPasscode = () => {
    return localStorage.removeItem(USER_ENTERED_SECRET_LOCAL_STORAGE_KEY);
};

export const saveProfileInfo = (profileData: any) => {
    return localStorage.setItem(PROFILE_LOCAL_STORAGE_KEY, JSON.stringify(profileData));
}

export const getProfileInfo = () => {
    return localStorage.getItem(PROFILE_LOCAL_STORAGE_KEY);
};
export const clearProfileInfo = () => {
    return localStorage.removeItem(PROFILE_LOCAL_STORAGE_KEY);
};

export const saveUserAuthInfo = (isAuthenticated: boolean, userData?: { user: any }) => {
    const authInfo = {isAuthenticated, userData};
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(authInfo));
}

export const getUserAuthInfo = () => {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY);
}

export const clearUserAuthInfo = () => {
    return localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}