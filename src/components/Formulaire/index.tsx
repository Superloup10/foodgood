"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/context/DictionaryContext";

export default function ClientForm() {
  const [name, setName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false); // Nouvel état pour contrôler l'affichage de l'erreur
  const [showSuccess, setShowSuccess] = useState(false); // Nouvel état pour contrôler l'affichage du message de succès
  const { dictionary } = useDictionary();
  const handleAddClient = async (e: any) => {
    e.preventDefault();
    try {
      const data = { name, first_name, email, address, phone };
      const addResponse = await fetch("/api/v1/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (addResponse.ok) {
        setSuccessMessage("Client ajouté avec succès !");
        setShowSuccess(true); // Afficher le message de succès
        setShowError(false); // Cacher le message d'erreur
        setName("");
        setFirstName("");
        setEmail("");
        setAddress("");
        setPhone("");
      } else {
        throw new Error("L'ajout du client a échoué.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
      setShowError(true); // Afficher le message d'erreur
      setShowSuccess(false); // Cacher le message de succès
    }
  };

  return (
   
    
    <div className="container mx-auto px-4 flex flex-col items-center">
      {showError && <p className="text-red-500">{error}</p>}
      {showSuccess && <p className="text-green-500">{successMessage}</p>}
      <form className="mt-8 space-y-6" onSubmit={handleAddClient} method="POST">
      <div>
          <label
            htmlFor="name"
            className="block text-sm font-custom text-gray-700 "
          >
            {dictionary.account.name} :
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284] shadow-sm sm:text-sm border-gray-500  border"
          />
        </div>
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            {dictionary.account.first_name} :
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={first_name}
            required
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284]  shadow-sm sm:text-sm border-gray-500 border"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {dictionary.account.email}:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284]   shadow-sm sm:text-sm border-gray-500  border"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            {dictionary.account.address}:
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284]   shadow-sm sm:text-sm border-gray-500  border"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            {dictionary.account.phone}:
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 focus:border-[#9DC284] bg-[#9DC284]   shadow-sm sm:text-sm border-gray-500  border"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" className="bg-[#9DC284]">{dictionary.account.submit}</Button>
        </div>
      </form>
    </div>
  );
}

