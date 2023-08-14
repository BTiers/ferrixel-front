"use client";

import React from "react";

import { cn } from "@/lib/utils";

import {
  Root,
  Viewport,
  ScrollAreaViewportProps,
  Scrollbar,
  Thumb,
  Corner,
} from "@radix-ui/react-scroll-area";

export function ScrollArea({
  className,
  ...scrollAreaProps
}: ScrollAreaViewportProps) {
  return (
    <Root className="overflow-hidden print:overflow-visible" type="scroll">
      <Viewport
        className={cn("relative w-full h-full", className)}
        {...scrollAreaProps}
      />
      <Scrollbar className="z-10 flex w-2 p-1 duration-300 ease-out select-none bg-gray-100 touch-none hover:p-2">
        <Thumb className="relative scroll-thumb" />
      </Scrollbar>
      <Corner className="bg-gray-100" />
    </Root>
  );
}
