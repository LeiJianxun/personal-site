import { projects } from "@/data/projects";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background">
      <section
        className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-2"
        aria-label="作品列表"
      >
        <h1 className="col-span-full text-3xl font-semibold tracking-tight sm:text-4xl">
          精选作品
        </h1>
        {projects.map((project) => (
          <article className="rounded-xl border bg-card p-5" key={project.slug}>
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
      </section>
    </div>
  );
}
