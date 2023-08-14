"use client";

import { useCallback, useEffect, useState } from "react";
import { userNameAtom } from "@/store";
import { useAtom } from "jotai";

import { Button, Dialog, DialogContent, Input } from "@/components/ui";
import { getWS } from "@/websocket/lib";

export default function UsernameDialogForm() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useAtom(userNameAtom);

  useEffect(() => setOpen(!username), []);

  const handleSubmit = useCallback(() => {
    if (!username) return;
    // Activating the websocket connection
    getWS();

    setOpen(false);
  }, [username]);

  return (
    <Dialog open={open}>
      <DialogContent
        closable={false}
        size="large"
        title="Enter your username"
        description="To join the board you need to enter your username."
      >
        <div className="flex space-x-8">
          <Input type="text" onChange={(e) => setUsername(e.target.value)} />
          <Button disabled={!username} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
