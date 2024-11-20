// import { ScrollArea } from "./ui/scroll-area";
// import { Airports } from "@/types/custom";
// import Aircraft from "./aircraft";
// import Airport from "./airport";

// export default function AirportCard({
//   airports,
// }: {
//   airports: Array<Airports>;
// }) {
//   return (
//     <div className="flex flex-col items-center justify-start w-fit p-11 rounded-md  h-[500px] bg-accent">
//       <ScrollArea>
//         {airports?.map((airport) => {
//           return <Airport airport={airport} key={airport.id} />;
//         })}
//       </ScrollArea>
//     </div>
//   );
// }
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Airports } from "@/types/custom";
import { Input } from "./ui/input";

export default function AirportCombo({
  airports,
}: {
  airports: Array<Airports>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  return (
    <>
      <Input type="hidden" name="departure" value={value} />
      <Input type="hidden" name="latitude" value={latitude} />
      <Input type="hidden" name="longitude" value={longitude} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" flex justify-between w-full"
          >
            {value
              ? airports.find((airport) => airport.ident === value)?.name
              : "Select Airport..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[500px]" align="start">
          <Command className="w-full">
            <CommandInput placeholder="Search Airport..." />
            <CommandList>
              <CommandEmpty>No airport found.</CommandEmpty>
              <CommandGroup>
                {airports.map((airport) => (
                  <CommandItem
                    className="flex items-start gap-4 "
                    key={airport.id}
                    value={airport.ident}
                    latitudeval={airport.latitude_deg}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setLatitude(airport.latitude_deg);
                      setLongitude(airport.longitude_deg);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === airport.ident ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div>{airport.ident}</div>
                    <div>{airport.name}</div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
