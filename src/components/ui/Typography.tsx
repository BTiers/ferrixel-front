"use client";

import React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const header = cva([""], {
  variants: {
    level: {
      h1: "font-semibold text-3xl text-gray-800",
      h2: "font-semibold text-2xl text-gray-800",
      h3: "font-semibold text-lg text-gray-800",
      h4: "font-medium text-base text-gray-700",
      h5: "font-medium text-sm text-gray-700",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

export type HeaderVariantProps = VariantProps<typeof header>;

export type HeaderProps = HeaderVariantProps & React.HTMLAttributes<HTMLHeadingElement>;

export const Header: React.FC<HeaderProps> = ({ level = "h2", className, ...headerProps }) => {
  const Component = level as NonNullable<HeaderVariantProps["level"]>;
  const headerClassNames = header({ level });

  return <Component {...headerProps} className={cn(headerClassNames, className)} />;
};

const text = cva([""], {
  variants: {
    intent: {
      base: "font-normal text-gray-800",
      muted: "font-normal text-gray-500",
    },
    navigable: {
      true: "underline underline-offset-2",
      false: "",
    },
  },
  defaultVariants: {
    intent: "base",
  },
});

export type TextVariantProps = VariantProps<typeof text>;

export type TextProps = TextVariantProps & React.HTMLAttributes<HTMLParagraphElement>;

export const Text: React.FC<TextProps> = ({
  intent,
  navigable = false,
  className,
  ...textProps
}) => {
  const textClassNames = text({ intent, navigable });

  return <p {...textProps} className={cn(textClassNames, className)} />;
};

export const Kdb: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...kdbProps
}) => {
  return (
    <kbd
      {...kdbProps}
      className={cn("bg-gray-100 text-xs tracking-widest rounded px-1", className)}
    />
  );
};
