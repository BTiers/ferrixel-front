"use client";

import { useCallback, useEffect, useState } from "react";
import { viewerAtom } from "@/store";
import { useAtom } from "jotai";

import { Button, Dialog, DialogContent, Input } from "@/components/ui";
import { getWS } from "@/websocket/lib";

export default function UsernameDialogForm() {
  const [open, setOpen] = useState(false);
  const [viewer, setViewer] = useAtom(viewerAtom);

  useEffect(() => setOpen(!viewer.username), []);

  const handleSubmit = useCallback(() => {
    if (!viewer.username) return;
    // Activating the websocket connection
    getWS();

    setOpen(false);
  }, [viewer]);

  return (
    <Dialog open={open}>
      <DialogContent
        closable={false}
        size="large"
        title="Enter your username"
        description="To join the board you need to enter your username."
      >
        <div className="flex space-x-8">
          <Input
            type="text"
            onChange={(e) =>
              setViewer((current) => ({
                ...current,
                username: e.target.value,
              }))
            }
          />
          <Button disabled={!viewer.username} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
