"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/domain/model/category";
import useFetch from "@/hooks/useFetch";
import { Product } from "@/domain/model/product.dto";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Reseau from "@/components/Reseau";

export default function Home() {
  const { data: products } = useFetch<Product[]>("/api/v1/products");
  function getProduitsAleatoires(): Product[] {
    const produitAleatoires: Product[] = [];
    const nombreProduits = products!.length;
    while (produitAleatoires.length < 30) {
      const index = Math.floor(Math.random() * nombreProduits);
      if (!produitAleatoires.includes(products![index])) {
        produitAleatoires.push(products![index]);
      }
    }
    return produitAleatoires;
  }

  return (
    <main className="px-10 ">
      

      <div className="flex justify-justify-between gap-96">
        <div className="  mt-36">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            plugins={[
              Autoplay({
                delay: 1000,
              }),
            ]}
          >
            <CarouselContent className="-ml-4 flex items-center">
              {products &&
                getProduitsAleatoires().map((product) => (
                  <CarouselItem key={product.id} className="pl-4 basis-1/5">
                    <Link href={`/product/${product.name}`}>
                    <Image
                      
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={1}
                    />
                    </Link>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="mt-5">
          
          <Image
            src="/image/caddie.jpg"
            alt="chariot"
            width={3000}
            height={1}
          />
        </div>
      </div>
      <Reseau/>
    </main>
  );
}
