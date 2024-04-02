"use client";
import { Product } from "@/domain/model/product.dto";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";

export default function Home() {
  const { data: products } = useFetch<Product[]>("/api/v1/products");
  console.log("Products = ", products);
  return (
    <main>
      <div>
        {products &&
          products.map((product) => (
            <>
              <Image
                key={product.id}
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
              />
              <p>{product.name}</p>
              {product.price}€
            </>
          ))}
      </div>
    </main>
  );
}
