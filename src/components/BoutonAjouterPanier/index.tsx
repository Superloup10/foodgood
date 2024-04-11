import React from 'react';
import { PlusCircle } from 'lucide-react';


interface BoutonAjouterPanierProps {
  onAjouter: () => void;
  classeBouton?: string;
  couleurIcone?: string;
}

const BoutonAjouterPanier: React.FC<BoutonAjouterPanierProps> = ({ 
  onAjouter,
  classeBouton = "bg-gray-200 hover:bg-gray-300",
  couleurIcone = "currentColor", 

 }) => {

  return (
    <button
    className={`text-black p-2 rounded-full flex items-center justify-center cursor-pointer outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${classeBouton}`}
      onClick={onAjouter}
      
    >
      <PlusCircle color={couleurIcone} size={15} />
    </button>
  );
};

export default BoutonAjouterPanier;

