'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Client } from '@/domain/model/client.dto';

// Définition du type pour le contexte d'authentification
type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  client: Client | null; // Ajoutez user au contexte d'authentification
};

// Création du contexte d'authentification avec une valeur initiale par défaut
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: (email: string) => {},
  logout: () => {},
  client: null, // Initialisez user à null
});

// Fournisseur d'authentification qui enveloppe votre application et fournit le contexte d'authentification
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [client, setClient] = useState<Client | null>(null); // Initialisez user à null

  // Fonction pour connecter l'utilisateur
  const login = async (email: string) => {
    try {
      setIsAuthenticated(true);
      // Faites une requête au backend pour récupérer les informations du client connecté
      const response = await fetch(`/api/v1/client?email=${email}`);
      if (response.ok) {
        const clientData = await response.json();
        setClient(clientData); // Mettez à jour les informations du client avec les données récupérées
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsAuthenticated(false);
      setClient(null);
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setIsAuthenticated(false);
    setClient(null); // Remettez user à null lors de la déconnexion
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, client }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);
