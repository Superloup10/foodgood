"use client"
import useFetch from '@/hooks/useFetch';
import React from 'react'
import { Product } from '@/domain/model/product.dto';
import Image from 'next/image';

export default function Produits() {
  const { data: products } = useFetch<Product[]>("/api/v1/products");
  console.log("Products = ", products)

  return (

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
      <p>nos produits</p>
    </div>
  )
}
