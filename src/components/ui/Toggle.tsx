"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "bg-transparent border border-gray-200 hover:bg-gray-100",
      },
      intent: {
        neutral: "data-[state=on]:text-gray-50 data-[state=on]:bg-gray-900",
        primary: "data-[state=on]:text-rose-50 data-[state=on]:bg-rose-600",
        secondary: "data-[state=on]:text-sky-50 data-[state=on]:bg-sky-600",
        tertiary: "data-[state=on]:text-indigo-50 data-[state=on]:bg-indigo-600",
        quaternary: "data-[state=on]:text-amber-50 data-[state=on]:bg-amber-600",
        quinary: "data-[state=on]:text-teal-50 data-[state=on]:bg-teal-600",
        success: "data-[state=on]:text-green-50 data-[state=on]:bg-green-600",
        danger: "data-[state=on]:text-red-50 data-[state=on]:bg-red-600",
        collaborator: "data-[state=on]:text-sky-50 data-[state=on]:bg-sky-600",
        referent: "data-[state=on]:text-amber-50 data-[state=on]:bg-amber-600",
      },
      size: {
        base: "h-10 px-3",
        small: "h-8 px-2",
        xsmall: "h-6 px-1",
        large: "h-11 px-5",
      },
    },
    defaultVariants: {
      intent: "primary",
      variant: "default",
      size: "base",
    },
  }
);

export type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>;

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, intent, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, intent, size, className }))}
      {...props}
    />
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
