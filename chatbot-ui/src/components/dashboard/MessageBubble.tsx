import type { Message } from "../../types";

interface Props {
    message: Message;
}

function MessageBubble({
    message,
}: Props) {

    return (

        <div
            className={`flex ${
                message.type === "user"
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-[75%] rounded-3xl px-6 py-4 shadow-sm ${
                    message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                }`}
            >

                <p className="whitespace-pre-wrap">
                    {message.content}
                </p>

                <div className="mt-3 text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                </div>

            </div>

        </div>

    );
}

export default MessageBubble;