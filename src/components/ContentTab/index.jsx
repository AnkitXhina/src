import { useRef } from "react";

/* ── Reusable sub-components ── */

function Field({ label, children }) {
  return (
    <div className="ctrl-field">
      <label className="ctrl-label">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="toggle-row">
      <span className="toggle-label">{label}</span>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-track" />
      </label>
    </div>
  );
}

/* ── Main component ── */

export default function ContentTab({ config, updateContent }) {
  const { initial, feedback, thankYou } = config;
  const fileRef = useRef(null);

  /* Options handlers */
  const handleAddOption = () => {
    updateContent("feedback", "options", [
      ...feedback.options,
      { id: `opt-${Date.now()}`, text: "New option" },
    ]);
  };

  const handleDeleteOption = (id) => {
    if (feedback.options.length <= 1) return;
    updateContent(
      "feedback",
      "options",
      feedback.options.filter((o) => o.id !== id)
    );
  };

  const handleOptionText = (id, text) => {
    updateContent(
      "feedback",
      "options",
      feedback.options.map((o) => (o.id === id ? { ...o, text } : o))
    );
  };

  /* Media handler */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateContent("thankYou", "media", ev.target.result);
      updateContent("thankYou", "mediaType", file.type);
    };
    reader.readAsDataURL(file);
  };

  const clearMedia = () => {
    updateContent("thankYou", "media", null);
    updateContent("thankYou", "mediaType", null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="tab-content">

      {/* ── Initial Page ── */}
      <section className="editor-section">
        <h3 className="section-heading">Initial Page</h3>

        <Field label="Title">
          <input
            className="ctrl-input"
            value={initial.title}
            onChange={(e) => updateContent("initial", "title", e.target.value)}
            placeholder="How was your experience?"
          />
        </Field>

        <Field label="Subtitle">
          <input
            className="ctrl-input"
            value={initial.subtitle}
            onChange={(e) => updateContent("initial", "subtitle", e.target.value)}
            placeholder="Your feedback matters to us"
          />
        </Field>
      </section>

      {/* ── Feedback Page ── */}
      <section className="editor-section">
        <h3 className="section-heading">Feedback Page</h3>

        <Field label="Rating Type">
          <div className="segmented-ctrl">
            <button
              className={`seg-btn ${feedback.ratingType === "stars" ? "seg-active" : ""}`}
              onClick={() => updateContent("feedback", "ratingType", "stars")}
            >
              ★ Stars
            </button>
            <button
              className={`seg-btn ${feedback.ratingType === "numbers" ? "seg-active" : ""}`}
              onClick={() => updateContent("feedback", "ratingType", "numbers")}
            >
              1–5 Numbers
            </button>
          </div>
        </Field>

        <Field label="Options">
          <div className="options-list">
            {feedback.options.map((opt) => (
              <div key={opt.id} className="option-row">
                <span className="option-drag" title="Drag to reorder">⠿</span>
                <input
                  className="ctrl-input option-input"
                  value={opt.text}
                  onChange={(e) => handleOptionText(opt.id, e.target.value)}
                />
                <button
                  className="icon-btn delete-btn"
                  onClick={() => handleDeleteOption(opt.id)}
                  disabled={feedback.options.length <= 1}
                  title="Remove option"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button className="add-option-btn" onClick={handleAddOption}>
            <span>＋</span> Add Option
          </button>
        </Field>

        <Toggle
          label="Additional Comment"
          checked={feedback.showComment}
          onChange={(v) => updateContent("feedback", "showComment", v)}
        />

        <Field label="Submit Button Text">
          <input
            className="ctrl-input"
            value={feedback.submitText}
            onChange={(e) => updateContent("feedback", "submitText", e.target.value)}
          />
        </Field>
      </section>

      {/* ── Thank You Page ── */}
      <section className="editor-section">
        <h3 className="section-heading">Thank You Page</h3>

        <Field label="Media Upload">
          {thankYou.media ? (
            <div className="media-preview-wrap">
              {thankYou.mediaType === "application/json" ? (
                <div className="lottie-placeholder">
                  <span>✦</span>
                  <span>Lottie JSON loaded</span>
                </div>
              ) : (
                <img src={thankYou.media} alt="Preview" className="media-img" />
              )}
              <button className="clear-media-btn" onClick={clearMedia}>
                Remove
              </button>
            </div>
          ) : (
            <label className="upload-area">
              <input
                ref={fileRef}
                type="file"
                accept=".png,.jpg,.jpeg,.gif,.json,image/png,image/jpeg,image/gif,application/json"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <span className="upload-icon">↑</span>
              <span className="upload-text">Click to upload</span>
              <span className="upload-hint">PNG, JPG, GIF, Lottie JSON</span>
            </label>
          )}
        </Field>

        <Field label="Title">
          <input
            className="ctrl-input"
            value={thankYou.title}
            onChange={(e) => updateContent("thankYou", "title", e.target.value)}
          />
        </Field>

        <Field label="Subtitle">
          <input
            className="ctrl-input"
            value={thankYou.subtitle}
            onChange={(e) => updateContent("thankYou", "subtitle", e.target.value)}
          />
        </Field>

        <Field label="Button Text">
          <input
            className="ctrl-input"
            value={thankYou.buttonText}
            onChange={(e) => updateContent("thankYou", "buttonText", e.target.value)}
          />
        </Field>
      </section>

    </div>
  );
}