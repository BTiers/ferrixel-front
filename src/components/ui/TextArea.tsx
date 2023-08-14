import React, { forwardRef } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textarea = cva(["w-full rounded border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"], {
  variants: {
    size: {
      small: "text-xs py-2 px-3",
      medium: "text-sm py-2 px-4",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type TextAreaVariantProps = Omit<VariantProps<typeof textarea>, "icon">;
export type TextAreaProps = TextAreaVariantProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { size, className, ...textareaProps },
  ref
) {
  const textareaClassNames = textarea({
    size,
  });

  return (
    <textarea
      ref={ref}
      rows={size === "medium" ? 3 : 2}
      {...textareaProps}
      className={cn(textareaClassNames, className)}
    />
  );
});
