import { getTableColumns, getTableRows } from "@/lib/sdk";

export default async function Table({ params }: { params: { tableId: string } }) {
  const tableColumns = await getTableColumns(params.tableId);
  const tableRows = await getTableRows(params.tableId);

  return (
    <table className="table table-fixed border-collapse border border-slate-400">
      <thead>
        <tr>
          <th className="h-8 w-[5ch] bg-slate-100" />
          {tableColumns.map(({ column_name, ordinal_position }) => {
            return (
              <th
                key={ordinal_position}
                className="h-8 border border-slate-300 bg-slate-100 text-sm font-medium"
              >
                {column_name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((data, rowIndex) => {
          return (
            <tr key={rowIndex}>
              <td className="min-h-[2rem] w-[5ch] border border-slate-300 bg-slate-100 text-center text-xs truncate px-1 font-medium text-slate-600">
                {rowIndex + 1}
              </td>
              {data.map((datum, index) => {
                const column_type = tableColumns[index]?.data_type;

                let classNames =
                  "relative min-w-[10ch] truncate border border-slate-300 px-2 py-1 text-xs";

                if (column_type === "integer" || column_type === "bigint")
                  classNames = `${classNames} text-right`;
                else classNames = `${classNames} text-left`;

                return <td className={classNames}>{datum}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
