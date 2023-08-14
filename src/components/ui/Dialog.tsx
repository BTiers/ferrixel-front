"use client";

import React from "react";
import {
  Close,
  Content,
  Description,
  DialogProps,
  DialogTriggerProps,
  Overlay,
  Portal,
  Trigger as RdxTrigger,
  Root,
  Title,
} from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Button } from "./Button";
import { Header } from "./Typography";

export const Dialog: React.FC<DialogProps> = Root;
export const DialogTrigger: React.FC<DialogTriggerProps> = RdxTrigger;

const dialogContent = cva(
  [
    "fixed z-50 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-4 lg:p-6 max-h-[calc(100vh-2rem)] overflow-y-auto",
  ],
  {
    variants: {
      size: {
        small: "w-full max-w-lg mx-auto",
        medium: "w-full max-w-xl mx-auto",
        large: "w-full max-w-2xl mx-auto",
        xlarge: "w-full max-w-5xl mx-auto",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const dialogOverlay = cva(["fixed z-30 inset-0 bg-gray-900/60"]);
const dialogClose = cva(["fixed top-[0.85rem] right-2 lg:top-[1.35rem] lg:right-4"]);

export type DialogContentVariantProps = VariantProps<typeof dialogContent>;
export type DialogContentProps = DialogContentVariantProps &
  React.HTMLAttributes<HTMLDivElement> & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    closable?: boolean;
  };

export function DialogContent({
  size,
  title,
  description,
  closable = true,
  className,
  children,
}: DialogContentProps) {
  const dialogContentClassNames = dialogContent({ size });
  const dialogOverlayClassNames = dialogOverlay();
  const dialogCloseClassNames = dialogClose();

  return (
    <Portal>
      <Overlay className={dialogOverlayClassNames} />
      <Content className={cn(dialogContentClassNames, className)}>
        {(title || description) && (
          <div className="mr-2 flex flex-col pb-6 lg:mr-4">
            {title && (
              <Title asChild>
                <Header level="h3">{title}</Header>
              </Title>
            )}
            {description && (
              <Description className="text-sm font-normal text-gray-600">{description}</Description>
            )}
          </div>
        )}
        {children}
        {closable && (
          <Close asChild>
            <Button
              size="small"
              variant="ghost"
              className={dialogCloseClassNames}
              aria-label="Close"
            >
              <Cross1Icon className="h-4 w-4" />
            </Button>
          </Close>
        )}
      </Content>
    </Portal>
  );
}
