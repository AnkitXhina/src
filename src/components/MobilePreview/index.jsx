import { useState } from "react";

/* ── Screen sub-components ── */

function InitialScreen({ content, styles: cs, onNext }) {
  return (
    <div className="screen-inner initial-screen">
      <div className="screen-hero-icon">💬</div>
      <h2 style={cs.title}>{content.title}</h2>
      <p style={{ ...cs.subtitle, marginTop: 8, marginBottom: 32, lineHeight: 1.5 }}>
        {content.subtitle}
      </p>
      <button style={cs.btn} onClick={onNext} className="preview-btn">
        Give Feedback
      </button>
    </div>
  );
}

function FeedbackScreen({ content, styling, styles: cs, rating, hoverRating, selectedOpts, comment, onRating, onHoverRating, onToggleOpt, onComment, onSubmit, onBack }) {
  const s = styling;
  const activeRating = hoverRating || rating;
  const br = `${s.borderRadius}px`;

  return (
    <div className="screen-inner feedback-screen">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <h2 style={{ ...cs.title, fontSize: cs.title.fontSize - 2, textAlign: "left", marginBottom: 4 }}>
        Rate your experience
      </h2>

      {/* Rating */}
      <div className="rating-wrap">
        {content.ratingType === "stars" ? (
          <div className="stars-row">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className="star-btn"
                style={{
                  color: n <= activeRating ? s.ratingSelectedColor : s.ratingUnselectedColor,
                  transform: n <= activeRating ? "scale(1.15)" : "scale(1)",
                }}
                onClick={() => onRating(n)}
                onMouseEnter={() => onHoverRating(n)}
                onMouseLeave={() => onHoverRating(0)}
              >
                ★
              </button>
            ))}
          </div>
        ) : (
          <div className="numbers-row">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className="number-btn"
                style={{
                  borderRadius: br,
                  border: `2px solid ${n === rating ? s.ratingSelectedColor : s.ratingUnselectedColor}`,
                  background: n === rating ? s.ratingSelectedColor : "transparent",
                  color: n === rating ? "#fff" : "#374151",
                  fontWeight: n === rating ? 700 : 500,
                }}
                onClick={() => onRating(n)}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Option chips */}
      {content.options.length > 0 && (
        <div className="options-chips">
          {content.options.map((opt) => {
            const active = selectedOpts.has(opt.id);
            return (
              <button
                key={opt.id}
                className="option-chip"
                style={{
                  borderRadius: br,
                  border: `1.5px solid ${active ? s.buttonColor : "#E5E7EB"}`,
                  background: active ? `${s.buttonColor}18` : "transparent",
                  color: active ? s.buttonColor : "#374151",
                  fontSize: s.fontSize - 2,
                }}
                onClick={() => onToggleOpt(opt.id)}
              >
                {active && <span className="chip-check">✓ </span>}
                {opt.text}
              </button>
            );
          })}
        </div>
      )}

      {/* Comment */}
      {content.showComment && (
        <textarea
          className="comment-area"
          placeholder="Add a comment (optional)"
          value={comment}
          onChange={(e) => onComment(e.target.value)}
          style={{ borderRadius: br, fontSize: s.fontSize - 2 }}
        />
      )}

      {/* Submit */}
      <button style={{ ...cs.btn, marginTop: "auto" }} className="preview-btn" onClick={onSubmit}>
        {content.submitText}
      </button>
    </div>
  );
}

function ThankYouScreen({ content, styles: cs, onClose }) {
  return (
    <div className="screen-inner thankyou-screen">
      {content.media && content.mediaType !== "application/json" ? (
        <img src={content.media} alt="Thank you" className="thankyou-media" />
      ) : content.media ? (
        <div className="lottie-display">✦</div>
      ) : (
        <div className="thankyou-emoji">🎉</div>
      )}
      <h2 style={cs.title}>{content.title}</h2>
      <p style={{ ...cs.subtitle, marginTop: 8, marginBottom: 32, lineHeight: 1.5 }}>
        {content.subtitle}
      </p>
      <button style={cs.btn} className="preview-btn" onClick={onClose}>
        {content.buttonText}
      </button>
    </div>
  );
}

