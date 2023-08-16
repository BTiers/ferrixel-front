"use client";

import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai-optics";

import { Cell, Position } from "@/types/board";

function getCellId(position: Position | null) {
  if (!position) return "";

  return `cell-${position.column}-${position.row}`;
}

type Viewer = {
  username: string | null;
  currentTable: string;
};

const viewerAtom = atom<Viewer>({
  username: null,
  currentTable: "Whiteboard",
});
const boardAtom = atom<Record<string, Cell>>({});

function useCellAtom(id: string) {
  const atom = useMemo(() => focusAtom(boardAtom, (optic) => optic.prop(id)), [id]);

  return useAtom(atom);
}

export { boardAtom, viewerAtom, getCellId, useCellAtom };
