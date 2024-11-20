"use client";
import { Flights } from "@/types/custom";
import { completeFlight, deleteFlight } from "@/app/actions";

import {
  ArrowRightIcon,
  CheckCircledIcon,
  CheckIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { PlaneLandingIcon, PlaneTakeoffIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { FlightOptimisticUpdate } from "./flight-card";
import Link from "next/link";

export default function Flight({
  flight,
  optimisticUpdate,
}: {
  flight: Flights;
  optimisticUpdate: FlightOptimisticUpdate;
}) {
  const handleDeleteFlight = async () => {
    const FlightId = flight.uuid;
    deleteFlight(FlightId);
  };

  const handleCompleteFlight = async () => {
    optimisticUpdate({ action: "delete", flight });
    const FlightId = flight.uuid;
    completeFlight(FlightId);
  };

  const info = [
    {
      id: 1,
      name: `${flight.aircraft}`,
      designation: "Aircraft",
      image: "/iconinfo.svg",
    },
    {
      id: 2,
      name: `${flight.start}`,
      designation: "Departure",
      image: "/icondep.svg",
    },
    {
      id: 3,
      name: `${flight.destination}`,
      designation: "Destination",
      image: "/iconarr.svg",
    },
    {
      id: 4,
      name: `${flight.date}`,
      designation: "Estimated Departure Time",
      image: "/iconcal.svg",
    },
  ];

  return (
    <Link
      href={{
        pathname: `/${flight.uuid}`,
      }}
    >
      <div className=" h-[400px] w-full min-w-[300px] p-4 rounded-lg bg-background flex flex-col col-span-1 border justify-between shadow-sm text-sm">
        <div className="flex justify-end items-center mb-20 gap-4">
          <Badge>
            {flight.start} to {flight.destination} | {flight.date},{" "}
            {flight.distance} Km
          </Badge>
          <CheckCircledIcon
            className="hover:scale-110 size-5"
            onClick={handleCompleteFlight}
          />
        </div>

        <div className="flex w-full justify-center items-center">
          <AnimatedTooltip items={info} />
        </div>
        <Separator />
        <div className="flex items-end  mb-4 justify-between ">
          <div className="flex flex-col justify-center items-center">
            <div>
              <p className="hover:scale-105 hover:text-green-500 transition cursor-default text-2xl text-green-400">
                {flight.departure_time}
              </p>
            </div>
            <div className="flex gap-1">
              <PlaneTakeoffIcon size={16} />
              <p>{flight.start}</p>
            </div>
          </div>
          <DoubleArrowRightIcon />
          <div className="flex flex-col justify-center items-center">
            <div>
              <p className="hover:scale-105 hover:text-green-500 transition cursor-default text-2xl text-green-400">
                {flight.arrival_time}
              </p>
            </div>
            <div className="flex gap-1">
              <PlaneLandingIcon size={16} />
              <p>{flight.destination}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
