"use client";

import React from "react";
import {
  CollapsibleContentProps,
  CollapsibleProps,
  Content,
  CollapsibleTriggerProps as RdxCollapsibleTriggerProps,
  Root,
  Trigger,
} from "@radix-ui/react-collapsible";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const Collapsible: React.FC<CollapsibleProps> = Root;
export const CollapsibleContent: React.FC<CollapsibleContentProps> = Content;

const collapsibleTrigger = cva([
  "group relative select-none w-full",
  "focus:outline-none",
]);

export type CollapsibleTriggerVariantProps = VariantProps<typeof collapsibleTrigger>;
export type CollapsibleTriggerProps = CollapsibleTriggerVariantProps &
  RdxCollapsibleTriggerProps & { withArrow?: boolean };

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  className,
  withArrow = true,
  children,
  ...collapsibleTriggerProps
}) => {
  const collapsibleTriggerClassNames = collapsibleTrigger();

  return (
    <Trigger {...collapsibleTriggerProps} className={cn(collapsibleTriggerClassNames, className)}>
      {withArrow && !collapsibleTriggerProps.disabled && (
        <CaretRightIcon className="absolute print:hidden rounded right-3 top-1 text-current duration-300 ease-in-out transform group-rdx-state-open:rotate-90 group-focus-visible:ring group-focus-visible:ring-gray-600" />
      )}
      {children}
    </Trigger>
  );
};
