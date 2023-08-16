"use client";

import Link from "next/link";
import { usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import { viewerAtom } from "@/store";
import { useAtom, useSetAtom } from "jotai";

import { Button } from "@/components/ui";

type TableLinksProps = {
  tables: string[];
};

const TableLinks: React.FC<TableLinksProps> = ({ tables }) => {
  const setViewer = useSetAtom(viewerAtom);

  const pathname = usePathname();


  console.log(pathname)
  const focusedClassnames = "bg-slate-700 text-slate-50 hover:bg-slate-800";

  return (
    <div className="sticky bottom-0 flex w-full flex-grow flex-col justify-end focus:ring-0">
      <div className="flex divide-x divide-slate-300 bg-slate-100">
        <Link href={`/`} onClick={() => setViewer((c) => ({ ...c, currentTable: "Whiteboard" }))}>
          <Button
            size="small"
            variant="subtle"
            className={`rounded-none border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 ${
              pathname === "/" ? focusedClassnames : ""
            }`}
          >
            Whiteboard
          </Button>
        </Link>
        {tables.map((table) => {
          const url = `/tables/${table}`;
          const isSegmentSelected = pathname === url;

          const classNames = `rounded-none border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 ${
            isSegmentSelected ? focusedClassnames : ""
          }`;

          return (
            <Link
              href={url}
              key={table}
              onClick={() => setViewer((c) => ({ ...c, currentTable: table }))}
            >
              <Button size="small" variant="subtle" className={classNames}>
                {table}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TableLinks;
