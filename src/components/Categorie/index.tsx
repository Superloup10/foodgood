import { Category } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export default function Categorie(){

  return(
    <div className="flex items-center justify-center h-fit sm:gap-5 sm:p-6  ">
        {Object.values(Category).map((value, index) => (
          <Link href={`/${value.toLowerCase()}`} className="flex flex-col items-center justify-center">
            <Image
              key={index}
              src={`/image/${value.toLowerCase().replace(" ", "_")}.jpg`}
              className="rounded-full"
              alt={value.toLowerCase()}
              width={75}
              height={75}
            />
            <p className="flex justify-center">{value.toLowerCase()}</p>
          </Link>
        ))}
      </div>

  )
}