// Two lanes over the same stretch of time: shipping new values behind boolean
// flags (every value is a release) versus through one typed parameter (one release,
// then config changes). A playhead sweeps while the figure is on screen; with
// prefers-reduced-motion the finished state is shown.
//
// Styles live in the component's own <style> block: Mintlify rewrites Tailwind
// class names at build time and misses classes chosen at runtime.
export const ShipTimeline = () => {
  const SWEEP_MS = 10000;
  const HOLD_MS = 2400;

  const lanes = [
    {
      key: "flag",
      title: "Boolean flags",
      sub: "every new value is a release",
      blocks: [
        { start: 0, end: 20, label: "PR + deploy" },
        { start: 30, end: 50, label: "PR + deploy" },
        { start: 60, end: 80, label: "PR + deploy" },
        { start: 90, end: 100, label: "cleanup" },
      ],
      markers: [
        { at: 24, label: "v1", status: "v1 live, v2 needs another release" },
        { at: 54, label: "v2", status: "v2 live, v3 needs another release" },
        { at: 84, label: "v3", status: "v3 live, then a cleanup release" },
      ],
      idle: "writing and reviewing the first variant",
    },
    {
      key: "param",
      title: "Typed parameter",
      sub: "one release, then values",
      blocks: [{ start: 0, end: 20, label: "PR + deploy" }],
      markers: [
        { at: 24, label: "10%", status: "default 10%, today's value" },
        { at: 33, label: "1%", status: "canary, 15% for 1% of users" },
        { at: 42, label: "A/B", status: "A/B test, 10% vs 15%" },
        { at: 51, label: "25%", status: "rollout of 15% to 25% of users" },
        { at: 60, label: "100%", status: "rollout of 15% to everyone" },
        { at: 69, label: "15%", status: "15% is the new default" },
        { at: 78, label: "A/B", status: "next test, 15% vs 20%" },
        { at: 88, label: "bandit", status: "a bandit keeps tuning the value" },
      ],
      idle: "parametrizing the discount, default 10%",
    },
  ];

  const css = `
.stl { --stl-ink: #18181b; --stl-muted: #71717a; --stl-line: #e4e4e7; --stl-card: #ffffff; --stl-border: #e4e4e7;
  --stl-block: #fafafa; --stl-block-fill: #e4e4e7; --stl-block-border: #d4d4d8; --stl-block-text: #52525b;
  --stl-flag: #d97706; --stl-flag-dot: #fbbf24; --stl-param: #1e6efb; --stl-param-dot: #4f8bff; --stl-off: #ffffff;
  margin: 1.5rem 0; overflow-x: auto; border: 1px solid var(--stl-border); border-radius: 1rem; background: var(--stl-card); padding: 0.75rem 1.25rem 0.75rem 1rem; }
html.dark .stl { --stl-ink: #ffffff; --stl-muted: #a1a1aa; --stl-line: rgba(255,255,255,0.1); --stl-card: rgba(255,255,255,0.03);
  --stl-border: rgba(255,255,255,0.1); --stl-block: rgba(255,255,255,0.05); --stl-block-fill: rgba(255,255,255,0.14);
  --stl-block-border: rgba(255,255,255,0.15); --stl-block-text: #d4d4d8; --stl-flag: #fbbf24; --stl-param: #7fa8ff; --stl-off: #0f1117; }
.stl-inner { min-width: 430px; }
.stl-lane { padding: 0.75rem 0; }
.stl-lane + .stl-lane { border-top: 1px solid var(--stl-line); }
.stl-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; column-gap: 1rem; row-gap: 0.15rem; font-size: 12px; color: var(--stl-muted); }
.stl-title { font-size: 13px; font-weight: 600; color: var(--stl-ink); margin-right: 0.5rem; }
.stl-count { white-space: nowrap; }
.stl-count b { font-size: 15px; font-weight: 700; }
.stl-count i { font-style: normal; font-weight: 600; color: var(--stl-ink); }
.stl-flag .stl-accent { color: var(--stl-flag); }
.stl-param .stl-accent { color: var(--stl-param); }
.stl-track { position: relative; height: 58px; margin-top: 0.5rem; }
.stl-axis { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--stl-line); }
.stl-block { position: absolute; top: 50%; height: 24px; transform: translateY(-50%); overflow: hidden; border-radius: 6px;
  border: 1px solid var(--stl-block-border); background: var(--stl-block); }
.stl-fill { position: absolute; top: 0; bottom: 0; left: 0; background: var(--stl-block-fill); }
.stl-block span { position: relative; display: flex; height: 100%; align-items: center; justify-content: center; white-space: nowrap;
  padding: 0 4px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; color: var(--stl-block-text); }
.stl-marker { position: absolute; top: 50%; }
.stl-dot { position: absolute; left: 0; top: 0; width: 10px; height: 10px; transform: translate(-50%, -50%); border-radius: 999px; border: 2px solid var(--stl-block-border);
  background: var(--stl-off); transition: all 300ms ease; }
.stl-on .stl-dot { width: 13px; height: 13px; }
.stl-flag .stl-on .stl-dot { border-color: var(--stl-flag); background: var(--stl-flag-dot); box-shadow: 0 0 0 4px rgba(245,158,11,0.18); }
.stl-param .stl-on .stl-dot { border-color: var(--stl-param); background: var(--stl-param-dot); box-shadow: 0 0 0 4px rgba(30,110,251,0.18); }
.stl-label { position: absolute; transform: translateX(-50%); white-space: nowrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px; font-weight: 500; opacity: 0; transition: opacity 300ms ease; }
.stl-on .stl-label { opacity: 1; }
.stl-up { bottom: 10px; }
.stl-down { top: 10px; }
.stl-head-line { position: absolute; top: -4px; bottom: -4px; width: 1px; background: rgba(30,110,251,0.55); pointer-events: none; transition: opacity 300ms ease; }
.stl-status { margin-top: 0.25rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: var(--stl-muted); }
`;

  const [t, setT] = useState(100);
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = null;
    let started = 0;
    const tick = () => {
      const elapsed = (Date.now() - started) % (SWEEP_MS + HOLD_MS);
      setT(Math.min(100, (elapsed / SWEEP_MS) * 100));
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          started = Date.now();
          timer = setInterval(tick, 40);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
          setT(100);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="not-prose stl"
      role="img"
      aria-label="Over the same period, boolean flags get three values live with four deploys. A typed parameter gets eight values live with one deploy."
    >
      <style>{css}</style>
      <div className="stl-inner">
        {lanes.map((lane) => {
          const live = lane.markers.filter((m) => t >= m.at);
          const deploys = lane.blocks.filter((b) => t >= b.end).length;
          const latest = live[live.length - 1];
          return (
            <div key={lane.key} className={`stl-lane stl-${lane.key}`}>
              <div className="stl-head">
                <div>
                  <span className="stl-title">{lane.title}</span>
                  {lane.sub}
                </div>
                <div className="stl-count">
                  <b className="stl-accent">{live.length}</b> values live · <i>{deploys}</i>{" "}
                  {deploys === 1 ? "deploy" : "deploys"}
                </div>
              </div>

              <div className="stl-track">
                <div className="stl-axis" />
                {lane.blocks.map((b) => {
                  const fill = Math.max(0, Math.min(1, (t - b.start) / (b.end - b.start)));
                  return (
                    <div key={b.start} className="stl-block" style={{ left: `${b.start}%`, width: `${b.end - b.start}%` }}>
                      <div className="stl-fill" style={{ width: `${fill * 100}%` }} />
                      <span>{b.label}</span>
                    </div>
                  );
                })}
                {lane.markers.map((m, i) => (
                  <div key={m.at} className={t >= m.at ? "stl-marker stl-on" : "stl-marker"} style={{ left: `${m.at}%` }}>
                    <div className="stl-dot" />
                    <div className={i % 2 === 0 ? "stl-label stl-accent stl-up" : "stl-label stl-accent stl-down"}>{m.label}</div>
                  </div>
                ))}
                <div className="stl-head-line" style={{ left: `${t}%`, opacity: t > 0 && t < 100 ? 1 : 0 }} />
              </div>

              <div className="stl-status">{latest ? latest.status : lane.idle}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
