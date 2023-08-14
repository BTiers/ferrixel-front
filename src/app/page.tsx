import { getCellId } from "@/store";

import { Board } from "@/types/board";
import { Dialog, Input } from "@/components/ui";
import UsernameDialogForm from "@/components/auth/UsernameDialogForm";
import Cell from "@/components/board/Cell";

async function getBoard(): Promise<Board> {
  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}:8080/`, {
      next: {
        revalidate: 200,
      },
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const data = await getBoard();

  return (
    <main className="flex min-h-screen flex-col">
      <UsernameDialogForm />
      <table className="table table-fixed border-collapse border border-slate-400">
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
                  const cell = data.find(
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
    </main>
  );
}
