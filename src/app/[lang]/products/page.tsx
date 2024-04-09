"use client";
import useFetch from "@/hooks/useFetch";
import React, {useState} from "react";
import {Product} from "@/domain/model/product.dto";
import Image from "next/image";

export default function Produits() {
    const [searchTerm, setSearchTerm] = useState("");

    const {data: products} = useFetch<Product[]>("/api/v1/products");

    const filtered = products?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="flex flex-col items-center">
            <input
                className="absolute right-0 top-6rem border border-gray-500 rounded-md bg-gray-100 px-4 py-2"
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered &&
                    filtered.map((product) => (
                        <div key={product.id} className="flex flex-col items-center">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={80}
                                height={80}
                            />
                            <p>{product.name}</p>
                            <p>{product.price}€</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
