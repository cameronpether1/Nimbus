"use client";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Input } from "./ui/input";
export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  if (date) {
    return (
      <>
        <Input type="hidden" name="datedep" value={formatDistanceToNow(date)} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left ",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </>
    );
  }
}
