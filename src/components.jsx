export function AppShell({ children, stats, rank, progress }) {
  return (
    <div className="site-shell">
      <header className="topbar spy-topbar">
        <a className="brand" href="#/">
          <span className="brand-mark">MI</span>
          <span>Mission Interface</span>
        </a>
        <nav className="topnav" aria-label="Primary">
          <HashNav href="#/" label="Briefing" />
          <HashNav href="#/missions" label="Missions" />
          <HashNav href="#/field" label="Field Ops" />
          <HashNav href="#/debrief" label="Debrief" />
        </nav>
        <div className="mini-hud">
          <span>{rank}</span>
          <span>XP {stats.xp}</span>
          <span>{progress}%</span>
        </div>
      </header>
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

export function Meter({ label, value, tone = "green" }) {
  return (
    <div>
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
