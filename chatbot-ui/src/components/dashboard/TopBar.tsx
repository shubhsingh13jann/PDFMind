import { ChevronDown } from "lucide-react";

interface Props {
  activeSession: string;
  handleLogout: () => void;
}

function TopBar({
  activeSession,
  handleLogout,
}: Props) {
  return (
    <div className="flex items-center justify-between px-8 py-7">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          {activeSession}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose a PDF and ask questions from its content
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
          JD
        </div>

        <ChevronDown size={18} />
      </button>

    </div>
  );
}

export default TopBar;import { ChevronDown } from "lucide-react";

interface Props {
  activeSession: string;
  handleLogout: () => void;
}

function TopBar({
  activeSession,
  handleLogout,
}: Props) {
  return (
    <div className="flex items-center justify-between px-8 py-7">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          {activeSession}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose a PDF and ask questions from its content
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
          JD
        </div>

        <ChevronDown size={18} />
      </button>

    </div>
  );
}

export default TopBar;