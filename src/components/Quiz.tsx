'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface Result {
  style: string;
  description: string;
  advice: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your ideal workspace?",
    options: [
      { id: "A", text: "Minimalist, with few elements and lots of space." },
      { id: "B", text: "Colorful and full of inspiration, with many decorative objects." },
      { id: "C", text: "Organized, but with personal touches and delicate details." },
      { id: "D", text: "Sophisticated, with luxurious and well-organized elements." }
    ]
  },
  {
    id: 2,
    text: "What type of typography attracts you the most?",
    options: [
      { id: "A", text: "Simple, unadorned, like a modern sans serif." },
      { id: "B", text: "Bold and striking typefaces with geometric shapes." },
      { id: "C", text: "Elegant, with smooth curves, script or classic serif style." },
      { id: "D", text: "Fonts with lots of personality, ornate and detailed." }
    ]
  },
  {
    id: 3,
    text: "What color combination do you prefer for a design?",
    options: [
      { id: "A", text: "Neutral colors: white, black, grays, and beiges." },
      { id: "B", text: "Vibrant and contrasting colors: reds, electric blues, yellows." },
      { id: "C", text: "Soft and pastel tones: pink, lavender, light blue." },
      { id: "D", text: "Deep and rich colors: gold, black, burgundy, silver." }
    ]
  },
  {
    id: 4,
    text: "What type of images or illustrations attract you the most?",
    options: [
      { id: "A", text: "Simple photos or graphics with clean lines and minimal detail." },
      { id: "B", text: "Large, expressive illustrations full of energy." },
      { id: "C", text: "Hand-drawn, delicate details, with an artistic touch." },
      { id: "D", text: "Complex graphics with intricate patterns or golden elements." }
    ]
  },
  {
    id: 5,
    text: "How would you like a logo designed for your brand to be?",
    options: [
      { id: "A", text: "Clear and direct, with strong typography and a simple symbol." },
      { id: "B", text: "Modern, creative, and energetic, perhaps something geometric." },
      { id: "C", text: "Elegant and delicate, with a fluid and sophisticated design." },
      { id: "D", text: "Detailed, luxurious, with visual elements that give a sense of exclusivity." }
    ]
  }
];

const results: Record<string, Result> = {
  A: {
    style: "Modern Minimalist",
    description: "Your style is simple, clean, and direct. You prefer designs with a focus on clarity and elegance. White space and clean lines are fundamental for you. Neutral colors and simple sans serif typefaces are your favorites.",
    advice: "Less is more. The key is in simplicity and precision. Your design should breathe!"
  },
  B: {
    style: "Vibrant and Bold",
    description: "You love energy and excitement in your designs. You prefer bright and contrasting colors, large and bold typefaces, and eye-catching graphics. Your designs are daring and always seek to stand out.",
    advice: "Don't be afraid to break the rules. The important thing is that your design shouts: look at me! Contrasts and geometric shapes are your best friends."
  },
  C: {
    style: "Delicate and Sophisticated",
    description: "Your style is subtle, elegant, and harmonious. You prefer soft tones and delicate illustrations. You seek a perfect balance between modernity and classic, and you're attracted to refined details.",
    advice: "Elegance is in the details. Soft textures and elegant fonts are your thing. Sophistication never goes out of style!"
  },
  D: {
    style: "Luxurious and Classic",
    description: "You're fascinated by designs that convey elegance and exclusivity. You prefer rich colors, complex textures, and ornate fonts. Every element of your design must have a clear purpose and convey an air of luxury.",
    advice: "Luxury is in the details. Complex patterns, golden colors, and glossy finishes are key to achieving the visual impact you seek."
  }
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const counts: Record<string, number> = answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostFrequent = Object.entries(counts).reduce((a, b) => 
      (counts[a[0]] > counts[b[0]] ? a : b)
    )[0];

    return results[mostFrequent];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const result = getResult();
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50/90 to-orange-50/90 dark:from-blue-950/30 dark:to-orange-900/30 rounded-xl shadow-lg backdrop-blur-sm">
        <div className="relative">
          {/* Chibi celebration image */}
          <div className="absolute -top-32 left-1/2 w-28 h-28 animate-celebrate">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/chibi4.png"
                  alt="Celebration Character"
                  width={112}
                  height={112}
                  className="drop-shadow-lg"
                  style={{ 
                    objectFit: 'contain'
                  }}
                  loading="eager"
                  priority={true}
                  unoptimized={true}
                />
              </div>
              
              {/* Sparkle effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-sparkle"></div>
                <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-orange-300 rounded-full animate-sparkle delay-500"></div>
                <div className="absolute top-1/4 right-0 w-1.5 h-1.5 bg-blue-200 rounded-full animate-sparkle delay-1000"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-orange-200 rounded-full animate-sparkle delay-700"></div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent pt-8">
            Your style is: {result.style}
          </h3>
          <p className="text-gray-700 dark:text-gray-200 mb-4">{result.description}</p>
          <div className="bg-gradient-to-br from-blue-100/50 to-orange-100/50 dark:from-blue-900/20 dark:to-orange-900/20 p-4 rounded-lg mb-6 backdrop-blur-sm border border-blue-200/20 dark:border-orange-500/20">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              Tip: {result.advice}
            </p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-blue-600 to-orange-400 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Start Over
          </button>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-orange-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {question.text}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="font-medium text-blue-600 dark:text-blue-400 mr-2">
              {option.id}:
            </span>
            <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz; 