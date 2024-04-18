import { sendResetPasswordEmail } from "@/app/utils/emailService";
import { generateToken } from "@/app/utils/tokenService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Récupérer l'adresse e-mail de la demande de réinitialisation de mot de passe
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "Email is required." });
  }

  try {
    // Générer un token unique
    const token = await generateToken(email);
    // Envoyer un e-mail avec le lien de réinitialisation
    await sendResetPasswordEmail(email, token);
    // Stocker le token dans un cookie
    // res.setHeader("Set-Cookie", `resetToken=${token}; HttpOnly`);
    // Répondre avec succès
    return NextResponse.json(
      { message: "Reset password email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

// export async function GET(req: NextRequest, res: NextResponse) {
//   res.setHeader("Allow", ["POST"]);
//   return res.status(405).end(`Method ${req.method} Not Allowed`);
// }
