import React, { ReactNode, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
}

interface AuthProvider {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (
        name: string,
        lastName: string,
        email: string,
        password: string
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
        signIn,
        signUp,
        getToken,
        logout
    };

    async function authenticate(token: string) {
        const response = await fetch("https://dev.juliandworzycki.pl/api/user/authenticate", {
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
        throw new Error("Authentication failed");
    }

    async function signIn(
        email: string,
        password: string
    ) {
        const response = await fetch("https://dev.juliandworzycki.pl/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
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
        password: string
    ) {
        const response = await fetch("https://dev.juliandworzycki.pl/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lastName, email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
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
