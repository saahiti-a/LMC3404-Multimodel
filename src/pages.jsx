import { useMemo } from "react";
import { AppShell, Meter } from "./components";
import { useGame } from "./GameContext";
import {
  clamp,
  crisisEvents,
  formatSafeguard,
  quizData,
  rangeLabel,
  scenarioData,
} from "./gameData";

export function BriefingPage() {
  const { gameStats, rank, totalProgress, resetCampaign } = useGame();

  return (
    <AppShell stats={gameStats} rank={rank} progress={totalProgress}>
      <section className="page page-briefing">
        <div className="page-hero dossier-hero">
          <div className="hero-copy">
            <p className="eyebrow">Secure Briefing</p>
            <h1>Operation: Regulate ChatGPT</h1>
            <p className="lede">
              You are not reading a report. You are running a short covert mission.
              Your objective is to protect the public while preserving useful
              innovation. Move through four screens: briefing, dossier selection,
              field response, and debrief.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/missions">
                Open Mission Deck
              </a>
              <button className="button button-secondary" type="button" onClick={resetCampaign}>
                Reset Campaign
              </button>
            </div>
          </div>

          <div className="briefing-hud">
            <div className="briefing-scan"></div>
            <p className="panel-kicker">Agent Status</p>
            <div className="hud-topline">
              <div>
                <span className="hud-label">Rank</span>
                <strong>{rank}</strong>
              </div>
              <div>
                <span className="hud-label">XP</span>
                <strong className="xp-pop">{gameStats.xp}</strong>
              </div>
              <div>
                <span className="hud-label">Campaign</span>
                <strong>{totalProgress}%</strong>
              </div>
            </div>
            <div className="hud-meters">
              <Meter label="Public Trust" value={gameStats.trust} tone="green" />
              <Meter label="Safety" value={gameStats.safety} tone="red" />
              <Meter label="Innovation" value={gameStats.innovation} tone="amber" />
            </div>
          </div>
        </div>

        <div className="briefing-grid">
          <article className="brief-card">
            <p className="panel-kicker">Mission Rules</p>
            <h3>How to win quickly</h3>
            <div className="rule-list">
              <div className="rule-chip">Choose one dossier at a time</div>
              <div className="rule-chip">Match oversight to the risk level</div>
              <div className="rule-chip">Use safeguards proportionally</div>
              <div className="rule-chip">Respond to crisis events fast</div>
            </div>
          </article>
          <article className="brief-card">
            <p className="panel-kicker">Core Doctrine</p>
            <h3>What the game is teaching</h3>
            <p>
              The thesis is simple: risky systems need stronger oversight, while
              lower-risk systems should face lighter regulation. The whole game is
              built to demonstrate that one-size-fits-all policy is weaker than
              risk-based regulation.
            </p>
          </article>
          <CharacterCard
            code="DV"
            name="Director Vale"
            role="Mission Control"
            dialogue="Keep your explanation simple: the more dangerous the AI use, the stronger the oversight should be."
          />
          <CharacterCard
            code="NV"
            name="Nova"
            role="Policy Analyst"
            dialogue="If you are unsure what to do, load the recommended preset first. Then compare it to a weaker or stricter version."
          />
        </div>
      </section>
    </AppShell>
  );
}

