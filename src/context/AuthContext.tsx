'use client'
import { Client } from '@/domain/model/client.dto';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Définition du type pour le contexte d'authentification
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  client: Client | null; // Ajoutez user au contexte d'authentification
};

// Création du contexte d'authentification avec une valeur initiale par défaut
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  client: null, // Initialisez user à null
});

// Fournisseur d'authentification qui enveloppe votre application et fournit le contexte d'authentification
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [client, setClient] = useState<Client | null>(null); // Initialisez user à null

  // Fonction pour connecter l'utilisateur
  const login = () => {
    setIsAuthenticated(true);
    const client: Client = {
      id: 0,
      name: '',
      first_name: '',
      email: 'john@example.com',
      address: '',
      phone: null
    }
    // Récupérez les informations de l'utilisateur depuis votre backend et mettez-les à jour
    setClient(client);
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
