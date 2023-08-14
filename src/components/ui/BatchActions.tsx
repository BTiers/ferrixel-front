import { PropsWithChildren } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

export type BatchActionsProps<T> = PropsWithChildren<{ rows: T[] }>;

export function BatchActions<T>({ rows, children }: BatchActionsProps<T>) {
  if (rows.length === 0) return null;

  return (
    <div
      role="alert"
      className="container sticky z-20 flex items-center shadow-lg border border-gray-200 justify-between px-4 py-3 mx-auto text-sm font-semibold text-gray-600 rounded-md max-w-fit bottom-2 top-3 bg-white"
    >
      <div className="flex items-center space-x-1">
        <CheckIcon />
        <span>{rows.length} éléments sélectionnés</span>
      </div>
      <div className="flex items-center pl-24 space-x-3">{children}</div>
    </div>
  );
}
