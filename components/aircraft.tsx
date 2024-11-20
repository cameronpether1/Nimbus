"use client";
import { Fleet } from "@/types/custom";
import { Separator } from "./ui/separator";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  InfoCircledIcon,
  LightningBoltIcon,
  SewingPinIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  addSavedAircraft,
  deleteAircraft,
  removeSavedAircraft,
  saveAircraft,
} from "@/app/actions";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SubmitButton } from "./submit-button";
import { FleetOptimisticUpdate } from "./fleet-card";
import { startTransition } from "react";

export default function Aircraft({
  fleet,
  optimisticUpdate,
}: {
  fleet: Fleet;
  optimisticUpdate: FleetOptimisticUpdate;
}) {
  const handleDeleteAircraft = async () => {
    const AircraftId = fleet.uuid;
    deleteAircraft(AircraftId);
  };
  const handleSavedAircraft = async () => {
    const AircraftId = fleet.uuid;
    const Fav = fleet.favourite ? false : true;
    saveAircraft(AircraftId, Fav);
  };

  return (
    <div className="w-full min-w-[400px] px-4 rounded-lg bg-background flex flex-col col-span-1 border hover:scale-[1.01] hover:shadow-lg shadow-sm transition">
      <div className=" flex justify-end items-center mb-6 rounded-sm p-2 gap-2">
        <Button
          type="submit"
          onClick={async () => {
            startTransition(() => {
              optimisticUpdate({
                action: "update",
                fleet: { ...fleet, favourite: !fleet.favourite },
              });
            });
            handleSavedAircraft;
          }}
          size="sm"
          className="bg-background text-green-500 hover:bg-background hover:scale-110"
        >
          {fleet.favourite ? <BookmarkFilledIcon /> : <BookmarkIcon />}
        </Button>
        <Dialog>
          <DialogTrigger>
            <DotsHorizontalIcon className="size-4 hover:rotate-12 transition " />
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center  p-4">
            <DialogHeader>
              <DialogTitle>{fleet.Reg}</DialogTitle>
              <DialogDescription>
                Here is your information for your {fleet.ICAO} Aircraft,{" "}
                {fleet.Reg}.
              </DialogDescription>
            </DialogHeader>

            <SubmitButton
              variant={"destructive"}
              onClick={async () => {
                startTransition(() => {
                  optimisticUpdate({ action: "delete", fleet });
                });
                await handleDeleteAircraft();
              }}
              pendingText="Deleting Aircraft..."
            >
              Delete
            </SubmitButton>
          </DialogContent>
        </Dialog>
      </div>
      <section className="w-full grid grid-cols-2 gap-4 text-sm ">
        <div className="flex items-center col-span-2 rounded-sm ">
          <InfoCircledIcon className="size-5" />
          <Separator orientation="vertical" className="mx-4" />
          <div>
            <p>{fleet.Airline}</p>
            <p>{fleet.ICAO}</p>
            <p>{fleet.Reg}</p>
          </div>
        </div>
        <div className="flex items-center  rounded-sm ">
          <SewingPinIcon className="size-5" />
          <Separator orientation="vertical" className="mx-4" />
          <div>
            <p>{fleet.departure}</p>
            <p>{fleet.destination}</p>
          </div>
        </div>
      </section>
      <div className="w-full mt-4 p-2 border-t border-dashed flex justify-between items-center">
        <Badge variant="default">aircraft </Badge>
        <div className="flex gap-4">
          <Share2Icon className=" hover:scale-110" />
          <LightningBoltIcon className="text-green-500 hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
