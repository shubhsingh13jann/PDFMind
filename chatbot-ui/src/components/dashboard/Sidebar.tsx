import { FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import PDFUploader from "../shared/PDFUploader";

interface SidebarProps {
  pdfs: string[];
  selectedPdf: string;
  onSelectPdf: (pdf: string) => void;
  onPdfUploaded: (filename: string) => void;
}

function Sidebar({
  pdfs,
  selectedPdf,
  onSelectPdf,
  onPdfUploaded,
}: SidebarProps) {
  const [search, setSearch] = useState("");
  const filteredPdfs = useMemo(
    () => pdfs.filter((pdf) => pdf.toLowerCase().includes(search.toLowerCase())),
    [pdfs, search],
  );

  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-r border-slate-200 bg-white md:w-[325px]">
      <div className="border-b border-slate-100 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-100">
            <FileText size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">PDF Assistant</h1>
            <p className="text-xs text-slate-500">Your smart document companion</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Upload PDF</h2>
        <div className="h-[190px] overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-[#F5F7FE] via-[#FAFBFF] to-white p-3">
          <PDFUploader compact onUploadSuccess={onPdfUploaded} />
        </div>

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Available PDFs</h2>
            <span className="text-[11px] text-slate-400">{pdfs.length} files</span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search PDFs..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          {filteredPdfs.map((pdf) => {
            const selected = pdf === selectedPdf;
            return (
              <button
                key={pdf}
                onClick={() => onSelectPdf(pdf)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${selected ? "border border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50" : "border border-transparent hover:bg-slate-50"}`}
              >
                <FileText size={16} className={selected ? "text-indigo-500" : "text-slate-400"} />
                <span className={`flex-1 truncate text-sm ${selected ? "font-semibold text-indigo-700" : "text-slate-600"}`}>{pdf}</span>
                {selected && <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />}
              </button>
            );
          })}
          {filteredPdfs.length === 0 && <p className="px-3 py-6 text-center text-sm text-slate-400">No PDFs found</p>}
        </div>
      </div>

      <div className="border-t border-slate-100 p-5">
        <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white"><FileText size={18} className="text-indigo-500" /></div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">{selectedPdf || "No PDF selected"}</p>
            <p className="mt-0.5 text-[11px] text-indigo-500">Selected document</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;