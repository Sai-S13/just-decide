import { analyzeOption } from './analyzer.js';

export const decide = (options) => {
  let best = null;
  let bestScore = -1;
  let bestMessage = "";
  let bestCategory = "";
  const scores = [];

  options.forEach((opt) => {
    const data = analyzeOption(opt);
    scores.push({ option: opt, score: data.score, category: data.category, message: data.message });

    if (data.score > bestScore) {
      bestScore = data.score;
      best = opt;
      bestMessage = data.message;
      bestCategory = data.category;
    }
  });

  return {
    choice: best,
    message: bestMessage,
    category: bestCategory,
    score: bestScore,
    confidence: Math.floor(Math.random() * 20) + 75,
    scores
  };
};
