import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";

const Empathy = () => {
  useAuthGuard();
  const { id } = useDefault();
  return <div>{id}</div>;
};

export default Empathy;
