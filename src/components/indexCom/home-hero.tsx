"use client";

import { ArrowDown, Play } from "lucide-react";
import { useEffect, useState } from "react";

export function HomeHero() {
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // 组件挂载后，在下一帧启动显影
    const frameId = requestAnimationFrame(() => {
      if (!reducedMotion.matches) {
        setIsRevealing(true);
      }
    });

    function stopReveal(event: MediaQueryListEvent) {
      if (event.matches) setIsRevealing(false);
    }

    reducedMotion.addEventListener("change", stopReveal);

    return () => {
      cancelAnimationFrame(frameId);
      reducedMotion.removeEventListener("change", stopReveal);
    };
  }, []);

  function playReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIsRevealing(true);
  }

  return (
    <section
      aria-labelledby="home-title"
      aria-describedby="home-description"
      className={`home-hero mb-20 text-center sm:mb-24 lg:mb-28${isRevealing ? " is-revealing" : ""}`}
    >
      <div className="home-hero-stage relative isolate overflow-hidden">
        {/* Positioning and floating use separate layers so their transforms do not conflict. */}
        <div
          aria-hidden="true"
          className="home-hero-ring-position"
          onAnimationEnd={(event) => {
            if (event.animationName === "hero-ring-reveal") setIsRevealing(false);
          }}
        >
          <div className="home-hero-ring h-full w-full" />
        </div>

        <div className="home-hero-heading relative z-20">
          <p className="home-hero-greeting text-muted-foreground">你好，我是</p>
          <h1 id="home-title" lang="en" aria-label="JianXun." className="home-hero-title">
            <span className="home-hero-name" data-name="JianXun">
              JianXun
            </span>
            <span className="home-hero-dot">.</span>
          </h1>
        </div>
      </div>

      <div className="home-hero-introduction relative z-20 px-4 pt-6 sm:px-6">
        <p className="home-hero-tagline">把项目做出来，把过程记下来。</p>
        <p
          id="home-description"
          className="mt-3 text-[13px] leading-[1.85] text-muted-foreground sm:text-[15px]"
        >
          这里是我的个人站，
          <br className="sm:hidden" />
          分享项目、开发记录，以及实用的资源与工具。
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <a
            href="#work"
            className="home-hero-work inline-flex min-h-11 items-center gap-3 rounded-xl px-5 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            查看作品
            <ArrowDown aria-hidden="true" className="size-4" />
          </a>
          <button
            type="button"
            onClick={playReveal}
            disabled={isRevealing}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 py-2.5 text-[13px] text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-default disabled:opacity-60 motion-reduce:hidden"
          >
            <Play aria-hidden="true" className="size-4" />
            {isRevealing ? "显影中" : "播放显影"}
          </button>
        </div>
      </div>
    </section>
  );
}
