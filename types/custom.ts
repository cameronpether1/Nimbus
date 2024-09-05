import { Database } from "./supabase";

export type Fleet = Database["public"]["Tables"]["Fleet"]["Row"];
