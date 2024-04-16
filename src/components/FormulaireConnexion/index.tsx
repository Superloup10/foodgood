"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useDictionary } from "@/context/DictionaryContext";
import Link from "next/link"; // Importez Link pour gérer les redirections

interface Props {
  handleSuccessfulLogin: () => void;
}

export default function FormulaireConnexion({ handleSuccessfulLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const { dictionary } = useDictionary();

  const handleConnexion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const loginResponse = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (loginResponse.ok) {
        setShowError(false);
        handleSuccessfulLogin();
      } else {
        throw new Error("Échec de la connexion.");
      }
    } catch (error) {
      setError("Une erreur inconnue s'est produite.");
      setShowError(true);
    }
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      {showError && <p className="text-red-500">{error}</p>}
      <form className="mt-8 space-y-6" onSubmit={handleConnexion} method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {dictionary.account.Email}:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            {dictionary.account.password}Mot de Passe:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" className="bg-[#9DC284]">
            {dictionary.account.login}
          </Button>
          {/* Utilisez un composant Link pour rediriger vers la page forgot-password */}
          <Link href="/forgot-password">
            <span className="text-[#9DC284] hover:underline">
              Mot de passe oublié ?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
