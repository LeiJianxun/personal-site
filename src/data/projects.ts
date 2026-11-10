// 类型声明
type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  bodyMarkdown: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "personal-site",
    title: "个人站点",
    summary: "一个整理个人项目和开发记录的作品集，可以从首页浏览卡片，再点进详情了解实现过程。",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [{ label: "查看源码", href: "https://github.com/LeiJianxun/personal-site/" }],
    bodyMarkdown: `## 项目背景

我想给做过的项目找一个固定的地方，记下每个项目解决了什么问题、用了哪些技术，以及开发过程中做过哪些取舍。

## 当前实现

- 首页从一份静态数据生成作品卡片。
- 宽屏上卡片并排展示，手机上改为单列。
- 每个作品都有独立地址，详情页根据地址找到对应内容。

## 后续计划

作品正文用 Markdown 编写。后端接入后，正文会存为数据库里的字符串，再通过 API 提供给详情页。

## 页面截图

![个人站点首页的作品卡片](/images/portfolio-home.png)

## 页面演示

[观看作品页演示](/videos/portfolio-demo.mp4)

`,
  },
  {
    slug: "motion-study",
    title: "界面动效实验（示例）",
    summary: "一条界面动效练习的示例记录，设想卡片从作品列表过渡到详情页时的效果。",
    stack: ["React", "CSS"],
    bodyMarkdown: `## 练习目标

这是一个用来验证作品详情排版的示例。设想用户点击作品卡片后，封面逐渐展开，帮助用户看清当前打开的是哪一个作品。

## 动效思路

- 保留卡片标题和封面，让两个页面之间有清楚的视觉联系。
- 先展开封面，再显示简介和正文。
- 用户开启减少动态效果时，直接显示详情页。

## 演示视频

这里预留一段短视频的位置，之后用来展示从列表点击卡片到详情页打开的过程。`,
  },
];
