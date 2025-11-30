import { useQueryClient } from "@tanstack/react-query";

const useApiDefault = () => {
  const queryClient = useQueryClient();

  return {
    queryClient,
  };
};

export default useApiDefault;
