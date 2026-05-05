export type ArchetypeKey = "A" | "B" | "C" | "D";

export const QUESTIONS = [
  {
    text: "If Josh, our community manager, were a cat — would you still love him? 🐱",
    emoji: "😸",
    options: [
      { text: "Obviously. Josh as a cat is the superior form of Josh.", val: "A" as ArchetypeKey },
      { text: "Only if he still posts community updates with his paws.", val: "B" as ArchetypeKey },
      { text: "I'd follow cat-Josh on X immediately. No hesitation.", val: "C" as ArchetypeKey },
      { text: "This feels like a trick question from the Ritual council.", val: "D" as ArchetypeKey },
    ],
  },
  {
    text: "A Ritualist role holder goes up against a Radiant Ritualist in a Naruto-style fight. Who wins? ⚔️",
    emoji: "🥷",
    options: [
      { text: "Radiant Ritualist. They unlocked the forbidden onchain AI jutsu.", val: "A" as ArchetypeKey },
      { text: "Ritualist. Underdog energy. Naruto was a genin once too.", val: "B" as ArchetypeKey },
      { text: "They fuse into a Sage Ritualist and destroy the testnet.", val: "C" as ArchetypeKey },
      { text: "Fight cancelled. The chain detects the gas fee and pauses.", val: "D" as ArchetypeKey },
    ],
  },
  {
    text: "Is Oluwasegun, our Resident Naija Ritualist, gay? 🤔 (The chain sees all.) 😏",
    emoji: "👀",
    options: [
      { text: "The chain has no comment but the transaction history is... interesting.", val: "A" as ArchetypeKey },
      { text: "Segun is simply ahead of his time in every way. Label-free king.", val: "B" as ArchetypeKey },
      { text: "I plead the 5th. My wallet stays private.", val: "C" as ArchetypeKey },
      { text: "This is above my clearance level as a Ritualist.", val: "D" as ArchetypeKey },
    ],
  },
  {
    text: "You finally get Ritual Chain testnet access. What's the FIRST thing you do?",
    emoji: "🔮",
    options: [
      { text: "Deploy a contract immediately. Ship before reading the docs.", val: "A" as ArchetypeKey },
      { text: "Read every doc twice. Then deploy. Then read again.", val: "B" as ArchetypeKey },
      { text: "Ask Josh (cat form) for guidance in Discord.", val: "C" as ArchetypeKey },
      { text: "Build a dApp nobody asked for but everyone needed.", val: "D" as ArchetypeKey },
    ],
  },
  {
    text: "You explain Ritual to your grandmother as...",
    emoji: "👴",
    options: [
      { text: "AI that can hold money and make decisions without asking permission.", val: "A" as ArchetypeKey },
      { text: "The internet, but smarter, with cats, and it runs itself.", val: "B" as ArchetypeKey },
      { text: "You tell her it makes computers talk to each other nicely.", val: "C" as ArchetypeKey },
      { text: "You show her the glowing green UI and she says it's from the devil.", val: "D" as ArchetypeKey },
    ],
  },
  {
    text: "Ritual mainnet launches. RITUAL 10x's. You...",
    emoji: "📈",
    options: [
      { text: "Already deployed 3 dApps. The money was secondary.", val: "A" as ArchetypeKey },
      { text: "Scream quietly into a pillow. Then keep building.", val: "B" as ArchetypeKey },
      { text: "Post a thread about why you believed from day one.", val: "C" as ArchetypeKey },
      { text: "Send Oluwasegun a voice note. He knows what it means.", val: "D" as ArchetypeKey },
    ],
  },
  {
    text: "Which Ritual precompile speaks to your soul?",
    emoji: "⚙️",
    options: [
      { text: "AI Inference — smart contracts that actually think.", val: "A" as ArchetypeKey },
      { text: "ZK Verification — trust nobody, verify everything.", val: "B" as ArchetypeKey },
      { text: "TEE Execution — privacy is a human right, even onchain.", val: "C" as ArchetypeKey },
      { text: "The Scheduler — my contracts run at 3am without me.", val: "D" as ArchetypeKey },
    ],
  },
  {
    text: "The black cat chooses your Ritual path. Which door do you open?",
    emoji: "🚪",
    options: [
      { text: "The door that glows green and makes no logical sense.", val: "A" as ArchetypeKey },
      { text: "The door with documentation taped to it.", val: "B" as ArchetypeKey },
      { text: "The door that requires a cat to approve your transaction.", val: "C" as ArchetypeKey },
      { text: "You build a new door. Onchain. With AI.", val: "D" as ArchetypeKey },
    ],
  },
];

export const ARCHETYPES = {
  A: {
    id: 1,
    cat: "😼",
    title: "THE SHADOW SAGE",
    role: "Chaotic Neutral Builder",
    desc: "You ship before you think and think after you ship. The chain respects your chaos. You deployed a contract at 2am and it became the most forked repo in the Ritual ecosystem. Oluwasegun respects you. Josh (the cat) is slightly afraid of you.",
    stats: [95, 12, 40, 70] as [number, number, number, number],
    statNames: ["Chaos Energy", "Documentation", "Community Vibes", "Cat Approval"],
    color: "#cc2e2e",
  },
  B: {
    id: 2,
    cat: "🐱",
    title: "THE RADIANT ARCHIVIST",
    role: "Lawful Good Ritualist",
    desc: "You read the docs before breathing. Your smart contracts have natspec comments longer than most CVs. In the Naruto fight, you win — not with power, but with preparation. Josh the cat trusts you with the server keys.",
    stats: [8, 97, 60, 95] as [number, number, number, number],
    statNames: ["Chaos Energy", "Precision", "Community Vibes", "Cat Approval"],
    color: "#2ecc2e",
  },
  C: {
    id: 3,
    cat: "😸",
    title: "THE COMMUNITY PROPHET",
    role: "Charismatic Zealot",
    desc: "You are the reason people join the Discord. You don't build the chain — you build the people who build the chain. The Ritual community is your smart contract and every member is a function call. Oluwasegun is your co-founder in spirit.",
    stats: [30, 35, 99, 88] as [number, number, number, number],
    statNames: ["Chaos Energy", "Solidity Skills", "Influence", "Cat Approval"],
    color: "#c9a84c",
  },
  D: {
    id: 4,
    cat: "🙀",
    title: "THE SOVEREIGN AGENT",
    role: "Autonomous Visionary",
    desc: "You don't build dApps. You build things that build dApps. Autonomous, unpredictable, and completely unhinged in the best way. Ritual was built for you — specifically the EVM++ scheduler that runs your agents at 3am while you sleep.",
    stats: [60, 50, 22, 80] as [number, number, number, number],
    statNames: ["Autonomy", "Vision", "Human Contact", "Cat Approval"],
    color: "#7a4dff",
  },
};

export function tallyAnswers(answers: ArchetypeKey[]): ArchetypeKey {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => counts[a]++);
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as ArchetypeKey;
}
