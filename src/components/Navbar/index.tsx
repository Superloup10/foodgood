"use client";
import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "../ui/locale-switcher";
import {useDictionary} from "@/context/DictionaryContext";
import Cart from "../Cart";

export default function Navbar() {
    const {dictionary} = useDictionary();
    return (
        <div className="bg-customGreen  p-6">
            <ul className="sm:flex justify-around items-center">
                <div className="flex gap-5 items-center">
                    <Link href={"/"}>
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            className="rounded-full"
                            width={40}
                            height={40}
                        />
                    </Link>

                    <li className="font-bold text-3xl">foodGood</li>
                </div>

                <li>
                    <Link href={"/products"} className="text-lg">
                        {dictionary.navebar.products}
                    </Link>
                </li>
                <li>
                    <Link href={"/contact"} className="text-lg">
                        {dictionary.navebar.contact}
                    </Link>
                </li>
                <Cart/>
                <div className="flex gap-5 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <Link href={"/account"}>
                        <li className="text-lg"> {dictionary.navebar.account}</li>
                    </Link>
                </div>
                <LocaleSwitcher/>
            </ul>
        </div>
    );
}
