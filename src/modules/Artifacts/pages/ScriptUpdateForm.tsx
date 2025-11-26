import useAuthGuard from "../hooks/useAuthGuard";

const ScriptUpdateForm = () => {
  useAuthGuard();
  return <div></div>;
};

export default ScriptUpdateForm;
