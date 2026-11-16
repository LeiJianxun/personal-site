type ProjectSummary = {
  id: number;
  slug: string | null;
  title: string | null;
  summary: string | null;
  stack: string[];
};

type ProjectDetail = ProjectSummary & {
  stack: string[] | null;
  bodyMarkdown: string | null;
  links: { label: string; href: string }[] | null;
};

function requestProjects(path = "") {
  const baseUrl = process.env.PROJECTS_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("缺少 PROJECTS_API_BASE_URL");
  }

  return fetch(`${baseUrl}/api/projects${path}`, { cache: "no-store" });
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const response = await requestProjects();

  if (!response.ok) {
    throw new Error(`作品列表请求失败（${response.status}）`);
  }

  return response.json();
}

export async function getProject(id: number): Promise<ProjectDetail | null> {
  const response = await requestProjects(`/${id}`);

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`作品详情请求失败（${response.status}）`);
  }

  return response.json();
}
