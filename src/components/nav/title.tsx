import Image from "next/image";

export function NavTitle() {
    return <div className="flex justify-center items-center">
        <Image src={"/shopeasy.svg"} alt="logo" width={26} height={32} />
        <p> ShopEasy</p>
    </div>
}