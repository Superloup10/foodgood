"use client"
import Formulaire from "@/components/Formulaire";
import { useDictionary } from "@/context/DictionaryContext";
import Image from "next/image";

export default function Account() {
  const { dictionary } = useDictionary();
  return (
  
    <>
      <header className="flex justify-center mt-20 text-3xl ">
          <h1 className="font-bold "> {dictionary.account.signup}</h1>
        </header>
      <div className="flex justify-between mt-11">
      
      <Formulaire />
        <Image src="/images/caddie.jpg" alt="chariot" width={500} height={500} />
      </div>
      
    </>
  );
}
