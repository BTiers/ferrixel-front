import { boardAtom, getCellId, viewerAtom } from "@/store";
import { getDefaultStore } from "jotai";

import { Position } from "@/types/board";

type Who = {
  who: string;
};

type SelectResponse = Who & {
  kind: "Select";
  payload: Position[];
};

type DeselectResponse = Who & {
  kind: "Deselect";
  payload: Position[];
};

type NewGridValueResponse = Who & {
  kind: "NewGridValue";
  payload: {
    position: Position;
    value: string | null;
  };
};

type Response = SelectResponse | DeselectResponse | NewGridValueResponse;

let WS: WebSocket | null = null;

function getWS() {
  const viewer = getDefaultStore().get(viewerAtom);

  if (!viewer.username) return null;
  if (WS) return WS;

  WS = new WebSocket(
    `ws://${process.env.NEXT_PUBLIC_API_URL}:8080/ws/whiteboard/${viewer.username}`
  );

  WS.onopen = () => {
    console.log("Websocket opened");
  };
  WS.onclose = (e) => console.log("websocket closed", { e });

  WS.onmessage = (message) => {
    const data = JSON.parse(message.data) as Response;

    if (data?.kind === "NewGridValue") {
      const payload = data.payload;
      const store = getDefaultStore();

      const cellId = getCellId(payload.position);

      store.set(boardAtom, (board) => ({
        ...board,
        [cellId]: { ...board[cellId], value: payload.value },
      }));
    }

    if (data?.kind === "Select") {
      const payload = data.payload;
      const store = getDefaultStore();

      payload.forEach((position) => {
        const cellId = getCellId(position);

        store.set(boardAtom, (board) => ({
          ...board,
          [cellId]: {
            ...board[cellId],
            locked: { who: data.who },
          },
        }));
      });
    }

    if (data?.kind === "Deselect") {
      const payload = data.payload;
      const store = getDefaultStore();

      payload.forEach((position) => {
        const cellId = getCellId(position);

        store.set(boardAtom, (board) => ({
          ...board,
          [cellId]: {
            ...board[cellId],
            locked: null,
          },
        }));
      });
    }

    console.log(message);
  };

  return WS;
}

function selectCell(position: Position) {
  const WS = getWS();

  if (!WS) return;

  WS.send(
    JSON.stringify({
      Select: [
        {
          ...position,
        },
      ],
    })
  );
}

function setCellValue(position: Position, value: string | null) {
  const WS = getWS();

  if (!WS) return;

  WS.send(
    JSON.stringify({
      NewGridValue: {
        position,
        value,
      },
    })
  );
}

export { getWS, selectCell, setCellValue };
