"use client";

import React, { useCallback, useEffect } from "react";
import { boardAtom, getCellId, useCellAtom, userNameAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";

import { Input } from "@/components/ui";
import { selectCell, setCellValue } from "@/websocket/lib";

type CellProps = {
  column: number;
  row: number;
  value: string | null;
  id: string | null;
  user: string | null;
};

function useGetLockColor(userName: string) {
  const viewer = useAtomValue(userNameAtom);

  if (userName === viewer) return ["ring-amber-600", "ring-amber-600 bg-amber-600"] as const;

  const colorClassNames = [
    ["ring-fuchsia-600", "ring-fuchsia-600 bg-fuchsia-600"],
    ["ring-blue-600", "ring-blue-600 bg-blue-600"],
    ["ring-green-600", "ring-green-600 bg-green-600"],
    ["ring-yellow-600", "ring-yellow-600 bg-yellow-600"],
    ["ring-sky-600", "ring-sky-600 bg-sky-600"],
    ["ring-indigo-600", "ring-indigo-600 bg-indigo-600"],
    ["ring-purple-600", "ring-purple-600 bg-purple-600"],
    ["ring-pink-600", "ring-pink-600 bg-pink-600"],
  ] as const;

  const colorIndex = userName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 8;

  return colorClassNames[colorIndex];
}

const CellLocked: React.FC<{ locked?: { who: string } | null }> = ({ locked }) => {
  if (!locked) return null;

  const [ringClassName, badge] = useGetLockColor(locked.who);

  return (
    <div
      className={`absolute left-0 top-0 flex h-full w-full items-center justify-center ring-1 ${ringClassName}`}
    >
      <div className="relative h-full w-full">
        <span
          className={`absolute -top-4 right-1 z-10 h-4 truncate rounded-[0.04rem] text-xs text-white ring ${badge}`}
        >
          {locked.who}
        </span>
      </div>
    </div>
  );
};

const Cell: React.FC<CellProps> = ({ row, column, value, user }) => {
  const userName = useAtomValue(userNameAtom);
  const setBoard = useSetAtom(boardAtom);

  useEffect(() => {
    setBoard((board) => ({
      ...board,
      [getCellId({ row, column })]: { value, user, position: { row, column }, locked: null },
    }));
  }, [row, column]);

  const [cell, setCell] = useCellAtom(getCellId({ row, column }));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!(cell.locked?.who === userName)) return e.preventDefault();

      setCell((cell) => ({
        ...cell,
        value: e.target.value,
        position: { row, column },
      }));
      setCellValue({ row, column }, e.target.value);
    },
    [cell, setCell]
  );

  const handleFocus = useCallback(() => {
    selectCell({ row, column });
  }, [row, column]);

  return (
    <td className="-p-1 relative min-w-[10ch] border border-slate-300 text-center text-sm">
      <CellLocked locked={cell?.locked} />
      <Input
        size="small"
        variant="flat"
        type="text"
        value={cell?.value ?? ""}
        onFocus={handleFocus}
        onChange={handleChange}
      />
    </td>
  );
};

export default React.memo(Cell);
