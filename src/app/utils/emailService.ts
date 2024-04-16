// utils/emailService.ts

import nodemailer from 'nodemailer';

// Fonction pour envoyer un e-mail de réinitialisation du mot de passe
export const sendResetPasswordEmail = async (email: string, token: string): Promise<void> => {
  try {
    // Créer un transporteur SMTP réutilisable
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ademcheikh44@gmail.com', // Votre adresse e-mail Gmail
        pass: 'edzm jwjm aywq isky', // Votre mot de passe Gmail
      },
    });
     // Construire l'URL de réinitialisation de mot de passe avec le token
     const resetPasswordLink = `${process.env.API_URL}/reset-password?token=${token}`;
    // Envoyer l'e-mail de réinitialisation du mot de passe
    await transporter.sendMail({
      from: 'votre_email@gmail.com', // Votre adresse e-mail Gmail
      to: email, // Adresse e-mail du destinataire
      subject: 'Réinitialisation de mot de passe', // Sujet de l'e-mail
      text: `Bonjour,\n\nVous avez demandé une réinitialisation de mot de passe. Voici votre jeton de réinitialisation : ${resetPasswordLink}\n\nCordialement, Votre Application`, // Corps de l'e-mail au format texte brut
    });

    console.log(`Reset password email sent to ${email}`);
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error('Failed to send reset password email.');
  }
};
