import { useRef } from "react";

/* ── Reusable sub-components ── */

function ColorPicker({ label, value, onChange }) {
  const ref = useRef(null);
  return (
    <div className="ctrl-field">
      <label className="ctrl-label">{label}</label>
      <div className="color-row" onClick={() => ref.current?.click()}>
        <span className="color-swatch" style={{ background: value }} />
        <span className="color-hex">{value.toUpperCase()}</span>
        <span className="color-chevron">›</span>
        <input
          ref={ref}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
        />
      </div>
    </div>
  );
}

function SliderCtrl({ label, value, onChange, min, max, unit = "" }) {
  const pct = `${((value - min) / (max - min)) * 100}%`;
  return (
    <div className="ctrl-field">
      <div className="ctrl-label-row">
        <label className="ctrl-label">{label}</label>
        <span className="ctrl-value">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        className="ctrl-slider"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": pct }}
      />
    </div>
  );
}

/* ── Main component ── */

export default function StylingTab({ config: s, updateStyling }) {
  return (
    <div className="tab-content">

      {/* ── Colors ── */}
      <section className="editor-section">
        <h3 className="section-heading">Colors</h3>
        <ColorPicker
          label="Background Color"
          value={s.backgroundColor}
          onChange={(v) => updateStyling("backgroundColor", v)}
        />
        <ColorPicker
          label="Title Color"
          value={s.titleColor}
          onChange={(v) => updateStyling("titleColor", v)}
        />
        <ColorPicker
          label="Subtitle Color"
          value={s.subtitleColor}
          onChange={(v) => updateStyling("subtitleColor", v)}
        />
        <ColorPicker
          label="Button Color"
          value={s.buttonColor}
          onChange={(v) => updateStyling("buttonColor", v)}
        />
        <ColorPicker
          label="Button Text Color"
          value={s.buttonTextColor}
          onChange={(v) => updateStyling("buttonTextColor", v)}
        />
        <ColorPicker
          label="Rating Selected Color"
          value={s.ratingSelectedColor}
          onChange={(v) => updateStyling("ratingSelectedColor", v)}
        />
        <ColorPicker
          label="Rating Unselected Color"
          value={s.ratingUnselectedColor}
          onChange={(v) => updateStyling("ratingUnselectedColor", v)}
        />
      </section>

      {/* ── Typography ── */}
      <section className="editor-section">
        <h3 className="section-heading">Typography</h3>
        <SliderCtrl
          label="Font Size"
          value={s.fontSize}
          onChange={(v) => updateStyling("fontSize", v)}
          min={12}
          max={22}
          unit="px"
        />
        <div className="ctrl-field">
          <label className="ctrl-label">Font Weight</label>
          <select
            className="ctrl-select"
            value={s.fontWeight}
            onChange={(e) => updateStyling("fontWeight", e.target.value)}
          >
            <option value="Regular">Regular</option>
            <option value="Medium">Medium</option>
            <option value="Bold">Bold</option>
          </select>
        </div>
      </section>

      {/* ── Shape & Size ── */}
      <section className="editor-section">
        <h3 className="section-heading">Shape & Size</h3>
        <SliderCtrl
          label="Border Radius"
          value={s.borderRadius}
          onChange={(v) => updateStyling("borderRadius", v)}
          min={0}
          max={28}
          unit="px"
        />
        <SliderCtrl
          label="Button Width"
          value={s.buttonWidth}
          onChange={(v) => updateStyling("buttonWidth", v)}
          min={40}
          max={100}
          unit="%"
        />
        <SliderCtrl
          label="Button Height"
          value={s.buttonHeight}
          onChange={(v) => updateStyling("buttonHeight", v)}
          min={32}
          max={64}
          unit="px"
        />
      </section>

    </div>
  );
}