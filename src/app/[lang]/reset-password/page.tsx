"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ResetPasswordPage = () => {
  // États pour stocker les valeurs des champs de saisie
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  // Fonction pour mettre à jour le profil de l'utilisateur avec le nouveau mot de passe
  const handleUpdateProfile = async () => {
    try {
      if (!password) {
        throw new Error("Veuillez saisir votre mot de passe.");
      }

      // Effectuez la validation du mot de passe ici

      // Si la validation réussit, procédez à la mise à jour du profil

      const data = {password };
      const updateResponse = await fetch(`/api/v1/client`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (updateResponse.ok) {
        setSuccessMessage("mot de passe modifié avec succès !");
      } else {
        throw new Error("La modification du mot de passe a échoué.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };


  // Gestion de la soumission du formulaire
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Appel à la fonction pour mettre à jour le profil avec le nouveau mot de passe
    await handleUpdateProfile();
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-4 mb-2">Réinitialiser le mot de passe</h1>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Nouveau mot de passe :
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmer le mot de passe :
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" className="bg-[#9DC284]">Réinitialiser</Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
