export const QUESTIONS = [
  {
    text: "If Josh, our community manager, were a cat — would you still love him? 🐱",
    emoji: "😸",
    options: [
      { text: "Obviously. Josh as a cat is the superior form of Josh.", val: "A" },
      { text: "Only if he still posts community updates with his paws.", val: "B" },
      { text: "I'd follow cat-Josh on X immediately. No hesitation.", val: "C" },
      { text: "This feels like a trick question from the Ritual council.", val: "D" },
    ],
  },
  {
    text: "A Ritualist role holder vs a Radiant Ritualist in a Naruto-style fight. Who wins? ⚔️",
    emoji: "🥷",
    options: [
      { text: "Radiant Ritualist. They've unlocked the forbidden jutsu of onchain AI.", val: "A" },
      { text: "Ritualist. Underdog energy. Naruto was a genin once too.", val: "B" },
      { text: "They fuse into a Sage Ritualist and destroy the village.", val: "C" },
      { text: "Fight paused. The chain detected gas fees.", val: "D" },
    ],
  },
  {
    text: "Is Oluwasegun, our Resident Naija Ritualist, gay? 🤔 (The chain sees all.) 😏",
    emoji: "👀",
    options: [
      { text: "The chain has no comment but the transaction history is... interesting.", val: "A" },
      { text: "Segun is simply ahead of his time in every way. Label-free king.", val: "B" },
      { text: "I plead the 5th. My wallet stays private.", val: "C" },
      { text: "Above my clearance level as a Ritualist.", val: "D" },
    ],
  },
  {
    text: "You get Ritual Chain testnet access. First thing you do?",
    emoji: "🔮",
    options: [
      { text: "Deploy immediately. Read docs later.", val: "A" },
      { text: "Read every doc twice. Then deploy. Then read again.", val: "B" },
      { text: "Ask Josh (the cat) for guidance in Discord.", val: "C" },
      { text: "Build a dApp nobody asked for but everyone needed.", val: "D" },
    ],
  },
  {
    text: "Ritual is described as the 'Economic OS for AI'. You explain this to your grandmother as...",
    emoji: "👴",
    options: [
      { text: "AI that can hold money and make decisions without permission.", val: "A" },
      { text: "The internet but smarter, with cats, and it runs itself.", val: "B" },
      { text: "Computers that talk to each other nicely.", val: "C" },
      { text: "You show her the glowing UI and she says it's from the devil.", val: "D" },
    ],
  },
  {
    text: "Ritual mainnet launches. RITUAL 10x's. You...",
    emoji: "📈",
    options: [
      { text: "Already deployed 3 dApps. The money is secondary.", val: "A" },
      { text: "Scream quietly into a pillow. Then keep building.", val: "B" },
      { text: "Post a thread about believing in Ritual from day one.", val: "C" },
      { text: "Send Oluwasegun a voice note. He knows what it means.", val: "D" },
    ],
  },
  {
    text: "Which Ritual precompile speaks to your soul?",
    emoji: "⚙️",
    options: [
      { text: "AI Inference — smart contracts that actually think.", val: "A" },
      { text: "ZK Verification — trust nobody, verify everything.", val: "B" },
      { text: "TEE Execution — privacy is a human right, even onchain.", val: "C" },
      { text: "The Scheduler — contracts running at 3am while I sleep.", val: "D" },
    ],
  },
  {
    text: "The black cat chooses your Ritual path. Which door do you open?",
    emoji: "🚪",
    options: [
      { text: "The door that glows green and makes no logical sense.", val: "A" },
      { text: "The door with documentation taped to it.", val: "B" },
      { text: "The door that requires a cat to approve your transaction.", val: "C" },
      { text: "You build a new door. Onchain. With AI.", val: "D" },
    ],
  },
];

export type ArchetypeKey = "A" | "B" | "C" | "D";

export const ARCHETYPES = {
  A: {
    cat: "😼",
    title: "THE SHADOW SAGE",
    role: "Chaotic Neutral Builder",
    desc: "You ship before you think and think after you ship. The chain respects your chaos. You once deployed a contract at 2am and it became the most forked repo in the Ritual ecosystem. Oluwasegun respects you. Josh (the cat) is slightly afraid of you.",
    stats: { chaos: 95, precision: 12, influence: 60, autonomy: 75 },
    color: "#cc2e2e",
  },
  B: {
    cat: "🐱",
    title: "THE RADIANT ARCHIVIST",
    role: "Lawful Good Ritualist",
    desc: "You read the docs before breathing. Your smart contracts have natspec comments longer than most CVs. In the Naruto fight, you win — not with power but with preparation. Josh the cat trusts you with the server keys.",
    stats: { chaos: 8, precision: 97, influence: 70, autonomy: 55 },
    color: "#2ecc2e",
  },
  C: {
    cat: "😸",
    title: "THE COMMUNITY PROPHET",
    role: "Charismatic Zealot",
    desc: "You are the reason people join the Discord. You don't build the chain — you build the people who build the chain. The Ritual community is your smart contract and every member is a function call. Oluwasegun is your co-founder in spirit.",
    stats: { chaos: 45, precision: 35, influence: 99, autonomy: 40 },
    color: "#c9a84c",
  },
  D: {
    cat: "🙀",
    title: "THE SOVEREIGN AGENT",
    role: "Autonomous Visionary",
    desc: "You don't build dApps. You build things that build dApps. Autonomous, unpredictable, completely unhinged in the best way. Ritual's EVM++ scheduler runs your agents at 3am while you sleep peacefully. The future belongs to you.",
    stats: { chaos: 70, precision: 60, influence: 50, autonomy: 100 },
    color: "#4dff4d",
  },
};
