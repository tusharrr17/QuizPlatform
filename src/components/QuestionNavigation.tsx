import React from 'react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  visitedQuestions: Set<number>;
  answers: Record<number, string>;
  onQuestionSelect: (index: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onQuestionSelect,
}: QuestionNavigationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Question Overview</h2>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`
              w-10 h-10 rounded-lg font-medium transition-all duration-200
              ${currentQuestion === i ? 'ring-2 ring-indigo-600' : ''}
              ${
                answers[i]
                  ? 'bg-green-100 text-green-800'
                  : visitedQuestions.has(i)
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }
              hover:bg-indigo-100 hover:text-indigo-800
            `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}