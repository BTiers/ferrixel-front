import { ClassValue, clsx } from "clsx";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addTime(date: Date, unit?: "day" | "week" | "month" | "year", amount = 0) {
  switch (unit) {
    case "day":
      return addDays(date, amount);
    case "week":
      return addWeeks(date, amount);
    case "month":
      return addMonths(date, amount);
    case "year":
      return addYears(date, amount);
    default:
      return date;
  }
}

export function subTime(date: Date, unit?: "day" | "week" | "month" | "year", amount = 0) {
  switch (unit) {
    case "day":
      return subDays(date, amount);
    case "week":
      return subWeeks(date, amount);
    case "month":
      return subMonths(date, amount);
    case "year":
      return subYears(date, amount);
    default:
      return date;
  }
}

export function intervalToMs(unit?: "day" | "week" | "month" | "year", amount = 0) {
  switch (unit) {
    case "day":
      return 1000 * 60 * 60 * 24 * amount;
    case "week":
      return 1000 * 60 * 60 * 24 * 7 * amount;
    case "month":
      return 1000 * 60 * 60 * 24 * 30 * amount;
    case "year":
      return 1000 * 60 * 60 * 24 * 365 * amount;
    default:
      return amount;
  }
}
