import React, { useState } from "react";
import { Trash } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/domain/model/product.dto";

interface BoutonSupprimerPanierProps {
  product: Product;
  classeBouton?: string;
  couleurIcone?: string;
}

const BoutonSupprimerPanier: React.FC<BoutonSupprimerPanierProps> = ({
  product,
  classeBouton = "bg-gray-200 hover:bg-gray-300",
  couleurIcone = "currentColor",
}) => {
  const { removeFromCart } = useCart();
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const onSupprimer = () => {
    removeFromCart(product.id);
    setConfirmationVisible(true);

    setTimeout(() => {
      setConfirmationVisible(false);
    }, 2000);
  };

  return (
    <div>
      <button
        className={`text-black p-2 rounded-full flex items-center justify-center cursor-pointer outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${classeBouton}`}
        onClick={onSupprimer}
      >
        <Trash color={couleurIcone} size={15} />
      </button>
      {confirmationVisible && (
        <div className="mt-2 text-sm mr-12 text-red-700">
          Le produit a été supprimé
        </div>
      )}
    </div>
  );
};

export default BoutonSupprimerPanier;
