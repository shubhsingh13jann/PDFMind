import type { LLMProvider } from "../../types";

interface Props {
    selectedProvider: LLMProvider;
    setSelectedProvider: (
        provider: LLMProvider
    ) => void;
}

function ProviderSelector({
    selectedProvider,
    setSelectedProvider,
}: Props) {

    return (

        <select
            value={selectedProvider}
            onChange={(e) =>
                setSelectedProvider(
                    e.target.value as LLMProvider
                )
            }
            className="
            h-12
            rounded-xl
            border
            border-slate-200
            px-4"
        >

            <option value="ollama">
                Ollama
            </option>

            <option value="groq">
                Groq
            </option>

        </select>

    );
}

export default ProviderSelector;