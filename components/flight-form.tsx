import { addAircraft, addFlight } from "@/app/actions";
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
import { PlaneTakeoffIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import AirportCombo from "./airport-combo";
import AirportComboDestination from "./destination-combo";
import { DatePicker } from "./date-picker";
import { Separator } from "./ui/separator";

export default async function FlightForm() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }

  const { data: airports, error: error } = await supabase
    .from("airports")
    .select("*")
    .in("type", ["large_airport", "medium_airport"]);
  if (error) return;

  const { data: fleet } = await supabase
    .from("Fleet")
    .select("*")
    .eq("owner", user.id)
    .order("favourite", { ascending: false });
  return (
    <div className="flex">
      <form className="flex flex-col w-[400px] bg-background border rounded-l-md p-6 min-w-64 text-left">
        <div className="flex justify-start items-end">
          <div className="bg-gray-800 rounded-md p-2 mr-4">
            <PlaneTakeoffIcon className="size-4 text-white" />
          </div>
          <h1>Add Flight</h1>
        </div>
        <div className="flex flex-col h-full gap-4 justify-between [&>input]:mb-3 mt-8">
          <div>
            <Label htmlFor="registration">Aircraft:</Label>
            <div className="flex justify-center">
              <Select name="aircraft" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="G-EUPO" />
                </SelectTrigger>
                <SelectContent side="right">
                  <SelectGroup>
                    <SelectLabel>Your Aircraft</SelectLabel>
                    {fleet?.map((aircraft) => {
                      return (
                        <SelectItem value={aircraft.Reg} key={aircraft.uuid}>
                          {aircraft.Reg}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Separator className="my-4" />
            <div>
              <Label htmlFor="airframe">Departure:</Label>
              <div className="flex justify-center w-full">
                <AirportCombo airports={airports} />
              </div>
            </div>
            <div>
              <div className="flex mt-2 justify-end w-full ">
                <DatePicker />
              </div>
            </div>
            <Separator className="my-4" />
            <Label htmlFor="airframe">Destination:</Label>
            <div className="flex justify-center w-full">
              <AirportComboDestination airports={airports} />
            </div>
          </div>

          <div className="flex w-full">
            <SubmitButton formAction={addFlight} pendingText="Adding Flight...">
              Dispatch
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
