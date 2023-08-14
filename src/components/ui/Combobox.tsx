"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { CommandLoading } from "cmdk";
import { compact } from "lodash";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Tag, TagRemoveButton } from "@/components/ui/Tag";

export type ComboboxProps<T = unknown> = {
  /** Value of the selected option */
  value?: string | null;
  /** Value of the selected option */
  defaultValue?: string | null;
  /** Callback when the selected option changes */
  onChange?: (value: string, original: T) => void;
  /** Options to display in the popover */
  options: T[];
  /** Text to display for the option */
  getOptionLabel: (option: T) => React.ReactNode;
  /** Unique identifier for the option */
  getOptionValue: (option: T) => string;
  /** Callback when the search input changes */
  onSearchChange?: (value: string) => void;
  /** Text to display when no options are available */
  emptyText?: React.ReactNode;
  /** Placeholder text to display when no value is selected */
  placeholder?: string;
  /** Whether the popover should be open by default */
  defaultOpen?: boolean;
  /** Whether the popover should close when an option is selected */
  closeOnSelect?: boolean;
  /** Whether the options should be filtered by the Combobox when searching */
  shouldFilter?: boolean;
  /** Whether the options are loading */
  loading?: boolean;
  /** Whether the Combobox is disabled */
  disabled?: boolean;
  /** Used to show multiple selected indicator, should not be used directly, refer to ComboboxMultiple */
  __selectedOptionValues?: string[];
};

export function Combobox<T>({
  value,
  defaultValue,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  onSearchChange,
  emptyText,
  placeholder,
  defaultOpen = false,
  closeOnSelect = true,
  shouldFilter = false,
  loading,
  disabled,
  __selectedOptionValues,
}: ComboboxProps<T>) {
  const t = useTranslations("ui.combobox");

  const [open, setOpen] = useState(defaultOpen);
  const [_value, setValue] = useState<string | undefined | null>(value ?? defaultValue);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);

      if (!open) onSearchChange?.("");
    },
    [onSearchChange]
  );

  const selectedOption =
    value === null
      ? undefined
      : options.find((option) => {
          if (!option) return false;

          const optionValue = getOptionValue(option);

          if (value && optionValue === value) return true;
          return _value && optionValue === _value;
        });

  const handleSelect = useCallback(
    (value: string) => {
      const option = options.find((option) => getOptionValue(option) === value);

      // If the option is not found, we don't do anything
      if (!option) return;

      setValue(getOptionValue(option));
      onChange?.(getOptionValue(option), option);

      if (closeOnSelect) setOpen(false);
    },
    [options, closeOnSelect, onChange]
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="min-w-[200px] justify-between font-normal w-full"
        >
          {selectedOption ? getOptionLabel(selectedOption) : placeholder ?? t("placeholder")}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-0"
        side="bottom"
        align="start"
      >
        <Command shouldFilter={shouldFilter}>
          <CommandInput
            onValueChange={onSearchChange}
            placeholder={placeholder ?? t("placeholder")}
          />
          {!loading && !options.length && (
            <CommandEmpty>{emptyText ?? t("emptySearch")}</CommandEmpty>
          )}
          <CommandList>
            {loading && <CommandLoading>{t("loading")}</CommandLoading>}
            <CommandGroup>
              {options.map((option) => {
                const optionValue = getOptionValue(option);
                const isSelectedMultiple =
                  __selectedOptionValues && __selectedOptionValues.includes(optionValue);
                const isSelected = __selectedOptionValues
                  ? isSelectedMultiple
                  : _value && _value === optionValue;

                return (
                  <CommandItem key={optionValue} value={optionValue} onSelect={handleSelect}>
                    <CheckIcon
                      className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
                    />
                    {getOptionLabel(option)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export type ComboboxMultipleProps<T = unknown> = Omit<
  ComboboxProps<T>,
  "value" | "defaultValue" | "onChange"
> & {
  /** Values of the selected options */
  value?: string[];
  /** Values of the selected options */
  defaultValue?: string[];
  /** Callback when the selected options changes */
  onChange?: (values: string[], originals: T[]) => void;

  /** Render prop to render the selected options */
  children?: (
    values: string[],
    options: T[],
    actions: {
      remove: (value: string) => void;
      append: (value: string) => void;
      setValues: React.Dispatch<React.SetStateAction<string[]>>;
    }
  ) => React.ReactNode;

  /** Use to cache options, useful when used in conjonction with paginated queries */
  cacheOptions?: boolean;
};

export function ComboboxMultiple<T>({
  children,
  value,
  defaultValue = [],
  onChange,
  options,
  cacheOptions = true,
  getOptionLabel,
  getOptionValue,
  onSearchChange,
  emptyText,
  placeholder,
  defaultOpen = false,
  closeOnSelect = false,
  shouldFilter = false,
  loading,
  disabled,
}: ComboboxMultipleProps<T>) {
  const [parent] = useAutoAnimate();

  const [_values, setValues] = useState<string[]>(value ?? defaultValue);

  const [cachedOptions, setCachedOptions] = useState<T[]>([]);

  const selectedOptions = useMemo(() => {
    if (cacheOptions) return cachedOptions;
    return options.filter((option) => _values.includes(getOptionValue(option)));
  }, [_values, options, cacheOptions, cachedOptions]);

  const handleRemoveItem = useCallback(
    (value: string) => {
      const newValue = _values.filter((previousValue) => previousValue !== value);

      onChange?.(
        newValue,
        options.filter((option) => newValue.includes(getOptionValue(option)))
      );
      setValues(newValue);
      setCachedOptions((prev) =>
        prev.filter((option) => newValue.includes(getOptionValue(option)))
      );
    },
    [onChange, _values, options, cachedOptions]
  );

  const handleAppendItem = useCallback(
    (value: string, original?: T) => {
      const newValue = [..._values, value];

      onChange?.(
        newValue,
        options.filter((option) => newValue.includes(getOptionValue(option)))
      );
      setValues(newValue);
      setCachedOptions((prev) => {
        if (original) return compact([...prev, original]);
        return compact([...prev, options.find((option) => getOptionValue(option) === value)]);
      });
    },
    [onChange, _values, options, cachedOptions]
  );

  const handleSelect = useCallback(
    (value: string, original: T) => {
      if (_values.find((option) => option === value)) handleRemoveItem(value);
      else handleAppendItem(value, original);
    },
    [_values, options, onChange]
  );

  const values = value ? value : _values;

  return (
    <div className="flex flex-col space-y-2">
      <Combobox
        value={null}
        onChange={handleSelect}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onSearchChange={onSearchChange}
        emptyText={emptyText}
        placeholder={placeholder}
        defaultOpen={defaultOpen}
        closeOnSelect={closeOnSelect}
        shouldFilter={shouldFilter}
        loading={loading}
        disabled={disabled}
        __selectedOptionValues={values}
      />
      {children?.(values, selectedOptions, {
        remove: handleRemoveItem,
        append: handleAppendItem,
        setValues,
      })}
      {!children && selectedOptions.length > 0 && (
        <ul ref={parent} className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <li key={getOptionValue(option)}>
              <Tag intent="neutral" className="gap-1 whitespace-nowrap">
                {getOptionLabel(option)}
                <TagRemoveButton
                  intent="neutral"
                  onClick={() => handleRemoveItem(getOptionValue(option))}
                />
              </Tag>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
