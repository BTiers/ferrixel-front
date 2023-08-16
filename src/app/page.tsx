import { getWhiteboard } from "@/lib/sdk";
import Cell from "@/components/board/Cell";

export default async function Home() {
  const boardData = await getWhiteboard();

  return (
    <table className="table table-auto border-collapse border border-slate-400">
      <thead>
        <tr>
          <th className="h-8 bg-slate-100" />
          {Array.from({ length: 26 }).map((_, cellIndex) => {
            return (
              <th
                key={cellIndex}
                className="h-8 border border-slate-300 bg-slate-100 text-sm font-medium"
              >
                {String.fromCharCode(cellIndex + "A".charCodeAt(0))}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 25 }).map((_, rowIndex) => {
          return (
            <tr key={rowIndex}>
              <td className="min-w-[5ch] border border-slate-300 bg-slate-100 text-center text-sm font-medium text-slate-600">
                {rowIndex + 1}
              </td>
              {Array.from({ length: 26 }).map((_, cellIndex) => {
                const cell = boardData.find(
                  (cell) => cell.position.column === cellIndex && cell.position.row === rowIndex
                );

                const cellId = `cell-${cell?.position.column ?? cellIndex}-${
                  cell?.position.row ?? rowIndex
                }`;

                return (
                  <Cell
                    key={cellId}
                    column={cell?.position.column ?? cellIndex}
                    row={cell?.position.row ?? rowIndex}
                    value={cell?.value ?? null}
                    id={cellId}
                    user={cell?.user ?? null}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
