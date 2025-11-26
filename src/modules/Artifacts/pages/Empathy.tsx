import { useAuth } from "@/core/auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useAuthGuard from "../hooks/useAuthGuard";

const Empathy = () => {
  useAuthGuard();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    toast.error("Deu erro!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }
  const { id } = useParams();
  return <div>{id}</div>;
};

export default Empathy;
