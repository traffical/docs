// Hero lockup for the parametrization page: "Parametrize once," with a rotating
// second line, and underneath the one parameter that stays the same while the
// policy on it changes. Honours prefers-reduced-motion by showing the first line only.
//
// Styles live in the component's own <style> block: Mintlify rewrites Tailwind
// class names at build time and misses classes chosen at runtime.
export const ParametrizeOnce = () => {
  const lines = [
    { text: "Experiment Forever.", policy: "A/B test", detail: "10% vs 15%" },
    { text: "Optimize Forever.", policy: "Bandit", detail: "10% · 12% · 15% · 20%" },
    { text: "Roll Out Safely.", policy: "Rollout", detail: "5% → 25% → 100%" },
    { text: "Personalize Forever.", policy: "Contextual bandit", detail: "best value per visitor" },
    { text: "Measure Everything.", policy: "Measured on", detail: "revenue per session, margin" },
  ];

  const css = `
.po { container-type: inline-size; position: relative; margin: 1.5rem 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem;
  background: #0b0f1c; padding: 3.25rem 1.5rem 2.25rem; text-align: center; }
.po::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(30,110,251,0.24), transparent 65%); }
.po-body { position: relative; }
.po-big { white-space: nowrap; font-size: 40px; font-size: clamp(22px, 8.2cqi, 52px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; }
.po-once { color: #ffffff; }
.po-rot { display: grid; justify-items: center; margin-top: 0.15rem; }
.po-line { grid-area: 1 / 1; padding-bottom: 0.12em; background: linear-gradient(90deg, #4f8bff, #7c6cf5);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  opacity: 0; transform: translateY(16px); filter: blur(4px); transition: opacity 500ms ease, transform 500ms ease, filter 500ms ease; }
.po-line.po-prev { transform: translateY(-16px); }
.po-line.po-now { opacity: 1; transform: none; filter: none; }
.po-chip { display: inline-flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; max-width: 100%;
  margin-top: 2rem; padding: 0.45rem 1rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; background: rgba(255,255,255,0.05);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; }
.po-key { color: rgba(255,255,255,0.92); }
.po-sep { color: rgba(255,255,255,0.3); }
.po-policy { color: #7fa8ff; }
.po-detail { color: rgba(255,255,255,0.58); }
.po-swap { display: inline-grid; text-align: left; }
.po-state { grid-area: 1 / 1; white-space: nowrap; opacity: 0; transition: opacity 500ms ease; }
.po-state.po-now { opacity: 1; }
@container (max-width: 480px) { .po-state { white-space: normal; text-align: center; } .po-swap { text-align: center; } }
.po-note { margin-top: 0.75rem; font-size: 12px; color: rgba(255,255,255,0.42); }
@media (prefers-reduced-motion: reduce) { .po-line, .po-state { transition: none; } }
`;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % lines.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const prev = (index + lines.length - 1) % lines.length;

  return (
    <div className="not-prose po" role="img" aria-label="Parametrize once, experiment forever.">
      <style>{css}</style>
      <div className="po-body">
        <div className="po-big po-once">Parametrize once,</div>
        <div className="po-big po-rot" aria-hidden="true">
          {lines.map((line, i) => (
            <span key={line.text} className={i === index ? "po-line po-now" : i === prev ? "po-line po-prev" : "po-line"}>
              {line.text}
            </span>
          ))}
        </div>
        <div className="po-chip" aria-hidden="true">
          <span className="po-key">pricing.discount_pct</span>
          <span className="po-sep">·</span>
          {/* Every state is stacked in one grid cell, so the chip is as wide as the
              longest one and never changes width while the states crossfade. */}
          <span className="po-swap">
            {lines.map((line, i) => (
              <span key={line.text} className={i === index ? "po-state po-now" : "po-state"}>
                <span className="po-policy">{line.policy}</span> <span className="po-detail">{line.detail}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="po-note">Same parameter, same line of code. Only the policy changes.</div>
      </div>
    </div>
  );
};
