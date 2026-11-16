import { getProjects } from "@/lib/projects-api";
import Link from "next/link";
import { Suspense } from "react";

const pageWidth = "mx-auto w-full max-w-[1248px] px-5 sm:px-8 lg:px-12";

async function ProjectList() {
  const projects = await getProjects();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <article className="min-w-0 rounded-xl border bg-card p-5" key={project.id}>
          <h2 className="text-lg font-semibold">
            <Link className="text-primary hover:underline" href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h2>
          <p>{project.summary}</p>
          <ul aria-label="技术栈" role="list" className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <li key={technology} className="rounded-full bg-muted px-3 py-1 text-sm">
                {technology}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <header className="border-b">
        <div
          className={`${pageWidth} flex min-h-16 items-center justify-between gap-4 sm:min-h-[72px]`}
        >
          <div className="flex min-w-0 items-center gap-4" />
          <div className="flex shrink-0 items-center gap-2" />
        </div>
      </header>

      <main className={`${pageWidth} flex-1 py-10 sm:py-14 lg:py-16`}>
        <section aria-labelledby="work-title">
          <h1 id="work-title" className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            精选作品
          </h1>
          <Suspense fallback={null}>
            <ProjectList />
          </Suspense>
        </section>
      </main>

      <footer className="border-t">
        <div className={`${pageWidth} min-h-20 py-6 sm:min-h-24`} />
      </footer>
    </div>
  );
}
