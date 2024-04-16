"use client";
// Importations nécessaires
import React, { useState } from "react";
import FormulaireInscription from "@/components/FormulaireInscription";
import FormulaireConnexion from "@/components/FormulaireConnexion";
import ProfileManagement from "@/components/Profil";
import { useAuth } from "@/context/AuthContext";
import { useDictionary } from "@/context/DictionaryContext";
import Image from "next/image";

// Définition du composant Account
export default function Account() {
  // Utilisation des hooks pour récupérer les informations de l'utilisateur et du dictionnaire
  const { dictionary } = useDictionary();
  const { isAuthenticated, login } = useAuth();

  // États pour gérer l'affichage des différents composants
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);
  const [showConnexionForm, setShowConnexionForm] = useState(true);
  const [showProfileManagement, setShowProfileManagement] = useState(false);

  // Fonction appelée une fois que la connexion réussit
  const handleSuccessfulLogin = () => {
    login(); // Met à jour isAuthenticated après une connexion réussie
    setShowProfileManagement(true);
    setShowConnexionForm(false);
    setShowInscriptionForm(false);
  };

  // Fonction pour afficher le formulaire d'inscription
  const handleShowInscriptionForm = () => {
    setShowInscriptionForm(true);
    setShowConnexionForm(false);
    setShowProfileManagement(false);
  };

  // Fonction pour afficher le formulaire de connexion
  const handleShowConnexionForm = () => {
    setShowInscriptionForm(false);
    setShowConnexionForm(true);
    setShowProfileManagement(false);
  };

  // Rendu conditionnel des composants en fonction de l'authentification
  return (
    <>
      {!isAuthenticated && (
        <>
          <header className="flex justify-center mt-20 text-3xl">
            <h1 className="font-bold">{dictionary.account.Inscription}</h1>
          </header>
          <div>
            <div className="flex justify-center space-x-4">
              {/* Bouton pour afficher le formulaire de connexion */}
              <button
                className="bg-[#9DC284] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowConnexionForm}
              >
                Connexion
              </button>
              {/* Bouton pour afficher le formulaire d'inscription */}
              <button
                className="bg-[#9DC284] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowInscriptionForm}
              >
                Inscription
              </button>
            </div>

            <div>
              {/* Affichage du formulaire d'inscription si showInscriptionForm est true */}
              {showInscriptionForm && <FormulaireInscription />}
              {/* Affichage du formulaire de connexion si showConnexionForm est true */}
              {showConnexionForm && (
                <FormulaireConnexion
                  handleSuccessfulLogin={handleSuccessfulLogin} // Passer la fonction de connexion réussie
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Affichage du profil de gestion si l'utilisateur est authentifié */}
      {isAuthenticated && showProfileManagement && <ProfileManagement />}

      {/* Affichage de l'image */}
      <div>
        <Image
          src="/images/caddie.jpg"
          alt="chariot"
          width={500}
          height={500}
        />
      </div>
    </>
  );
}
