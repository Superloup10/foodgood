"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Category } from "@/domain/model/category";
import { useDictionary } from "@/context/DictionaryContext";

export default function Categorie() {
  const { dictionary } = useDictionary();

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
    </div>
  );
}
