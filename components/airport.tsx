"use client";

import { Airports } from "@/types/custom";

export default function Airport({ airport }: { airport: Airports }) {
  return (
    <div className=" min-w-[400px] p-4 my-4 rounded-lg bg-background flex flex-col  border hover:scale-[1.01] hover:shadow-lg shadow-sm transition">
      <div className="flex justify-between pb-8 text-lg">
        <div>{airport.iata_code}</div>
        <div>{airport.name}</div>
      </div>
      <div className="text-gray-500 text-sm">
        <div>{airport.ident}</div>
        <div>Lat: {airport.latitude_deg}</div>
        <div>Long: {airport.longitude_deg}</div>
      </div>
    </div>
  );
}
