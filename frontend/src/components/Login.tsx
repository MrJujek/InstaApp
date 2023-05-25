import { FormEvent, useState } from "react";
import { useAuth } from "../services/auth/context/AuthContext";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const ctx = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(JSON.stringify({
      email: email,
      password: password
    }));
    console.log("ctx", ctx);

    ctx.signIn(email, password);


    // fetch("https://dev.juliandworzycki.pl/api/user/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password
    //   })
    // })
    //   .then(response => response.json())
    //   .then((result) => {
    //     console.log("login - data back");

    //     console.log(result);

    //     if (result.token) {
    //       localStorage.setItem("token", result.token);
    //     }
    //   });
  }

  return (
    <>
      <h1>Login</h1>
      <form className="signIn" action="POST" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
        <button className="signInButton" type="submit">Sign in</button>
      </form>
    </>
  )
}

export default Login
