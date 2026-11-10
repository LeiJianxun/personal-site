import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Markdown from "react-markdown";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/" className="mb-6 inline-block text-sm font-medium text-primary hover:underline">
        ← 返回作品列表
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>
      <div className="mt-6 space-y-4 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:pl-6">
        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mr-4 mt-4 inline-block text-sm font-medium text-primary underline"
          >
            {link.label}
          </a>
        ))}
        <Markdown
          skipHtml
          components={{
            a({ href, title, children }) {
              if (href?.startsWith("/videos/") && href.endsWith(".mp4")) {
                return (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    src={href}
                    className="w-full max-w-3xl rounded-lg"
                    aria-label="作品演示视频"
                  >
                    <a href={href}>{children}</a>
                  </video>
                );
              }

              return (
                <a href={href} title={title} className="underline">
                  {children}
                </a>
              );
            },
          }}
        >
          {project.bodyMarkdown}
        </Markdown>
      </div>
    </main>
  );
}