export function MissionsPage() {
  const {
    completedMissions,
    currentScenario,
    deployMission,
    gameStats,
    missionFit,
    missionMessage,
    rank,
    safeguards,
    scenarioOrder,
    selectMission,
    setContext,
    setOversightValue,
    setMissionMessage,
    totalProgress,
  } = useGame();

  function fastPreset(id) {
    selectMission(id);
    setContext(id);
    const mission = scenarioData[id];
    setOversightValue(Math.round((mission.winRange[0] + mission.winRange[1]) / 2));
    setMissionMessage(`Preset loaded for ${mission.codename}. Refine it and deploy.`);
  }

  return (
    <AppShell stats={gameStats} rank={rank} progress={totalProgress}>
      <section className="page">
        <div className="section-heading">
          <p className="eyebrow">Mission Deck</p>
          <h2>Choose a dossier</h2>
          <p>
            Keep this screen short in your demo: pick one low-risk mission and one
            high-risk mission to show why the policy changes by context.
          </p>
        </div>

        <div className="mission-grid mission-grid-wide">
          {scenarioOrder.map((id) => {
            const item = scenarioData[id];
            const cleared = completedMissions.includes(id);
            return (
              <article className={`mission-card ${currentScenario.id === id ? "active" : ""} ${cleared ? "cleared" : ""}`} key={id}>
                <div className="mission-card-top">
                  <span className="mission-code">{item.codename}</span>
                  <span className={`risk-badge ${item.riskClass}`}>{item.riskLabel}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="mission-tags">
                  {item.required.map((requirement) => (
                    <span key={requirement}>{formatSafeguard(requirement)}</span>
                  ))}
                </div>
                <div className="hero-actions">
                  <button className="button button-primary" type="button" onClick={() => selectMission(id)}>
                    Load Dossier
                  </button>
                  <button className="button button-secondary" type="button" onClick={() => fastPreset(id)}>
                    Quick Preset
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mission-brief">
          <article className="brief-card">
            <p className="panel-kicker">Loaded Dossier</p>
            <h3>{currentScenario.title}</h3>
            <p>{currentScenario.domain}</p>
            <div className="scenario-stats">
              <div>
                <span>Recommended zone</span>
                <strong>
                  {currentScenario.winRange[0]} to {currentScenario.winRange[1]}
                </strong>
              </div>
              <div>
                <span>Mission fit</span>
                <strong>{missionFit.score}%</strong>
              </div>
              <div>
                <span>Required safeguards</span>
                <strong>{currentScenario.required.map(formatSafeguard).join(", ")}</strong>
              </div>
            </div>
            <div className="meter tone-green">
              <span style={{ width: `${missionFit.score}%` }}></span>
            </div>
            <p className="mission-message">{missionMessage}</p>
            <div className="hero-actions">
              <button
                className="button button-primary"
                type="button"
                onClick={() => {
                  deployMission();
                  window.location.hash = "/field";
                }}
              >
                Deploy to Field Ops
              </button>
            </div>
          </article>
          <article className="brief-card">
            <p className="panel-kicker">Why it matters</p>
            <h3>Same technology, different mission profile</h3>
            <p>
              A student brainstorming tool and a medical triage assistant are not
              equally dangerous. This screen gives you the clearest way to explain
              the thesis in class.
            </p>
          </article>
        </div>
      </section>
    </AppShell>
  );
}

export function FieldPage() {
  const {
    allSafeguards,
    applyMissionPreset,
    context,
    currentScenario,
    deployMission,
    gameStats,
    missionFit,
    missionMessage,
    oversightValue,
    policy,
    rank,
    resolvedEvents,
    riskInputs,
    safeguards,
    setContext,
    setOversightValue,
    setRiskInputs,
    toggleSafeguard,
    totalProgress,
    resolveEvent,
  } = useGame();

  const riskScore = clamp(
    Number(riskInputs.impact) +
      Number(riskInputs.data) +
      Number(riskInputs.review) +
      Number(riskInputs.scale)
  );

  const riskLabel = useMemo(() => {
    if (riskScore < 40) return "Low Threat";
    if (riskScore >= 70) return "High Threat";
    return "Moderate Threat";
  }, [riskScore]);

  return (
    <AppShell stats={gameStats} rank={rank} progress={totalProgress}>
      <section className="page">
        <div className="section-heading">
          <p className="eyebrow">Field Operations</p>
          <h2>Three steps: choose, load, deploy</h2>
          <p>
            This is the core demo page. The easiest demo flow is: choose the mission,
            press the recommended preset, deploy it, then show one crisis response.
          </p>
        </div>

        <div className="briefing-grid field-briefing-grid">
          <CharacterCard
            code="DV"
            name="Director Vale"
            role="Mission Control"
            dialogue={`Current assignment: ${currentScenario.title}. Your job is to match the policy to the danger level, not to make every mission identical.`}
          />
          <CharacterCard
            code="NV"
            name="Nova"
            role="Policy Analyst"
            dialogue={getNoviceTip(currentScenario.riskClass)}
          />
        </div>

        <div className="lab-grid">
          <form className="lab-controls" onSubmit={(event) => event.preventDefault()}>
            <div className="step-card">
              <p className="panel-kicker">Step 1</p>
              <h3>Choose the mission</h3>
              <p className="helper-copy">
                This decides what kind of AI system you are regulating.
              </p>
            </div>
            <label>
              Active context
              <select value={context} onChange={(event) => setContext(event.target.value)}>
                {Object.values(scenarioData).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="step-card">
              <p className="panel-kicker">Step 2</p>
              <h3>Choose a policy style</h3>
              <p className="helper-copy">
                These buttons are the easiest way to understand the game.
              </p>
              <div className="preset-row">
                <button className="button button-secondary" type="button" onClick={() => applyMissionPreset("lighter")}>
                  Too Weak
                </button>
                <button className="button button-primary" type="button" onClick={() => applyMissionPreset("recommended")}>
                  Recommended
                </button>
                <button className="button button-secondary" type="button" onClick={() => applyMissionPreset("stricter")}>
                  Too Strict
                </button>
              </div>
            </div>
            <label>
              Oversight intensity
              <input
                type="range"
                min="0"
                max="100"
                value={oversightValue}
                onChange={(event) => setOversightValue(Number(event.target.value))}
              />
            </label>
            <div className="range-scale">
              <span>Minimal Oversight</span>
              <strong>{rangeLabel(oversightValue)}</strong>
              <span>Strict Oversight</span>
            </div>
            <fieldset className="safeguard-fieldset">
              <legend>Step 3: Choose safeguards</legend>
              {allSafeguards.map((name) => (
                <label key={name} className={`loadout-chip ${safeguards.includes(name) ? "active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={safeguards.includes(name)}
                    onChange={() => toggleSafeguard(name)}
                  />
                  {formatSafeguard(name)}
                </label>
              ))}
            </fieldset>
            <button className="button button-primary" type="button" onClick={deployMission}>
              Deploy Policy
            </button>
          </form>

          <div className="lab-output">
            <article className="output-card output-card-featured">
              <p className="output-kicker">Mission Telemetry</p>
              <h3>{currentScenario.title}</h3>
              <p>{missionMessage}</p>
              <div className="simple-outcome">
                <div className={`outcome-pill ${missionFit.score >= 80 ? "success" : missionFit.score >= 60 ? "warning" : "danger"}`}>
                  {missionFit.score >= 80
                    ? "Likely success"
                    : missionFit.score >= 60
                      ? "Almost there"
                      : "Needs adjustment"}
                </div>
                <p className="helper-copy">
                  {missionFit.score >= 80
                    ? "This policy roughly matches the risk level of the mission."
                    : missionFit.score >= 60
                      ? "You are close, but the policy still needs a small fix."
                      : "The policy is too weak, too strict, or aimed at the wrong mission."}
                </p>
              </div>
              <div className="tradeoff-bars">
                <Meter label="Innovation" value={policy.innovation} tone="amber" />
                <Meter label="Safety" value={policy.safety} tone="red" />
                <Meter label="Accountability" value={policy.accountability} tone="green" />
                <Meter label="Mission Fit" value={missionFit.score} tone="green" />
              </div>
            </article>

            <article className="output-card">
              <p className="output-kicker">Threat Scanner</p>
              <p className="helper-copy">
                This mini-tool asks one simple question: how bad would it be if this
                AI made a mistake?
              </p>
              <div className="calculator-grid compact-calculator">
                <form className="calculator-card" onSubmit={(event) => event.preventDefault()}>
                  <label>
                    Impact if the system fails
                    <select
                      value={riskInputs.impact}
                      onChange={(event) =>
                        setRiskInputs((prev) => ({ ...prev, impact: Number(event.target.value) }))
                      }
                    >
                      <option value="15">Low</option>
                      <option value="35">Moderate</option>
                      <option value="60">High</option>
                    </select>
                  </label>
                  <label>
                    Sensitive data
                    <select
                      value={riskInputs.data}
                      onChange={(event) =>
                        setRiskInputs((prev) => ({ ...prev, data: Number(event.target.value) }))
                      }
                    >
                      <option value="10">Limited</option>
                      <option value="25">Some</option>
                      <option value="40">Highly sensitive</option>
                    </select>
                  </label>
                  <label>
                    Human review
                    <select
                      value={riskInputs.review}
                      onChange={(event) =>
                        setRiskInputs((prev) => ({ ...prev, review: Number(event.target.value) }))
                      }
                    >
                      <option value="-20">Consistent</option>
                      <option value="0">Sometimes</option>
                      <option value="20">Rarely</option>
                    </select>
                  </label>
                  <label>
                    Scale
                    <select
                      value={riskInputs.scale}
                      onChange={(event) =>
                        setRiskInputs((prev) => ({ ...prev, scale: Number(event.target.value) }))
                      }
                    >
                      <option value="5">Small</option>
                      <option value="20">Many users</option>
                      <option value="35">Mass public</option>
                    </select>
                  </label>
                </form>
                <div className="calculator-result">
                  <h3>{riskLabel}</h3>
                  <div className="dial-wrap">
                    <div
                      className="dial"
                      style={{
                        background: `radial-gradient(circle closest-side, #10180f 72%, transparent 73% 100%), conic-gradient(#9fe870 ${
                          riskScore * 3.6
                        }deg, rgba(255,255,255,0.08) 0deg)`,
                      }}
                    >
                      <div className="dial-inner">
                        <strong>{riskScore}</strong>
                        <span>/ 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="arcade-grid">
          {crisisEvents.map((event) => {
            const resolution = resolvedEvents[event.id];
            return (
              <article className={`event-card ${resolution ? "resolved" : ""}`} key={event.id}>
                <p className="panel-kicker">{event.title}</p>
                <h3>{event.prompt}</h3>
                <p className="helper-copy">
                  Pick the response that feels proportional. Not too weak, not wildly
                  overreactive.
                </p>
                <div className="event-options">
                  {event.options.map((option, index) => (
                    <button
                      key={option.label}
                      type="button"
                      className={`event-option ${resolution?.selected === index ? "chosen" : ""}`}
                      disabled={Boolean(resolution)}
                      onClick={() => resolveEvent(event.id, index)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="event-note">
                  {resolution
                    ? resolution.note
                    : "Choose a response that matches the level of risk instead of reacting blindly."}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}

function CharacterCard({ code, name, role, dialogue }) {
  return (
    <article className="brief-card character-card">
      <div className="character-top">
        <div className="character-avatar">{code}</div>
        <div>
          <p className="panel-kicker">{role}</p>
          <h3>{name}</h3>
        </div>
      </div>
      <p className="character-dialogue">"{dialogue}"</p>
    </article>
  );
}

function getNoviceTip(riskClass) {
  if (riskClass === "high") {
    return "This is a high-risk mission. Start with stronger safeguards because bad outputs could cause real harm.";
  }
  if (riskClass === "medium") {
    return "This is a medium-risk mission. Try the recommended preset first, then compare it to a weaker one.";
  }
  return "This is a low-risk mission. The goal is to keep the AI useful while still making it clearly labeled and accountable.";
}

export function DebriefPage() {
  const {
    completedMissions,
    gameStats,
    quizIndex,
    quizSelection,
    rank,
    setQuizIndex,
    setQuizSelection,
    totalProgress,
  } = useGame();
  const quiz = quizData[quizIndex];

  return (
    <AppShell stats={gameStats} rank={rank} progress={totalProgress}>
      <section className="page">
        <div className="section-heading">
          <p className="eyebrow">Final Debrief</p>
          <h2>Wrap the mission in under two minutes</h2>
          <p>
            This page gives you the ending: what you learned, how many missions you
            cleared, and one final theory check.
          </p>
        </div>

        <div className="briefing-grid">
          <article className="brief-card">
            <p className="panel-kicker">Campaign Summary</p>
            <h3>{completedMissions.length} of {Object.keys(scenarioData).length} missions cleared</h3>
            <div className="hud-meters">
              <Meter label="Campaign Progress" value={totalProgress} tone="green" />
              <Meter label="Public Trust" value={gameStats.trust} tone="green" />
              <Meter label="Safety" value={gameStats.safety} tone="red" />
              <Meter label="Innovation" value={gameStats.innovation} tone="amber" />
            </div>
          </article>

          <article className="brief-card">
            <p className="panel-kicker">Presentation takeaway</p>
            <h3>What this demonstrates</h3>
            <p>
              The site shows that regulation should change with the context. A student
              assistant, a public information tool, and a medical AI should not all be
              governed the same way.
            </p>
          </article>
        </div>

        <div className="quiz-card">
          <p className="panel-kicker">Final Theory Check</p>
          <h3>{quiz.question}</h3>
          <div className="quiz-options">
            {quiz.options.map((option, index) => {
              const isCorrect = quizSelection !== null && index === quiz.answer;
              const isIncorrect = quizSelection === index && index !== quiz.answer;
              return (
                <button
                  key={option}
                  type="button"
                  className={`quiz-option ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}`}
                  disabled={quizSelection !== null}
                  onClick={() => setQuizSelection(index)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <p className="quiz-feedback">{quizSelection !== null ? quiz.feedback : ""}</p>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setQuizIndex((prev) => (prev + 1) % quizData.length);
              setQuizSelection(null);
            }}
          >
            Next Question
          </button>
        </div>

        <div className="sources-grid">
          {[
            ["Hacker et al. (2023)", "Supports proportional regulation, transparency, and accountability."],
            ["Bukar et al. (2024)", "Frames AI governance through risk, reward, and resilience."],
            ["Meskó & Topol (2023)", "Shows why healthcare needs stronger oversight."],
            ["Cordella & Gualdi (2024)", "Explains how generative AI challenges older legal frameworks."],
            ["Lucchi (2023)", "Focuses on copyright and training data questions."],
            ["Taeihagh (2025)", "Highlights public trust, governance, and institutional responsibility."],
          ].map(([title, text]) => (
            <article className="source-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
