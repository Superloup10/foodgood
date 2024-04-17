"use client";

import BoutonAjouterPanier from "@/components/BoutonAjouterPanier";
import Categorie from "@/components/Categorie";
import {Category} from "@/domain/model/category";
import {Product} from "@/domain/model/product.dto";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage({params}: { params: { category: string }; }) {
    const {data: products} = useFetch<Product[]>("/api/v1/products");
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
        <>
            <Categorie/>
            <div className="mt-20 grid grid-cols-3 gap-4">
                {productImages.map((product) => (
                    <div key={product.id} className="flex flex-col items-center relative">
                        <div className="relative cursor-pointer">
                            <Link href={`/product/${product.name}`}>
                                <Image
                                    src={product.image}
                                    alt={params.category.toLowerCase()}
                                    width={100}
                                    height={100}
                                />
                            </Link>
                            <BoutonAjouterPanier
                                classeBouton="absolute bottom-0 right-0 bg-customGreen hover: text-black ml-15"
                                product={product}/>
                        </div>

                        <p>{product.name}</p>
                        <p>{product.price}€</p>
                    </div>
                ))}
            </div>
        </>
    );
}
