import React, { useState } from "react";
import { Trash } from "lucide-react";
import { useCart } from "@/context/CartContext";

const BoutonSupprimerPanier: React.FC = () => {
  const { clearCart } = useCart();
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const onSupprimerPanier = () => {
    clearCart();
    setConfirmationVisible(true);

    setTimeout(() => {
      setConfirmationVisible(false);
    }, 2000);
  };

  return (
    <div>
      <button
        className="text-black p-2 rounded-full flex items-center justify-center cursor-pointer outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200 hover:bg-gray-300"
        onClick={onSupprimerPanier}
      >
        <Trash color="currentColor" size={24} />
      </button>
      {confirmationVisible && (
        <div className="mt-2 text-sm mr-12 text-red-700">
          Le panier a été vidé
        </div>
      )}
    </div>
  );
};

export default BoutonSupprimerPanier;
