"use client";

import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { themeStorageKey } from "@/lib/theme";

const action =
  "inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-border px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");

  try {
    localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
  } catch {
    // The theme can still be changed when storage is unavailable.
  }
}

export function HomeHeaderActions() {
  const loginDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className={`${action} gap-2 sm:w-11 sm:gap-0 sm:px-0`}
        onClick={toggleTheme}
      >
        <Moon aria-hidden="true" className="size-4 dark:hidden" />
        <Sun aria-hidden="true" className="hidden size-4 dark:block" />
        <span className="sm:sr-only dark:hidden">切换为深色模式</span>
        <span className="hidden sm:sr-only dark:block">切换为浅色模式</span>
      </button>
      <button
        type="button"
        aria-haspopup="dialog"
        className={`${action} gap-2 whitespace-nowrap`}
        onClick={() => loginDialog.current?.showModal()}
      >
        登录
      </button>

      <dialog
        ref={loginDialog}
        aria-labelledby="login-title"
        aria-describedby="login-description"
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border bg-card p-6 text-card-foreground shadow-xl backdrop:bg-black/50"
      >
        <h2 id="login-title" className="text-lg font-semibold">
          登录
        </h2>
        <p id="login-description" className="mt-2 text-sm text-muted-foreground">
          账号功能暂未开放。
        </p>
        <form method="dialog" className="mt-5 flex justify-end">
          <button className={action}>关闭</button>
        </form>
      </dialog>
    </>
  );
}
