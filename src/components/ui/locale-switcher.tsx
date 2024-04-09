"use client"

import {useParams, usePathname} from "next/navigation";
import {i18n, type Locale} from "@/i18n-config";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {FR, GB} from "country-flag-icons/react/1x1";
import {useDictionary} from "@/context/DictionaryContext";

const localeSwitch = (locale: Locale) => {
    switch (locale) {
        case "fr":
            return (
                <FR className="h-[1.2rem] w-[1.2rem]" data-testid="FR"/>
            );
        case "en":
            return (
                <GB className="h-[1.2rem] w-[1.2rem]" data-testid="EN"/>
            );
    }
};

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const lang = useParams().lang! as Locale;
    const {dictionary} = useDictionary();
    console.log("Lang : ", lang)
    const redirectedPathname = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {localeSwitch(lang)}
                    <span className="sr-only">{dictionary.sr.language}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {i18n.locales.map((locale) => (
                    <DropdownMenuItem key={locale} asChild>
                        <Link href={redirectedPathname(locale)} className="flex items-center gap-2">
                            {localeSwitch(locale)}
                            <span>{dictionary.languages[locale]}</span>
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
