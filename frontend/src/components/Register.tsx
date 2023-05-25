import { FormEvent, useState } from "react";
import { useAuth } from "../services/auth/context/AuthContext";

function Register() {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const ctx = useAuth();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        ctx.signUp(name, lastName, email, password);

        // fetch("https://dev.juliandworzycki.pl/api/user/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         name: name,
        //         lastName: lastName,
        //         email: email,
        //         password: password
        //     })
        // })
        //     .then(response => response.json())
        //     .then((result) => {
        //         console.log("register - data back");

        //         console.log(result);
        //     });
    }

    return (
        <>
            <h1>Register</h1>
            <form className="signUp" action="POST" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" onChange={(e) => { setLastName(e.target.value) }} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor="password">Passowrd:</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />

                <button className="signInButton" type="submit">Sign up</button>
            </form>
        </>
    )
}

export default Register
