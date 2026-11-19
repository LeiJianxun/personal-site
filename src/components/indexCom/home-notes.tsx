"use client";

import { developmentNotes, type DevelopmentNote } from "@/data/development-notes";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import "./home-notes.css";

function NoteCover({ kind }: { kind: DevelopmentNote["cover"] }) {
  if (kind === "ring") {
    return (
      <div aria-hidden="true" className="home-notes__cover home-notes__ring-cover">
        <span className="home-notes__orbit" />
        <span className="home-notes__orbit home-notes__orbit-inner" />
        <span className="home-notes__orbit-core" />
      </div>
    );
  }

  if (kind === "theme") {
    return (
      <div aria-hidden="true" className="home-notes__cover home-notes__theme-cover">
        <span className="home-notes__theme-tile" />
        <span className="home-notes__theme-tile home-notes__theme-tile-front" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="home-notes__cover home-notes__api-cover">
      <span className="home-notes__brace">{"{"}</span>
      <span className="home-notes__api-lines">
        <span />
        <span />
        <span />
      </span>
      <span className="home-notes__brace">{"}"}</span>
    </div>
  );
}

export function HomeNotes({ className }: { className: string }) {
  const [activeNote, setActiveNote] = useState<DevelopmentNote | null>(null);
  const reader = useRef<HTMLElement>(null);
  const readingTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeNote) return;

    reader.current?.focus({ preventScroll: true });
    reader.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [activeNote]);

  function closeReading() {
    setActiveNote(null);
    readingTrigger.current?.focus();
  }

  function openReading(note: DevelopmentNote, event: MouseEvent<HTMLButtonElement>) {
    if (activeNote?.id === note.id) {
      closeReading();
      return;
    }

    readingTrigger.current = event.currentTarget;
    setActiveNote(note);
  }

  return (
    <section id="notes" aria-labelledby="notes-title" className={`${className} home-notes`}>
      <header className="home-notes__heading">
        <div className="home-notes__heading-copy">
          <h2 id="notes-title">开发手记</h2>
          <p className="home-notes__subtitle">做过的尝试，值得记下的细节。</p>
        </div>
        <p className="home-notes__heading-note">关于实现，也关于取舍</p>
      </header>

      <div className="home-notes__grid">
        {developmentNotes.map((note) => (
          <article key={note.id} className="home-notes__card">
            <NoteCover kind={note.cover} />
            <div className="home-notes__body">
              <p className="home-notes__category">{note.category}</p>
              <h3 className="home-notes__title">
                <span>{note.title[0]}</span>
                <span>{note.title[1]}</span>
              </h3>
              <button
                type="button"
                className="home-notes__read-button"
                aria-label={`阅读手记：${note.title.join("")}`}
                aria-expanded={activeNote?.id === note.id}
                aria-controls="notes-reader"
                onClick={(event) => openReading(note, event)}
              >
                阅读手记
                <ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeNote && (
        <section
          ref={reader}
          id="notes-reader"
          aria-labelledby="notes-reader-title"
          className="home-notes__reader"
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              closeReading();
            }
          }}
        >
          <div className="home-notes__reader-header">
            <h3 id="notes-reader-title" className="home-notes__reader-title">
              {activeNote.title.join("")}
            </h3>
            <button type="button" className="home-notes__close-button" onClick={closeReading}>
              收起
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="home-notes__reader-body">
            {activeNote.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      <aside aria-labelledby="now-title" className="home-notes__now">
        <div className="home-notes__now-main">
          <h3 id="now-title" className="home-notes__now-label">
            <span aria-hidden="true" className="home-notes__now-dot" />
            最近在折腾
          </h3>
          <p className="home-notes__now-title">给个人站补上项目之外的故事</p>
          <p className="home-notes__now-description">整理开发手记，也记录一点正在发生的事。</p>
        </div>

        <div className="home-notes__next">
          <p className="home-notes__next-label">接下来</p>
          <p className="home-notes__next-text">完善页脚的联系入口</p>
        </div>
      </aside>
    </section>
  );
}
