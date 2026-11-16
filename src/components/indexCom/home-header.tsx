"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { HomeHeaderActions } from "./home-header-actions";

const navItem =
  "inline-flex min-h-11 items-center rounded-md px-3 whitespace-nowrap sm:justify-center sm:px-2";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const desktop = window.matchMedia("(min-width: 40rem)");

    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setMenuOpen(false);
    }

    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [menuOpen]);

  function closeMenuOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape" || !menuOpen || header.current?.querySelector("dialog[open]")) {
      return;
    }

    event.preventDefault();
    setMenuOpen(false);
    menuButton.current?.focus();
  }

  return (
    <header
      ref={header}
      onKeyDown={closeMenuOnEscape}
      className="sticky top-0 z-30 shrink-0 border-border/70 bg-background supports-backdrop-filter:bg-background/75 supports-backdrop-filter:backdrop-blur-lg"
    >
      <div className="flex min-h-16 w-full items-center justify-between ps-5 pe-4 sm:min-h-[72px] sm:justify-start sm:gap-10 sm:ps-8 sm:pe-6 lg:gap-16 lg:ps-[max(3rem,calc(50%-36rem))] lg:pe-8">
        <Link
          href="/"
          aria-label="JianXun 首页"
          className={`inline-flex min-h-11 w-fit items-center rounded-md text-[1.65rem] leading-none font-extrabold tracking-[-0.075em] ${focus}`}
          onClick={() => setMenuOpen(false)}
        >
          JX<span className="text-primary">.</span>
        </Link>

        <button
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          aria-controls="home-header-menu"
          className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-lg hover:bg-accent sm:hidden ${focus}`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>

        <div
          id="home-header-menu"
          className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] flex-col gap-3 overflow-y-auto border-y bg-background px-4 pt-2 pb-4 shadow-lg sm:contents`}
        >
          <nav aria-label="主导航" className="sm:mr-auto">
            <ul className="grid gap-1 text-sm font-medium sm:flex sm:gap-x-4 lg:gap-x-6">
              <li className="grid">
                <Link
                  href="/"
                  aria-current="page"
                  className={`${navItem} ${focus} relative bg-accent font-semibold text-foreground sm:bg-transparent sm:after:absolute sm:after:inset-x-2 sm:after:bottom-0 sm:after:h-0.5 sm:after:rounded-full sm:after:bg-primary`}
                  onClick={() => setMenuOpen(false)}
                >
                  首页
                </Link>
              </li>
              <li className="grid">
                <a
                  href="#work"
                  className={`${navItem} ${focus} hover:bg-accent hover:text-accent-foreground`}
                  onClick={() => setMenuOpen(false)}
                >
                  作品
                </a>
              </li>
              {["资源", "关于"].map((label) => (
                <li key={label} className="grid">
                  <span
                    role="link"
                    aria-disabled="true"
                    title={`${label}待开放`}
                    className={`${navItem} text-muted-foreground`}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex sm:shrink-0 sm:items-center sm:gap-3">
            <HomeHeaderActions />
          </div>
        </div>
      </div>
    </header>
  );
}
