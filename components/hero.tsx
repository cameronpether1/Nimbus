import nimbus from "../public/nimbus.png";
import Image from "next/image";

import { Send_Flowers } from "next/font/google";
import { Bakbak_One } from "next/font/google";
const bakbakOne = Bakbak_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bakbak-one",
});

const sendFlowers = Send_Flowers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-send-flowers",
  display: "swap",
});

export default function Header() {
  return (
    <main className="flex min-h-screen  justify-center h-[2000px] w-screen">
      <div className="flex items-center justify-center lg:w-[90%] lg:h-[560px] w-[90%] h-[300px] bg-[#2b71da36] rounded-xl">
        <div className="flex relative flex-col items-center justify-center w-[calc(100%-20px)]  h-[calc(100%-20px)] rounded-lg border-[11px] border-solid border-[#fffffff0] [background:radial-gradient(50%_50%_at_50%_50%,rgb(39.93,93.66,174.25)_0%,rgb(44,114,219)_100%)]">
          <Image src={nimbus} width={150} alt="" className="z-10" />
          <div className="absolute left-10 lg:inline-block hidden">
            <div
              className={`${sendFlowers.variable} font-flowers text-[40px] w-[175px] font-medium rotate-[-4.52deg] bg-gradient-to-b from-[#EBEBEB] to-[#BED5F967] inline-block text-transparent bg-clip-text`}
            >
              Welcome
            </div>
            <p
              className={`${bakbakOne.variable} font-bakbak pt-3 w-[317px] bg-gradient-to-b from-[#EBEBEB] to-[#BED5F967] text-transparent bg-clip-text text-[30px] tracking-[0] leading-[22px]`}
            >
              THE NEW ERA OF <br />
              FLIGHT SIMULATION
            </p>
            <p className="w-[253px] pt-5  bg-gradient-to-b from-[#EBEBEB] to-[#BED5F967] bg-clip-text text-transparent text-[1em] tracking-[0] leading-[14px]">
              Collect your fleet, flights, and plans.
              <br />
              Share with friends and followers
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
