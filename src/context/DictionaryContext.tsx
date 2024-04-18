"use client"

import {Dictionary} from "@/domain/model/dictionary";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import defaultDictionary from "@/dictionaries/fr.json";
import {type Locale} from "@/i18n-config";

interface DictionaryProviderProps {
    children: ReactNode;
    locale: Locale;
}

interface DictionaryContextProps {
    dictionary: Dictionary;
}

const DictionaryContext = createContext<DictionaryContextProps>({dictionary: defaultDictionary});

export const useDictionary = () => {
    const context = useContext(DictionaryContext);
    if (!context) {
        throw new Error("useDictionary must be used within a DictionaryProvider");
    }
    return context;
};

export default function DictionaryProvider({children, locale}: DictionaryProviderProps) {
    const [dictionary, setDictionary] = useState<Dictionary>(defaultDictionary);
    useEffect(() => {
        const fetchDictionary = async () => {
            const loadedDictionary = await import(`@/dictionaries/${locale}.json`);
            setDictionary(loadedDictionary.default);
        };
        fetchDictionary();
    }, [locale]);
    return (
        <DictionaryContext.Provider value={{dictionary}}>{children}</DictionaryContext.Provider>
    );
}
