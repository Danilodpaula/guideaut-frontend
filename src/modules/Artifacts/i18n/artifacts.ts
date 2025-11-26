import CanvasList from "../components/CanvasList";
import EmpathyList from "../components/EmpathyList";
import PersonasList from "../components/PersonasList";
import ScriptSelection from "../pages/ScriptSelection";

export const artifacts = [
  {
    id: 1,
    pt: "Personas",
    en: "Personas",
    path: "persona",
    home: PersonasList,
    title: {
      pt: "Criar nova persona",
      en: "Create new persona",
    },
  },
  {
    id: 2,
    pt: "Empatia",
    en: "Empathy",
    path: "empathy",
    home: EmpathyList,
    title: {
      pt: "Criar novo mapa de empatia",
      en: "Create new empathy map",
    },
  },
  {
    id: 3,
    pt: "Canvas",
    en: "Canvas",
    path: "canvas",
    home: CanvasList,
    title: {
      pt: "Criar novo canvas",
      en: "Create new canvas",
    },
  },
  {
    id: 4,
    pt: "Roteiros",
    en: "Scripts",
    path: "scripts",
    home: ScriptSelection,
    title: {
      pt: "Criar novo roteiro",
      en: "Create new script",
    },
  },
];
