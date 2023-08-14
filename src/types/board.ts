export type Position = {
  column: number;
  row: number;
};

export type Cell = {
  position: Position;
  value: string | null;
  user: string | null;
  locked: { who: string } | null;
};

export type Board = Cell[];
