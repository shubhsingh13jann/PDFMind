import { Bot, Loader2 } from "lucide-react";
import MessageBubble from "./MessageBubble";
import type { Message } from "../../types";

interface Props {
  messages: Message[];
  isLoading: boolean;
}

function ChatMessages({
  messages,
  isLoading,
}: Props) {
    return (
    <div className="flex-1 overflow-y-auto px-8 py-7">
      <div className="mx-auto max-w-6xl">

      {messages.map((message, index) => (
        <MessageBubble
          key={`${message.timestamp.getTime()}-${index}`}
          message={message}
        />
      ))}

      {isLoading && (
        <div className="flex gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
            <Bot className="h-4 w-4" />
          </div>

          <div className="rounded-2xl bg-white px-4 py-3 shadow">

            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </span>

          </div>

        </div>
      )}

      </div>
    </div>
  );
}

export default ChatMessages;