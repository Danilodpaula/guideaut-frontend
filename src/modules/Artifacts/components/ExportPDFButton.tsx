import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { MutableRefObject } from "react";
import { Download } from "lucide-react";
import useDefault from "../hooks/useDefault";

interface Props {
  pageRef: MutableRefObject<any>;
  filename: string;
}

const options = (filename: string, pageRef: MutableRefObject<any>) => {
  const { offsetWidth, offsetHeight } = pageRef.current;
  return {
    filename: `${filename}.pdf`,
    margin: 0,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1 },
    jsPDF: {
      unit: "px",
      format: [Number(offsetWidth), Number(offsetHeight)] as [number, number],
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid"] },
  } as const;
};

const ExportPDFButton = ({ pageRef, filename }: Props) => {
  const { exibirTexto } = useDefault();
  return (
    <Button
      variant="outline"
      onClick={() => {
        html2pdf().set(options(filename, pageRef)).from(pageRef.current).save();
      }}
      type="button"
      className="my-[25px]"
    >
      <Download className="w-4 h-4" />
      {exibirTexto("Exportar para PDF", "Export to PDF")}
    </Button>
  );
};

export default ExportPDFButton;
