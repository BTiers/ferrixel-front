"use client";

import {
  Root,
  Portal,
  Trigger,
  Content,
  Item,
  Separator,
  Label,
  Sub,
  SubTrigger,
  SubContent,
  DropdownMenuContentProps,
  DropdownMenuSeparatorProps,
  DropdownMenuLabelProps,
  DropdownMenuItemProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuTriggerProps,
  DropdownMenuSubProps,
  DropdownMenuProps,
} from "@radix-ui/react-dropdown-menu";
import { CaretRightIcon } from "@radix-ui/react-icons";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const DropdownMenu: React.FC<DropdownMenuProps> = Root;
export const DropdownMenuTrigger: React.ForwardRefExoticComponent<
  DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>
> = Trigger;

export const DropdownMenuSub: React.FC<DropdownMenuSubProps> = Sub;

const dropdownSeparator = cva("my-1 h-px bg-gray-200");

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  className,
  ...dropdownSeparatorProps
}) => {
  const dropdownSeparatorClassName = dropdownSeparator();

  return (
    <Separator {...dropdownSeparatorProps} className={cn(dropdownSeparatorClassName, className)} />
  );
};

const dropdownLabel = cva("select-none px-2 py-2 text-xs text-gray-700");

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({
  className,
  ...dropdownLabelProps
}) => {
  const dropdownLabelClassName = dropdownLabel();

  return <Label {...dropdownLabelProps} className={cn(dropdownLabelClassName, className)} />;
};

const dropdownContent = cva([
  "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
  "rounded-lg px-1.5 py-1 shadow-md min-w-[14rem]",
  "bg-white",
]);

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  className,
  ...dropdownContentProps
}) => {
  const dropdownContentClassName = dropdownContent();

  return (
    <Portal>
      <Content {...dropdownContentProps} className={cn(dropdownContentClassName, className)} />
    </Portal>
  );
};

const dropdownItem = cva(
  [
    "flex cursor-default select-none items-center rounded-md px-2 py-2 outline-none",
    "text-gray-400 focus:bg-gray-50",
  ],
  {
    variants: {
      size: {
        small: "text-xs",
        medium: "text-sm",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

interface MenuItemProps {
  icon?: React.ReactNode;
}
export type DropdownMenuItemVariantProps = VariantProps<typeof dropdownItem>;

export const DropdownMenuItem: React.FC<
  DropdownMenuItemProps & MenuItemProps & DropdownMenuItemVariantProps
> = ({ className, children, icon, size, ...dropdownItemProps }) => {
  const dropdownItemClassName = dropdownItem({ size });

  return (
    <Item {...dropdownItemProps} className={cn(dropdownItemClassName, className)}>
      {icon && <span className="h-3.5 w-3.5 mr-2">{icon}</span>}
      <div className="flex items-center justify-between flex-grow space-x-3 text-gray-700">
        {children}
      </div>
    </Item>
  );
};

const dropdownSubTrigger = cva(
  [
    "flex w-full cursor-default select-none items-center rounded-md px-2 py-2 outline-none",
    "text-gray-400 focus:bg-gray-50",
  ],
  {
    variants: {
      size: {
        small: "text-xs",
        medium: "text-sm",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

interface MenuSubTriggerProps {
  icon?: React.ReactNode;
}
export type DropdownSubTriggerVariantProps = VariantProps<typeof dropdownSubTrigger>;

export const DropdownSubTrigger: React.FC<
  DropdownMenuSubTriggerProps & MenuSubTriggerProps & DropdownSubTriggerVariantProps
> = ({ className, children, icon, size, ...dropdownSubTriggerProps }) => {
  const dropdownSubTriggerClassName = dropdownSubTrigger({ size });

  return (
    <SubTrigger
      {...dropdownSubTriggerProps}
      className={cn(dropdownSubTriggerClassName, className)}
    >
      {icon && <span className="h-3.5 w-3.5 mr-2">{icon}</span>}
      <div className="flex-grow text-gray-700">{children}</div>
      <CaretRightIcon className="h-3.5 w-3.5" />
    </SubTrigger>
  );
};

const dropdownSubContent = cva(
  [
    "origin-radix-dropdown-menu radix-side-right:animate-scale-in",
    "w-full rounded-md text-sm shadow-md",
    "bg-white",
  ],
  {
    variants: {
      size: {
        medium: "px-1 py-1",
        large: "px-6 py-3",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export type DropdownSubContentProps = DropdownMenuSubContentProps &
  VariantProps<typeof dropdownSubContent>;

export const DropdownSubContent: React.FC<DropdownSubContentProps> = ({
  size,
  className,
  ...dropdownSubContentProps
}) => {
  const dropdownSubContentClassName = dropdownSubContent({ size });

  return (
    <SubContent
      {...dropdownSubContentProps}
      className={cn(dropdownSubContentClassName, className)}
    />
  );
};
