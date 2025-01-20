import React from 'react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  currentAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
}

export function QuizQuestion({ question, currentAnswer, onAnswerSelect }: QuizQuestionProps) {
  // Combine correct and incorrect answers and shuffle them
  const allAnswers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
      {/* Use dangerouslySetInnerHTML to render HTML entities in questions */}
      <h2
        className="text-xl font-semibold text-gray-800 mb-6"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="space-y-3">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(answer)}
            className={`
              w-full text-left p-4 rounded-lg transition-all duration-200
              ${
                currentAnswer === answer
                  ? 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-500'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }
            `}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Category: {question.category} | Difficulty: {question.difficulty}
      </div>
    </div>
  );
}