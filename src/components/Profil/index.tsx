"use clinet";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfileManagement() {
  const { client } = useAuth();
  const [name, setName] = useState(client ? client.name : "");
  const [first_name, setFirstName] = useState(client ? client.first_name : "");
  const [email, setEmail] = useState(client ? client.email : "");
  const [address, setAddress] = useState(client ? client.address : "");
  const [phone, setPhone] = useState(client ? client.phone : "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 5000); // Effacer l'erreur après 5 secondes

    const successTimeout = setTimeout(() => {
      setSuccessMessage("");
    }, 5000); // Effacer le message de succès après 5 secondes

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  const handleGetClient = async () => {
    try {
      if (!client) {
        throw new Error("Utilisateur non connecté.");
      }

      // Vous pouvez utiliser directement les informations du client connecté ici
      setName(client.name);
      setFirstName(client.first_name);
      setEmail(client.email);
      setAddress(client.address);
      setPhone(client.phone);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (!password) {
        throw new Error("Veuillez saisir votre mot de passe.");
      }

      // Effectuez la validation du mot de passe ici

      // Si la validation réussit, procédez à la mise à jour du profil

      const data = { name, first_name, email, address, phone, password };
      const updateResponse = await fetch(`/api/v1/client`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (updateResponse.ok) {
        setSuccessMessage("Client modifié avec succès !");
      } else {
        throw new Error("La modification du client a échoué.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteProfile = () => {
    try {
      if (!password) {
        throw new Error("Veuillez saisir votre mot de passe.");
      }

      // Effectuez la validation du mot de passe ici

      // Si la validation réussit, procédez à la suppression du profil

      setShowConfirmation(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!password) {
        throw new Error("Veuillez saisir votre mot de passe.");
      }

      // Effectuez la validation du mot de passe ici

      // Si la validation réussit, procédez à la suppression du profil

      const response = await fetch(`/api/v1/client`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setSuccessMessage("Profil supprimé avec succès !");
        setName("");
        setFirstName("");
        setEmail("");
        setAddress("");
        setPhone("");
      } else {
        throw new Error("La suppression du profil a échoué.");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <h1 className="text-2xl font-bold mt-4 mb-2">Profil utilisateur</h1>
      <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            Prénom:
          </label>
          <input
            id="first_name"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Adresse:
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Téléphone:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe :
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
      </form>
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleGetClient} className="bg-[#9DC284]">
          Afficher
        </Button>
        <Button onClick={handleUpdateProfile} className="bg-[#9DC284]">
          Mettre à jour
        </Button>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button onClick={handleDeleteProfile} variant="destructive" className="bg-red-500">
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer votre compte ?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete} className="bg-[#9DC284]">
                Non
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500">
                Oui
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
