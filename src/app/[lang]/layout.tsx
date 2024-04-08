import type {Metadata} from "next";
import {JetBrains_Mono} from "next/font/google";
import "../globals.css";
import {type Locale} from "@/i18n-config";
import DictionaryProvider from "@/context/DictionaryContext";
import Navbar from "@/components/Navbar";
import Categorie from "@/components/Categorie";
import Reseau from "@/components/Reseau";

const jetbrains = JetBrains_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Foodgood",
    description: "Notre super site marchand !",
};

export default function RootLayout({children, params}: Readonly<{
    children: React.ReactNode,
    params: { lang: Locale }
}>) {
    return (
        <html lang={params.lang}>
        <body className={jetbrains.className}>
        <DictionaryProvider locale={params.lang}>
            <Navbar/>
            <Categorie/>
            <Reseau/>
            {children}
        </DictionaryProvider>
        </body>
        </html>
    );
}
