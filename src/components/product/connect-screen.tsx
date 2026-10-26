import { CirclePause, Send } from "lucide-react";

import { team } from "@/demo/fixtures";
import { AppShell } from "./app-shell";

/** OneServe Connect: interner Messenger mit Kanälen und Systemhinweisen. */
export function ConnectScreen() {
  return (
    <AppShell active="connect" title="# Küche" toolbar={<span className="muted hide-sm">8 Mitglieder</span>}>
      <div className="cx">
        <div className="cx-ch">
          <small>Kanäle</small>
          <span className="cx-c">
            # Alle<em>2</em>
          </span>
          <span className="cx-c on"># Küche</span>
          <span className="cx-c"># Service</span>
          <span className="cx-c"># Lieferung</span>
          <small>Direkt</small>
          <span className="cx-c">
            <span className="av" style={{ width: 20, height: 20, fontSize: 9 }}>
              MR
            </span>
            Marco R.
          </span>
          <span className="cx-c">
            <span className="av" style={{ width: 20, height: 20, fontSize: 9 }}>
              LK
            </span>
            Lena K.
          </span>
        </div>
        <div className="cx-t">
          <div className="cx-msgs">
            <div className="pin">
              <div className="between">
                <b style={{ fontWeight: 600 }}>Ankündigung</b>
                <span className="muted" style={{ fontSize: 12 }}>
                  Gelesen von 11 / 14
                </span>
              </div>
              <span>Ab Montag gilt die neue Abendkarte. Bitte bis Freitag durchsehen.</span>
            </div>
            <div className="msg">
              <span className="av">MR</span>
              <div>
                <div className="msg-h">
                  <b>Marco R.</b>
                  <span>Küche · 18:41</span>
                </div>
                <div>Burrata ist für heute aus. Kann jemand den Salat im Shop pausieren?</div>
              </div>
            </div>
            <div className="sys">
              <span className="sys-ic">
                <CirclePause size={14} strokeWidth={2} aria-hidden="true" />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ fontWeight: 600 }}>Burrata-Salat pausiert</b>
                <div className="muted" style={{ fontSize: 12 }}>
                  Webshop und Kasse · von Lena K. · 18:42
                </div>
              </div>
              <span className="mbtn ghost hide-sm">Rückgängig</span>
            </div>
            <div className="msg">
              <span className="av">LK</span>
              <div>
                <div className="msg-h">
                  <b>Lena K.</b>
                  <span>Service · 18:42</span>
                </div>
                <div>Erledigt. Der Service weiß Bescheid.</div>
              </div>
            </div>
          </div>
          <div className="compose">
            <span>Nachricht an # Küche</span>
            <span className="mbtn" aria-hidden="true">
              <Send size={14} strokeWidth={2.2} />
            </span>
          </div>
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
