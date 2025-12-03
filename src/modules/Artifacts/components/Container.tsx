import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import useDefault from "../hooks/useDefault";

interface Props {
  children: ReactNode;
  title: {
    pt: string;
    en: string;
  };
}

const Container = ({ children, title }: Props) => {
  const { contentRef, exibirTexto } = useDefault();
  return (
    <Card ref={contentRef}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle>{exibirTexto(title.pt, title.en)}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Container;
