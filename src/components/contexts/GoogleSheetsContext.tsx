import React, {createContext, useContext, useEffect, useState} from 'react';

export const GoogleSheetsContext = createContext<GoogleSheetsContextType | undefined>(undefined);

export type GoogleSheetsContextType = {
    moviesData: (sheetId: string, range: string) => object[];
};

export const GoogleSheetsProvider = ({children}: { children: React.ReactNode }) => {

    const moviesData = (sheetId?: string, range?: string) => {
        return [{id: 0, name: sheetId, rating: range}, {id: 1, name: "test", rating: "great"}, {id: 2, name: "test2", rating: "good"}]
    };

    return (
        <GoogleSheetsContext.Provider value={{moviesData}}>
            {children}
        </GoogleSheetsContext.Provider>
    )
}

export const useGoogleSheets = () => {
    const context = useContext(GoogleSheetsContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context;
}