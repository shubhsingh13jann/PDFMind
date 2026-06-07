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
    <div className="mx-auto flex max-w-4xl flex-col gap-5 px-6 py-6">

      {messages.map((message, index) => (
        <MessageBubble
          key={`${index}`}
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
  );
}

export default ChatMessages;