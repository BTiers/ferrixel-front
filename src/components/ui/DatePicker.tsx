"use client";

import React, { useCallback, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverPortal } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { DayPickerDefaultProps, DayPickerSingleProps } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Button } from "./Button";
import { Calendar, CalendarProps } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

export type DatePickerProps = {
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  placeholder?: string;
  className?: string;
} & Omit<DayPickerDefaultProps | DayPickerSingleProps, "onSelect" | "selected">;

export function DatePicker({ value, onChange, placeholder, disabled, className }: DatePickerProps) {
  const t = useTranslations("ui.datepicker");

  const [date, setDate] = useState<Date | undefined>(value);

  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      setDate(date);
      onChange?.(date);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("justify-start text-left font-normal", !date && "text-gray-500", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder ?? t("placeholder")}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            disabled={disabled}
            mode="single"
            selected={value ?? date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
