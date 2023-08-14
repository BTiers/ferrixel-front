"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchRoot = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-200 data-[state=checked]:bg-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=checked]:bg-gray-400",
  {
    variants: {
      size: {
        small: "h-[20px] w-[36px]",
        medium: "h-[24px] w-[44px]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const switchThumb = cva(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        small: "h-4 w-4 data-[state=checked]:translate-x-4",
        medium: "h-5 w-5 data-[state=checked]:translate-x-5",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

type SwitchVariants = VariantProps<typeof switchRoot> & VariantProps<typeof switchThumb>;

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
  SwitchVariants;

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, size, ...props }, ref) => {
    const switchClassName = switchRoot({ size });
    const thumbClassName = switchThumb({ size });

    return (
      <SwitchPrimitives.Root className={cn(switchClassName, className)} {...props} ref={ref}>
        <SwitchPrimitives.Thumb className={cn(thumbClassName)} />
      </SwitchPrimitives.Root>
    );
  }
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
