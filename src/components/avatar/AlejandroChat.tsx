"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import type { DossierLink } from "@/chat/types"
import {
  AVATAR_GREETING,
  AVATAR_PROMPTS,
  replyTo,
  type AvatarReply,
} from "@/lib/avatar-reply"

type ChatMessage = {
  id: string
  role: "user" | "alejandro"
  text: string
  links?: DossierLink[]
}

const AVATAR_SRC = "/media/alejandro-avatar.mp4"
const AVATAR_POSTER = "/media/alejandro-avatar-poster.jpg"

function messageFromReply(reply: AvatarReply): ChatMessage {
  const links =
    reply.links ??
    (reply.href && reply.hrefLabel
      ? [{ href: reply.href, label: reply.hrefLabel }]
      : undefined)
  return {
    id: crypto.randomUUID(),
    role: "alejandro",
    text: reply.text,
    links,
  }
}

export function AlejandroChat() {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [reduced, setReduced] = useState(false)
  const [speakTick, setSpeakTick] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    document.documentElement.dataset.avatar = open ? "open" : "idle"
    return () => {
      delete document.documentElement.dataset.avatar
    }
  }, [open])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduced(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      launcherRef.current?.focus()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  useEffect(() => {
    const log = panelRef.current?.querySelector(".avatar-log")
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, open])

  useEffect(() => {
    if (!open || reduced) return
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    void video.play().catch(() => undefined)
  }, [open, reduced, speakTick])

  function openChat() {
    setOpen(true)
    setMessages((current) => {
      if (current.length > 0) return current
      return [
        {
          id: "saludo",
          role: "alejandro",
          text: AVATAR_GREETING,
        },
      ]
    })
    setSpeakTick((tick) => tick + 1)
  }

  function ask(question: string) {
    const clean = question.trim()
    if (!clean) return
    const reply = replyTo(clean)
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: clean },
      messageFromReply(reply),
    ])
    setDraft("")
    setSpeakTick((tick) => tick + 1)
  }

  return (
    <div className="avatar-chat">
      {open ? (
        <section
          ref={panelRef}
          className="avatar-panel"
          role="dialog"
          aria-labelledby={titleId}
        >
          <div className="avatar-stage">
            <button
              type="button"
              className="avatar-close"
              onClick={() => {
                setOpen(false)
                launcherRef.current?.focus()
              }}
            >
              Cerrar
            </button>
            <div className="avatar-orb">
              {reduced ? (
                <img src={AVATAR_POSTER} alt="" className="avatar-still" />
              ) : (
                <video
                  ref={videoRef}
                  className="avatar-video"
                  src={AVATAR_SRC}
                  poster={AVATAR_POSTER}
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
            <p id={titleId} className="avatar-name">
              Alejandro Linares
            </p>
          </div>

          <div className="avatar-log" aria-live="polite">
            {messages.map((message) => (
              <article
                key={message.id}
                className="avatar-message"
                data-role={message.role}
              >
                <p>{message.text}</p>
                {message.links && message.links.length > 0 ? (
                  <div className="avatar-links">
                    {message.links.map((link) =>
                      link.href.startsWith("/") ? (
                        <Link key={link.href + link.label} href={link.href} className="avatar-jump">
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={link.href + link.label}
                          href={link.href}
                          className="avatar-jump"
                          rel="noreferrer"
                          target="_blank"
                        >
                          {link.label}
                        </a>
                      ),
                    )}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <div className="avatar-prompts">
            {AVATAR_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="avatar-prompt"
                onClick={() => ask(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="avatar-form"
            onSubmit={(event) => {
              event.preventDefault()
              ask(draft)
            }}
          >
            <label className="sr-only" htmlFor="avatar-question">
              Pregunta para Alejandro
            </label>
            <input
              ref={inputRef}
              id="avatar-question"
              className="avatar-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Escribe tu pregunta"
              autoComplete="off"
            />
            <button type="submit" className="avatar-send">
              Enviar
            </button>
          </form>
        </section>
      ) : (
        <button
          ref={launcherRef}
          type="button"
          className="avatar-launcher"
          aria-label="Hablar con Alejandro"
          onClick={openChat}
        >
          <span className="avatar-launcher-face">
            <img src={AVATAR_POSTER} alt="" className="avatar-still" />
          </span>
          <span className="avatar-launcher-label">Hablar</span>
        </button>
      )}
    </div>
  )
}
