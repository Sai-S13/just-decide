import keywordMap from '../data/keywordMap.js';
import categoryData from '../data/categoryData.js';

export const getCategory = (input) => {
  const lower = input.toLowerCase();

  for (let cat in keywordMap) {
    for (let word of keywordMap[cat]) {
      if (lower.includes(word)) return cat;
    }
  }

  return "unknown";
};

export const analyzeOption = (option) => {
  const category = getCategory(option);

  if (categoryData[category]) {
    return { ...categoryData[category], category };
  }

  return {
    score: 5,
    message: "Neutral choice. Stop overthinking and decide.",
    category: "unknown"
  };
};
