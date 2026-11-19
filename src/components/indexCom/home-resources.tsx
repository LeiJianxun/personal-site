import {
  ArrowUpRight,
  Download,
  FileVideo,
  FolderCode,
  Orbit,
  type LucideIcon,
} from "lucide-react";

type Resource = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  action: string;
  actionIcon: LucideIcon;
  download?: boolean;
};

const resources: Resource[] = [
  {
    title: "首页光环素材",
    description: "深浅两套透明 WebP 图片，可用于页面首屏动效。",
    href: "/downloads/hero-ring-assets.zip",
    icon: Orbit,
    action: "下载",
    actionIcon: Download,
    download: true,
  },
  {
    title: "个人站点源码",
    description: "站点的前端源码、项目结构和工程配置。",
    href: "https://github.com/LeiJianxun/personal-site/tree/personal-site-frontend",
    icon: FolderCode,
    action: "查看",
    actionIcon: ArrowUpRight,
  },
  {
    title: "页面演示视频",
    description: "个人站点的页面演示，MP4 格式。",
    href: "/videos/portfolio-demo.mp4",
    icon: FileVideo,
    action: "下载",
    actionIcon: Download,
    download: true,
  },
];

export function HomeResources({ className }: { className: string }) {
  return (
    <section
      id="resources"
      aria-labelledby="resources-title"
      tabIndex={-1}
      className={`${className} mt-14 scroll-mt-20 sm:mt-20 sm:scroll-mt-24 lg:mt-28`}
    >
      <div className="grid gap-8 md:grid-cols-[0.85fr_1.6fr] md:gap-12 lg:gap-16">
        <div>
          <h2 id="resources-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            资源与工具
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            分享可下载的素材、演示文件和项目源码。
          </p>
        </div>

        <ul className="divide-y divide-border">
          {resources.map(
            ({
              title,
              description,
              href,
              icon: Icon,
              action,
              actionIcon: ActionIcon,
              download,
            }) => (
              <li key={href} className="py-6 first:pt-0 last:pb-0">
                <a
                  href={href}
                  download={download}
                  className="group flex min-h-11 items-start gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <Icon
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-primary dark:text-[#a3c4b3]"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium group-hover:text-primary dark:group-hover:text-[#a3c4b3]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground group-hover:text-primary dark:group-hover:text-[#a3c4b3]">
                    <span className="sr-only sm:not-sr-only">{action}</span>
                    <ActionIcon aria-hidden="true" className="size-4" />
                  </span>
                </a>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
