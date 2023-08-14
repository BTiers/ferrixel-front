"use client";

import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai-optics";

import { Cell, Position } from "@/types/board";

function getCellId(position: Position) {
  return `cell-${position.column}-${position.row}`;
}

const userNameAtom = atom<string | null>(null);
const boardAtom = atom<Record<string, Cell>>({});

function useCellAtom(id: string) {
  const atom = useMemo(() => focusAtom(boardAtom, (optic) => optic.prop(id)), [id]);

  return useAtom(atom);
}

export { boardAtom, userNameAtom, getCellId, useCellAtom };
