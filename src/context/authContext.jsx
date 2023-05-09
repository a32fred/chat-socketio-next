import React, { createContext, useState } from 'react';
import { setCookie } from "nookies"
import Router from 'next/router';
import api from '@/pages/api/axios_api';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState("")

    const isAuthenticated = !!user

    async function singIn({ username, password }) {

        const { data } = await api.post("/login", {
            username,
            password,
        });
        setCookie(undefined, 'token', data.token, {
            maxAge: 60 * 60 * 1, // 60 minutes   
            sameSite: 'lax'  
        });
        
        setUser(username)
        console.log(user)
        
        Router.push('/chat')    
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}

