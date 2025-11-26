import { useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "../hooks/useAuthGuard";

const Script = () => {
  useAuthGuard();
  const params = useParams();
  return <div>{params.id}</div>;
};

export default Script;
