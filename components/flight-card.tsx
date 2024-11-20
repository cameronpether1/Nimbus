"use client";
import { ScrollArea } from "./ui/scroll-area";
import { Flights } from "@/types/custom";
import Flight from "./flight";
import { Action } from "./fleet-card";
import { useOptimistic } from "react";

export function flightReducer(
  state: Array<Flights>,
  { action, flight }: { action: Action; flight: Flights }
) {
  switch (action) {
    case "delete":
      return state.filter(({ uuid }) => uuid !== flight.uuid);
    case "update":
      return state.map((fl) => (fl.uuid === flight.uuid ? flight : fl));
    case "create":
      return [flight, ...state];
    default:
      return state;
  }
}

export type FlightOptimisticUpdate = (action: {
  action: Action;
  flight: Flights;
}) => void;

export default function FlightCard({
  flightlog,
}: {
  flightlog: Array<Flights>;
}) {
  const [optimisticFlight, optimisticFlightUpdate] = useOptimistic(
    flightlog,
    flightReducer
  );
  return (
    <div className="flex items-center h-full w-full ">
      <ScrollArea className="h-[600px] min-w-fit w-full rounded-md bg-accent ">
        <div className="w-full h-full flex-col items-center justify-center grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-6 p-4">
          {optimisticFlight?.map((flight) => {
            return (
              <Flight
                flight={flight}
                key={flight.uuid}
                optimisticUpdate={optimisticFlightUpdate}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
