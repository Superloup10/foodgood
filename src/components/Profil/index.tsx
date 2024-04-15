"use clinet";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfileManagement() {
  const [name, setName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const { client } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 3000); // Effacer l'erreur après 3 secondes

    const successTimeout = setTimeout(() => {
      setSuccessMessage("");
    }, 3000); // Effacer le message de succès après 3 secondes

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  const handleGetClient = async () => {
    try {
      if (!email) {
        throw new Error(
          "Veuillez fournir l'adresse e-mail du client à afficher."
        );
      }

      const response = await fetch(`/api/v1/client?email=${email}`);

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setFirstName(data.first_name);
        setAddress(data.address);
        setPhone(data.phone);
      } else {
        throw new Error("La récupération du client a échoué.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const data = { name, first_name, email, address, phone };
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
      if (!email) {
        throw new Error(
          "Veuillez fournir l'adresse e-mail du client à supprimer."
        );
      } else {
        setShowConfirmation(true);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleConfirmDelete = async () => {
    if (!error) {
      try {
        if (!email) {
          throw new Error("Cet email n'existe pas.");
        }

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
      {client && (
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p className="text-lg">Nom: {client.name}</p>
          <p className="text-lg">Email: {client.email}</p>
        </div>
      )}
      <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
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
            <Button
              onClick={handleDeleteProfile}
              variant="destructive"
              className="bg-red-500"
            >
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
              <AlertDialogCancel
                onClick={handleCancelDelete}
                className="bg-[#9DC284]"
              >
                Non
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-red-500"
              >
                Oui
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
