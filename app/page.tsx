import Hero from "@/components/hero";
import Image from "next/image";
import gradient from "../public/gradient.png";

export default async function Index() {
  return (
    <>
      <Image
        className="fixed top-0 z-[-10] m-3"
        src={gradient}
        alt=""
        fill
      ></Image>
      <Hero />
    </>
  );
}
