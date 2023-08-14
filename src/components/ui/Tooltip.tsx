"use client";

import React, { forwardRef } from "react";

import {
  TooltipProvider as RadixTooltipProvider,
  TooltipProviderProps,
  Root,
  TooltipProps,
  Trigger,
  TooltipTriggerProps,
  Portal,
  TooltipPortalProps,
  Content,
  TooltipContentProps as ContentProps,
} from "@radix-ui/react-tooltip";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const TooltipProvider: React.FC<TooltipProviderProps> = RadixTooltipProvider;
export const Tooltip: React.FC<TooltipProps> = Root;
export const TooltipTrigger: React.FC<TooltipTriggerProps> = Trigger;
export const TooltipPortal: React.FC<TooltipPortalProps> = Portal;

const tooltip = cva(
  [
    `inline-flex shadow-md font-medium ring-1 ring-gray-700 rounded-md z-50 whitespace-pre-line
    rdx-side-top:animate-slide-down-fade
    rdx-side-right:animate-slide-left-fade
    rdx-side-bottom:animate-slide-up-fade
    rdx-side-left:animate-slide-right-fade`,
  ],
  {
    variants: {
      intent: {
        primary: "bg-gray-900 text-gray-50 ",
        secondary: "bg-gray-50 text-gray-900 border-gray-700",
      },
      size: {
        small: "text-xs py-1 px-2",
        medium: "text-sm py-2 px-4",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export type TooltipContentVariantProps = VariantProps<typeof tooltip>;
export type TooltipContentProps = TooltipContentVariantProps & ContentProps;

// eslint-disable-next-line react/display-name
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ intent, size, className, ...tooltipContentProps }, ref) => {
    const tooltipContentClassNames = tooltip({ intent, size });

    return (
      <Content
        ref={ref}
        {...tooltipContentProps}
        className={cn(tooltipContentClassNames, className)}
      />
    );
  }
);
