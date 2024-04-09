import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {type Locale} from "@/i18n-config";
import DictionaryProvider from "@/context/DictionaryContext";

const inter = Inter({subsets: ["latin"]});

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
        <body className={inter.className}>
        <DictionaryProvider locale={params.lang}>
            {children}
        </DictionaryProvider>
        </body>
        </html>
    );
}
