import Image from "next/image";
import Link from "next/link";
export default function Reseau() {
  return (

    <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-1 mb-4">
   <div className="flex justify-center gap-1 ">
      <Link href={"https://www.facebook.com"}>
        <Image src="/image/fb.png" alt="facebokk" width={25} height={25} />
      </Link>

      <Link href={"https://www.instagram.com/"}>
        <Image src="/image/insta.png" alt="insta" width={30} height={30} />
      </Link>

      <Link href={"mailto:votre@email.com"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
      </Link>
    </div>
    </div>
 
  );
}
