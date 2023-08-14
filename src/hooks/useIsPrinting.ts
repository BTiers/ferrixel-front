"use client";

import { useEffect, useState } from "react";

export function useIsPrinting() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const beforePrint = () => setIsPrinting(true);
    const afterPrint = () => setIsPrinting(false);

    const mediaMatcher = (event: MediaQueryListEvent) => {
      if (event.matches) {
        beforePrint();
      } else {
        afterPrint();
      }
    };

    if (window?.matchMedia) window.matchMedia("print").addEventListener("change", mediaMatcher);

    if (window) {
      window.onbeforeprint = beforePrint;
      window.onafterprint = afterPrint;
    }
  }, []);

  return isPrinting;
}
