/** Abstract, animated illustrations for the project showcases. Purely decorative. */

export function PayflowVisual() {
  const boxes = [
    { x: 30, y: 150, w: 92, label: "Client" },
    { x: 170, y: 150, w: 110, label: "API · JWT" },
    { x: 330, y: 60, w: 110, label: "Kafka" },
    { x: 330, y: 240, w: 110, label: "Redis cache" },
    { x: 490, y: 150, w: 120, label: "Payment svc" },
    { x: 490, y: 300, w: 120, label: "PostgreSQL" },
  ];
  const paths = [
    "M122 168 H170",
    "M280 160 C 305 160, 305 78, 330 78",
    "M280 176 C 305 176, 305 258, 330 258",
    "M440 78 C 465 78, 465 160, 490 160",
    "M440 258 C 465 258, 465 176, 490 176",
    "M550 186 V300",
  ];
  return (
    <svg viewBox="0 0 640 380" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="pf-line" x1="0" x2="1">
          <stop offset="0" stopColor="var(--electric)" />
          <stop offset="1" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={d}>
          <path id={`pf-${i}`} d={d} fill="none" stroke="var(--border)" strokeWidth="1.5" />
          <path d={d} fill="none" stroke="url(#pf-line)" strokeWidth="1.5" strokeDasharray="4 8" className="animate-dash" style={{ animationDuration: "5s" }} />
          <circle r="4" fill="var(--cyan)">
            <animateMotion dur={`${2.4 + (i % 3) * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.35}s`}>
              <mpath href={`#pf-${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={b.y} width={b.w} height="36" rx="10" fill="var(--surface-raised)" stroke="var(--border)" />
          <circle cx={b.x + 14} cy={b.y + 18} r="3" fill="var(--success)" />
          <text x={b.x + 26} y={b.y + 22} fill="var(--foreground)" fontSize="11.5" fontFamily="var(--font-mono)">
            {b.label}
          </text>
        </g>
      ))}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted-foreground)">
        <text x="30" y="40">txn.stream</text>
        <text x="30" y="56" fill="var(--electric)">PENDING → AUTHORIZED → SETTLED</text>
      </g>
    </svg>
  );
}

export function SmartJobVisual() {
  const left = [
    { y: 70, label: "Profile" },
    { y: 150, label: "Skills" },
    { y: 230, label: "Experience" },
  ];
  const right = [
    { y: 60, w: 0.9 },
    { y: 130, w: 0.72 },
    { y: 200, w: 0.56 },
  ];
  return (
    <svg viewBox="0 0 640 380" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="sj-core">
          <stop offset="0" stopColor="var(--violet)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sj-line" x1="0" x2="1">
          <stop offset="0" stopColor="var(--violet)" />
          <stop offset="1" stopColor="var(--electric)" />
        </linearGradient>
      </defs>
      {left.map((n) => (
        <g key={n.label}>
          <path id={`sj-l-${n.y}`} d={`M130 ${n.y + 16} C 190 ${n.y + 16}, 200 180, 260 180`} fill="none" stroke="var(--border)" strokeWidth="1.5" />
          <circle r="3.5" fill="var(--violet)">
            <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${n.y / 120}s`}>
              <mpath href={`#sj-l-${n.y}`} />
            </animateMotion>
          </circle>
          <rect x="30" y={n.y} width="100" height="32" rx="9" fill="var(--surface-raised)" stroke="var(--border)" />
          <text x="46" y={n.y + 20} fill="var(--foreground)" fontSize="11.5" fontFamily="var(--font-mono)">{n.label}</text>
        </g>
      ))}

      <circle cx="300" cy="180" r="70" fill="url(#sj-core)" opacity="0.45" />
      <circle cx="300" cy="180" r="40" fill="var(--surface)" stroke="url(#sj-line)" strokeWidth="1.5" />
      <circle cx="300" cy="180" r="54" fill="none" stroke="var(--violet)" strokeOpacity="0.3" strokeDasharray="3 6" className="animate-dash" />
      <text x="300" y="177" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="var(--font-mono)">LLM</text>
      <text x="300" y="192" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">prompt · rank</text>

      <path id="sj-out" d="M340 180 C 370 180, 380 150, 410 150" fill="none" stroke="url(#sj-line)" strokeWidth="1.5" />
      <circle r="3.5" fill="var(--electric)">
        <animateMotion dur="1.8s" repeatCount="indefinite">
          <mpath href="#sj-out" />
        </animateMotion>
      </circle>

      {/* Interface preview */}
      <g>
        <rect x="410" y="34" width="200" height="300" rx="18" fill="var(--surface)" stroke="var(--border)" />
        <rect x="426" y="50" width="70" height="8" rx="4" fill="var(--muted-foreground)" opacity="0.5" />
        <text x="426" y="80" fill="var(--foreground)" fontSize="11" fontFamily="var(--font-mono)">Recommended for you</text>
        {right.map((r, i) => (
          <g key={r.y}>
            <rect x="426" y={r.y + 36} width="168" height="54" rx="10" fill="var(--surface-raised)" stroke="var(--border)" />
            <rect x="440" y={r.y + 50} width={90 - i * 12} height="7" rx="3.5" fill="var(--foreground)" opacity="0.75" />
            <rect x="440" y={r.y + 64} width="140" height="4" rx="2" fill="var(--border)" />
            <rect x="440" y={r.y + 64} width={140 * r.w} height="4" rx="2" fill="url(#sj-line)" />
          </g>
        ))}
        <rect x="426" y="300" width="168" height="20" rx="10" fill="var(--violet)" opacity="0.18" />
        <text x="510" y="314" textAnchor="middle" fill="var(--foreground)" fontSize="9.5" fontFamily="var(--font-mono)">ready in &lt; 2s</text>
      </g>
    </svg>
  );
}
