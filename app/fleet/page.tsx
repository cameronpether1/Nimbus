import FleetCard from "@/components/fleet-card";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { addAircraft } from "../actions";
import { useEffect, useState } from "react";
import { Silkscreen } from "next/font/google";

const silk = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silk",
  display: "swap",
});

export default async function FleetPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const { data: fleet } = await supabase
    .from("Fleet")
    .select("*")
    .eq("owner", user.id);

  return (
    <div className="flex text-center items-center justify-start h-full w-screen gap-6 rounded-lg bg-accent border p-3">
      <form className="flex flex-col w-1/6 h-[700px] bg-background border rounded-md p-6 min-w-64 text-left">
        <h1 className={`${silk.variable} font-silk`}>Add Aircraft</h1>
        <div className="flex flex-col h-full  gap-2 justify-between [&>input]:mb-3 mt-8">
          <div>
            <Label htmlFor="airline" className={`${silk.variable} font-silk`}>
              Airline
            </Label>
            <Input name="airline" placeholder="BAW" required />
            <Label
              htmlFor="registration"
              className={`${silk.variable} font-silk`}
            >
              Registration
            </Label>
            <Input name="registration" placeholder="G-REG" required />
            <Label htmlFor="airline" className={`${silk.variable} font-silk`}>
              ICAO
            </Label>
            <Input
              type="icao"
              name="icao"
              placeholder="B737"
              minLength={2}
              required
            />
          </div>
          <div className="w-full h-full">
            <SubmitButton
              formAction={addAircraft}
              pendingText="Adding Aircraft to Your Fleet..."
            >
              +
            </SubmitButton>
          </div>
        </div>
      </form>

      <div className="border p-6 h-[700px] w-[30%] overflow-hidden bg-accent">
        <FleetCard fleet={fleet ?? []} />
      </div>

      {/* <div>
        There are Currently no Aircraft In your Fleet <br />
        {user.user_metadata.first_name}
      </div> */}
    </div>
  );
}
