// Komponenten AuthForm hanterar både inloggning och registrering beroende på tillståndet isLogin. 
// Den skickar inloggnings- eller registreringsdata till servern, hanterar svar och fel, 
// och omdirigerar användaren vid framgång.

"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth";

function AuthForm() { 

    const router = useRouter()
    const auth = useAuth()

  const [email, setEmail] = useState("alice.smith@example.com");
  const [password, setPassword] = useState("securepassword123");
  const [name, setName] = useState("");
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("")

    console.log({
        email,
        password,
        name,
        isLogin,
      });
    const url = isLogin ? "/api/auth/login" : "/api/auth/register"
    const response = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            name
        })
    })

    if(response.ok) {
        const data = await response.json();

        console.log("data", data)
        localStorage.setItem("@library/token", data.token)
        auth.setToken(data.token)
        
        router.push("/items")
        return
    }
    setError("Invalid login credentials")
  }

  return (
    <div>
      AuthForm
      <form class="form bg-black" onSubmit={handleSubmit}>
        <div class="form__group">
          <label class="form__label">Email</label>
          <input
            class="form__input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div class="form__group">
          <label class="form__label">Password</label>
          <input
            class="form__input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {!isLogin && (
          <div class="form__group">
            <label class="form__label">Name</label>
            <input
              class="form__input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {error && <p className="text-red-500">
            {error}
        </p>}
        <button class="form__button form__button--primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <p class="form__text">...or</p>
        <div class="form__group">
          <button
            class="form__button form__button--secondary"
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;