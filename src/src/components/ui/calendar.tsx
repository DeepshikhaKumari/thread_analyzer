"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "./utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<"div">;

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <div
      className={cn("p-3", className)}
      {...props}
    >
      <div className="flex justify-center pt-1 relative items-center w-full">
        <div className="text-sm font-medium">Calendar Component</div>
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Calendar functionality requires react-day-picker
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };