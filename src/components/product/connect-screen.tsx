"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CirclePause, CirclePlay, Send } from "lucide-react";

import { channels as initialChannels, team, type ChatMessage } from "@/demo/fixtures";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";

/**
 * Connect-Demo: interner Messenger. Kanäle wechseln, Nachricht schreiben,
 * Systemhinweis rückgängig machen, Ankündigung als gelesen markieren.
 */
export function ConnectScreen() {
  const inputId = useId();
  const [channelId, setChannelId] = useState("kueche");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() =>
    Object.fromEntries(initialChannels.map((c) => [c.id, c.messages])),
  );
  const [paused, setPaused] = useState(true);
  const [read, setRead] = useState(false);
  const [draft, setDraft] = useState("");
  const [unread, setUnread] = useState<Record<string, number>>({ service: 2, lieferung: 1 });

  const channel = initialChannels.find((c) => c.id === channelId)!;
  const list = messages[channelId];
  const listRef = useRef<HTMLDivElement>(null);

  // Neue Nachrichten sichtbar halten.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [list.length, channelId]);

  const open = (id: string) => {
    setChannelId(id);
    setUnread((u) => ({ ...u, [id]: 0 }));
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => ({
      ...m,
      [channelId]: [
        ...m[channelId],
        { id: `du-${m[channelId].length}`, author: "Du", initials: "DU", role: "Leitung", time: "jetzt", text },
      ],
    }));
    setDraft("");
  };

  return (
    <AppShell
      active="connect"
      title={`# ${channel.name}`}
      toolbar={<span className="muted hide-sm">{channel.members} Mitglieder</span>}
    >
      <div className="cx">
        <div className="cx-ch">
          <small>Kanäle</small>
          {initialChannels.map((c) => (
            <button
              key={c.id}
              type="button"
              className={cn("cx-c", c.id === channelId && "on")}
              aria-current={c.id === channelId}
              onClick={() => open(c.id)}
            >
              # {c.name}
              {unread[c.id] ? <em>{unread[c.id]}</em> : null}
            </button>
          ))}
          <small>Direkt</small>
          {team.slice(0, 2).map((m) => (
            <span className="cx-c" key={m.id}>
              <span className="av" style={{ width: 20, height: 20, fontSize: 9 }}>
                {m.initials}
              </span>
              {m.name}
            </span>
          ))}
        </div>
        <div className="cx-t">
          <div className="cx-tabs" role="group" aria-label="Kanal">
            {initialChannels.map((c) => (
              <button
                key={c.id}
                type="button"
                className={cn("chip", c.id === channelId ? "on" : "out")}
                aria-pressed={c.id === channelId}
                onClick={() => open(c.id)}
              >
                # {c.name}
              </button>
            ))}
          </div>
          <div className="cx-msgs" aria-live="polite" ref={listRef}>
            {channelId === "kueche" ? (
              <div className="pin">
                <div className="between">
                  <b style={{ fontWeight: 600 }}>Ankündigung</b>
                  <span className="muted" style={{ fontSize: 12 }}>
                    Gelesen von {read ? 12 : 11} / 14
                  </span>
                </div>
                <span>Ab Montag gilt die neue Abendkarte. Bitte bis Freitag durchsehen.</span>
                {!read ? (
                  <button
                    type="button"
                    className="mbtn ghost sm"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() => setRead(true)}
                  >
                    Als gelesen markieren
                  </button>
                ) : null}
              </div>
            ) : null}
            {list.map((m, i) => (
              <div key={m.id}>
                <div className="msg">
                  <span className="av">{m.initials}</span>
                  <div>
                    <div className="msg-h">
                      <b>{m.author}</b>
                      <span>
                        {m.role} · {m.time}
                      </span>
                    </div>
                    <div>{m.text}</div>
                  </div>
                </div>
                {channelId === "kueche" && i === 0 ? (
                  <div className="sys" style={{ marginTop: 16 }}>
                    <span className="sys-ic">
                      {paused ? (
                        <CirclePause size={14} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <CirclePlay size={14} strokeWidth={2} aria-hidden="true" />
                      )}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <b style={{ fontWeight: 600 }}>
                        {paused ? "Burrata-Salat pausiert" : "Burrata-Salat wieder verfügbar"}
                      </b>
                      <div className="muted" style={{ fontSize: 12 }}>
                        Webshop und Kasse · {paused ? "von Lena K. · 18:42" : "von dir · jetzt"}
                      </div>
                    </div>
                    <button type="button" className="mbtn ghost" onClick={() => setPaused((p) => !p)}>
                      {paused ? "Rückgängig" : "Wieder pausieren"}
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <form className="compose" onSubmit={send}>
            <label htmlFor={inputId} className="sr-only">
              Nachricht an # {channel.name}
            </label>
            <input
              id={inputId}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Nachricht an # ${channel.name}`}
              autoComplete="off"
              className="compose-input"
            />
            <button type="submit" className="mbtn" aria-label="Senden" disabled={!draft.trim()}>
              <Send size={14} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </form>
        </div>
        <div className="cx-on">
          <small>Im Dienst · {team.length}</small>
          {team.map((m) => (
            <div className="who" key={m.id}>
              <span className={m.role === "Fahrer" ? "av idle" : "av"}>{m.initials}</span>
              <div>
                <b>{m.name}</b>
                <span>{m.role === "Fahrer" ? "Fahrer · unterwegs" : m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
