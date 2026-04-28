export const missionData = [
  {
    id: "school",
    code: "LEVEL 1",
    title: "School Spark",
    icon: "Pencil",
    risk: "low",
    place: "Classroom Lab",
    summary: "Kids use an AI helper to brainstorm ideas and study faster.",
    challenge: "Keep it useful without letting it do all the thinking.",
    bestLevel: "light",
    bestTools: ["labels", "human-check"],
    lesson: "Low-risk AI still needs honesty and a little guidance.",
    fact: "This comes from the report's idea that simple uses can have lighter rules.",
    burst: "Gold stars for smart, light-touch rules.",
    unlockScore: 66,
    themeClass: "theme-school",
    missionType: "Notebook Run",
    blurb:
      "A teacher wants students to use an AI study buddy for brainstorming and revision, but not as a shortcut for doing the whole assignment.",
    decisionQuestion: "How much guidance does a classroom helper need before it becomes too controlling?",
    toolQuestion: "Which tools keep students informed without making the system feel heavy?",
    stepLabels: ["Pack the plan", "Choose class tools", "Teacher review"],
    actionLabels: {
      step1: "Build Study Plan",
      step2: "Check Classroom Setup",
      result: "Review School Result",
    },
  },
  {
    id: "news",
    code: "LEVEL 2",
    title: "News Nebula",
    icon: "Antenna",
    risk: "medium",
    place: "City Broadcast Tower",
    summary: "A public chatbot shares updates with lots of people at once.",
    challenge: "One wrong answer can spread fast and confuse a whole crowd.",
    bestLevel: "balanced",
    bestTools: ["labels", "test-lab"],
    lesson: "Public information needs checking before it flies everywhere.",
    fact: "The report highlights misinformation as a big reason for oversight.",
    burst: "Signal cleared. The city can trust the updates.",
    unlockScore: 66,
    themeClass: "theme-news",
    missionType: "Signal Tower",
    blurb:
      "A city service chatbot is posting updates for a lot of people very quickly, so mistakes can spread before anyone notices.",
    decisionQuestion: "What level of oversight keeps fast public updates trustworthy?",
    toolQuestion: "Which checks help catch misinformation before it spreads?",
    stepLabels: ["Tune the signal", "Add broadcast checks", "Newsroom review"],
    actionLabels: {
      step1: "Set Signal Rules",
      step2: "Test Broadcast Setup",
      result: "Review News Result",
    },
  },
  {
    id: "art",
    code: "LEVEL 3",
    title: "Creator Canyon",
    icon: "Palette",
    risk: "medium",
    place: "Studio Valley",
    summary: "Artists are worried an AI model learned from creative work unfairly.",
    challenge: "Protect creators while still allowing new ideas to grow.",
    bestLevel: "balanced",
    bestTools: ["creator-credit", "labels"],
    lesson: "Transparency and credit help when AI uses training data from creators.",
    fact: "The report talks about copyright and data-use questions around AI training.",
    burst: "Creator credit restored. The art portal is glowing again.",
    unlockScore: 66,
    themeClass: "theme-art",
    missionType: "Studio Trail",
    blurb:
      "Creators are questioning whether an AI art system trained on their work fairly and whether people can tell where ideas came from.",
    decisionQuestion: "What kind of rules protect creators without shutting down creative tools?",
    toolQuestion: "Which tools make the system more transparent to artists and users?",
    stepLabels: ["Sketch the rules", "Add studio tools", "Creator review"],
    actionLabels: {
      step1: "Draft Creator Rules",
      step2: "Check Studio Setup",
      result: "Review Creator Result",
    },
  },
  {
    id: "money",
    code: "LEVEL 4",
    title: "Money Meteor",
    icon: "Coin",
    risk: "high",
    place: "Future Bank",
    summary: "An AI tool gives savings and debt advice to families.",
    challenge: "Bad advice here can cost real money and hurt people for a long time.",
    bestLevel: "strong",
    bestTools: ["human-check", "test-lab"],
    lesson: "Financial AI needs strong review before people trust it with money.",
    fact: "The report argues that higher-stakes areas need stronger protection.",
    burst: "Vault secured. Safe advice beats risky speed.",
    unlockScore: 72,
    themeClass: "theme-money",
    missionType: "Vault Route",
    blurb:
      "A family budgeting assistant gives advice about savings, debt, and money choices, so bad suggestions can cause real harm.",
    decisionQuestion: "How strict should a financial AI be watched before people trust its advice?",
    toolQuestion: "Which tools reduce the chance of risky money guidance?",
    stepLabels: ["Lock the policy", "Add vault checks", "Finance review"],
    actionLabels: {
      step1: "Set Vault Rules",
      step2: "Check Finance Setup",
      result: "Review Vault Result",
    },
  },
  {
    id: "health",
    code: "LEVEL 5",
    title: "Health Harbor",
    icon: "Heart",
    risk: "high",
    place: "Clinic Cloud",
    summary: "A medical helper suggests what patients should do next.",
    challenge: "Confident but wrong medical advice can be dangerous.",
    bestLevel: "strong",
    bestTools: ["human-check", "privacy-lock"],
    lesson: "Healthcare AI needs testing, privacy, and real human oversight.",
    fact: "The report uses healthcare as a clear example of why context matters.",
    burst: "Harbor shielded. Safety comes first in healthcare.",
    unlockScore: 75,
    themeClass: "theme-health",
    missionType: "Clinic Approach",
    blurb:
      "A medical helper gives next-step suggestions to patients, so confident mistakes could affect health and safety directly.",
    decisionQuestion: "How much protection is needed before a healthcare AI should be trusted?",
    toolQuestion: "Which safeguards matter most when patient safety is involved?",
    stepLabels: ["Set clinic rules", "Add patient safeguards", "Safety review"],
    actionLabels: {
      step1: "Set Clinic Rules",
      step2: "Check Patient Safeguards",
      result: "Review Health Result",
    },
  },
];

