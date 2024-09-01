import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function FleetPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  //   const { data: flights } = await supabase
  //     .from("Aircraft")
  //     .select("*")
  //     .eq("Registration", "G-EUOA");
  //   const allflights = JSON.stringify(flights);
  return (
    <div className="flex flex-col justify-center text-center my-[200px]">
      <div>
        There are Currently no Aircraft In your Fleet <br />
        {user.email}
      </div>

      <Button variant={"outline"} className="mt-10">
        +
      </Button>
    </div>
  );
}
