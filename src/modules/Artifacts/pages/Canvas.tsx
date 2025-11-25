import { useState } from "react";
import { ScriptManager } from "./ScriptManager";

type ViewType = "selection" | "editor" | "list";

const Canvas = () => {
  const [view, setView] = useState<ViewType>("selection");
  return (
    <div className="p-[80px]">{view === "selection" && <ScriptManager />}</div>
  );
};

export default Canvas;
