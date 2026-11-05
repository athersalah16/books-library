import { Bot, UserRound } from "lucide-react";

type Props = { isUser: boolean; label: string };

function MessageHeader({ isUser, label }: Props) {
  return (
    <div className="flex items-center gap-3 border-b border-current/10 px-4 py-3 sm:px-5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          isUser
            ? "bg-white/15 text-primary-foreground"
            : "bg-primary/5 text-primary"
        }`}
      >
        {isUser ? <UserRound size={18} /> : <Bot size={18} />}
      </div>

      <div className="flex items-center justify-between gap-3 w-full">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-90">
            {label}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${isUser ? "bg-white/10 text-primary-foreground" : "bg-primary/5 text-primary"}`}
        >
          Active
        </span>
      </div>
    </div>
  );
}

export default MessageHeader;
