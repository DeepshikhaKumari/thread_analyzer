"use client";

import * as React from "react";
import { cn } from "./utils";

const CarouselContext = React.createContext<{
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
} | null>(null);

function Carousel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <CarouselContext.Provider value={{ currentIndex, setCurrentIndex }}>
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <div className="flex transition-transform duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}

function CarouselItem({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("min-w-0 flex-shrink-0 flex-grow-0 basis-full", className)} {...props}>
      {children}
    </div>
  );
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-50",
        className
      )}
      {...props}
    >
      <span className="sr-only">Previous</span>
      ←
    </button>
  );
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-50",
        className
      )}
      {...props}
    >
      <span className="sr-only">Next</span>
      →
    </button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};