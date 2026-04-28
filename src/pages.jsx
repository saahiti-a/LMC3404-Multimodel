import { AppShell, IconBubble, Meter } from "./components";
import { useGame } from "./GameContext";
import { getRiskLabel, levelCards, toolCards } from "./gameData";

export function BriefingPage() {
  const game = useGame();

  return (
    <AppShell stats={makeStats(game)}>
      <section className="page hero-page">
        <div className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">Mission Brief</p>
            <h1>Match each AI situation with the right amount of protection.</h1>
            <p className="lede">
              The point of the game is simple: not every AI tool should be handled
              the same way. Low-stakes uses need lighter rules. High-stakes uses
              need stronger checks.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/missions">
                Open World Map
              </a>
              <a className="button button-secondary" href="#/field">
                Continue Current Mission
              </a>
            </div>
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <div className="planet planet-one"></div>
            <div className="planet planet-two"></div>
            <div className="planet planet-three"></div>
            <div className="mascot-card">
              <div className="mascot-face">^_^</div>
              <p>Pick the rule strength that fits the risk.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid dashboard-grid-compact">
          <article className="panel">
            <p className="panel-kicker">How It Works</p>
            <h3>One choice at a time</h3>
            <p>
              First choose a scenario, then choose a rule strength, then add the
              support tools that help that kind of AI stay safe.
            </p>
          </article>
          <article className="panel">
            <p className="panel-kicker">Why It Matters</p>
            <h3>The report’s main idea</h3>
            <p>
              The project argues for risk-based regulation, which means the level
              of oversight should change depending on what the AI is being used for.
            </p>
          </article>
          <article className="panel">
            <p className="panel-kicker">Status</p>
            <h3>{game.rank}</h3>
            <div className="meter-stack">
              <Meter label="Progress" value={game.progress} tone="sun" />
              <Meter label="Safety" value={game.safety} tone="coral" />
              <Meter label="Spark" value={game.spark} tone="mint" />
            </div>
          </article>
        </div>
      </section>
    </AppShell>
  );
}

