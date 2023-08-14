"use client";

import React, { ComponentProps, forwardRef } from "react";
import { Indicator, CheckboxProps as RdxCheckboxProps, Root } from "@radix-ui/react-checkbox";
import { CheckIcon, DividerHorizontalIcon } from "@radix-ui/react-icons";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

const checkboxItemContainer = cva("flex items-center gap-x-3 font-normal cursor-pointer", {
  variants: {
    variant: {
      simple: "",
      boxed: "border border-gray-200 rounded-md px-3 py-2",
    },
    checked: {
      true: "",
      false: "",
      indeterminate: "",
    },
  },
  compoundVariants: [
    {
      variant: "boxed",
      checked: [true, "indeterminate"],
      className: "border-rose-900 bg-rose-100 text-rose-900",
    },
  ],
  defaultVariants: {
    variant: "simple",
  },
});

const checkbox = cva(
  [
    "flex items-center justify-center flex-shrink-0 rounded border border-gray-200",
    "rdx-state-checked:bg-gray-900 rdx-state-checked:border-gray-900 rdx-state-unchecked:bg-gray-50",
    "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      color: {
        base: "rdx-state-checked:bg-gray-900 rdx-state-checked:border-gray-900 focus-visible:ring-gray-500",
        rose: "rdx-state-checked:bg-rose-600 rdx-state-checked:border-rose-600 focus-visible:ring-rose-500",
        teal: "rdx-state-checked:bg-teal-600 rdx-state-checked:border-teal-600 focus-visible:ring-teal-500",
        indigo:
          "rdx-state-checked:bg-indigo-600 rdx-state-checked:border-indigo-600 focus-visible:ring-indigo-500",
        sky: "rdx-state-checked:bg-sky-600 rdx-state-checked:border-sky-600 focus-visible:ring-sky-500",
      },
      size: {
        small: "h-5 w-5",
        medium: "h-5 w-5",
      },
    },
    defaultVariants: {
      color: "base",
      size: "medium",
    },
  }
);

const checkboxIcon = cva(["self-center text-white flex-shrink-0"], {
  variants: {
    size: {
      small: "h-3.5 w-3.5",
      medium: "w-4 h-4",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const checkboxLabel = cva("font-normal", {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-base",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type CheckboxGroupProps = ComponentProps<"div">;

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  { className, ...checkboxGroupProps },
  ref
) {
  return <div ref={ref} className={cn("space-y-1", className)} {...checkboxGroupProps} />;
});

type CheckboxItemContainerVariantProps = VariantProps<typeof checkboxItemContainer>;
type CheckboxVariantProps = VariantProps<typeof checkbox>;
export type CheckboxProps = RdxCheckboxProps &
  CheckboxVariantProps &
  CheckboxItemContainerVariantProps & { label?: string };

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function CheckboxGroup(
  { className, label, id, value, size, checked, color, children, ...checkboxProps },
  ref
) {
  const checkboxItemContainerClassNames = checkboxItemContainer({
    variant: checkboxProps.variant,
    checked: !!checked,
  });
  const checkboxClassNames = checkbox({ size, color });
  const checkboxIconClassNames = checkboxIcon({ size });
  const checkboxLabelClassNames = checkboxLabel({ size });

  return (
    <Label className={cn(checkboxItemContainerClassNames, checkboxLabelClassNames, className)}>
      <Root
        {...checkboxProps}
        checked={checked}
        id={id || `${value}`}
        value={value}
        ref={ref}
        className={cn(checkboxClassNames)}
      >
        <Indicator>
          {checked === "indeterminate" && (
            <DividerHorizontalIcon className={checkboxIconClassNames} />
          )}
          {checked !== "indeterminate" && <CheckIcon className={checkboxIconClassNames} />}
        </Indicator>
      </Root>
      {children || label}
    </Label>
  );
});
