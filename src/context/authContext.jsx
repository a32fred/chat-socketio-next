import React, { createContext, useState, useEffect } from 'react';
import { setCookie, parseCookies } from "nookies"
import Router from 'next/router';
import api from '@/services/axios_api';

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

        api.defaults.headers['Authorization'] = `Bearer ${data.token}`
        setUser(username)

        Router.push('/chat')
    }

    useEffect(() => {
        const { token } = parseCookies()

        async function verifyToken() {
            const res = await api.get('https://auth-socketio.frederico-carlo.repl.co/verify').then(data =>{
                return data.username
            })

        }

        if (token) {
            try {
                verifyToken()
                    .then(user => {
                        setUser(user)
                    })
                    
            } catch (error) {
                console.error(error)
            }
        }

    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}

