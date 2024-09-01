import { Send_Flowers } from "next/font/google";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import heli1 from "@/public/blue.webp";
import heli2 from "@/public/white.webp";
import Image from "next/image";

const sendFlowers = Send_Flowers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-send-flowers",
  display: "swap",
});

export default function FleetCard() {
  return (
    <div className="w-[576px] h-[522px] p-3 relative  rounded-[20px] bg-[#f4f4f4] flex flex-col justify-start items-start">
      <div className="rounded-full w-[68px] h-[68px] bg-neutral-400 absolute right-[-20px] top-[-20px]"></div>
      <p className="w-[340px] px-2 p-8 pb-20">Hype Group H160</p>
      <ScrollArea className="w-full whitespace-nowrap pt-16">
        <div className="flex w-max space-x-4 p-4">
          <div className="overflow-hidden space-x-3 flex rounded-md">
            <Image
              src={heli1}
              alt=""
              className="object-cover h-fit  overflow-hidden rounded-md"
              width={470}
              height={270}
            />
            <Image
              src={heli2}
              alt=""
              className="object-cover h-fit  overflow-hidden rounded-md"
              width={470}
              height={270}
            />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
