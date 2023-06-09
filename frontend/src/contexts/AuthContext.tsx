import React, { ReactNode, useContext, useEffect, useState } from "react";
import UrlContext from "./UrlContext";

interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    nickName: string;
}

interface SignInData {
    logged: boolean;
    message?: string;
    token?: string;
}

interface SignUpData {
    status: boolean;
    data: {
        registered: boolean;
        message?: string;
        link?: string;
    };
}

interface AuthProvider {
    user: User | null;
    registerData: SignUpData;
    signIn: (email: string, password: string) => Promise<SignInData>;
    signUp: (
        name: string,
        lastName: string,
        email: string,
        password: string,
        nickName: string
    ) => Promise<{ status: boolean, data?: string }>;
    getToken: () => string;
    logout: () => void;
    setRegisterData: React.Dispatch<React.SetStateAction<SignUpData>>;
}

export const AuthContext = React.createContext({} as AuthProvider);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const { url } = useContext(UrlContext);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [registerData, setRegisterData] = useState({ status: false } as SignUpData);

    useEffect(() => {
        async function loadUserFromLocalStorage() {
            const user = localStorage.getItem("token");

            if (!user) {
                setLoading(false);
                return;
            }
            try {
                setUser(await authenticate(user));
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        loadUserFromLocalStorage();
    }, []);

    const value = {
        user,
        registerData,
        signIn,
        signUp,
        getToken,
        logout,
        setRegisterData
    };

    async function authenticate(token: string) {
        const response = await fetch(url + "/user/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (response.ok) {
            const data = await response.json();

            if (data.status) {
                return data.data;
            }
        }
        return "Authentication failed";
    }

    async function signIn(login: string, password: string) {
        const response = await fetch(url + "/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login, password }),
        });
        if (response.ok) {
            const data = await response.json() as SignInData;

            localStorage.setItem("token", data.token!);
            setUser(await authenticate(data.token!));
            console.log(data);

            return data;
        }
        return { logged: false, message: "Authentication failed" } as SignInData;
    }

    async function signUp(
        name: string,
        lastName: string,
        email: string,
        password: string,
        nickName: string
    ) {
        const response = await fetch(url + "/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lastName, email, password, nickName }),
        });
        if (response.ok) {
            const data = await response.json();
            setRegisterData({ status: true, data: data });
            return { status: true, data: data };
        }
        return { status: false, data: "Registration failed!" };
    }

    function getToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        return JSON.parse(token);
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
