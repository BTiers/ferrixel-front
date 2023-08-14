"use client";

import React, { forwardRef, useEffect, useState } from "react";
import {
  Indicator,
  Item,
  RadioGroupItemProps,
  RadioGroupProps as RdxRadioGroupProps,
  Root,
} from "@radix-ui/react-radio-group";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Label } from "./Label";

const radioItemContainer = cva("flex items-center gap-x-3 font-normal cursor-pointer", {
  variants: {
    variant: {
      simple: "",
      boxed: "border border-gray-200 rounded-md px-3 py-2",
    },
    checked: {
      true: "",
      false: "",
    },
    color: {
      gray: "",
      rose: "",
      blue: "",
    },
  },
  compoundVariants: [
    {
      variant: "boxed",
      checked: true,
      color: "gray",
      className: "border-gray-900 bg-gray-50 text-gray-900",
    },
    {
      variant: "boxed",
      checked: true,
      color: "blue",
      className: "border-blue-900 bg-blue-50 text-blue-900",
    },
    {
      variant: "boxed",
      checked: true,
      color: "rose",
      className: "border-rose-900 bg-rose-50 text-rose-900",
    },
  ],
  defaultVariants: {
    variant: "simple",
    color: "gray",
  },
});

type RadioItemContainerVariants = VariantProps<typeof radioItemContainer>;

const radioItem = cva(
  [
    "peer relative w-4 h-4 rounded-full shrink-0",
    "border border-gray-200 text-white",
    "rdx-state-checked:bg-gray-900 rdx-state-checked:border-gray-900",
    "rdx-state-unchecked:bg-white",
    "focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      color: {
        gray: "rdx-state-checked:bg-gray-900 rdx-state-checked:border-gray-900",
        rose: "rdx-state-checked:bg-rose-900 rdx-state-checked:border-rose-900",
        blue: "rdx-state-checked:bg-blue-900 rdx-state-checked:border-blue-900",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  }
);

const radioIndicator = cva("absolute inset-0 flex items-center justify-center leading-0");

export type RadioGroupProps = RdxRadioGroupProps;

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(function RadioGroup(
  { className, ...radioGroupProps },
  ref
) {
  return <Root {...radioGroupProps} ref={ref} className={cn("space-y-1.5", className)} />;
});

type RadioItemProps = RadioGroupItemProps & {
  label?: string;
} & RadioItemContainerVariants;

export const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(function RadioItem(
  { className, label, id, value, children, checked, color, ...radioItemProps },
  ref
) {
  const radioItemContainerClassNames = radioItemContainer({
    variant: radioItemProps.variant,
    color,
    checked,
  });

  const radioItemClassNames = radioItem({ color });
  const radioIndicatorClassNames = radioIndicator();

  return (
    <Label className={cn(radioItemContainerClassNames, className)}>
      <Item {...radioItemProps} id={id} value={value} ref={ref} className={cn(radioItemClassNames)}>
        <Indicator className={radioIndicatorClassNames}>
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </Indicator>
      </Item>
      {children || label}
    </Label>
  );
});
