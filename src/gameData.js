export const scenarioData = {
  student: {
    id: "student",
    codename: "OP-CAMPUS",
    title: "Campus Copilot",
    domain: "Education",
    riskLabel: "Low Risk",
    riskClass: "low",
    summary:
      "Students want a fast research and drafting assistant, but the mission is to prevent overreliance and keep human judgment in the loop.",
    benefit: "Speeds up brainstorming and revision support",
    harm: "Overreliance, shallow learning, and hidden inaccuracies",
    oversight: "Disclosure, citation guidance, and clear school rules",
    harmScore: 30,
    oversightScore: 35,
    winRange: [25, 55],
    required: ["transparency", "labeling"],
    reward: "Low-risk systems still need visible disclosure.",
  },
  teacher: {
    id: "teacher",
    codename: "OP-CLASSROOM",
    title: "Classroom Control",
    domain: "Education governance",
    riskLabel: "Moderate Risk",
    riskClass: "medium",
    summary:
      "Teachers can automate planning and feedback, but fairness, grading clarity, and review become more sensitive.",
    benefit: "Improves planning speed and differentiated support",
    harm: "Biased grading, vague accountability, and poor review",
    oversight: "Human review, transparency, and school policy guidance",
    harmScore: 55,
    oversightScore: 60,
    winRange: [45, 70],
    required: ["transparency", "human", "testing"],
    reward: "Moderate-risk systems need oversight without killing usefulness.",
  },
  public: {
    id: "public",
    codename: "OP-BROADCAST",
    title: "Public Info Engine",
    domain: "Public communication",
    riskLabel: "Moderate Risk",
    riskClass: "medium",
    summary:
      "Public-facing AI can improve access to information, but misinformation at scale can damage trust quickly.",
    benefit: "Expands speed and reach of communication",
    harm: "Scaled misinformation and credibility damage",
    oversight: "Labeling, testing, monitoring, and correction systems",
    harmScore: 68,
    oversightScore: 72,
    winRange: [50, 75],
    required: ["transparency", "testing", "labeling"],
    reward: "Public systems need visible accountability and rapid correction.",
  },
  finance: {
    id: "finance",
    codename: "OP-LEDGER",
    title: "Money Mentor Bot",
    domain: "Finance",
    riskLabel: "High Risk",
    riskClass: "high",
    summary:
      "Financial systems shape savings, debt, and risk. A bad recommendation can create lasting harm.",
    benefit: "Makes basic financial guidance more accessible",
    harm: "Bad advice with real monetary consequences",
    oversight: "Audits, human review, and rigorous testing",
    harmScore: 84,
    oversightScore: 88,
    winRange: [65, 90],
    required: ["human", "testing", "audit"],
    reward: "High-risk financial tools need strong scrutiny before release.",
  },
  health: {
    id: "health",
    codename: "OP-TRIAGE",
    title: "Clinic Triage AI",
    domain: "Healthcare",
    riskLabel: "High Risk",
    riskClass: "high",
    summary:
      "Medical systems can sound confident even when wrong, so weak oversight can produce direct real-world harm.",
    benefit: "Improves access to general health information",
    harm: "Unsafe medical decisions and misplaced trust",
    oversight: "Strict testing, privacy controls, expert review, and narrow rollout",
    harmScore: 92,
    oversightScore: 95,
    winRange: [70, 95],
    required: ["human", "testing", "privacy", "audit"],
    reward: "Healthcare needs safety to clearly outweigh speed.",
  },
};

export const scenarioOrder = ["student", "teacher", "public", "finance", "health"];

export const safeguardEffects = {
  transparency: { safety: 6, accountability: 10, innovation: -1 },
  human: { safety: 10, accountability: 8, innovation: -5 },
  testing: { safety: 12, accountability: 5, innovation: -4 },
  privacy: { safety: 8, accountability: 6, innovation: -2 },
  audit: { safety: 7, accountability: 12, innovation: -5 },
  labeling: { safety: 5, accountability: 8, innovation: 0 },
};

export const contextWeights = {
  student: { baseSafety: 22, baseInnovation: 82, baseAccountability: 30 },
  teacher: { baseSafety: 42, baseInnovation: 72, baseAccountability: 48 },
  public: { baseSafety: 54, baseInnovation: 65, baseAccountability: 58 },
  finance: { baseSafety: 74, baseInnovation: 54, baseAccountability: 76 },
  health: { baseSafety: 84, baseInnovation: 46, baseAccountability: 82 },
};

export const allSafeguards = ["transparency", "human", "testing", "privacy", "audit", "labeling"];

