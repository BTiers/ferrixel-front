"use client";

import React from "react";
import {
  Arrow,
  Content,
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps as RdxPopoverContentProps,
  Root,
  Trigger,
} from "@radix-ui/react-popover";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const Popover: React.FC<PopoverProps> = Root;
export const PopoverTrigger: React.FC<PopoverTriggerProps> = Trigger;

const popoverContent = cva(
  [
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
    "z-[60] rounded-lg p-4 shadow-md focus:outline-none",
    "bg-white",
  ],
  {
    variants: {
      size: {
        small: "min-w-[12rem]",
        medium: "min-w-[16rem]",
        large: "min-w-[20rem]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export type PopoverContentVariantProps = VariantProps<typeof popoverContent>;
export type PopoverContentProps = PopoverContentVariantProps &
  RdxPopoverContentProps & { withArrow?: boolean };

export const PopoverContent: React.FC<PopoverContentProps> = ({
  className,
  size,
  withArrow = true,
  children,
  ...popoverContentProps
}) => {
  const popoverContentClassNames = popoverContent({ size });

  return (
    <Content {...popoverContentProps} className={cn(popoverContentClassNames, className)}>
      {withArrow && <Arrow className="text-white fill-current" />}
      {children}
    </Content>
  );
};
