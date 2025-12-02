import { useState } from "react";
import {
  caregiverQuestions,
  clientQuestions,
  therapistQuestions,
} from "../i18n/scripts-questions";
import {
  caregiverSections,
  clientSections,
  therapistSections,
} from "../i18n/scripts-sections";
import useDefault from "./useDefault";
import { toast } from "sonner";
import useScriptApi from "./useScriptApi";
import { ScriptCreateDto } from "../types/dto/script-create";
import { ScriptUpdateDto } from "../types/dto/script-update";
import { titles } from "../i18n/scripts";
import { NewQuestion } from "../types/script";

const questions = (formType: string) => {
  switch (formType) {
    case "client":
      return clientQuestions;
    case "caregiver":
      return caregiverQuestions;
    case "therapist":
      return therapistQuestions;
    default:
      return [];
  }
};

const sections = (formType: string) => {
  switch (formType) {
    case "client":
      return clientSections;
    case "caregiver":
      return caregiverSections;
    case "therapist":
      return therapistSections;
    default:
      return [];
  }
};

const getTitle = (formType: string) => {
  switch (formType) {
    case "client":
      return titles[0];
    case "caregiver":
      return titles[1];
    case "therapist":
      return titles[2];
    default:
      return {
        id: "",
        pt: "",
        en: "",
      };
  }
};

const useScriptForm = ({ formType, id }: { formType: string; id?: string }) => {
  const { exibirTexto } = useDefault();
  const [newQuestions, setNewQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionSection, setNewQuestionSection] = useState("");
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [roteiroName, setRoteiroName] = useState("");
  const { createScript, updateScript } = useScriptApi({ id: id });

  const addQuestion = () => {
    const newQuestion: NewQuestion = {
      id: crypto.randomUUID(),
      question: newQuestionText,
      isFixed: false,
      section: newQuestionSection,
    };
    setNewQuestions([...newQuestions, newQuestion]);
    setShowAddQuestionDialog(false);
    toast.success(
      exibirTexto(
        "Pergunta adicionada com sucesso!  😄",
        "Question added successfully!  😄",
      ),
    );
  };

  const removeQuestion = (id: string) => {
    setNewQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.success(
      exibirTexto(
        "Pergunta removida com sucesso!  😄",
        "Question removed successfully!  😄",
      ),
    );
  };

  const createSubmit = async () => {
    const newScript: ScriptCreateDto = {
      name: roteiroName,
      type: formType,
      items: newQuestions.map((q) => {
        return {
          section: q.section,
          isFixed: q.isFixed,
          question: q.question,
        };
      }),
    };
    setShowSaveDialog(false);
    await createScript.mutateAsync(newScript);
  };

  const updateSubmit = async () => {
    const newScript: ScriptUpdateDto = {
      name: roteiroName,
      type: formType,
      items: newQuestions.map((q) => {
        return {
          section: q.section,
          isFixed: q.isFixed,
          question: q.question,
        };
      }),
    };
    setShowSaveDialog(false);
    await updateScript.mutateAsync(newScript);
  };

  return {
    questions,
    sections,
    setNewQuestionText,
    setNewQuestionSection,
    showAddQuestionDialog,
    showSaveDialog,
    setRoteiroName,
    addQuestion,
    removeQuestion,
    createSubmit,
    updateSubmit,
    roteiroName,
    setShowSaveDialog,
    getTitle,
    setShowAddQuestionDialog,
    newQuestionSection,
    newQuestionText,
    newQuestions,
  };
};

export default useScriptForm;
