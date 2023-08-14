import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Loader } from "react-feather";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "active:scale-[0.99] inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:hover:bg-gray-800 dark:hover:text-gray-100 disabled:opacity-50 dark:focus:ring-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed dark:focus:ring-offset-gray-900 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800",
  {
    variants: {
      isLoading: {
        true: "cursor-wait relative",
        false: "",
      },
      variant: {
        default: "bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100",
        subtle: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100",
        ghost:
          "bg-transparent text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 dark:hover:text-gray-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-gray-900 dark:text-gray-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        inline: "",
        base: "h-10 py-2 px-4",
        small: "h-8 px-2 text-xs",
        xsmall: "h-6 px-2 text-xs",
        large: "h-11 px-8",
      },
      visibleOnPrint: {
        true: "",
        false: "print:hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      visibleOnPrint = false,
      type = "button",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, visibleOnPrint, isLoading }), className)}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <span
            className={cn(
              buttonVariants({ variant, size, visibleOnPrint }),
              "absolute inset-0 flex",
              variant === "outline" ? "bg-white" : ""
            )}
          >
            <Loader className="animate-spin" />
          </span>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
