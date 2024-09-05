import { Fleet } from "@/types/custom";
import { Silkscreen } from "next/font/google";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import heli1 from "@/public/blue.webp";
import heli2 from "@/public/white.webp";

const silk = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silk",
  display: "swap",
});

export default function Aircraft({ aircraft }: { aircraft: Fleet }) {
  return (
    <div className="w-full h-[120px] p-6 rounded-md bg-background flex justify-between border ">
      <h2 className={`${silk.variable} font-silk`}>Registration:</h2>
      <p className={`${silk.variable} font-silk`}>{aircraft.Reg}</p>
      {/* <ScrollArea className="w-full whitespace-nowrap pt-5">
        <div className="flex w-max space-x-4 p-4">
          <div className="overflow-hidden space-x-3 flex rounded-md">
            <Image
              src={heli1}
              alt=""
              className="object-cover h-fit rounded-md"
              width={200}
              height={50}
            />
            <Image
              src={heli2}
              alt=""
              className="object-cover h-fit  overflow-hidden rounded-md"
              width={200}
              height={50}
            />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea> */}
    </div>
  );
}
