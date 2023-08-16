import { Board, Column } from "@/types/board";

export async function getWhiteboard(): Promise<Board> {
  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}:8080/whiteboard`, {
      cache: "no-store",
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

export async function getTables(): Promise<string[]> {
  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}:8080/tables`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

export async function getTableColumns(tableId: string): Promise<Column[]> {
  try {
    const res = await fetch(
      `http://${process.env.NEXT_PUBLIC_API_URL}:8080/tables/${tableId}/columns`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTableRows(tableId: string): Promise<any[][]> {
  try {
    const res = await fetch(
      `http://${process.env.NEXT_PUBLIC_API_URL}:8080/tables/${tableId}/rows`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }
    // console.log(res.json())

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
