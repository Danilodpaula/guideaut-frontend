import { useAuth } from "@/core/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuthGuard from "../hooks/useAuthGuard";

const EmpathyEditForm = () => {
  useAuthGuard();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    toast.error("Deu erro!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }
  return <div></div>;
};

export default EmpathyEditForm;
