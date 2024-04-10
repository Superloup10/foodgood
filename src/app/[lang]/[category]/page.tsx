"use client";

import Categorie from "@/components/Categorie";
import { Category } from "@/domain/model/category";
import { Product } from "@/domain/model/product.dto";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { data: products } = useFetch<Product[]>("/api/v1/products");
  type categoryString = keyof typeof Category;
  function getProductImagesByCategory(category: categoryString) {
    if (!products) return [];
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    return filteredProducts; 
  }

  const productImages = getProductImagesByCategory(
    params.category.toUpperCase() as categoryString
  );

  return (

    <><Categorie /><div className="mt-20 grid grid-cols-3 gap-4">
      {productImages.map((product) => (
        <div key={product.id} className="flex flex-col items-center">
          <Image
            src={product.image}
            className="rounded-full"
            alt={params.category.toLowerCase()}
            width={75}
            height={75} />
          <p>{product.name}</p>
          <p>{product.price}€</p>

        </div>
      ))}
    </div></>
  );
}
