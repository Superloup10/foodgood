import Image from "next/image";
import Link from "next/link";

export default function SocialMediaLinks() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center      ">
      <div className="flex justify-center  ">
        <Link href={"https://www.facebook.com"}>
          <div >
            <Image src="/images/fb.png" alt="facebokk" width={24} height={24} />
          </div>
        </Link>

        <Link
          href={"https://www.instagram.com/"}
          className="flex items-center justify-center"
        >
          <div >
            {" "}
            <Image src="/images/insta.png" alt="insta" width={24} height={24} />
          </div>
        </Link>

        <Link
          href={"mailto:votre@email.com"}
          className="flex items-center justify-center"
        >
          <div >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