/* ── Phone frame ── */

function PhoneFrame({ children }) {
  return (
    <div className="phone-outer">
      <div className="phone-screen-wrap">
        {/* Status bar */}
        <div className="phone-status">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            {/* Signal */}
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
              <rect x="0" y="6" width="3" height="5" rx="0.5" opacity="0.3" />
              <rect x="4.5" y="3.5" width="3" height="7.5" rx="0.5" opacity="0.6" />
              <rect x="9" y="1" width="3" height="10" rx="0.5" />
              <rect x="14" y="0" width="2" height="11" rx="0.5" opacity="0.2" />
            </svg>
            {/* Battery */}
            <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
              <rect x="0" y="0.5" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
              <rect x="19" y="3" width="3" height="5" rx="1" opacity="0.4" />
              <rect x="1.5" y="2" width="13" height="7" rx="1" />
            </svg>
          </div>
        </div>
        {/* Dynamic Island */}
        <div className="dynamic-island" />
        {/* Screen content */}
        {children}
      </div>
    </div>
  );
}

/* ── Main MobilePreview component ── */

const STEP_LABELS = ["Initial", "Feedback", "Thank You"];

export default function MobilePreview({ config }) {
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedOpts, setSelectedOpts] = useState(new Set());
  const [comment, setComment] = useState("");

  const { content, styling: s } = config;
  const fw = { Regular: 400, Medium: 500, Bold: 700 }[s.fontWeight] ?? 500;
  const br = `${s.borderRadius}px`;

  // Computed style objects shared across screens
  const computedStyles = {
    title: { color: s.titleColor, fontSize: s.fontSize + 2, fontWeight: 700 },
    subtitle: { color: s.subtitleColor, fontSize: s.fontSize - 1, fontWeight: fw },
    btn: {
      display: "block",
      width: `${s.buttonWidth}%`,
      height: `${s.buttonHeight}px`,
      background: s.buttonColor,
      color: s.buttonTextColor,
      borderRadius: br,
      border: "none",
      fontSize: s.fontSize - 1,
      fontWeight: 600,
      cursor: "pointer",
      margin: "0 auto",
      transition: "opacity 0.15s",
    },
  };

  const toggleOpt = (id) => {
    setSelectedOpts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const resetInteraction = () => {
    setRating(0);
    setHoverRating(0);
    setSelectedOpts(new Set());
    setComment("");
  };

  return (
    <div className="preview-wrapper">
      <PhoneFrame>
        <div
          className="phone-content"
          key={step} // triggers fade animation on step change
          style={{ background: s.backgroundColor }}
        >
          {step === 0 && (
            <InitialScreen
              content={content.initial}
              styles={computedStyles}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <FeedbackScreen
              content={content.feedback}
              styling={s}
              styles={computedStyles}
              rating={rating}
              hoverRating={hoverRating}
              selectedOpts={selectedOpts}
              comment={comment}
              onRating={setRating}
              onHoverRating={setHoverRating}
              onToggleOpt={toggleOpt}
              onComment={setComment}
              onSubmit={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <ThankYouScreen
              content={content.thankYou}
              styles={computedStyles}
              onClose={() => { setStep(0); resetInteraction(); }}
            />
          )}
        </div>
      </PhoneFrame>

      {/* Step navigation */}
      <div className="preview-nav">
        <button
          className="nav-arrow"
          onClick={() => setStep((p) => Math.max(0, p - 1))}
          disabled={step === 0}
        >
          ‹
        </button>
        <div className="step-labels">
          {STEP_LABELS.map((label, i) => (
            <button
              key={i}
              className={`step-label ${step === i ? "step-active" : ""}`}
              onClick={() => setStep(i)}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          className="nav-arrow"
          onClick={() => setStep((p) => Math.min(2, p + 1))}
          disabled={step === 2}
        >
          ›
        </button>
      </div>
    </div>
  );
}