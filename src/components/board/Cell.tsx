"use client";

import React, { useCallback, useEffect } from "react";
import { boardAtom, getCellId, useCellAtom, viewerAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { debounce } from "lodash";

import { Position } from "@/types/board";
import { Input } from "@/components/ui";
import { selectCell, setCellValue } from "@/websocket/lib";

type CellProps = {
  column: number;
  row: number;
  value: string | null;
  id: string | null;
  user: string | null;
};

function useGetLockColor(userName?: string | null) {
  const viewer = useAtomValue(viewerAtom);

  if (!userName) return ["", ""] as const;
  if (userName === viewer.username)
    return ["ring-amber-600", "ring-amber-600 bg-amber-600"] as const;

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
  const viewer = useAtomValue(viewerAtom);
  const [ringClassName, badge] = useGetLockColor(locked?.who);

  if (!locked) return null;

  return (
    <div
      className={`absolute left-0 top-0 flex h-full w-full items-center justify-center ring-1 ${ringClassName}`}
    >
      <div className="relative h-full w-full">
        <span
          className={`absolute -top-4 right-1 z-10 h-4 truncate rounded-[0.04rem] text-xs text-white ring ${badge}`}
        >
          {locked.who === viewer.username ? "You" : locked.who}
        </span>
      </div>
    </div>
  );
};

const Cell: React.FC<CellProps> = ({ row, column, value, user }) => {
  const viewer = useAtomValue(viewerAtom);
  const setBoard = useSetAtom(boardAtom);

  useEffect(() => {
    setBoard((board) => ({
      ...board,
      [getCellId({ row, column })]: { value, user, position: { row, column }, locked: null },
    }));
  }, [row, column]);

  const [cell, setCell] = useCellAtom(getCellId({ row, column }));

  const debouncedOnChange = useCallback(
    debounce((position: Position, value: string) => {
      setCellValue(position, value);
    }, 200),
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!(cell.locked?.who === viewer.username)) return e.preventDefault();

      const position = { row, column };
      const value = e.target.value;

      setCell((cell) => ({
        ...cell,
        value,
        position,
      }));

      debouncedOnChange(position, value);
    },
    [cell, setCell]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      selectCell({ row, column });
    },
    [row, column, cell]
  );

  return (
    <td className="-p-1 relative w-full min-w-[10ch] border border-slate-300 text-center text-sm">
      <CellLocked locked={cell?.locked} />
      <Input
        id={getCellId(cell?.position)}
        size="small"
        variant="flat"
        type="text"
        disabled={!!cell?.locked?.who && !(cell?.locked?.who === viewer.username)}
        value={cell?.value ?? ""}
        onFocus={handleFocus}
        onChange={handleChange}
      />
    </td>
  );
};

export default React.memo(Cell);
