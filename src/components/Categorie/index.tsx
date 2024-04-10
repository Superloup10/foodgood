"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Category } from "@/domain/model/category";
import { useDictionary } from "@/context/DictionaryContext";

export default function Categorie() {
  const { dictionary } = useDictionary();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex items-center justify-center h-fit sm:gap-5 sm:p-6  ">
      {Object.values(Category).map((value, index) => (
        <Link
          key={index}
          href={`/${value.toLowerCase()}`}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={`/images/${value.toLowerCase()}.jpg`}
            className="rounded-full"
            alt={value.toLowerCase()}
            width={75}
            height={75}
          />
          <p className="flex justify-center">
            {dictionary.category[value.toLowerCase()]}
          </p>
         
        </Link>
        
      ))}
       <input
            className="absolute right-0 top-6rem border border-gray-500 rounded-md bg-gray-100 px-4 py-2 mr-10"
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
    </div>
  );
}