export const crisisEvents = [
  {
    id: "deepfake",
    title: "Signal Intercept: Deepfake Surge",
    prompt:
      "A public chatbot is pushing misleading election summaries. Pick the fastest proportional response.",
    options: [
      {
        label: "Require visible AI labels and rapid takedown review",
        effect: { trust: 10, safety: 12, innovation: -3, xp: 25 },
        note: "Correct. Public-facing systems need fast correction and clear disclosure.",
      },
      {
        label: "Wait for the company to self-correct",
        effect: { trust: -12, safety: -10, innovation: 4, xp: 4 },
        note: "Too passive. Public harm spreads faster than voluntary cleanup.",
      },
      {
        label: "Ban all generative AI systems immediately",
        effect: { trust: 3, safety: 8, innovation: -16, xp: 10 },
        note: "You reduced harm, but the response was broader than the risk.",
      },
    ],
  },
  {
    id: "hospital",
    title: "Signal Intercept: Hospital Pilot",
    prompt:
      "A hospital wants to deploy an AI triage assistant next week. What must happen first?",
    options: [
      {
        label: "External testing, human review, and narrow rollout",
        effect: { trust: 11, safety: 15, innovation: -4, xp: 28 },
        note: "Correct. High-risk healthcare deployment needs strong validation.",
      },
      {
        label: "Launch now with a short disclaimer",
        effect: { trust: -14, safety: -15, innovation: 6, xp: 2 },
        note: "A disclaimer does not replace safeguards in medicine.",
      },
      {
        label: "Allow launch if the vendor promises accuracy",
        effect: { trust: -8, safety: -9, innovation: 2, xp: 5 },
        note: "Vendor confidence is not evidence.",
      },
    ],
  },
  {
    id: "copyright",
    title: "Signal Intercept: Copyright Clash",
    prompt:
      "Artists challenge an AI platform’s training data. Which response best fits the mission?",
    options: [
      {
        label: "Force transparency about training data and dispute procedures",
        effect: { trust: 9, safety: 6, innovation: -2, xp: 22 },
        note: "Strong move. Transparency supports accountability and fairness.",
      },
      {
        label: "Ignore the complaint because innovation matters more",
        effect: { trust: -11, safety: -4, innovation: 7, xp: 3 },
        note: "Short-term speed, long-term legitimacy damage.",
      },
      {
        label: "Criminalize all training on internet data",
        effect: { trust: 1, safety: 3, innovation: -18, xp: 7 },
        note: "Too blunt. The issue is real, but the response is not proportional.",
      },
    ],
  },
];

export const quizData = [
  {
    question: "What is the core doctrine of this mission?",
    options: [
      "Every AI tool should face the same rules",
      "Riskier contexts should face stronger oversight",
      "Companies should regulate themselves",
      "All AI systems should be banned in education",
    ],
    answer: 1,
    feedback:
      "Correct. The project argues for proportional, risk-based regulation rather than a universal rule.",
  },
  {
    question: "Why is transparency important but insufficient?",
    options: [
      "Because it only matters in entertainment",
      "Because transparency replaces testing",
      "Because users need disclosure, but high-risk systems still need testing and accountability",
      "Because transparency always harms innovation",
    ],
    answer: 2,
    feedback:
      "Correct. Transparency builds trust, but high-risk systems also need stronger safeguards.",
  },
];

export function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function rangeLabel(value) {
  if (value < 35) return "Minimal Oversight";
  if (value < 70) return "Balanced Oversight";
  return "Strict Oversight";
}

export function formatSafeguard(name) {
  return {
    transparency: "Transparency Reports",
    human: "Human Review",
    testing: "Pre-Release Testing",
    privacy: "Data Protections",
    audit: "Independent Audits",
    labeling: "Clear AI Labeling",
  }[name];
}

export function getRank(xp) {
  if (xp >= 140) return "Director";
  if (xp >= 90) return "Field Strategist";
  if (xp >= 45) return "Analyst";
  return "Rookie Agent";
}

export function computePolicyResult(context, oversightValue, safeguards) {
  const base = contextWeights[context];
  let innovation = base.baseInnovation - oversightValue * 0.22;
  let safety = base.baseSafety + oversightValue * 0.3;
  let accountability = base.baseAccountability + oversightValue * 0.24;

  safeguards.forEach((name) => {
    innovation += safeguardEffects[name].innovation;
    safety += safeguardEffects[name].safety;
    accountability += safeguardEffects[name].accountability;
  });

  innovation = clamp(innovation);
  safety = clamp(safety);
  accountability = clamp(accountability);

  return { innovation, safety, accountability };
}

export function computeMissionFit({ context, missionId, oversightValue, safeguards, policy }) {
  const mission = scenarioData[missionId];
  const [min, max] = mission.winRange;
  const center = (min + max) / 2;
  const distance = Math.abs(oversightValue - center);
  const oversightScore = clamp(100 - distance * 3.2);
  const safeguardsScore =
    (mission.required.filter((item) => safeguards.includes(item)).length / mission.required.length) * 100;
  const contextScore = context === missionId ? 100 : 40;
  const balanceScore = clamp((policy.safety + policy.accountability + policy.innovation) / 3);
  const score = clamp(
    oversightScore * 0.4 + safeguardsScore * 0.3 + contextScore * 0.2 + balanceScore * 0.1
  );

  return {
    score,
    missing: mission.required
      .filter((item) => !safeguards.includes(item))
      .map((item) => formatSafeguard(item)),
  };
}
