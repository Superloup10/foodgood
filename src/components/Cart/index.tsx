"use client";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import { SheetTrigger, SheetContent, Sheet } from "../ui/sheet";

import BoutonAjouterPanier from "../BoutonAjouterPanier";
import BoutonSupprimerProduit from "../BoutonSupprimerProduit";
import BoutonSupprimerPanier from "../BouttonSupprimerPanier";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();

  const validateCart = () => {
    if (cart && cart.length > 0) {
      router.push("/cart");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-screen">
        <div className="   flex-1 overflow-auto p-4 bg-cadie bg-contain bg-no-repeat bg-center  ">
          <h1 className="flex justify-center font-bold text-2xl bg-customGreen border-4 border-transparent shadow-[2px_2px_0_1px] rounded-lg">
            MON PANIER
          </h1>
          <div className="flex-1 mt-5 overflow-y-auto">
            {cart &&
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="mb-4 flex items-center justify-between"
                >
                  <div className="font-bold text-lg">
                    {item.quantity} x {item.product.name}{" "}
                    {(item.quantity * item.product.price).toFixed(2)}€
                  </div>
                  <div className="flex gap-2">
                    <BoutonSupprimerProduit product={item.product} />
                    <BoutonAjouterPanier product={item.product} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="p-4 bg-white">
          <p className="font-bold">Total : {totalPrice.toFixed(2)}€</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={validateCart}>Valider mon panier</Button>
          <BoutonSupprimerPanier />
        </div>
      </SheetContent>
    </Sheet>
  );
}
