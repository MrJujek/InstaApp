import { FormEvent, useState } from "react";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(JSON.stringify({
      email: email,
      password: password
    }));


    fetch("https://dev.juliandworzycki.pl/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then((result) => {
        console.log("XXXXXXXXXXX");

        console.log(result);
      });
  }

  return (
    <>
      <h1>LOGIN</h1>
      <form action="POST" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
        <input className="" type="submit" value="Login" />
      </form>
    </>
  )
}

export default Login
