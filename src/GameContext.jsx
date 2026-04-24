import { createContext, useContext, useMemo, useState } from "react";
import {
  allSafeguards,
  clamp,
  computeMissionFit,
  computePolicyResult,
  crisisEvents,
  getRank,
  scenarioData,
  scenarioOrder,
} from "./gameData";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [selectedScenario, setSelectedScenario] = useState("student");
  const [context, setContext] = useState("student");
  const [oversightValue, setOversightValue] = useState(55);
  const [safeguards, setSafeguards] = useState(["transparency", "human", "testing", "labeling"]);
  const [riskInputs, setRiskInputs] = useState({
    impact: 35,
    data: 10,
    review: 0,
    scale: 10,
  });
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelection, setQuizSelection] = useState(null);
  const [gameStats, setGameStats] = useState({
    xp: 20,
    trust: 52,
    safety: 48,
    innovation: 61,
    streak: 0,
  });
  const [completedMissions, setCompletedMissions] = useState([]);
  const [missionMessage, setMissionMessage] = useState("Select a dossier, tune your loadout, and deploy.");
  const [resolvedEvents, setResolvedEvents] = useState({});

  const currentScenario = scenarioData[selectedScenario];
  const policy = useMemo(
    () => computePolicyResult(context, oversightValue, safeguards),
    [context, oversightValue, safeguards]
  );
  const missionFit = useMemo(
    () =>
      computeMissionFit({
        context,
        missionId: selectedScenario,
        oversightValue,
        safeguards,
        policy,
      }),
    [context, selectedScenario, oversightValue, safeguards, policy]
  );
  const rank = getRank(gameStats.xp);
  const totalProgress = clamp((completedMissions.length / scenarioOrder.length) * 100);

  function toggleSafeguard(name) {
    setSafeguards((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  }

  function selectMission(id) {
    setSelectedScenario(id);
    setContext(id);
    setMissionMessage(`Dossier ${scenarioData[id].codename} loaded. Adjust your field policy.`);
  }

  function applyMissionPreset(mode = "recommended") {
    const scenario = scenarioData[selectedScenario];
    const [min, max] = scenario.winRange;
    const midpoint = Math.round((min + max) / 2);

    if (mode === "recommended") {
      setContext(selectedScenario);
      setOversightValue(midpoint);
      setSafeguards([...scenario.required]);
      setMissionMessage(`Recommended preset loaded for ${scenario.codename}.`);
      return;
    }

    if (mode === "lighter") {
      setContext(selectedScenario);
      setOversightValue(Math.max(10, midpoint - 22));
      setSafeguards(scenario.required.slice(0, Math.max(1, scenario.required.length - 1)));
      setMissionMessage("A lighter policy is loaded. Faster, but it may miss important protections.");
      return;
    }

    setContext(selectedScenario);
    setOversightValue(Math.min(95, midpoint + 20));
    setSafeguards([...new Set([...scenario.required, "transparency", "testing", "audit", "privacy"])]);
    setMissionMessage("A stricter policy is loaded. Safer, but possibly heavier than needed.");
  }

  function deployMission() {
    const alreadyCompleted = completedMissions.includes(selectedScenario);

    if (missionFit.score >= 80 && !alreadyCompleted) {
      setCompletedMissions((prev) => [...prev, selectedScenario]);
      setMissionMessage(`Mission cleared. ${currentScenario.reward}`);
      setGameStats((prev) => ({
        xp: prev.xp + 30,
        trust: clamp(prev.trust + 8),
        safety: clamp(prev.safety + 6),
        innovation: clamp(prev.innovation + 3),
        streak: prev.streak + 1,
      }));
      return true;
    }

    if (missionFit.score >= 80 && alreadyCompleted) {
      setMissionMessage("Mission already cleared. Move to a new dossier or improve your campaign stats elsewhere.");
      return true;
    }

    setMissionMessage(
      missionFit.missing.length
        ? `Deployment denied. Missing: ${missionFit.missing.join(", ")}.`
        : "Deployment denied. Oversight level or context fit is still off target."
    );
    setGameStats((prev) => ({
      ...prev,
      trust: clamp(prev.trust - 2),
      streak: 0,
    }));
    return false;
  }

  function resolveEvent(eventId, optionIndex) {
    if (resolvedEvents[eventId]) return;
    const event = crisisEvents.find((item) => item.id === eventId);
    const option = event.options[optionIndex];

    setResolvedEvents((prev) => ({
      ...prev,
      [eventId]: { selected: optionIndex, note: option.note },
    }));
    setGameStats((prev) => ({
      xp: prev.xp + option.effect.xp,
      trust: clamp(prev.trust + option.effect.trust),
      safety: clamp(prev.safety + option.effect.safety),
      innovation: clamp(prev.innovation + option.effect.innovation),
      streak: prev.streak + 1,
    }));
  }

  function resetCampaign() {
    setSelectedScenario("student");
    setContext("student");
    setOversightValue(55);
    setSafeguards(["transparency", "human", "testing", "labeling"]);
    setRiskInputs({ impact: 35, data: 10, review: 0, scale: 10 });
    setQuizIndex(0);
    setQuizSelection(null);
    setGameStats({ xp: 20, trust: 52, safety: 48, innovation: 61, streak: 0 });
    setCompletedMissions([]);
    setMissionMessage("Campaign reset. Select a dossier and begin again.");
    setResolvedEvents({});
  }

  const value = {
    allSafeguards,
    completedMissions,
    context,
    currentScenario,
    gameStats,
    missionFit,
    missionMessage,
    oversightValue,
    policy,
    quizIndex,
    quizSelection,
    rank,
    resolvedEvents,
    riskInputs,
    safeguards,
    scenarioData,
    scenarioOrder,
    selectedScenario,
    totalProgress,
    setContext,
    applyMissionPreset,
    setMissionMessage,
    setOversightValue,
    setQuizIndex,
    setQuizSelection,
    setRiskInputs,
    toggleSafeguard,
    selectMission,
    deployMission,
    resolveEvent,
    resetCampaign,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const value = useContext(GameContext);
  if (!value) {
    throw new Error("useGame must be used within GameProvider");
  }
  return value;
}
