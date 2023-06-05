import React, { ReactNode, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    nickName: string;
}

interface AuthProvider {
    user: User | null;
    registerData: { status: boolean, message?: string };
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (
        name: string,
        lastName: string,
        email: string,
        password: string,
        nickName: string
    ) => Promise<void>;
    getToken: () => string;
    logout: () => void;
}

export const AuthContext = React.createContext({} as AuthProvider);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [registerData, setRegisterData] = useState({ status: false } as { status: boolean, message?: string });

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
        logout
    };

    async function authenticate(token: string) {
        const response = await fetch("/api/user/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (response.ok) {
            console.log(response);

            const data = await response.json();

            console.log(data);


            if (data.status) {
                return data.data;
            }
        }
        throw new Error("Authentication failed");
    }

    async function signIn(
        login: string,
        password: string
    ) {
        const response = await fetch("/api/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login, password }),
        });
        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            setUser(await authenticate(data.token));
            return;
        }
        throw new Error("Authentication failed");
    }

    async function signUp(
        name: string,
        lastName: string,
        email: string,
        password: string,
        nickName: string
    ) {
        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lastName, email, password, nickName }),
        });
        if (response.ok) {
            const data = await response.json();
            setRegisterData({ status: true, message: data });
            return;
        }
        throw new Error("Authentication failed");
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
