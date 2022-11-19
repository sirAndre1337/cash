import { createContext, ReactNode, useState, useEffect } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Router from "next/router";
import axios from "axios";
import { api } from "../services/api";
import { toast } from "react-toastify";

type User = {
    id: number
    username: string
}

interface IAuthProvider {
    children: ReactNode
}

interface IAuthContext {
    user: User | null;
    signIn: (data: ISignData) => Promise<void>;
    signUp: (data: ISignData) => Promise<void>;
    logOut: () => void;
}

interface ISignData {
    username: string;
    password: string;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: IAuthProvider) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const { token } = parseCookies();

        if (token) {
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            api.get('/recoverUserInformation')
                .then(res => {
                    setUser(res.data.user)
                })
                .catch(err => {
                    destroyCookie(undefined, 'token')
                    toast.error(err.response.message)
                    Router.push('/');
                })
        }
    }, [])


    async function signIn({ username, password }: ISignData) {

        await axios.post('http://localhost:3001/login', {
            username,
            password
        }).then((res) => {
            const token = res.data.token;

            setCookie(undefined, 'token', token, {
                maxAge: 1000 * 60 * 60 * 24, // 24 horas
            })

            setUser(res.data.user);

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            Router.push('/');
        })
    }

    async function signUp({ username, password }: ISignData) {
        await axios.post('http://localhost:3001/users', {
            username,
            password
        }).then(() => signIn({ username, password }))
    }

    async function logOut() {
        destroyCookie(undefined, 'token');
        setUser(null);
        Router.push('/authenticated');
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}