# Personal Site · 前端

个人全栈网站的前端工程，基于 Next.js、React 和 TypeScript 构建。项目延续最初使用 React、Spring Boot、MySQL 开发个人网站的目标，用于实践前端开发与前后端协作。

本仓库维护前端代码、静态示例资源和工程配置。当前作品集读取本地数据，可以独立于 Spring Boot 后端和 MySQL 数据库运行。

## 当前进度

- 已搭建 Next.js App Router 工程，源码位于 `src/`。
- 已配置 Tailwind CSS、shadcn/ui，以及 Button、Card、Input 基础组件。
- 已配置 ESLint、Prettier、EditorConfig 和 TypeScript 检查。
- 首页已实现响应式作品卡片，展示项目简介和技术栈。详情页展示 Markdown 正文、图片、演示视频和可选的项目链接。
- 已设置站点标题和全局主题配色。
- 已安装 TanStack Query、React Hook Form、Zod 等依赖，尚未接入数据请求或业务表单。
- 暂未配置自动化测试或 CI 流程。

## 技术栈

| 类别             | 技术                                                            |
| ---------------- | --------------------------------------------------------------- |
| 应用框架         | Next.js 16.4.3，App Router，Turbopack                           |
| UI 与语言        | React / React DOM 19.3.0，TypeScript 5                          |
| 样式             | Tailwind CSS 4，tw-animate-css                                  |
| 组件与图标       | shadcn/ui（base-vega 风格），Base UI，Lucide React              |
| 组件样式工具     | class-variance-authority，cn                                    |
| 正文渲染         | react-markdown 10.1.0                                           |
| 数据请求状态管理 | TanStack Query 5（已安装，待接入）                              |
| 表单与校验       | React Hook Form 7，Zod 4，@hookform/resolvers（已安装，待接入） |
| 工程规范         | ESLint 9，eslint-config-next，Prettier 3，EditorConfig          |
| 包管理器         | pnpm 11.17.0                                                    |

依赖声明见 `package.json`，具体解析版本以 `pnpm-lock.yaml` 为准。

## 环境要求

- **Node.js：24.x**，`.nvmrc` 固定为 `v24.18.0`。
- **pnpm：11.x**，`package.json` 的 `packageManager` 固定为 `pnpm@11.17.0`。

项目统一使用 pnpm 安装依赖，提交并维护 `pnpm-lock.yaml`。

## 本地开发

以下命令均在包含 `package.json` 的仓库根目录执行。如果打开的是外层 `personal-site-frontend/` 文件夹，先执行 `cd personal-site`。

1. 使用项目约定的 Node.js 版本（已安装 nvm 时）：

   ```bash
   nvm install
   nvm use
   ```

2. 如果尚未安装指定版本的 pnpm：

   ```bash
   npm install --global pnpm@11.17.0
   ```

3. 按锁文件安装依赖并启动开发服务器：

   ```bash
   pnpm install --frozen-lockfile
   pnpm dev
   ```