export function MissionsPage() {
  const game = useGame();
  const destinationUnlocked = game.completedMissionIds.length === game.missionData.length;

  return (
    <AppShell stats={makeStats(game)}>
      <section className="page">
        <div className="section-heading section-heading-narrow">
          <p className="eyebrow">World Map</p>
          <h2>Follow the route from the first mission to the final zone</h2>
          <p>
            Each stop on the path is one AI use case from the report. Beat a level
            with the required score to unlock the next checkpoint.
          </p>
        </div>

        <div className="map-stage">
          <div className="map-overview">
            <article className="panel map-scoreboard">
              <p className="panel-kicker">Campaign Scoreboard</p>
              <h3>Mission progress</h3>
              <div className="score-row score-row-large">
                <div>
                  <span>Campaign Score</span>
                  <strong>{game.campaignScore}</strong>
                </div>
                <div>
                  <span>Average</span>
                  <strong>{game.averageScore || "--"}</strong>
                </div>
                <div>
                  <span>Unlocked</span>
                  <strong>
                    {game.unlockedMissionIds.length}/{game.missionData.length}
                  </strong>
                </div>
              </div>
              <div className="meter-stack">
                <Meter label="Route Progress" value={game.progress} tone="sun" />
              </div>
              <p className="helper-copy">
                {game.nextLockedMission
                  ? `Next unlock: score ${game.missionData.find((mission) => mission.id === game.unlockedMissionIds[game.unlockedMissionIds.length - 1])?.unlockScore} or higher on the current frontier mission to open ${game.nextLockedMission.title}.`
                  : "All checkpoints are unlocked. Head for the final gateway."}
              </p>
            </article>

            <article className="panel map-legend">
              <p className="panel-kicker">Route Guide</p>
              <h3>How to read the map</h3>
              <div className="map-legend-list">
                <span className="chip">Glowing nodes are cleared</span>
                <span className="chip">Blue node is your active mission</span>
                <span className="chip">Locked nodes open after the needed score</span>
                <span className="chip">Finish the route to reach the gateway</span>
              </div>
            </article>
          </div>

          <div className="path-map">
            <div className="path-lane" aria-hidden="true"></div>
            <div className="path-start">
              <div className="start-badge">Start</div>
              <p>Launch point</p>
            </div>

            {game.missionData.map((mission, index) => {
              const cleared = game.completedMissionIds.includes(mission.id);
              const active = game.selectedMissionId === mission.id;
              const unlocked = game.unlockedMissionIds.includes(mission.id);
              const offsetClass = index % 2 === 0 ? "left" : "right";

              return (
                <article
                  key={mission.id}
                  className={`map-node mission-card ${offsetClass} ${active ? "active" : ""} ${cleared ? "cleared" : ""} ${!unlocked ? "locked" : ""}`}
                >
                  <div className="map-node-marker" aria-hidden="true">
                    <span className={`map-node-core ${cleared ? "cleared" : active ? "active" : !unlocked ? "locked" : ""}`}></span>
                  </div>
              <div className="mission-head">
                <span className={`risk-badge ${mission.risk}`}>{getRiskLabel(mission.risk)}</span>
                <span className="mission-code">{mission.code}</span>
              </div>
              <IconBubble icon={mission.icon} />
              <h3>{mission.title}</h3>
              <p>{mission.summary}</p>
              <p className="scenario-blurb">{mission.blurb}</p>
              <p className="helper-copy">
                <strong>Unlock rule:</strong>{" "}
                {index === 0 ? "available now" : `previous mission needs ${game.missionData[index - 1].unlockScore}+`}
              </p>
                  <div className="hero-actions">
                    <button
                      className="button button-primary"
                      type="button"
                      disabled={!unlocked}
                      onClick={() => game.selectMission(mission.id)}
                    >
                      {unlocked ? "Set Active Mission" : "Locked"}
                    </button>
                    <a
                      className={`button button-secondary ${!unlocked ? "button-disabled" : ""}`}
                      href={unlocked ? "#/field" : "#/missions"}
                      aria-disabled={!unlocked}
                    >
                      Enter Mission
                    </a>
                  </div>
                </article>
              );
            })}

            <div className={`path-finish ${destinationUnlocked ? "unlocked" : ""}`}>
              <div className="finish-core">End</div>
              <div>
                <h3>Governance Gateway</h3>
                <p>
                  The finish represents the big takeaway: AI rules should scale with
                  the risk of the job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export function FieldPage() {
  const game = useGame();
  const mission = game.currentMission;
  const step = game.activeStep;
  const currentScore = game.missionResults[mission.id]?.score ?? 0;
  const canAdvance = currentScore >= mission.unlockScore;

  return (
    <AppShell stats={makeStats(game)}>
      <section className="page page-tight">
        <div className={`scenario-shell ${mission.themeClass}`}>
          <aside className="scenario-hud">
            <div className="hud-top">
              <div>
                <p className="panel-kicker">Scenario HUD</p>
                <h3>{mission.title}</h3>
              </div>
              <IconBubble icon={mission.icon} />
            </div>

            <div className="hud-summary">
              <div className="hud-chip-row">
                <span className={`risk-badge ${mission.risk}`}>{getRiskLabel(mission.risk)}</span>
                <span className="mission-code">{mission.code}</span>
              </div>
              <p className="helper-copy">
                <strong>Context:</strong> {mission.place}
              </p>
              <p className="helper-copy">
                <strong>Mission type:</strong> {mission.missionType}
              </p>
              <p className="helper-copy">
                <strong>Case file:</strong> {mission.blurb}
              </p>
              <p className="helper-copy">
                <strong>Score needed:</strong> {mission.unlockScore}+ to open the next checkpoint.
              </p>
              <p className="fact-note">{mission.fact}</p>
            </div>

            <div className="meter-stack">
              <Meter label="Safety" value={game.safety} tone="coral" />
              <Meter label="Spark" value={game.spark} tone="mint" />
              <Meter label="Mission Score" value={currentScore} tone="sun" />
            </div>

            <div className="step-rail">
              <button type="button" className={`step-dot ${step === 1 ? "active" : ""}`} onClick={() => game.setActiveStep(1)}>1</button>
              <button type="button" className={`step-dot ${step === 2 ? "active" : ""}`} onClick={() => game.setActiveStep(2)}>2</button>
              <button type="button" className={`step-dot ${step === 3 ? "active" : ""}`} onClick={() => game.setActiveStep(3)}>3</button>
            </div>
          </aside>

          <div className="scenario-main">
            <div className="panel panel-intro">
              <p className="panel-kicker">Current Situation</p>
              <h2>{mission.challenge}</h2>
              <p>
                This panel tells you what problem you are solving before you make
                any choices. Start with the rule strength that feels proportional,
                then add tools that support that decision.
              </p>
              <div className="mission-context-grid">
                <div className="context-card">
                  <span>Case File</span>
                  <p>{mission.blurb}</p>
                </div>
                <div className="context-card">
                  <span>Decision Focus</span>
                  <p>{mission.decisionQuestion}</p>
                </div>
              </div>
              <MissionScene missionId={mission.id} step={step} passed={canAdvance} />
            </div>

            <div className="progress-strip">
              <div className={`progress-step ${step >= 1 ? "live" : ""}`}>{mission.stepLabels[0]}</div>
              <div className={`progress-step ${step >= 2 ? "live" : ""}`}>{mission.stepLabels[1]}</div>
              <div className={`progress-step ${step >= 3 ? "live" : ""}`}>{mission.stepLabels[2]}</div>
            </div>

            {step === 1 ? (
              <article className="panel step-panel">
                <p className="panel-kicker">Step 1</p>
                <h3>Choose the rule strength</h3>
                <p className="helper-copy">
                  {mission.decisionQuestion}
                </p>
                <div className="choice-grid">
                  {levelCards.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      className={`choice-card ${game.selectedLevel === level.id ? "selected" : ""}`}
                      onClick={() => game.setSelectedLevel(level.id)}
                    >
                      <strong>{level.name}</strong>
                      <span>{level.description}</span>
                      <small>{level.flavor}</small>
                    </button>
                  ))}
                </div>
                <div className="hero-actions section-actions">
                  <button className="button button-primary" type="button" onClick={() => game.setActiveStep(2)}>
                    {mission.actionLabels.step1}
                  </button>
                </div>
              </article>
            ) : null}

            {step === 2 ? (
              <article className="panel step-panel">
                <p className="panel-kicker">Step 2</p>
                <h3>Add support tools</h3>
                <p className="helper-copy">
                  {mission.toolQuestion}
                </p>
                <div className="tool-grid">
                  {toolCards.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      className={`tool-card ${game.selectedTools.includes(tool.id) ? "selected" : ""}`}
                      onClick={() => game.toggleTool(tool.id)}
                    >
                      <span className="tool-icon">{tool.icon}</span>
                      <strong>{tool.name}</strong>
                      <span>{tool.description}</span>
                    </button>
                  ))}
                </div>
                <div className="hero-actions section-actions">
                  <button className="button button-secondary" type="button" onClick={() => game.setActiveStep(1)}>
                    Back
                  </button>
                  <button className="button button-primary" type="button" onClick={game.playMission}>
                    {mission.actionLabels.step2}
                  </button>
                </div>
              </article>
            ) : null}

            {step === 3 ? (
              <article className={`panel result-panel ${game.lastResult?.result ?? ""}`}>
                <p className="panel-kicker">Step 3</p>
                <h3>{mission.actionLabels.result}</h3>
                <p className="helper-copy">
                  This result shows whether your choices matched the level of risk
                  in the scenario and whether the next mission is now unlocked.
                </p>
                <div className="result-box">
                  <div className={`result-badge ${game.lastResult?.result ?? "idle"}`}>
                    {game.lastResult?.result === "perfect"
                      ? "Perfect Match"
                      : game.lastResult?.result === "good"
                        ? "Good Match"
                        : game.lastResult?.result === "miss"
                          ? "Needs Work"
                          : "Ready"}
                  </div>
                  <p>{game.lastResult?.feedback ?? "Run the mission check to see how well your setup fits."}</p>
                  <div className="score-row">
                    <div>
                      <span>Stars</span>
                      <strong>{game.lastResult?.stars ?? 0}</strong>
                    </div>
                    <div>
                      <span>Score</span>
                      <strong>{game.lastResult?.score ?? "--"}</strong>
                    </div>
                    <div>
                      <span>Need For Next</span>
                      <strong>{mission.unlockScore}</strong>
                    </div>
                  </div>
                  <p className={`unlock-message ${canAdvance ? "success" : "warning"}`}>
                    {canAdvance
                      ? "Checkpoint cleared. The next level is unlocked."
                      : `You need ${mission.unlockScore}+ on this mission to unlock the next checkpoint.`}
                  </p>
                </div>
                <div className="hero-actions section-actions">
                  <button className="button button-secondary" type="button" onClick={() => game.setActiveStep(1)}>
                    Adjust Choices
                  </button>
                  <button className="button button-primary" type="button" onClick={game.nextMission}>
                    Load Next Available Mission
                  </button>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export function DebriefPage() {
  const game = useGame();
  const quiz = game.quickQuiz[game.quizStep];
  const showDone = game.quizChoice === "done";
  const researchSources = [
    {
      title: "Hacker et al. (2023)",
      note: "Supports the idea that AI oversight should be flexible and risk-based instead of one universal rule.",
    },
    {
      title: "Taeihagh (2025)",
      note: "Helps explain why governance, public trust, and institutional accountability matter for AI used at scale.",
    },
    {
      title: "Lucchi (2023)",
      note: "Informs the mission about copyright, training data, and fairness concerns in generative AI systems.",
    },
    {
      title: "Cordella & Gualdi (2024)",
      note: "Supports the idea that AI creates legal and governance challenges that older systems are still adapting to.",
    },
    {
      title: "Meskó & Topol (2023)",
      note: "Supports the argument that healthcare AI needs the strongest safeguards because errors can directly harm people.",
    },
    {
      title: "Bukar et al. (2024)",
      note: "Reinforces the project’s focus on balancing innovation, safety, resilience, and accountability.",
    },
  ];

  return (
    <AppShell stats={makeStats(game)}>
      <section className="page">
        <div className="debrief-top">
          <article className="panel">
            <p className="panel-kicker">Scoreboard</p>
            <h2>{game.rank}</h2>
            <p>
              This page summarizes what you unlocked and checks whether the main
              idea of the project came through clearly.
            </p>
            <div className="score-row score-row-large">
              <div>
                <span>Stars</span>
                <strong>{game.stars}</strong>
              </div>
              <div>
                <span>Levels Cleared</span>
                <strong>{game.completedMissionIds.length}</strong>
              </div>
              <div>
                <span>Quiz Score</span>
                <strong>{game.quizScore}</strong>
              </div>
            </div>
            <div className="hero-actions">
              <button className="button button-secondary" type="button" onClick={game.resetGame}>
                Reset Run
              </button>
              <a className="button button-primary" href="#/missions">
                Return To Map
              </a>
            </div>
          </article>

          <article className="panel">
            <p className="panel-kicker">Unlocked Lessons</p>
            <h3>What each level was teaching</h3>
            <div className="sticker-grid">
              {game.missionData.map((mission) => {
                const cleared = game.completedMissionIds.includes(mission.id);
                return (
                  <div key={mission.id} className={`sticker ${cleared ? "unlocked" : ""}`}>
                    <span>{mission.icon}</span>
                    <strong>{mission.title}</strong>
                    <small>{cleared ? mission.lesson : "Clear this mission to reveal its lesson."}</small>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <article className="panel quiz-panel">
          <p className="panel-kicker">Quick Check</p>
          <h3>Did the main point land?</h3>
          {!showDone ? (
            <>
              <p>{quiz.question}</p>
              <div className="quiz-grid">
                {quiz.options.map((option, index) => {
                  const isCorrect = index === quiz.answer;
                  const chosen = game.quizChoice === index;
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`quiz-option ${
                        game.quizChoice === null ? "" : isCorrect ? "correct" : chosen ? "incorrect" : ""
                      }`}
                      onClick={() => game.answerQuiz(index)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {game.quizChoice !== null ? (
                <div className="hero-actions section-actions">
                  <p className="helper-copy">
                    {game.quizChoice === quiz.answer
                      ? "Correct. The goal is to match oversight to risk."
                      : "The key idea is that different AI uses need different levels of oversight."}
                  </p>
                  <button className="button button-primary" type="button" onClick={game.advanceQuiz}>
                    {game.quizStep === game.quickQuiz.length - 1 ? "Finish Quiz" : "Next Question"}
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <p className="quiz-finish">
              Quiz complete. The game has shown the report’s main argument through
              scenarios instead of long text.
            </p>
          )}
        </article>

        <article className="panel sources-panel">
          <p className="panel-kicker">Research Behind The Game</p>
          <h3>What informed these levels and scenarios</h3>
          <p className="helper-copy">
            This project is based on research about AI governance, misinformation,
            copyright, finance, healthcare, accountability, and public trust. Each
            level turns one of those research areas into a playable example.
          </p>
          <div className="sources-grid">
            {researchSources.map((source) => (
              <div key={source.title} className="source-chip-card">
                <strong>{source.title}</strong>
                <p>{source.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel sources-panel">
          <p className="panel-kicker">So What?</p>
          <h3>Why this matters beyond the game</h3>
          <p className="helper-copy">
            AI tools are already shaping how people learn, get information, make
            money decisions, create art, and think about healthcare. If all AI is
            treated the same, the rules will either be too weak for dangerous uses
            or too restrictive for lower-risk ones. The main takeaway of this
            project is that regulation matters, but it works best when it matches
            the level of risk.
          </p>
        </article>
      </section>
    </AppShell>
  );
}

function MissionScene({ missionId, step, passed }) {
  if (missionId === "school") {
    return (
      <div className="mission-scene scene-school">
        <div className="scene-caption">Notebook run: carry the pencil to the gold star.</div>
        <div className="school-line">
          <span className={`school-pencil step-${step}`}></span>
          <span className={`school-star ${passed ? "passed" : ""}`}></span>
        </div>
      </div>
    );
  }

  if (missionId === "news") {
    return (
      <div className="mission-scene scene-news">
        <div className="scene-caption">Signal tower: send a verified message across the skyline.</div>
        <div className="news-wave">
          <span className={`news-pulse pulse-${step}`}></span>
          <span className={`news-tower ${passed ? "passed" : ""}`}></span>
        </div>
      </div>
    );
  }

  if (missionId === "art") {
    return (
      <div className="mission-scene scene-art">
        <div className="scene-caption">Studio trail: guide the brushstroke onto the canvas.</div>
        <div className="art-canvas">
          <span className={`art-stroke stroke-${step}`}></span>
          <span className={`art-frame ${passed ? "passed" : ""}`}></span>
        </div>
      </div>
    );
  }

  if (missionId === "money") {
    return (
      <div className="mission-scene scene-money">
        <div className="scene-caption">Vault route: move the coin safely into the vault.</div>
        <div className="money-track">
          <span className={`money-coin step-${step}`}></span>
          <span className={`money-vault ${passed ? "passed" : ""}`}></span>
        </div>
      </div>
    );
  }

  return (
    <div className="mission-scene scene-health">
      <div className="scene-caption">Clinic approach: guide the rescue pulse to the safe zone.</div>
      <div className="health-track">
        <span className={`health-pulse step-${step}`}></span>
        <span className={`health-cross ${passed ? "passed" : ""}`}></span>
      </div>
    </div>
  );
}

function makeStats(game) {
  return {
    progress: game.progress,
    rank: game.rank,
    stars: game.stars,
  };
}
