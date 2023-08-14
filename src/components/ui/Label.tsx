"use client";

import React from "react";

import { Root, LabelProps as RdxLabelProps } from "@radix-ui/react-label";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const label = cva(["text-sm font-medium text-gray-700"]);

export type LabelVariantProps = VariantProps<typeof label>;
export type LabelProps = LabelVariantProps & RdxLabelProps;

export const Label: React.FC<LabelProps> = ({ className, ...labelProps }) => {
  const labelClassNames = label();

  return <Root {...labelProps} className={cn(labelClassNames, className)} />;
};
