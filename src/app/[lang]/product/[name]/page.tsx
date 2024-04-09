"use client";
import {Product} from "@/domain/model/product.dto";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";

export default function ProductPage({params}: { params: { name: string } }) {
    const {data: product} = useFetch<Product>(`/api/v1/product?name=${params.name}`);
    return (
        <div>
            {product && (
                <>
                    <Image
                        key={product.id}
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={1}
                    />
                    <div className="text-lg text-black  ml-12 p-5 "><p>{product.name}</p>
                        {product.price}€
                    </div>

                </>
            )}
        </div>
    );
}
