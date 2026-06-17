import { useState } from "react";
import ContentTab from "./components/ContentTab";
import StylingTab from "./components/StylingTab";
import MobilePreview from "./components/MobilePreview";
import { defaultConfig } from "./data/defaultConfig";

export default function App() {
  const [activeTab, setActiveTab] = useState("content");
  const [config, setConfig] = useState(defaultConfig);

  // Update any field inside content.section.field
  const updateContent = (section, field, value) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          [field]: value,
        },
      },
    }));
  };

  // Update any styling key
  const updateStyling = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      styling: { ...prev.styling, [key]: value },
    }));
  };

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-logo">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 2L20 7V15L11 20L2 15V7L11 2Z"
              fill="#6366F1"
              fillOpacity="0.15"
              stroke="#6366F1"
              strokeWidth="1.5"
            />
            <path
              d="M11 6.5L16 9.5V13.5L11 16.5L6 13.5V9.5L11 6.5Z"
              fill="#6366F1"
            />
          </svg>
          <span className="logo-text">CSAT Builder</span>
        </div>

        <div className="app-tabs">
          <button
            className={`tab-btn ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
          <button
            className={`tab-btn ${activeTab === "styling" ? "active" : ""}`}
            onClick={() => setActiveTab("styling")}
          >
            Styling
          </button>
        </div>

        <div className="header-right">
          <span className="live-badge">
            <span className="live-dot" />
            Live Preview
          </span>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="app-body">
        <aside className="editor-panel">
          {activeTab === "content" ? (
            <ContentTab config={config.content} updateContent={updateContent} />
          ) : (
            <StylingTab config={config.styling} updateStyling={updateStyling} />
          )}
        </aside>

        <main className="preview-panel">
          <MobilePreview config={config} />
        </main>
      </div>
    </div>
  );
}