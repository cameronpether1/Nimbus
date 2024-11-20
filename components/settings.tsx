import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Separator } from "./ui/separator";
import { createClient } from "@/utils/supabase/server";
import { Flights } from "@/types/custom";
import { Divide, PlaneLandingIcon, PlaneTakeoffIcon } from "lucide-react";
import { ArrowDownIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "./ui/scroll-area";

export default async function Settings() {
  const supabase = await createClient();
  const { data: flights, error: error } = await supabase
    .from("Flights")
    .select("*")
    .eq("completed", "true");

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Card className="w-full my-4">
        <CardHeader>
          <CardTitle>Flights</CardTitle>
          <CardDescription>View your Completed Flights.</CardDescription>
        </CardHeader>

        <CardContent>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full justify-between items-center hover:bg-gray-500/10">
              Completed
              <ArrowDownIcon />
            </CollapsibleTrigger>
            <ScrollArea>
              <CollapsibleContent className="h-[200px]">
                {flights?.map((flight) => (
                  <div
                    key={flight.uuid}
                    className="flex items-center justify-evenly my-2 bg-gray-500/10 border border-gray-300 rounded"
                  >
                    <div className="flex gap-2">
                      <PlaneTakeoffIcon size={18} />
                      {flight.start}
                    </div>
                    <div className="flex gap-2">
                      <PlaneLandingIcon size={18} />
                      {flight.destination}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </ScrollArea>
          </Collapsible>
        </CardContent>
      </Card>
      <Separator />
      <Card className="w-full my-4">
        <CardHeader>
          <CardTitle>Friends</CardTitle>
          <CardDescription>
            Search For Friends And see their flights soon.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
