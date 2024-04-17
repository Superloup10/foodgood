import { NextRequest, NextResponse } from "next/server";
import { Client } from "@/domain/model/client.dto";
import bcrypt from "bcrypt";
import { ClientController } from "@/controller/client.controller";
import { ClientRepository } from "@/domain/repository/client.repository";
import { ClientService } from "@/domain/service/client.service";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log(email);
    const service = new ClientService(new ClientRepository());
    const client = await service.getClient(email);
    
    if (!client) {
      throw new Error("Invalid email or password");
    }
    const match = await bcrypt.compare(password, client.hash_password);
    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if (match) {
      // Générer un token d'authentification (exemple: JWT)
      const token = generateAuthToken(email);

      // Retourner une réponse avec le token d'authentification
      return NextResponse.json({ token });
    } else {
      // Si les informations d'identification sont incorrectes, retourner une erreur
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    // Gérer les erreurs de manière appropriée
    console.error("Error during login:", error);
    throw new Error("An unexpected error occurred");
  }
}

function generateAuthToken(email: string) {
  // Générer un token d'authentification (exemple: JWT)
  // Vous pouvez utiliser une bibliothèque comme jsonwebtoken pour cela
  const token = "your_generated_token_here";
  return token;
}
