"use client";

import React, { forwardRef, SVGAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { debounce } from "lodash";

import { cn } from "@/lib/utils";

const inputIcon = cva(["absolute inset-y-0"], {
  variants: {
    icon: {
      left: "left-3",
      right: "right-3",
    },
    size: {
      xsmall: "h-full w-3",
      small: "h-full w-4",
      base: "h-full w-5",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const input = cva(
  [
    "w-full bg-white text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      size: {
        xsmall: "h-6 px-2 text-xs",
        small: "h-8 px-2 text-xs",
        base: "h-10 px-4",
      },
      icon: {
        left: "",
        right: "",
      },
      variant: {
        default:
          "rounded py-2 px-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900",
        flat: "p-1",
      },
    },
    compoundVariants: [
      {
        icon: "right",
        size: ["small", "base"],
        className: "pr-8",
      },
      {
        icon: "left",
        size: ["small", "base"],
        className: "pl-10",
      },
    ],
    defaultVariants: {
      size: "base",
      variant: "default",
    },
  }
);

export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
}

type Icon = React.FC<IconProps>;

export type InputVariantProps = Omit<VariantProps<typeof input>, "icon">;
export type InputProps = InputVariantProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    leftIcon?: Icon;
    rightIcon?: Icon;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size,
    variant,
    leftIcon: LeftIcon = undefined,
    rightIcon: RightIcon = undefined,
    className,
    ...inputProps
  },
  ref
) {
  const inputClassNames = input({
    size,
    icon: LeftIcon ? "left" : RightIcon ? "right" : undefined,
    variant,
  });

  const inputIconClassNames = inputIcon({
    size,
    icon: LeftIcon ? "left" : RightIcon ? "right" : undefined,
  });

  return (
    <div className="group relative flex-grow text-gray-600">
      {LeftIcon && <LeftIcon className={inputIconClassNames} />}
      <input ref={ref} {...inputProps} className={cn(inputClassNames, className)} />
      {RightIcon && <RightIcon className={inputIconClassNames} />}
    </div>
  );
});

export const DebouncedInput = forwardRef<
  HTMLInputElement,
  InputProps & { debouncedTiming?: number }
>(function Input(
  {
    size,
    leftIcon: LeftIcon = undefined,
    rightIcon: RightIcon = undefined,
    className,
    onChange,
    debouncedTiming = 200,
    ...inputProps
  },
  ref
) {
  const debouncedOnChange = debounce(onChange!, debouncedTiming);

  const inputClassNames = input({
    size,
    icon: LeftIcon ? "left" : RightIcon ? "right" : undefined,
  });

  const inputIconClassNames = inputIcon({
    size,
    icon: LeftIcon ? "left" : RightIcon ? "right" : undefined,
  });

  return (
    <div className="group relative flex-grow text-gray-600">
      {LeftIcon && <LeftIcon className={inputIconClassNames} />}
      <input
        ref={ref}
        onChange={debouncedOnChange}
        {...inputProps}
        className={cn(inputClassNames, className)}
      />
      {RightIcon && <RightIcon className={inputIconClassNames} />}
    </div>
  );
});
