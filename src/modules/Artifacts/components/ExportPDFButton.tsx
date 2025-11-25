import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { Language } from "../i18n";
import { MutableRefObject } from "react";
import { Download } from "lucide-react";

interface Props {
  language: string;
  pageRef: MutableRefObject<any>;
  filename: string;
}

const options = (filename: string) => {
  return {
    filename: `${filename}.pdf`,
    margin: 0,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "cm", format: "a4", orientation: "landscape" },
    pagebreak: { mode: ["avoid-all"] },
  } as const;
};
const ExportPDFButton = ({ language, pageRef, filename }: Props) => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        html2pdf().set(options(filename)).from(pageRef.current).save();
      }}
    >
      <Download className="w-4 h-4" />
      {language === Language.Portuguese ? "Exportar para PDF" : "Export to PDF"}
    </Button>
  );
};

export default ExportPDFButton;
