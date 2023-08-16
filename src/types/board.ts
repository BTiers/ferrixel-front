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

export const DataTypeValues = [
  "uuid",
  "text",
  "integer",
  "bigint",
  "timestamp without time zone",
] as const;
export type DataType = (typeof DataTypeValues)[number];

export type Column = {
  ordinal_position: number;
  column_name: string;
  data_type: DataType;
  column_default: string | null;
  is_primary_key: boolean;
};
