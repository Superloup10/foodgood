"use client";
import useFetch from "@/hooks/useFetch";
import React, { useState } from "react";
import { Product } from "@/domain/model/product.dto";
import Image from "next/image";
import Categorie from "@/components/Categorie";
import Link from "next/link";
import Bouton from "@/components/bouton_recherche";
import BoutonAjouterPanier from "@/components/BoutonAjouterPanier";

export default function Produits() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products } = useFetch<Product[]>("/api/v1/products");

  const filtered = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <header>
        <Bouton onSearchName={(value) => setSearchTerm(value)} />
        <Categorie />
      </header>
      <div className="flex flex-col items-center mt-11">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {filtered &&
            filtered.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="relative cursor-pointer">
                  <Link href={`/product/${product.name}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                    />
                  </Link>
                  <BoutonAjouterPanier
                    classeBouton="absolute bottom-0 right-0 bg-customGreen hover: text-black ml-15"
                    product={product}
                  />
                </div>

                <p>{product.name}</p>
                <p>{product.price}€</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
