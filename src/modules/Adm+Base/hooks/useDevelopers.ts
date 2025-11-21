// src/modules/Adm+Base/hooks/useDevelopers.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import {
  fetchGithubDevelopers,
  type GithubDeveloper,
} from "../../../api/githubDevelopers.ts";

// Metadados locais: apenas tags/stack.
// Papel é sempre "Desenvolvedor(a)" / "Developer" via fallback no componente.
const META_BY_LOGIN: Record<
  string,
  {
    tags?: string[];
  }
> = {
  antonollo: {
    tags: ["Dev", "Recomendações"],
  },
  cpc231341: {
    tags: ["Dev", "Recomendações"],
  },
  FilipePaulino1: {
    tags: ["Dev", "Base & Adm"],
  },
  guighm: {
    tags: ["Dev", "Artefatos"],
  },
  herbert2003: {
    tags: ["Dev", "Base & Adm"],
  },
  Jaum36: {
    tags: ["Dev", "Recomendações"],
  },
  Luzdasualife: {
    tags: ["Dev", "Tutorial"],
  },
  "Pedrov-b": {
    tags: ["Dev", "Artefatos"],
  },
  thiagocordeirum: {
    tags: ["Dev", "Recomendações"],
  },
  yoRitayo: {
    tags: ["Dev", "Tutorial"],
  },
  Danilodpaula: {
    tags: ["Dev", "Base & Adm"],
  },
};

// ViewModel usado pela página
export type DeveloperVM = GithubDeveloper & {
  tags?: string[];
};

export function useDevelopers() {
  const query = useQuery({
    queryKey: ["github-developers"],
    queryFn: fetchGithubDevelopers,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  const developers: DeveloperVM[] =
    query.data?.map((dev) => ({
      ...dev,
      ...(META_BY_LOGIN[dev.login] ?? {}),
    })) ?? [];

  return {
    developers,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as any,
    refetch: query.refetch,
  };
}
