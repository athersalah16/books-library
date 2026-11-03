import { Input } from "@/components/ui/input";
import React from "react";

type Props = { inputRef: React.Ref<HTMLInputElement> | undefined };

function ChatInput({ inputRef }: Props) {
    // make design for page and messages then try it
  return (
    <div>
      <div >
        <Input
          ref={inputRef}
          maxLength={1000}
          className="p-5 text-muted-foreground"
          placeholder="Send your message..."
        />
      </div>
    </div>
  );
}

export default ChatInput;
