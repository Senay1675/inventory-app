// Komponenten AuthForm hanterar både inloggning och registrering beroende på tillståndet isLogin.
// Den skickar inloggnings- eller registreringsdata till servern, hanterar svar och fel,
// och omdirigerar användaren vid framgång.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function AuthForm() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("alice.smith@example.com");
  const [password, setPassword] = useState("securepassword123");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Rensar eventuellt tidigare fel

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: !isLogin ? name : undefined, // Namn behövs bara för registrering
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Hantera fel från backend
        if (data.error.includes("email")) {
          setError("Invalid email format or email already exists");
        } else if (data.error.includes("password")) {
          setError("Password is too weak or incorrect");
        } else if (data.error.includes("name")) {
          setError("Name is required for registration or already exists");
        } else {
          setError("Something went wrong. Please try again.");
        }
        return;
      }

      // Om inloggning/registrering lyckades
      localStorage.setItem("@library/token", data.token);
      auth.setToken(data.token);
      router.push("/items");
    } catch (err) {
      // Hantera nätverksfel eller oväntade fel
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div>
      <form className="form bg-black" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* Visar felmeddelanden */}
        {error && <p className="text-red-500">{error}</p>}

        <button className="form__button form__button--primary">
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="form__text">...or</p>

        <div className="form__group">
          <button
            className="form__button form__button--secondary"
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
