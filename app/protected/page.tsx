import AirportCombo from "@/components/airport-combo";
import MapboxExample from "@/components/mapbox";
import { createClient } from "@/utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: airports, error: error } = await supabase
    .from("airports")
    .select("*")
    .eq("type", "large_airport" || "medium_airport");
  if (error) return;

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* <MapboxExample /> */}
    </div>
  );
}
