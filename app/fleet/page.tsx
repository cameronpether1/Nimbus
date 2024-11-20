import FleetCard from "@/components/fleet-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FilePlusIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FlightCard from "@/components/flight-card";
import AircraftForm from "@/components/aircraft-form";
import FlightForm from "@/components/flight-form";
import Settings from "@/components/settings";
import { formatDate } from "date-fns";

export default async function FleetPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const { data: airports, error: error } = await supabase
    .from("airports")
    .select("*");
  if (error) return;

  const { data: fleet } = await supabase
    .from("Fleet")
    .select("*")
    .order("favourite", { ascending: false });

  const { data: flight } = await supabase
    .from("Flights")
    .select("*")
    .eq("completed", "false");
  const d = new Date();
  var time = formatDate(d, "p");

  return (
    <div className="flex  flex-col items-center justify-start h-[700px] w-[90%] min-w-fit rounded-lg bg-accent/40 drop-shadow-2xl ">
      <section className="w-full rounded-t-lg h-[50px] bg-gray-800 dark:bg-stone-300 text-stone-300 justify-left items-center px-[20px] flex ">
        <div>{time}</div>
      </section>
      <div className="flex relative text-center items-start justify-center h-[700px] w-full rounded-b-lg bg-background border">
        <section className=" border-r w-[50px] h-full flex flex-col justify-between">
          <div className="mt-8 flex flex-col items-center">
            <Popover>
              <PopoverTrigger>
                <PlusIcon className=" hover:bg-blue-200 my-5 size-5 rounded-sm" />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="right"
                className="bg-background/40 p-2 w-full backdrop-blur-[1.5px]"
              >
                <AircraftForm />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <FilePlusIcon className=" hover:bg-blue-200 my-5 size-5 rounded-sm" />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="right"
                className="bg-background/40 p-2 w-full backdrop-blur-[1.5px]"
              >
                <FlightForm />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <Dialog>
              <DialogTrigger>
                <GearIcon className=" hover:bg-blue-200 my-5 size-5 rounded-sm" />
              </DialogTrigger>
              <DialogContent className="bg-background/40 p-2">
                <div className="flex flex-col w-full h-full bg-background border rounded-md p-6 min-w-64 text-left">
                  <DialogTitle>Settings</DialogTitle>
                  <Settings />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        <div className=" w-full justify-between text-left p-4 flex">
          <>
            <FleetCard fleet={fleet ?? []} />
            <div className="border rounded-lg w-full max-w-[1100px] flex justify-center items-center bg-accent">
              {flight?.length === 0 ? (
                <Card className="flex flex-col  rounded bg-background p-4 w-1/2">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">
                      Flight Viewer
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Select an aircraft from the fleet panel on the left to
                      view its information, or create a new one.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default">Create</Button>
                      </DialogTrigger>

                      <DialogContent className="bg-background/40 p-2 min-w-fit backdrop-blur-[1.5px]">
                        <DialogTitle hidden></DialogTitle>
                        <DialogDescription hidden></DialogDescription>
                        <FlightForm />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ) : (
                <FlightCard flightlog={flight ?? []} />
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
