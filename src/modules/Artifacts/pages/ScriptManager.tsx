import { useState } from "react";
import ScriptSelection from "../components/ScriptSelection";
import { useI18n } from "@/core/i18n/I18nContext";
import ScriptCreateForm from "../components/ScriptCreateForm";
import ScriptUpdateForm from "../components/ScriptUpdateForm";
import ScriptsList from "../components/ScriptsList";
import { FormType, ViewType } from "../types/script.types";

export function ScriptManager() {
  const { language } = useI18n();
  const [view, setView] = useState<ViewType>("script-select");
  const [formType, setFormType] = useState<FormType>("");

  const createScript = (formType: FormType) => {
    setView("create-script");
    setFormType(formType);
  };

  const submit = () => {
    setView("script-select");
  };

  return (
    <div>
      {view === "script-select" && (
        <ScriptSelection
          language={language}
          caregiverCardAction={() => {
            createScript("caregiver");
          }}
          clientCardAction={() => {
            createScript("client");
          }}
          therapistCardAction={() => {
            createScript("therapist");
          }}
          customCardAction={() => {
            setFormType("custom");
            setView(null);
          }}
        />
      )}
      {view === "create-script" && formType === "client" && (
        <ScriptCreateForm
          language={language}
          formType={formType}
          backAction={() => setView("script-select")}
          submitAction={submit}
        />
      )}
      {view === "create-script" && formType === "caregiver" && (
        <ScriptCreateForm
          language={language}
          formType={formType}
          backAction={() => setView("script-select")}
          submitAction={submit}
        />
      )}
      {view === "create-script" && formType === "therapist" && (
        <ScriptCreateForm
          language={language}
          formType={formType}
          backAction={() => setView("script-select")}
          submitAction={submit}
        />
      )}
      {formType === "custom" && (
        <ScriptsList
          language={language}
          backAction={() => {
            setView("script-select");
            setFormType("");
          }}
        />
      )}
      {view === "update-script" && <ScriptUpdateForm language={language} />}
    </div>
  );
}
