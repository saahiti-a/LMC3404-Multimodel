import { createContext, useContext, useMemo, useState } from "react";
import {
  getMissionById,
  getProgress,
  getRank,
  missionData,
  quickQuiz,
  scoreMission,
  getUnlockedMissionIds,
} from "./gameData";

const GameContext = createContext(null);

const initialMission = missionData[0].id;

export function GameProvider({ children }) {
  const [selectedMissionId, setSelectedMissionId] = useState(initialMission);
  const [selectedLevel, setSelectedLevel] = useState("balanced");
  const [selectedTools, setSelectedTools] = useState(["labels"]);
  const [activeStep, setActiveStep] = useState(1);
  const [completedMissionIds, setCompletedMissionIds] = useState([]);
  const [missionResults, setMissionResults] = useState({});
  const [stars, setStars] = useState(0);
  const [spark, setSpark] = useState(60);
  const [safety, setSafety] = useState(60);
  const [streak, setStreak] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  const currentMission = getMissionById(selectedMissionId);
  const progress = useMemo(() => getProgress(completedMissionIds.length), [completedMissionIds.length]);
  const rank = useMemo(() => getRank(stars), [stars]);
  const unlockedMissionIds = useMemo(() => getUnlockedMissionIds(missionResults), [missionResults]);
  const nextLockedMission = useMemo(
    () => missionData.find((mission) => !unlockedMissionIds.includes(mission.id)) ?? null,
    [unlockedMissionIds]
  );
  const campaignScore = useMemo(
    () => missionData.reduce((total, mission) => total + (missionResults[mission.id]?.score ?? 0), 0),
    [missionResults]
  );
  const averageScore = useMemo(() => {
    const playedScores = Object.values(missionResults).map((result) => result.score);
    if (!playedScores.length) return 0;
    return Math.round(playedScores.reduce((total, score) => total + score, 0) / playedScores.length);
  }, [missionResults]);

  function selectMission(id) {
    if (!unlockedMissionIds.includes(id)) return false;
    const mission = getMissionById(id);
    setSelectedMissionId(id);
    setSelectedLevel(mission.bestLevel === "strong" ? "balanced" : mission.bestLevel);
    setSelectedTools([mission.bestTools[0]]);
    setActiveStep(1);
    setLastResult(null);
    return true;
  }

  function toggleTool(toolId) {
    setSelectedTools((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((item) => item !== toolId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), toolId];
      }
      return [...prev, toolId];
    });
  }

  function playMission() {
    const result = scoreMission(currentMission, selectedLevel, selectedTools);
    const alreadyWon = completedMissionIds.includes(currentMission.id);

    setLastResult({
      ...result,
      missionId: currentMission.id,
      title: currentMission.title,
    });
    setActiveStep(3);

    setMissionResults((prev) => ({
      ...prev,
      [currentMission.id]: result,
    }));

    setSpark((prev) =>
      result.result === "perfect" ? Math.min(prev + 10, 100) : result.result === "good" ? Math.min(prev + 4, 100) : Math.max(prev - 6, 0)
    );

    setSafety((prev) =>
      result.result === "perfect" ? Math.min(prev + 12, 100) : result.result === "good" ? Math.min(prev + 5, 100) : Math.max(prev - 8, 0)
    );

    if (!alreadyWon && result.result !== "miss") {
      setCompletedMissionIds((prev) => [...prev, currentMission.id]);
    }

    if (result.result === "perfect") {
      setStars((prev) => prev + (alreadyWon ? 1 : result.stars));
      setStreak((prev) => prev + 1);
    } else if (result.result === "good") {
      setStars((prev) => prev + (alreadyWon ? 0 : Math.max(1, result.stars - 1)));
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    return result;
  }

  function nextMission() {
    const currentIndex = missionData.findIndex((mission) => mission.id === selectedMissionId);
    const nextUnlocked = missionData.find(
      (mission, index) => index > currentIndex && unlockedMissionIds.includes(mission.id)
    );
    const fallback = missionData.find((mission) => unlockedMissionIds.includes(mission.id)) ?? missionData[0];
    selectMission((nextUnlocked ?? fallback).id);
  }

  function answerQuiz(index) {
    if (quizChoice !== null) return;
    setQuizChoice(index);
    if (index === quickQuiz[quizStep].answer) {
      setQuizScore((prev) => prev + 1);
      setStars((prev) => prev + 1);
    }
  }

  function advanceQuiz() {
    if (quizStep < quickQuiz.length - 1) {
      setQuizStep((prev) => prev + 1);
      setQuizChoice(null);
      return;
    }
    setQuizChoice("done");
  }

  function resetGame() {
    setSelectedMissionId(initialMission);
    setSelectedLevel("balanced");
    setSelectedTools(["labels"]);
    setActiveStep(1);
    setCompletedMissionIds([]);
    setMissionResults({});
    setStars(0);
    setSpark(60);
    setSafety(60);
    setStreak(0);
    setLastResult(null);
    setQuizStep(0);
    setQuizChoice(null);
    setQuizScore(0);
  }

  const value = {
    activeStep,
    completedMissionIds,
    currentMission,
    campaignScore,
    lastResult,
    missionData,
    missionResults,
    progress,
    quickQuiz,
    quizChoice,
    quizScore,
    quizStep,
    rank,
    averageScore,
    safety,
    selectedLevel,
    selectedMissionId,
    selectedTools,
    spark,
    stars,
    streak,
    unlockedMissionIds,
    nextLockedMission,
    setActiveStep,
    setSelectedLevel,
    toggleTool,
    selectMission,
    playMission,
    nextMission,
    answerQuiz,
    advanceQuiz,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const value = useContext(GameContext);
  if (!value) throw new Error("useGame must be used inside GameProvider");
  return value;
}
