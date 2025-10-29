import * as ReactDOM from "react-dom/client";
import "./styles/index.css";
import { AppModule,SharedModule } from "./app";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <SharedModule>
    <AppModule />
  </SharedModule>
);
