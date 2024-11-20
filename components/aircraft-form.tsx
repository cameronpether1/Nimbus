"use client";
import * as React from "react";
import { addAircraft } from "@/app/actions";
import { SubmitButton } from "./submit-button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "./ui/switch";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  FingerprintIcon,
  PlaneTakeoffIcon,
  Check,
  ChevronsUpDown,
} from "lucide-react";
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

const registrationsBA = [
  { value: "G-DBCA", label: "A319-100" },
  { value: "G-DBCB", label: "A319-100" },
  { value: "G-DBCC", label: "A319-100" },
  { value: "G-DBCD", label: "A319-100" },
  { value: "G-DBCE", label: "A319-100" },
  { value: "G-DBCF", label: "A319-100" },
  { value: "G-DBCG", label: "A319-100" },
  { value: "G-DBCH", label: "A319-100" },
  { value: "G-DBCJ", label: "A319-100" },
  { value: "G-DBCK", label: "A319-100" },
  { value: "G-EUOA", label: "A319-100" },
  { value: "G-EUOE", label: "A319-100" },
  { value: "G-EUOF", label: "A319-100" },
  { value: "G-EUOG", label: "A319-100" },
  { value: "G-EUPD", label: "A319-100" },
  { value: "G-EUPJ", label: "A319-100" },
  { value: "G-EUPK", label: "A319-100" },
  { value: "G-EUPL", label: "A319-100" },
  { value: "G-EUPN", label: "A319-100" },
  { value: "G-EUPO", label: "A319-100" },
  { value: "G-EUPP", label: "A319-100" },
  { value: "G-EUPR", label: "A319-100" },
  { value: "G-EUPS", label: "A319-100" },
  { value: "G-EUPT", label: "A319-100" },
  { value: "G-EUPU", label: "A319-100" },
  { value: "G-EUPW", label: "A319-100" },
  { value: "G-EUPY", label: "A319-100" },
  { value: "G-EUPZ", label: "A319-100" },
  { value: "G-EUPG", label: "A319-100" },
  { value: "G-RAES", label: "B777-200" },
  { value: "G-VIIA", label: "B777-200" },
  { value: "G-VIIB", label: "B777-200" },
  { value: "G-VIIC", label: "B777-200" },
  { value: "G-VIID", label: "B777-200" },
  { value: "G-VIIE", label: "B777-200" },
  { value: "G-VIIF", label: "B777-200" },
  { value: "G-VIIG", label: "B777-200" },
  { value: "G-VIIH", label: "B777-200" },
  { value: "G-VIIJ", label: "B777-200" },
  { value: "G-VIIK", label: "B777-200" },
  { value: "G-VIIL", label: "B777-200" },
  { value: "G-VIIM", label: "B777-200" },
  { value: "G-VIIN", label: "B777-200" },
  { value: "G-VIIO", label: "B777-200" },
  { value: "G-VIIP", label: "B777-200" },
  { value: "G-VIIR", label: "B777-200" },
  { value: "G-VIIS", label: "B777-200" },
  { value: "G-VIIT", label: "B777-200" },
  { value: "G-VIIU", label: "B777-200" },
  { value: "G-VIIV", label: "B777-200" },
  { value: "G-VIIW", label: "B777-200" },
  { value: "G-VIIX", label: "B777-200" },
  { value: "G-VIIY", label: "B777-200" },
  { value: "G-YMMA", label: "B777-200" },
  { value: "G-YMMB", label: "B777-200" },
  { value: "G-YMMC", label: "B777-200" },
  { value: "G-YMMD", label: "B777-200" },
  { value: "G-YMME", label: "B777-200" },
  { value: "G-YMMF", label: "B777-200" },
  { value: "G-YMMG", label: "B777-200" },
  { value: "G-YMMH", label: "B777-200" },
  { value: "G-YMMI", label: "B777-200" },
  { value: "G-YMMJ", label: "B777-200" },
  { value: "G-YMMK", label: "B777-200" },
  { value: "G-YMML", label: "B777-200" },
  { value: "G-YMMN", label: "B777-200" },
  { value: "G-YMMO", label: "B777-200" },
  { value: "G-YMMP", label: "B777-200" },
  { value: "G-YMMR", label: "B777-200" },
  { value: "G-YMMS", label: "B777-200" },
  { value: "G-YMMT", label: "B777-200" },
  { value: "G-YMMU", label: "B777-200" },
  { value: "G-STBA", label: "B777-200" },
  { value: "G-STBB", label: "B777-200" },
  { value: "G-STBC", label: "B777-200" },
  { value: "G-STBD", label: "B777-200" },
  { value: "G-STBE", label: "B777-200" },
  { value: "G-STBF", label: "B777-200" },
  { value: "G-STBG", label: "B777-200" },
  { value: "G-STBH", label: "B777-200" },
  { value: "G-STBI", label: "B777-200" },
  { value: "G-STBJ", label: "B777-200" },
  { value: "G-STBK", label: "B777-200" },
  { value: "G-STBL", label: "B777-200" },
  { value: "G-STBM", label: "B777-200" },
  { value: "G-STBN", label: "B777-200" },
  { value: "G-STBO", label: "B777-200" },
  { value: "G-STBP", label: "B777-200" },
];
export default function AircraftForm() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [mode, setMode] = useState(false);
  const [airframe, setAirframe] = useState("");
  const handleCheck = () => {
    if (mode === false) {
      setMode(true);
    } else {
      setMode(false);
    }
  };
  return (
    <div className="flex">
      <form className="flex flex-col w-[400px] bg-background border rounded-l-md p-6 min-w-64 text-left">
        <div className="flex justify-start items-end ">
          <div className="bg-gray-800 rounded-md p-2 mr-4">
            <FingerprintIcon className="size-4 text-white" />
          </div>
          <h1>Add Aircraft</h1>
        </div>
        <div className="flex flex-col h-full gap-4 justify-between [&>input]:mb-3 mt-8">
          <div className="flex items-center justify-between space-x-2 ">
            <div className="flex space-x-1">
              <Label htmlFor="bamode" className="text-xs">
                British Airways
              </Label>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoCircledIcon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60">
                      Enable to Select From Realtime British Airways
                      Registrations.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch id="bamode" onCheckedChange={handleCheck} />
          </div>
          <div>
            {mode === true ? (
              <>
                <Input type="hidden" name="registration" value={value} />
                <Input type="hidden" name="airframe" value={airframe} />
                <Label htmlFor="registration" className="text-xs">
                  Registration:
                </Label>
                <div className="flex justify-center w-full">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between "
                      >
                        {value
                          ? registrationsBA.find(
                              (registration) => registration.value === value
                            )?.value
                          : "Select Registration..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[200px] p-0"
                      side="right"
                      align="start"
                    >
                      <Command loop>
                        <CommandInput placeholder="Search Registration..." />
                        <CommandList>
                          <CommandEmpty>No Registration found.</CommandEmpty>

                          <CommandGroup heading="British Airways">
                            {registrationsBA.map((registration) => (
                              <CommandItem
                                key={registration.value}
                                value={registration.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setAirframe(registration.label);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === registration.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {registration.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* <Label htmlFor="airframe" className="text-xs">
                  Airframe:
                </Label>
                <div className="flex justify-center w-full">
                  <Select name="airframe" onValueChange={setAirframe} required>
                    <SelectTrigger className="w-full flex justify-between">
                      <SelectValue placeholder="B-737" />
                    </SelectTrigger>
                    <SelectContent side="right">
                      <SelectGroup>
                        <SelectLabel>Airbus</SelectLabel>
                        <SelectItem value="A319-100">A319-100</SelectItem>
                        <SelectItem value="A320-200">A320-200</SelectItem>
                        <SelectItem value="A320neo">A320neo</SelectItem>
                        <SelectItem value="A321-200">A321-200</SelectItem>
                        <SelectItem value="A321neo">A321neo</SelectItem>
                        <SelectItem value="A350-1000">A350-1000</SelectItem>
                        <SelectItem value="A380-800">A380-800</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Boeing</SelectLabel>
                        <SelectItem value="B777-200">B777-200</SelectItem>
                        <SelectItem value="B777-300ER">B777-300ER</SelectItem>
                        <SelectItem value="B787-8">B787-8</SelectItem>
                        <SelectItem value="B787-9">B787-9</SelectItem>
                        <SelectItem value="B787-10">B787-10</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Dornier</SelectLabel>
                        <SelectItem value="D328-100">
                          Dornier 328-100
                        </SelectItem>
                        <SelectItem value="D328JET-300">
                          Dornier 328JET-300
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Embraer</SelectLabel>
                        <SelectItem value="ERJ-190">ERJ-190</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}
              </>
            ) : (
              <>
                <Label htmlFor="registration" className="text-xs">
                  Registration:
                </Label>
                <div className="flex justify-center">
                  <Input name="registration" placeholder="G-EUPO" required />
                </div>
                <Label htmlFor="airframe" className="text-xs">
                  Airframe:
                </Label>
                <div className="flex justify-center">
                  <Input name="airframe" placeholder="B777-200" required />
                </div>
              </>
            )}
          </div>

          <div className="flex w-full">
            <SubmitButton
              className="bg-gray-800 hover:bg-gray-950"
              formAction={addAircraft}
              pendingText="Adding Aircraft..."
            >
              +
            </SubmitButton>
          </div>
        </div>
      </form>
      <div className="bg-gray-900 rounded-r-md overflow-hidden w-[200px] object-cover flex justify-center items-center text-white">
        <PlaneTakeoffIcon size={25} className=" hover:drop-shadow-glow" />
      </div>
    </div>
  );
}
