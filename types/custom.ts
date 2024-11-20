import { Database } from "./supabase";

export type Fleet = Database["public"]["Tables"]["Fleet"]["Row"];
export type Flights = Database["public"]["Tables"]["Flights"]["Row"];
export type Airports = Database["public"]["Tables"]["airports"]["Row"];
