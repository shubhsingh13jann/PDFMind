import { ChevronDown, Sparkles } from "lucide-react";
import type { LLMProvider } from "../../types";

interface Props {
    selectedProvider: LLMProvider;
    setSelectedProvider: (provider: LLMProvider) => void;
}

function ProviderSelector({
    selectedProvider,
    setSelectedProvider,
}: Props) {

    return (

        <div className="relative flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5">
            <Sparkles size={16} className="text-indigo-500" />
            <select
                value={selectedProvider}
                onChange={(event) => setSelectedProvider(event.target.value as LLMProvider)}
                className="appearance-none bg-transparent pr-6 text-sm font-medium text-slate-700 outline-none"
            >
                <option value="ollama">Ollama</option>
                <option value="groq">Groq</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 text-slate-400" />
        </div>

    );
}

export default ProviderSelector;