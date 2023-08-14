"use client";

import React, { useMemo } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatar = cva(["relative flex shrink-0"], {
  variants: {
    size: {
      small: "h-8 w-8",
      medium: "h-10 w-10",
      large: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps & VariantProps<typeof avatar>
>(({ className, size, ...props }, ref) => {
  const avatarClassnames = avatar({ size });

  return <AvatarPrimitive.Root ref={ref} className={cn(avatarClassnames, className)} {...props} />;
});

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full rounded-md object-cover", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & { name: string }
>(({ className, children, name, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-md bg-sky-100 text-xs font-medium text-sky-900 dark:bg-gray-700",
      className
    )}
    {...props}
  >
    {name
      ?.split(" ")
      .map((word) => word[0])
      .join("")}
    {children}
  </AvatarPrimitive.Fallback>
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const avatarStatus = cva(["block rounded-full"], {
  variants: {
    size: {
      small: "h-2 w-2",
      medium: "h-2.5 w-2.5",
      large: "h-3 w-3",
    },
    status: {
      active: "bg-green-400",
      waiting: "bg-amber-400",
      neutral: "bg-gray-400",
    },
  },
  defaultVariants: {
    size: "medium",
    status: "neutral",
  },
});

const AvatarStatus = ({
  size,
  status,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof avatarStatus>) => {
  const avatarStatusClassnames = avatarStatus({ size, status });

  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white",
        className
      )}
      {...props}
    >
      <span className={avatarStatusClassnames} />
    </span>
  );
};

AvatarStatus.displayName = "AvatarStatus";

const avatarGroup = cva(["flex items-center"], {
  variants: {
    size: {
      small: "-space-x-3",
      medium: "-space-x-4",
      large: "-space-x-6",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const AvatarGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    items: { src?: string | null; name?: string | null }[];
    limit?: number;
  } & VariantProps<typeof avatar>
>(({ className, size, items, limit = 3, ...props }, ref) => {
  const avatarGroupClassnames = avatarGroup({ size });

  const _items = useMemo(() => items.slice(0, limit), [items, limit]);
  const remainingItems = items.length - limit;

  return (
    <div className="flex items-center space-x-2">
      <div className={cn(avatarGroupClassnames, className)} ref={ref} {...props}>
        {_items.map(({ src, name }, index) => {
          return (
            <Avatar key={index} size={size}>
              <AvatarImage className="ring-2 ring-white" src={src || undefined} alt={name ?? ""} />
              {name && <AvatarFallback className="ring-2 ring-white" name={name} />}
            </Avatar>
          );
        })}
      </div>
      {remainingItems > 0 && (<span className="text-sm font-medium text-gray-600">+{remainingItems}</span>)}
    </div>
  );
});

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarStatus, AvatarGroup };
