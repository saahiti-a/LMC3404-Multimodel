export function AppShell({ children, stats }) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#/">
          <span className="brand-badge">AI</span>
          <span>AI Safety Adventure</span>
        </a>
        <nav className="topnav" aria-label="Primary">
          <HashNav href="#/" label="Home" />
          <HashNav href="#/missions" label="World Map" />
          <HashNav href="#/field" label="Play" />
          <HashNav href="#/debrief" label="Scoreboard" />
        </nav>
        <div className="mini-hud" aria-label="Game stats">
          <span>{stats.rank}</span>
          <span>Stars {stats.stars}</span>
          <span>{stats.progress}%</span>
        </div>
      </header>
      <Sparkles />
      <main>{children}</main>
    </div>
  );
}

function HashNav({ href, label }) {
  const active = window.location.hash === href || (href === "#/" && window.location.hash === "");
  return (
    <a href={href} className={active ? "active" : ""}>
      {label}
    </a>
  );
}

export function Meter({ label, value, tone = "mint" }) {
  return (
    <div className="meter-wrap">
      <div className="meter-label-row">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className={`meter tone-${tone}`}>
        <span style={{ width: `${value}%` }}></span>
      </div>
    </div>
  );
}

export function IconBubble({ icon }) {
  return <div className="icon-bubble">{icon}</div>;
}

function Sparkles() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="sparkle"
          style={{
            left: `${(index * 7) % 100}%`,
            animationDelay: `${index * 0.35}s`,
            animationDuration: `${6 + (index % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
