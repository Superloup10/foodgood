// utils/tokenService.ts

import * as jose from "jose";

// Fonction pour générer un token unique
export const generateToken = async (email: string) => {
    try {
        // Générer un token JWT avec une clé secrète
        // Vous pouvez ajuster la durée de validité du token selon vos besoins
        const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
        const alg = "HS256";
        return await new jose.SignJWT({email})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setIssuer("foodgood:issuer")
        .setAudience("foodgood:audience")
        .setExpirationTime("1h")
        .sign(secret);
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate token.');
    }
};

