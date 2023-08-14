import React, { ElementRef, forwardRef } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tag = cva(["inline-flex shrink-0 items-center rounded-md font-medium"], {
  variants: {
    intent: {
      neutral: "bg-gray-100 text-gray-800",
      primary: "bg-rose-100 text-rose-800",
      secondary: "bg-sky-100 text-sky-800",
      tertiary: "bg-indigo-100 text-indigo-800",
      quaternary: "bg-amber-100 text-amber-800",
      quinary: "bg-teal-100 text-teal-800",
      success: "bg-emerald-100 text-emerald-800",
      danger: "bg-red-100 text-red-800",
      collaborator: "bg-sky-100 text-sky-800",
      referent: "bg-amber-100 text-amber-800",
    },
    size: {
      small: "px-2.5 py-0.5 text-xs space-x-1",
      medium: "px-3 py-0.5 text-sm space-x-2",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "small",
  },
});

export type TagVariantProps = VariantProps<typeof tag>;
export type TagProps = TagVariantProps & React.HTMLAttributes<HTMLDivElement>;

export const Tag = forwardRef<ElementRef<"div">, TagProps>(
  ({ intent, size, className, ...tagProps }, ref) => {
    const tagClassNames = tag({ intent, size });

    return (
      <div ref={ref}>
        <div {...tagProps} className={cn(tagClassNames, className)} />
      </div>
    );
  }
);

const tagRemoveButton = cva("inline-flex items-center justify-center rounded-full bg-transparent", {
  variants: {
    intent: {
      neutral: "hover:bg-gray-800 hover:text-gray-100 text-gray-800",
      primary: "hover:bg-rose-800 hover:text-rose-100 text-rose-800",
      secondary: "hover:bg-sky-800 hover:text-sky-100 text-sky-800",
      tertiary: "hover:bg-indigo-800 hover:text-indigo-100 text-indigo-800",
      quaternary: "hover:bg-amber-800 hover:text-amber-100 text-amber-800",
      quinary: "hover:bg-teal-800 hover:text-teal-100 text-teal-800",
      success: "hover:bg-emerald-800 hover:text-emerald-100 text-emerald-800",
      danger: "hover:bg-red-800 hover:text-red-100 text-red-800",
      collaborator: "hover:bg-sky-800 hover:text-sky-100 text-sky-800",
      referent: "hover:bg-amber-800 hover:text-amber-100 text-amber-800",
    },
    size: {
      small: "w-4 h-4 p-px",
      medium: "w-5 h-5 p-0.5",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "small",
  },
});

const tagRemoveIcon = cva("", {
  variants: {
    size: {
      small: "w-3 h-3",
      medium: "w-4 h-4",
    },
  },
  defaultVariants: {
    size: "small",
  },
});

export type TagRemoveButtonVariantProps = VariantProps<typeof tagRemoveButton>;
export type TagRemoveButtonProps = TagRemoveButtonVariantProps &
  React.HTMLAttributes<HTMLButtonElement>;

export const TagRemoveButton: React.FC<TagRemoveButtonProps> = ({
  intent,
  size,
  className,
  ...tagRemoveButtonProps
}) => {
  const tagRemoveButtonClassNames = tagRemoveButton({ intent, size });
  const tagRemoveIconClassNames = tagRemoveIcon({ size });

  return (
    <button
      {...tagRemoveButtonProps}
      type="button"
      className={cn(tagRemoveButtonClassNames, className)}
    >
      <Cross2Icon className={cn(tagRemoveIconClassNames)} />
    </button>
  );
};
