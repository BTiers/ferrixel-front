"use client";

import React, { useCallback, useRef } from "react";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { DeepPartial } from "react-hook-form";
import { z } from "zod";

import { Button, Header, Popover, PopoverContent, PopoverTrigger, Text } from "@/components/ui";
import { ArrayRef, Form } from "@/components/form";

const TableSchema = z.object({
  columns: z.array(
    z.object({
      accessor: z.string(),
      header: z.string(),
      meta: z
        .object({
          isActive: z.boolean().optional(),
          isSortDisabled: z.boolean().optional(),
        })
        .optional(),
    })
  ),
});

export type ColumnSelectState = z.infer<typeof TableSchema>["columns"];

const TableForm = new Form(TableSchema);

export type ColumnSelectProps = {
  columns: ColumnSelectState;
  /*
   * If provided, a reset button will be displayed and will reset the columns to the provided value.
   */
  defaultColumns?: ColumnSelectState;
  onChange: (columns: ColumnSelectState) => void;
};

function ColumnSelectComponent({ columns, defaultColumns, onChange }: ColumnSelectProps) {
  const arrayRef = useRef<ArrayRef<typeof TableSchema>>(null);
  const onSubmit = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    if (!defaultColumns) return;

    const richDefaultColumns = defaultColumns.map((column) => ({
      ...column,
      meta: {
        ...column.meta,
        isActive: column.meta?.isActive ?? true,
        isSortDisabled: column.meta?.isSortDisabled ?? false,
      },
    }));

    arrayRef?.current?.replace(richDefaultColumns);
  }, [defaultColumns]);

  const handleOnChange = useCallback(
    (values: DeepPartial<z.infer<typeof TableSchema>>) => {
      onChange(values.columns as ColumnSelectState);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <MagicWandIcon className="mr-2" />
          Modifier les colonnes
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" size="large" className="border border-gray-200">
        <div className="flex items-baseline justify-between pb-3">
          <div>
            <Header level="h5">Modifier les colonnes</Header>
            <Text className="text-xs" intent="muted">
              Drag & Drop
            </Text>
          </div>
          {defaultColumns && (
            <Button variant="link" size="inline" onClick={handleReset}>
              Réinitialiser
            </Button>
          )}
        </div>
        <TableForm.Root onChange={handleOnChange} onSubmit={onSubmit} defaultValues={{ columns }}>
          <TableForm.SortableArray name="columns" ref={arrayRef}>
            {(fields) => {
              return (
                <div className="flex flex-col space-y-1">
                  {fields.map((field, index) => (
                    <TableForm.SortableArrayItem
                      key={field.id}
                      id={field.id}
                      index={index}
                      className={`items-center justify-between p-2.5 bg-white border rounded-md border-gray-200 ${
                        field.meta?.isSortDisabled ? "hidden" : "flex"
                      }`}
                    >
                      <TableForm.Checkbox
                        size="small"
                        name={`columns.${index}.meta.isActive`}
                        disabled={field.meta?.isSortDisabled}
                        label={field.header}
                        id={field.id}
                      />
                      <TableForm.SortableArrayItemHandle size="xsmall" />
                    </TableForm.SortableArrayItem>
                  ))}
                </div>
              );
            }}
          </TableForm.SortableArray>
        </TableForm.Root>
      </PopoverContent>
    </Popover>
  );
}

export const ColumnSelect = React.memo(ColumnSelectComponent);