export const levelCards = [
  {
    id: "light",
    name: "Light Touch",
    icon: "Breeze",
    description: "Fast and friendly rules for low-risk missions.",
    flavor: "Great when the stakes are small.",
  },
  {
    id: "balanced",
    name: "Smart Shield",
    icon: "Shield",
    description: "A middle path that checks risk without freezing progress.",
    flavor: "Best for tricky but not extreme cases.",
  },
  {
    id: "strong",
    name: "Power Guard",
    icon: "Lock",
    description: "Strong protection for high-stakes decisions.",
    flavor: "Use this when mistakes could seriously hurt people.",
  },
];

export const toolCards = [
  {
    id: "labels",
    name: "Clear Labels",
    icon: "Tag",
    description: "Tell people when AI is talking.",
  },
  {
    id: "human-check",
    name: "Human Check",
    icon: "Hand",
    description: "A real person reviews the most important answers.",
  },
  {
    id: "test-lab",
    name: "Test Lab",
    icon: "Flask",
    description: "Try the AI carefully before it goes live.",
  },
  {
    id: "privacy-lock",
    name: "Privacy Lock",
    icon: "Key",
    description: "Protect sensitive personal information.",
  },
  {
    id: "creator-credit",
    name: "Creator Credit",
    icon: "Spark",
    description: "Show where training data and creative sources came from.",
  },
];

export const quickQuiz = [
  {
    question: "What is the big idea of the game?",
    options: [
      "Every AI tool should get the exact same rules",
      "Riskier AI jobs need stronger safety rules",
      "No AI should ever be used by anyone",
    ],
    answer: 1,
  },
  {
    question: "Which place usually needs the strongest safety checks?",
    options: ["Healthcare", "Brainstorming homework", "A fun class poster"],
    answer: 0,
  },
];

export function getMissionById(id) {
  return missionData.find((mission) => mission.id === id) ?? missionData[0];
}

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function getRiskLabel(risk) {
  return {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
  }[risk];
}

export function getRank(stars) {
  if (stars >= 13) return "Galaxy Guardian";
  if (stars >= 9) return "Shield Captain";
  if (stars >= 5) return "Safety Scout";
  return "Rookie Ranger";
}

export function getProgress(completedCount) {
  return clamp(Math.round((completedCount / missionData.length) * 100));
}

export function scoreMission(mission, levelId, tools) {
  let stars = 0;
  let score = 25;

  if (levelId === mission.bestLevel) {
    score += 35;
    stars += 2;
  } else if (isNeighborLevel(levelId, mission.bestLevel)) {
    score += 18;
    stars += 1;
  }

  const matchedTools = mission.bestTools.filter((tool) => tools.includes(tool)).length;
  score += matchedTools * 18;
  stars += matchedTools;

  if (tools.length > 2) {
    score -= (tools.length - 2) * 8;
  }

  score = clamp(score);
  stars = clamp(stars, 0, 4);

  let result = "miss";
  if (score >= 88) result = "perfect";
  else if (score >= 66) result = "good";

  const feedback =
    result === "perfect"
      ? mission.burst
      : result === "good"
        ? "Nice save. You matched the mission pretty well, but there is room to tune it."
        : "The mission needs a better safety match. Try a different rule strength or helper tools.";

  return { score, stars, matchedTools, result, feedback };
}

export function getUnlockedMissionIds(missionResults) {
  const unlocked = [missionData[0].id];

  for (let index = 1; index < missionData.length; index += 1) {
    const previous = missionData[index - 1];
    const previousResult = missionResults[previous.id];
    if (previousResult && previousResult.score >= previous.unlockScore) {
      unlocked.push(missionData[index].id);
      continue;
    }
    break;
  }

  return unlocked;
}

function isNeighborLevel(levelId, bestLevel) {
  const order = ["light", "balanced", "strong"];
  return Math.abs(order.indexOf(levelId) - order.indexOf(bestLevel)) === 1;
}
