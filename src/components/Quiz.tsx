"use client";
import { useState } from "react";
import { QUESTIONS, ArchetypeKey } from "@/lib/quiz";

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz({ onComplete, onBack }: { onComplete: (key: ArchetypeKey) => void; onBack: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const q = QUESTIONS[current];
  const progress = ((current) / QUESTIONS.length) * 100;

  const handleSelect = (val: string) => {
    if (transitioning) return;
    setSelected(val);
    setTransitioning(true);
    setTimeout(() => {
      const newAnswers = [...answers, val];
      setAnswers(newAnswers);
      setSelected(null);
      setTransitioning(false);
      if (current + 1 < QUESTIONS.length) {
        setCurrent(c => c + 1);
      } else {
        // Tally
        const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
        newAnswers.forEach(a => counts[a]++);
        const winner = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]) as ArchetypeKey;
        onComplete(winner);
      }
    }, 400);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] px-6 py-12">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="font-mono text-xs text-ritual-pale/40 hover:text-ritual-pale transition-colors">← Back</button>
          <div className="flex-1 h-px bg-ritual-green/20 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-ritual-green to-ritual-glow transition-all duration-500 shadow-[0_0_8px_#2ecc2e]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-ritual-bright whitespace-nowrap">{current + 1} / {QUESTIONS.length}</span>
        </div>

        {/* Cat emoji */}
        <div className="text-center text-3xl mb-6 animate-[catFloat_3s_ease-in-out_infinite]">{q.emoji}</div>

        {/* Question card */}
        <div
          className="border border-ritual-green/20 bg-ritual-deep/80 p-8 mb-6 relative"
          style={{ boxShadow: "inset 0 0 40px rgba(46,204,46,0.03)" }}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-ritual-bright to-ritual-green" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-ritual-green/30" />
          <div className="font-mono text-xs text-ritual-bright/60 tracking-widest uppercase mb-3">
            Question {String(current + 1).padStart(2, "0")}
          </div>
          <p className="font-display font-semibold text-xl text-ritual-cream leading-relaxed">
            {q.text}
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.val)}
              className={`group flex items-center gap-4 text-left border px-5 py-4 transition-all duration-200 ${
                selected === opt.val
                  ? "border-ritual-glow bg-ritual-green/10 text-ritual-cream shadow-[0_0_20px_rgba(77,255,77,0.15)] -translate-x-0"
                  : "border-ritual-green/20 bg-ritual-black/50 text-ritual-pale/70 hover:border-ritual-bright hover:text-ritual-cream hover:bg-ritual-green/8 hover:translate-x-1 hover:shadow-[-4px_0_0_#2ecc2e]"
              }`}
            >
              <span className={`font-mono text-xs w-6 h-6 flex items-center justify-center border flex-shrink-0 transition-all duration-200 ${
                selected === opt.val
                  ? "border-ritual-glow bg-ritual-glow text-ritual-black"
                  : "border-ritual-green/40 text-ritual-bright group-hover:bg-ritual-bright group-hover:text-ritual-black group-hover:border-ritual-bright"
              }`}>
                {LETTERS[i]}
              </span>
              <span className="font-body text-sm font-medium leading-snug">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
