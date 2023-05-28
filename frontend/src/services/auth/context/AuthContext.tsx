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
                console.log("no user");

                setLoading(false);
                return;
            }
            // const token = JSON.parse(user);
            try {
                setUser(await authenticate(user));
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        loadUserFromLocalStorage();
    }, []);

    useEffect(() => {
        console.log("XXXXXXXuser", user);
    }, [user]);

    const value = {
        user,
        signIn,
        signUp,
        getToken,
    };

    async function authenticate(token: string) {
        console.log("authenticate");
        console.log(token);


        const response = await fetch("https://dev.juliandworzycki.pl/api/user/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("YYYYdata", data);

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
        console.log("signIn");

        const response = await fetch("https://dev.juliandworzycki.pl/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("signIn - data", data);
            console.log(data.token);

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
        const user = localStorage.getItem("token");
        if (!user) {
            return null;
        }
        return JSON.parse(user);
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
