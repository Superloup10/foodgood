"use client";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/domain/model/product.dto";

interface BoutonAjouterPanierProps {
  product: Product;
  classeBouton?: string;
  couleurIcone?: string;
}

const BoutonAjouterPanier: React.FC<BoutonAjouterPanierProps> = ({
  product,
  classeBouton = "bg-gray-200 hover:bg-gray-300",
  couleurIcone = "currentColor",
}) => {
  const { addToCart } = useCart();
  const [messageVisible, setMessageVisible] = useState(false);
  const onAjouter = () => {
    addToCart(product);
    setMessageVisible(true);

    setTimeout(() => {
      setMessageVisible(false);
    }, 2000);
  };
  return (
    <div>
      <button
        className={`text-black p-2 rounded-full flex items-center justify-center cursor-pointer outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${classeBouton}`}
        onClick={onAjouter}
      >
        <PlusCircle color={couleurIcone} size={15} />
      </button>
      {messageVisible && (
        <div className="mt-2 text-sm mr-12 text-green-700">
          Le produit a bien été rajouté
        </div>
      )}
    </div>
  );
};

export default BoutonAjouterPanier;
