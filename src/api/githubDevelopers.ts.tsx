// src/api/githubDevelopers.ts
// Service para buscar dados dos desenvolvedores direto da API do GitHub

export type GithubDeveloper = {
  login: string;
  name: string | null;
  html_url: string;
  avatar_url: string;
  bio: string | null;
};

// Logins dos devs que você passou + você (Danilodpaula)
export const GITHUB_LOGINS: string[] = [
  "antonollo",
  "cpc231341",
  "FilipePaulino1",
  "guighm",
  "herbert2003",
  "Jaum36",
  "Luzdasualife",
  "Pedrov-b",
  "thiagocordeirum",
  "yoRitayo",
  "Danilodpaula",
];

export async function fetchGithubDevelopers(): Promise<GithubDeveloper[]> {
  const responses = await Promise.all(
    GITHUB_LOGINS.map(async (login) => {
      const res = await fetch(`https://api.github.com/users/${login}`);

      if (!res.ok) {
        console.error(`Falha ao buscar perfil GitHub de ${login}`, res.status);
        return null;
      }

      const data = await res.json();

      return {
        login: data.login as string,
        name: (data.name as string | null) ?? null,
        html_url: data.html_url as string,
        avatar_url: data.avatar_url as string,
        bio: (data.bio as string | null) ?? null,
      };
    }),
  );

  // remove nulos (caso algum usuário falhe)
  return responses.filter((d): d is GithubDeveloper => d !== null);
}
