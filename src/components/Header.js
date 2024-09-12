
// Komponenten Header visar antingen en "Login"-knapp eller en "Logout"-knapp beroende på om användaren är inloggad.
// auth.token används för att avgöra användarens inloggningsstatus.
// auth.logout kallas för att logga ut användaren och rensa deras token när utloggningslänken klickas.

"use client";
import { useAuth } from "@/context/auth";

import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4">
      <h1 className="text-3xl font-bold text-white">Inventory App</h1>
      {auth.token ? (
        <Link
          href="/"
          onClick={auth.logout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </Link>
      ) : (
        <Link
          href="/"
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Login
        </Link>
      )}
    </header>
  );
}
export default Header;