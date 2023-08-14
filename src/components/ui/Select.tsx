"use client";

import React, { forwardRef } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  SelectItemProps as RdxSelectItemProps,
  SelectProps as RdxSelectProps,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "./Button";

export type SelectProps = RdxSelectProps & {
  placeholder?: string;
} & Pick<ButtonProps, "size">;

export const Select = forwardRef<HTMLInputElement, SelectProps>(function Select(
  { size, children, ...selectProps },
  ref
) {
  return (
    <Root {...selectProps}>
      <Trigger asChild>
        <Button
          size={size}
          variant="outline"
          className="justify-between flex-grow w-full py-2 font-normal bg-white"
        >
          <div className="truncate">
            <Value placeholder={selectProps.placeholder} ref={ref} />
          </div>
          <Icon className="ml-2 pt-0.5">
            <ChevronDownIcon />
          </Icon>
        </Button>
      </Trigger>
      <Portal>
        <Content className="z-50">
          <ScrollUpButton className="flex items-center justify-center text-gray-700">
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport className="p-2 bg-white rounded-lg shadow-lg">{children}</Viewport>
          <ScrollDownButton className="flex items-center justify-center text-gray-700">
            <ChevronDownIcon />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  );
});

const selectItem = cva(
  [
    "relative flex justify-between items-center rounded-md text-sm text-gray-700 focus:bg-gray-100",
    "rdx-disabled:opacity-50",
    "focus:outline-none select-none",
  ],
  {
    variants: {
      size: {
        small: "px-6 py-1",
        base: "px-6 py-2",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
);

const selectItemIndicator = cva(["absolute inline-flex items-center left-1"]);

export type SelectItemProps = RdxSelectItemProps & VariantProps<typeof selectItem>;

export const SelectItem: React.FC<SelectItemProps> = ({
  className,
  size,
  textValue,
  children,
  ...selectItemProps
}) => {
  const selectItemClassName = selectItem({ size });
  const selectItemIndicatorClassName = selectItemIndicator({});

  return (
    <Item {...selectItemProps} className={cn(className, selectItemClassName)}>
      <ItemIndicator className={selectItemIndicatorClassName}>
        <CheckIcon />
      </ItemIndicator>
      <ItemText>{textValue}</ItemText>
      {children}
    </Item>
  );
};
