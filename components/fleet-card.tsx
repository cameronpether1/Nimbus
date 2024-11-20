"use client";
import { ScrollArea } from "./ui/scroll-area";
import { Fleet } from "@/types/custom";
import Aircraft from "./aircraft";
import { useOptimistic } from "react";

export type Action = "delete" | "update" | "create";

export function fleetReducer(
  state: Array<Fleet>,
  { action, fleet }: { action: Action; fleet: Fleet }
) {
  switch (action) {
    case "delete":
      return state.filter(({ uuid }) => uuid !== fleet.uuid);
    case "update":
      return state.map((f) => (f.uuid === fleet.uuid ? fleet : f));
    case "create":
      return [fleet, ...state];
    default:
      return state;
  }
}

export type FleetOptimisticUpdate = (action: {
  action: Action;
  fleet: Fleet;
}) => void;

export default function FleetCard({ fleet }: { fleet: Array<Fleet> }) {
  const [optimisticFleet, optimisticFleetUpdate] = useOptimistic(
    fleet,
    fleetReducer
  );
  return (
    <div className="flex items-start mr-4  h-full">
      <ScrollArea className="h-[600px] min-w-fit lg:w-1/3 rounded-md border bg-accent ">
        {fleet.length === 0 || optimisticFleet.length === 0 ? (
          <div className="w-full h-full min-w-[500px] flex flex-col items-center justify-center gap-6 p-4  ">
            <div className="w-full min-w-[400px] p-4 rounded-md bg-background flex flex-col col-span-1 border shadow-sm mt-[250px] ">
              <p className="text-lg font-bold">Aircraft</p>
              <p className="text-sm text-muted-foreground">
                There are Currently no aircraft in your fleet.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full min-w-[500px] h-full flex flex-col items-center justify-center gap-6 p-4">
            {optimisticFleet?.map((fleet) => {
              return (
                <Aircraft
                  fleet={fleet}
                  key={fleet.uuid}
                  optimisticUpdate={optimisticFleetUpdate}
                />
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
