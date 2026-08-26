import { Bot, CheckCheck } from "lucide-react";
import type { Message } from "../../types";

interface Props {
    message: Message;
}

function MessageBubble({
    message,
}: Props) {
    const time = message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (message.type === "user") {
        return (
            <div className="mb-6 flex justify-end">
                <div className="max-w-[520px] rounded-2xl rounded-tr-md bg-gradient-to-r from-[#6568F2] via-[#9293F5] to-[#E6E6FC] px-5 py-4 text-[#172554] shadow-lg shadow-indigo-100">
                    <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
                    <div className="mt-2 flex items-center justify-end gap-2">
                        <span className="text-[11px] text-[#334155]">{time}</span>
                        <CheckCheck size={14} className="text-[#334155]" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-300 shadow-md shadow-indigo-100">
                <Bot size={19} className="text-white" />
            </div>
            <div className="max-w-[650px] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{message.content}</p>
                <p className="mt-2 text-[11px] text-slate-400">{time}</p>
            </div>
        </div>
    );
}

export default MessageBubble;