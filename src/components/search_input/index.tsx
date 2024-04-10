"use client";

import { useState } from "react";
export default function SearchInput({
  onSearchName,
}: {
  onSearchName: (value: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  onSearchName(searchTerm);
  return (
    <input
      className="absolute right-0 top-6rem border border-gray-500 rounded-md bg-gray-100 px-4 py-2 mr-5 mt-7"
      type="text"
      placeholder="Rechercher un produit..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
