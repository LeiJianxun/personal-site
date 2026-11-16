import { ArrowUpRight, Mail, MessagesSquare, TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

const name = "LeiJianXun";
const circle = "inline-flex size-11 items-center justify-center rounded-full sm:size-12";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:focus-visible:outline-white";

function GitHubIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.08.55-.17.55-.38l-.01-1.49c-2.23.48-2.7-.95-2.7-.95-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.67.07-.52.28-.87.51-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

const contacts = [
  { label: "GitHub", icon: GitHubIcon, href: "https://github.com/LeiJianxun" },
  { label: "邮箱", icon: Mail },
  { label: "微信", icon: MessagesSquare },
  { label: "哔哩哔哩", icon: TvMinimalPlay },
];

export function HomeFooter({ className }: { className: string }) {
  return (
    <footer id="contact" className="home-footer shrink-0 dark:border-t-0 dark:text-white">
      <div className={`${className} pt-12 pb-5 sm:pt-16 sm:pb-6 lg:pt-[4.5rem]`}>
        <div className="grid gap-9 sm:grid-cols-[1fr_0.8fr] sm:gap-10">
          <div>
            <Link href="/" className={`inline-flex w-fit items-center gap-3 rounded-md ${focus}`}>
              <span
                aria-hidden="true"
                className="inline-flex size-11 items-center justify-center rounded-full border bg-foreground/5 text-xl leading-none font-extrabold tracking-[-0.08em] sm:size-12 dark:border-white/15 dark:bg-white/8"
              >
                JX<span className="text-primary dark:text-[#a3c4b3]">.</span>
              </span>
              <span className="text-2xl leading-none font-bold tracking-tight sm:text-3xl">
                {name}
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:mt-6 dark:text-neutral-400">
              版权所有，保留所有权利
            </p>

            <ul aria-label="联系方式" role="list" className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              {contacts.map(({ label, icon: Icon, href }) => (
                <li key={label} className="flex">
                  {href ? (
                    <a
                      href={href}
                      aria-label={label}
                      title={label}
                      className={`${circle} ${focus} bg-foreground/8 transition-colors hover:bg-foreground/14 dark:bg-white/14 dark:hover:bg-white/25`}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-label={`${label}（待补充）`}
                      title={`${label}（待补充）`}
                      className={`${circle} bg-foreground/5 text-muted-foreground dark:bg-white/8 dark:text-neutral-500`}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <section aria-labelledby="home-footer-about" className="max-w-sm sm:pt-2">
            <h2 id="home-footer-about" className="font-semibold">
              关于本站
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground dark:text-neutral-400">
              这里收录我的个人作品和过往工作中主导或参与研发的项目，也分享可公开下载的安装包等资源。
            </p>
            <a
              href="#work"
              className={`mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline dark:text-[#a3c4b3] ${focus}`}
            >
              浏览作品 <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </section>
        </div>

        <small className="mt-16 block text-center text-xs tracking-wide text-muted-foreground sm:mt-24 dark:text-neutral-400">
          © 2026 {name}
        </small>
      </div>
    </footer>
  );
}
