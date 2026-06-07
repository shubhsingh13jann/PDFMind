import { FileText } from "lucide-react";

interface Props {
    selectedPdf: string;
    pdfs: string[];
    onPdfSelect: (pdf: string) => void;
}

function PdfSelector({
    selectedPdf,
    pdfs,
    onPdfSelect,
}: Props) {

    return (
        <div className="relative">

            <FileText
                className="absolute left-3 top-3.5 h-4 w-4 text-slate-400"
            />

            <select
                value={selectedPdf}
                onChange={(e) => onPdfSelect(e.target.value)}
                className="
                h-12
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-10
                pr-5
                shadow-sm
                outline-none"
            >
                <option value="">
                    Choose PDF
                </option>

                {
                    pdfs.map((pdf) => (
                        <option
                            key={pdf}
                            value={pdf}
                        >
                            {pdf}
                        </option>
                    ))
                }

            </select>

        </div>
    );
}

export default PdfSelector;