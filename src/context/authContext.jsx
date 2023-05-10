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

        setUser(username)
        console.log(user)

        Router.push('/chat')
    }

    useEffect(() => {
        const { token } = parseCookies()

        async function verifyToken() {
            const res = await fetch('https://auth-socketio.frederico-carlo.repl.co/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();             
                return data.username
            } else {
                console.error('Erro ao verificar token');
            }
        }

        if (token) {
            try {
                verifyToken().then(user => setUser(user))               
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

