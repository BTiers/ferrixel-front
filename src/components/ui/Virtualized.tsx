"use client";

import React, { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useIsPrinting } from "@/hooks/useIsPrinting";

export type RowVirtualizerProps = {
  rows: React.ReactNode[];
  estimatedRowHeight: number;
  spaceBetweenRows?: number;
  isPrintable?: boolean;
};

export function RowVirtualizer({
  rows,
  estimatedRowHeight,
  spaceBetweenRows,
  isPrintable = true,
}: RowVirtualizerProps) {
  const isPrinting = useIsPrinting();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => document?.querySelector("[data-radix-scroll-area-viewport]"),
    estimateSize: () => estimatedRowHeight,
    paddingEnd: spaceBetweenRows ?? 0,
  });

  if (isPrintable && isPrinting) return <div>{rows}</div>;

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <div
          key={virtualRow.index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${rows[virtualRow.index]}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }}
        >
          {rows[virtualRow.index]}
        </div>
      ))}
    </div>
  );
}
