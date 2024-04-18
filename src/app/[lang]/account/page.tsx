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
  const { isAuthenticated } = useAuth();

  // États pour gérer l'affichage des différents composants
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);
  const [showConnexionForm, setShowConnexionForm] = useState(true);

  // Fonction pour afficher le formulaire d'inscription
  const handleShowInscriptionForm = () => {
    setShowInscriptionForm(true);
    setShowConnexionForm(false);
  };

  // Fonction pour afficher le formulaire de connexion
  const handleShowConnexionForm = () => {
    setShowInscriptionForm(false);
    setShowConnexionForm(true);
  };

  // Rendu conditionnel des composants en fonction de l'authentification
  return (
    <>
      {!isAuthenticated && (
        <>
          <div>
            <div className="flex justify-center space-x-4 mt-11">
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

            <div className="flex">
              {/* Affichage du formulaire d'inscription si showInscriptionForm est true */}
              {showInscriptionForm && <FormulaireInscription />}
              {/* Affichage du formulaire de connexion si showConnexionForm est true */}
              {showConnexionForm && <FormulaireConnexion />}
              <Image
                src="/images/caddie.jpg"
                alt="chariot"
                width={500}
                height={500}
              />
            </div>
          </div>
        </>
      )}

      {/* Affichage du profil de gestion si l'utilisateur est authentifié */}
      {isAuthenticated && <ProfileManagement />}
    </>
  );
}