启动后可访问[作品列表](http://localhost:3000/)，也可以直接打开[个人站点](http://localhost:3000/projects/personal-site)或[界面动效实验（示例）](http://localhost:3000/projects/motion-study)的详情页。

根布局通过 `next/font/google` 使用 Inter、Geist 和 Geist Mono。开发或构建时，如果字体尚未缓存，需要能够访问 Google 字体服务；字体由应用托管，浏览器访问页面时无需向 Google 请求字体。

## 维护作品内容

在 [projects.ts](src/data/projects.ts) 的 `projects` 数组中添加或更新记录。每个作品使用唯一的 `slug`，对应详情地址 `/projects/<slug>`。首页卡片读取 `title`、`summary` 和 `stack`，详情页读取 `bodyMarkdown` 正文和可选的 `links`。详情路由通过 `generateStaticParams` 提供需要预渲染的作品路径。

示例图片和视频随仓库提交，分别放在 `public/images/` 和 `public/videos/`。在 Markdown 正文中，从站点根路径引用媒体。

```markdown
![个人站点首页的作品卡片](/images/portfolio-home.png)

[观看作品页演示](/videos/portfolio-demo.mp4)
```

以 `/videos/` 开头、以 `.mp4` 结尾的 Markdown 链接会显示为内嵌播放器。渲染正文时会跳过原始 HTML。

## 常用命令

| 命令                | 说明                                                      |
| ------------------- | --------------------------------------------------------- |
| `pnpm dev`          | 启动开发服务器                                            |
| `pnpm build`        | 生成生产构建                                              |
| `pnpm start`        | 启动生产服务器，需先完成 `pnpm build`                     |
| `pnpm lint`         | 运行 ESLint                                               |
| `pnpm typecheck`    | 先执行 `next typegen` 生成路由类型，再执行 `tsc --noEmit` |
| `pnpm format`       | 使用 Prettier 格式化文件，会修改文件内容                  |
| `pnpm format:check` | 检查格式，不修改文件                                      |
| `pnpm check`        | 依次执行格式检查、ESLint 和类型检查，不包含测试与生产构建 |

提交前运行 `pnpm check`；涉及构建配置、依赖或页面运行行为的修改，还应验证 `pnpm build`。

## 项目结构

```text
.
├── public/                 # 通过站点根路径访问的静态资源
│   ├── images/             # 作品截图
│   └── videos/             # 作品演示视频
├── src/
│   ├── app/
│   │   ├── favicon.ico     # 站点图标
│   │   ├── globals.css     # 全局样式、主题变量和 Tailwind CSS 入口
│   │   ├── layout.tsx      # 根布局、字体和页面 metadata
│   │   ├── page.tsx        # 作品列表路由 /
│   │   └── projects/
│   │       └── [slug]/
│   │           ├── loading.tsx  # 详情页加载提示
│   │           └── page.tsx     # 作品详情路由 /projects/[slug]
│   ├── components/
│   │   └── ui/             # Button、Card、Input 等基础组件
│   ├── data/
│   │   └── projects.ts     # 静态作品数据与 Markdown 正文
│   └── lib/
│       └── utils.ts        # 公共工具，目前导出 cn
├── .vscode/settings.json   # 共享的 VS Code 格式化设置
├── .editorconfig           # 编辑器基础格式规范
├── .gitignore              # Git 忽略规则
├── .nvmrc                  # Node.js 版本
├── .prettierignore         # 不参与 Prettier 格式化的文件
├── .prettierrc.json        # Prettier 配置
├── AGENTS.md               # Next.js 版本相关的编码代理指引
├── components.json         # shadcn/ui 风格、路径别名等配置
├── eslint.config.mjs       # ESLint 配置
├── next.config.ts          # Next.js 配置
├── package.json            # 依赖、脚本与运行环境约定
├── pnpm-lock.yaml          # 依赖锁文件
├── pnpm-workspace.yaml     # pnpm 依赖构建脚本许可配置
└── tsconfig.json           # TypeScript 配置
```

`node_modules/`、`.next/`、`next-env.d.ts` 和 `*.tsbuildinfo` 由安装、开发或检查命令生成，不纳入版本控制。`pnpm typecheck` 会生成路由类型和 `next-env.d.ts`，新环境无需手动创建这些文件。

## 开发约定

- **路径别名**：`@/*` 对应 `src/*`，例如 `@/lib/utils`。
- **路由与组件**：页面和布局放在 `src/app/`，基础 UI 组件放在 `src/components/ui/`，公共工具放在 `src/lib/`。
- **样式**：使用 Tailwind CSS 与 `globals.css` 中的主题变量；当前通过 Turbopack 的 `@tailwindcss/turbopack` loader 处理 CSS。
- **Next.js 配置**：当前已开启 `cacheComponents` 和 `partialPrefetching`，具体配置见 `next.config.ts`。
- **格式规范**：2 空格缩进、双引号、保留分号、尾随逗号、100 字符行宽和 LF 换行。
- **编辑器**：VS Code 共享设置启用了保存时格式化，需要安装 Prettier 扩展（`esbenp.prettier-vscode`）。
- **依赖构建脚本**：`pnpm-workspace.yaml` 当前禁止执行 `sharp` 和 `unrs-resolver` 的安装构建脚本，相关调整应随工程配置提交。

## 环境变量与后端对接

当前源码未读取业务环境变量，也未配置 API 地址、请求封装、代理或后端接口。启动现有页面无需创建 `.env` 文件。

后续可先通过 API 提供作品数据和 Markdown 正文，再按需将作品媒体迁到对象存储。视频迁移时，需要同步更新正文地址和详情页的内嵌播放规则。

接入后端所需的环境变量文件应放在仓库根目录，与 `package.json` 同级。个人配置放在 `.env.local`，需要共享变量清单时可新增只含占位值的 `.env.example`。

只有需要暴露给浏览器的配置才使用 `NEXT_PUBLIC_` 前缀。这类变量会在构建时写入客户端代码，不应放入数据库密码、私钥或其他服务端密钥。具体行为参见 [Next.js 环境变量说明](https://nextjs.org/docs/app/guides/environment-variables)。

## 生产运行

在具备上述 Node.js 与 pnpm 环境的服务器上，于仓库根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm start
```

默认访问端口为 `3000`。如需指定端口，可执行 `pnpm start --port 3001`。

当前使用 Next.js Node.js 服务运行方式，尚未配置静态导出、Docker 或平台专用部署流程。

## 版本控制

源码、静态资源、依赖锁文件、工程配置和 `AGENTS.md` 应提交到仓库。`.vscode/settings.json` 与可选的 `.vscode/extensions.json` 可作为共享编辑器配置提交，其余本地 VS Code 文件默认忽略。

依赖目录、构建产物、缓存、日志、个人 IDE 文件和包含实际配置值的 `.env*` 文件由 `.gitignore` 排除；仅放行 `.env.example` 作为可选的环境变量模板。

`.prettierignore` 只控制格式化，不影响 Git 提交。例如，`pnpm-lock.yaml` 无需由 Prettier 格式化，但仍应提交。
