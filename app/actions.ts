"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addHours, format, formatDate } from "date-fns";
import { Divide } from "lucide-react";

export const updateAircraft = async (
  AircraftId: string,
  formData: FormData
) => {
  const newRegistration = formData.get("newRegistration")?.toString();
  const newAirframe = formData.get("newAirframe")?.toString();
  const supabase = createClient();
  const { error } = await supabase
    .from("Fleet")
    .update({ Reg: newRegistration, ICAO: newAirframe })
    .eq("uuid", AircraftId);
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};
export const deleteAircraft = async (AircraftId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("Fleet")
    .delete()
    .eq("uuid", AircraftId);
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};
export const deleteFlight = async (FlightId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("Flights")
    .delete()
    .eq("uuid", FlightId);
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};
export const addSavedAircraft = async (AircraftId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("Fleet")
    .update({ favourite: true })
    .eq("uuid", AircraftId);
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};
export const removeSavedAircraft = async (AircraftId: string, Fav: boolean) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("Fleet")
    .update({ favourite: false })
    .eq("uuid", AircraftId);
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};
export const saveAircraft = async (AircraftId: string, Fav: boolean) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("Fleet")
    .update({ favourite: Fav })
    .eq("uuid", AircraftId);
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};
export const addAircraft = async (formData: FormData) => {
  const registration = formData.get("registration")?.toString();
  const airline = formData.get("airline")?.toString();
  const airframe = formData.get("airframe")?.toString();
  const supabase = createClient();
  if (registration) {
    const { error } = await supabase
      .from("Fleet")
      .insert([{ Reg: registration, Airline: airline, ICAO: airframe }])
      .select();
    if (error) {
      console.error(error.code + " " + error.message);
    } else {
      return revalidatePath("/fleet");
    }
  }
};

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const addFlight = async (formData: FormData) => {
  const departure = formData.get("departure")?.toString();
  const departureDate = formData.get("datedep")?.toString();
  const destination = formData.get("destination")?.toString();
  const aircraft = formData.get("aircraft")?.toString();
  const latitude = formData.get("latitude") as unknown;
  const longitude = formData.get("longitude") as unknown;
  const destlatitude = formData.get("destlatitude") as unknown;
  const destlongitude = formData.get("destlongitude") as unknown;

  const lat1 = latitude as number;
  const long1 = longitude as number;
  const lat2 = destlatitude as number;
  const long2 = destlongitude as number;

  const mathdist = getDistanceFromLatLonInKm(lat1, long1, lat2, long2);
  const dist = mathdist.toFixed(1);

  var today = new Date();

  var inittime = addHours(today, 0.5);
  var deptime = formatDate(inittime, "p");

  var flighttime = mathdist / 1000;

  var inittime = addHours(inittime, flighttime + 0.75);
  var arrtime = formatDate(inittime, "p");

  const supabase = createClient();
  const { error } = await supabase
    .from("Flights")
    .insert([
      {
        aircraft: aircraft,
        start: departure,
        destination: destination,
        arrival_time: arrtime,
        departure_time: deptime,
        date: departureDate,
        distance: dist,
      },
    ])
    .select();
  if (aircraft) {
    const { data } = await supabase
      .from("Fleet")
      .update({ departure: departure, destination: destination })
      .eq("Reg", aircraft)
      .select();
  }
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};
export const completeFlight = async (FlightId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("Flights")
    .update({ completed: true })
    .eq("uuid", FlightId)
    .select();
  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return revalidatePath("/fleet");
  }
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password || !name) {
    return { error: "Email, Password, and Name are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: name,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
