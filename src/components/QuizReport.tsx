import React from 'react';
import { Question } from '../types';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizReportProps {
  questions: Question[];
  answers: Record<number, string>;
  email: string;
  onRetry: () => void;
}

export function QuizReport({ questions, answers, email, onRetry }: QuizReportProps) {
  // Calculate the number of correct answers and percentage score
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Results</h1>
          <p className="text-gray-600 mb-4">Email: {email}</p>
          <div className="flex items-center justify-center bg-indigo-100 rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-indigo-600">{score}/{questions.length}</p>
              <p className="text-xl text-gray-700">Score: {percentage}%</p>
            </div>
          </div>
          <button
            onClick={onRetry}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                {/* Use dangerouslySetInnerHTML to render HTML entities in questions */}
                <h3
                  className="text-lg font-semibold text-gray-800 mb-4"
                  dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.question}` }}
                />
                {answers[index] === question.correct_answer ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Your answer:</span>
                  {/* Color code the user's answer based on correctness */}
                  <span
                    className={`${
                      answers[index] === question.correct_answer
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                    dangerouslySetInnerHTML={{ __html: answers[index] || 'Not answered' }}
                  />
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Correct answer:</span>
                  <span
                    className="text-green-600"
                    dangerouslySetInnerHTML={{ __html: question.correct_answer }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}