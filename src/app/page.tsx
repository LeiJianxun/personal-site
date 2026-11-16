import { HomeFooter } from "@/components/indexCom/home-footer";
import { HomeHeader } from "@/components/indexCom/home-header";
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
      <HomeHeader />

      <main className={`${pageWidth} flex-1 py-10 sm:py-14 lg:py-16`}>
        <section
          id="work"
          aria-labelledby="work-title"
          className="scroll-mt-20 sm:scroll-mt-24"
          tabIndex={-1}
        >
          <h1 id="work-title" className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            精选作品
          </h1>
          <Suspense fallback={null}>
            <ProjectList />
          </Suspense>
        </section>
      </main>

      <HomeFooter className={pageWidth} />
    </div>
  );
}
