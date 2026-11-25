import { HomeFooter } from "@/components/indexCom/home-footer";
import { HomeHeader } from "@/components/indexCom/home-header";
import { HomeHero } from "@/components/indexCom/home-hero";
import { HomeResources } from "@/components/indexCom/home-resources";
import { HomeNotes } from "@/components/indexCom/home-notes";
import { getProjects, getStarProjects } from "@/lib/projects-api";
import { ArrowUpRight, FolderCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const pageWidth = "mx-auto w-full max-w-[1248px] px-5 sm:px-8 lg:px-12";

const projectCovers: Record<string, { light: string; dark: string }> = {
  "a-share-cruise-agent": {
    light: "/images/star-project/project-a-share-agent-light.webp",
    dark: "/images/star-project/project-a-share-agent.webp",
  },
  "personal-site": {
    light: "/images/star-project/project-personal-site-light.webp",
    dark: "/images/star-project/project-personal-site.webp",
  },
};

async function ProjectList() {
  const projects = await getStarProjects();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-6">
      {projects.map((project) => {
        if (!project.slug) return null;

        const cover = projectCovers[project.slug];

        return (
          <article key={project.id} className="min-w-0">
            <Link
              href={`/projects/${project.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border bg-card text-card-foreground transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {cover ? (
                  <>
                    <Image
                      src={cover.light}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 564px, (min-width: 768px) 50vw, 100vw"
                      loading="eager"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03] dark:hidden"
                    />
                    <Image
                      src={cover.dark}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 564px, (min-width: 768px) 50vw, 100vw"
                      loading="eager"
                      className="hidden object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03] dark:block"
                    />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <FolderCode aria-hidden="true" className="size-12" />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <h3 className="flex items-start justify-between gap-3 text-lg font-semibold">
                  <span>{project.title}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                  />
                </h3>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>

                <ul aria-label="技术栈" className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.stack.slice(0, 3).map((technology) => (
                    <li
                      key={technology}
                      className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      {technology}
                    </li>
                  ))}
                  {project.stack.length > 3 && (
                    <li
                      title={project.stack.slice(3).join("、")}
                      aria-label={`另有 ${project.stack.length - 3} 项技术`}
                      className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      +{project.stack.length - 3}
                    </li>
                  )}
                </ul>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <HomeHeader />

      <main className="w-full flex-1 pt-12 pb-10 sm:pt-5 sm:pb-14 lg:pt-8 lg:pb-16">
        <HomeHero />
        <section
          id="work"
          aria-labelledby="work-title"
          className={`${pageWidth} scroll-mt-20 sm:scroll-mt-24`}
          tabIndex={-1}
        >
          <h2
            id="work-title"
            className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            精选作品
          </h2>
          <Suspense fallback={null}>
            <ProjectList />
          </Suspense>
        </section>
        <HomeNotes className={pageWidth} />
        <HomeResources className={pageWidth} />
      </main>

      <HomeFooter className={pageWidth} />
    </div>
  );
}
