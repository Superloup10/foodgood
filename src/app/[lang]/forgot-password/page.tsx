'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Envoyer une requête au backend pour réinitialiser le mot de passe avec l'e-mail
      const response = await fetch('/api/v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Afficher un message indiquant que l'e-mail a été envoyé avec succès
        console.log('Email envoyé avec succès');
      } else {
        // Afficher un message d'erreur si l'envoi de l'e-mail a échoué
        console.error('Erreur lors de l\'envoi de l\'e-mail');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-4 mb-2">Mot de passe oublié</h1>
      <p className="mt-4 mb-2">Entrez votre adresse e-mail pour réinitialiser votre mot de passe.</p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email :
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" className="bg-[#9DC284]">Envoyer</Button>
        </div>
      </form>
      <div className="mt-4">
        <Button /* onClick={handleBack} */ className="bg-red-500">Retour</Button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
