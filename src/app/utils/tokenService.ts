// utils/tokenService.ts

import jwt from 'jsonwebtoken';

// Fonction pour générer un token unique
export const generateToken = (): string => {
  try {
    // Générer un token JWT avec une clé secrète
    const token = jwt.sign({}, 'votre_clé_secrète', { expiresIn: '1h' }); // Vous pouvez ajuster la durée de validité du token selon vos besoins
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token.');
  }
};

