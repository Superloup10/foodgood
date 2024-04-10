import Reseau from "@/components/Reseau";
import Image from "next/image";

export default function Contact() {
    return (
        <>
            <div>
                
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <p className="max-w-md mb-4 md:mr-4 md:mb-0 ml-4 text-lg text-black">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
                        consequuntur corporis qui, illum quo non, voluptatibus, aspernatur
                        vero consectetur minima harum perferendis placeat reiciendis quis ab
                        suscipit. Nihil, odio vero. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Reiciendis laboriosam molestias consequatur error,
                        hic aspernatur maiores, ut cum nostrum tempora explicabo eaque.
                        Illum, nostrum cupiditate aperiam fugit quidem quod nesciunt.
                    </p>
                    <Image
                        src="/images/caddie.jpg"
                        alt="chariot"
                        className="md:w-1/1"
                        width={400}
                        height={300}
                    />
                </div>
            </div>
            <Reseau/>
        </>
    );
}
