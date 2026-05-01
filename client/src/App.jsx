import { useState, useEffect, useRef } from "react";
import "./index.css";
import anshumanImg from "./assets/anshuman.png";
import abhimanyuImg from "./assets/abhimanyu.png";
import kshitijImg from "./assets/kshitij.png";

const PORTRAITS = { anshuman: anshumanImg, abhimanyu: abhimanyuImg, kshitij: kshitijImg };

const API_URL = import.meta.env.VITE_API_URL;

const PERSONAS = {
  anshuman: {
    name: "Anshuman Singh",
    firstName: "Anshuman",
    lastName: "Singh",
    title: "Concept Architect",
    tagline: "First principles before solutions",
    bio: "Guides with questions rather than answers. Builds deep intuition before jumping to code. Every concept earns its place.",
    abbr: "An",
    num: "01",
    accent: "#c9a433",
    accentDim: "rgba(201, 164, 51, 0.10)",
    accentGlow: "rgba(201, 164, 51, 0.22)",
    bgPrimary: "#09090f",
    bgSecondary: "#0f0f1b",
    bgTertiary: "#15152a",
  },
  abhimanyu: {
    name: "Abhimanyu Saxena",
    firstName: "Abhimanyu",
    lastName: "Saxena",
    title: "Execution Engine",
    tagline: "Ship fast, ship right",
    bio: "Founder mentality. Cuts through noise with direct, actionable clarity. No hand-holding — only momentum.",
    abbr: "Ab",
    num: "02",
    accent: "#e04040",
    accentDim: "rgba(224, 64, 64, 0.10)",
    accentGlow: "rgba(224, 64, 64, 0.22)",
    bgPrimary: "#0f0909",
    bgSecondary: "#1a0f0f",
    bgTertiary: "#221515",
  },
  kshitij: {
    name: "Kshitij Mishra",
    firstName: "Kshitij",
    lastName: "Mishra",
    title: "Algorithm Oracle",
    tagline: "Patterns reveal optimal paths",
    bio: "Sees through problems to their underlying patterns. Concise, technical, and relentless about optimization.",
    abbr: "Ks",
    num: "03",
    accent: "#00cc6a",
    accentDim: "rgba(0, 204, 106, 0.10)",
    accentGlow: "rgba(0, 204, 106, 0.22)",
    bgPrimary: "#060f0a",
    bgSecondary: "#0b1810",
    bgTertiary: "#0f2016",
  },
};

const SUGGESTIONS = {
  anshuman: ["Explain recursion", "What is DP?", "How to approach trees?"],
  abhimanyu: ["How to build a startup?", "DSA vs projects?", "How to stay consistent?"],
  kshitij: ["How to solve DP problems?", "Sliding window pattern?", "How to improve speed?"],
};

const FADE_MS = 180;

export default function App() {
  // `persona`        → drives CSS vars (updates immediately → colors cross-fade)
  // `displayPersona` → drives text content (updates after fade-out → no flash)
  const [persona, setPersona] = useState("anshuman");
  const [displayPersona, setDisplayPersona] = useState("anshuman");
  const [fading, setFading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const p  = PERSONAS[persona];         // CSS vars source
  const dp = PERSONAS[displayPersona];  // display content source

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = text ?? input;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, persona }),
      });
      const data = await res.json();
      const text = data.reply || data.error || "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "bot", text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Error: Could not reach the server." }]);
    }

    setLoading(false);
  };

  const handlePersonaChange = (key) => {
    if (key === persona) return;

    // 1. Start fade-out + update CSS vars immediately (colors begin cross-fading)
    setFading(true);
    setPersona(key);

    // 2. After fade-out completes, swap text content and fade back in
    setTimeout(() => {
      setDisplayPersona(key);
      setMessages([]);
      setFading(false);
    }, FADE_MS);
  };

  return (
    <div
      className="app"
      style={{
        "--accent":     p.accent,
        "--accent-dim": p.accentDim,
        "--accent-glow":p.accentGlow,
        "--bg-primary": p.bgPrimary,
        "--bg-secondary":p.bgSecondary,
        "--bg-tertiary":p.bgTertiary,
      }}
    >
      {/* ── Profile Panel ─────────────────────────────── */}
      <aside className="profile">
        <div className="profile-portrait" data-persona={displayPersona}>
          <img src={PORTRAITS[displayPersona]} alt="" />
        </div>
        <div className="profile-watermark">{dp.num}</div>

        <div className="profile-brand">
          <span className="brand-word">PERSONA</span>
          <span className="brand-dot">.</span>
          <span className="brand-word">AI</span>
        </div>

        {/* Text content fades on switch */}
        <div className={`profile-identity ${fading ? "fading" : ""}`}>
          <div className="profile-num-label">{dp.num}</div>
          <div className="profile-name">
            <span className="profile-fname">{dp.firstName}</span>
            <span className="profile-lname">{dp.lastName}</span>
          </div>
          <div className="profile-rule" />
          <div className="profile-title">{dp.title}</div>
          <blockquote className="profile-quote">"{dp.tagline}"</blockquote>
          <p className="profile-bio">{dp.bio}</p>
        </div>

        <div className="switcher">
          {Object.entries(PERSONAS).map(([key, pd]) => (
            <button
              key={key}
              className={`switch-btn ${persona === key ? "active" : ""}`}
              onClick={() => handlePersonaChange(key)}
              style={{ "--btn-accent": pd.accent, "--btn-dim": pd.accentDim }}
            >
              <span className="switch-abbr">{pd.abbr}</span>
              <span className="switch-first">{pd.firstName}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ── Chat Panel ────────────────────────────────── */}
      <main className="chat-panel">
        <div className="mobile-bar">
          {Object.entries(PERSONAS).map(([key, pd]) => (
            <button
              key={key}
              className={`mobile-pill ${persona === key ? "active" : ""}`}
              onClick={() => handlePersonaChange(key)}
              style={{ "--pill-accent": pd.accent, "--pill-dim": pd.accentDim }}
            >
              <span className="mobile-pill-abbr">{pd.abbr}</span>
              <span>{pd.firstName}</span>
              <span className="mobile-pill-num">{pd.num}</span>
            </button>
          ))}
        </div>

        <div className={`mobile-persona-strip ${fading ? "fading" : ""}`}>
          <div className="mobile-strip-left">
            <span className="mobile-strip-name">{dp.firstName} <em>{dp.lastName}</em></span>
            <span className="mobile-strip-title">{dp.title}</span>
          </div>
          <blockquote className="mobile-strip-quote">"{dp.tagline}"</blockquote>
        </div>

        <div className="chat-header">
          <span className="chat-label">CONVERSATION</span>
          <div className="chat-header-right">
            <span className="chat-active-name">{dp.name}</span>
            {messages.length > 0 && (
              <button className="clear-btn" onClick={() => setMessages([])}>Clear</button>
            )}
          </div>
        </div>

        <div className="chat" ref={chatRef}>
          {messages.length === 0 && (
            <div className="empty">
              <div className="empty-glyph">✦</div>
              <p>Begin your session with {dp.firstName}</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              {msg.role === "bot" && <div className="msg-avatar">{dp.abbr}</div>}
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}

          {loading && (
            <div className="msg bot">
              <div className="msg-avatar">{dp.abbr}</div>
              <div className="msg-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <div className="chips">
          {SUGGESTIONS[displayPersona].map((text, i) => (
            <button key={i} className="chip" onClick={() => sendMessage(text)}>
              {text}
            </button>
          ))}
        </div>

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={`Ask ${dp.firstName} something…`}
          />
          <button className="send" onClick={() => sendMessage()} aria-label="Send">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
