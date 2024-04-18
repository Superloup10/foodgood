import type {Metadata} from "next";
import {JetBrains_Mono} from "next/font/google";
import "../globals.css";
import {type Locale} from "@/i18n-config";
import DictionaryProvider from "@/context/DictionaryContext";
import Navbar from "@/components/Navbar";

import {AuthProvider} from "@/context/AuthContext";
import SocialMediaLinks from "@/components/Reseau";
import {CartProvider} from "@/context/CartContext";
import {ReactNode} from "react";

const jetbrains = JetBrains_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Foodgood",
    description: "Notre super site marchand !",
};

export default function RootLayout({children, params}: Readonly<{
    children: ReactNode,
    params: { lang: Locale }
}>) {
    return (
        <html lang={params.lang}>
        <body className={jetbrains.className}>
        <DictionaryProvider locale={params.lang}>
            <CartProvider>
                <AuthProvider>
                    <Navbar/>
                    <SocialMediaLinks/>
                    {children}
                </AuthProvider>
            </CartProvider>
        </DictionaryProvider>
        </body>
        </html>
    );
}
