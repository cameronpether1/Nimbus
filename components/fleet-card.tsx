import { Send_Flowers } from "next/font/google";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import Image from "next/image";
import { Fleet } from "@/types/custom";
import Aircraft from "./aircraft";

const sendFlowers = Send_Flowers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-send-flowers",
  display: "swap",
});

export default function FleetCard({ fleet }: { fleet: Array<Fleet> }) {
  return (
    <div className="w-full flex gap-6 justify-start flex-wrap">
      {fleet?.map((aircraft) => {
        return <Aircraft aircraft={aircraft} key={aircraft.id} />;
      })}
    </div>
  );
}
