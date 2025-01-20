import React, { useState, useEffect, useCallback } from 'react';
import { EmailForm } from './components/EmailForm';
import { Timer } from './components/Timer';
import { QuestionNavigation } from './components/QuestionNavigation';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizReport } from './components/QuizReport';
import { Question, QuizState, QuizResponse } from './types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Quiz duration in seconds (30 minutes)
const QUIZ_TIME = 30 * 60;

// Initial state for the quiz - used for both first load and reset
const initialQuizState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  visitedQuestions: new Set([0]), // Start with first question marked as visited
  timeRemaining: QUIZ_TIME,
  email: '',
  isQuizComplete: false,
};

function App() {
  const [quizState, setQuizState] = useState<QuizState>(initialQuizState);

  // Fetch questions from the Open Trivia DB API
  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      const data: QuizResponse = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };

  // Timer effect: countdown when quiz is active
  useEffect(() => {
    let timer: number;
    if (quizState.email && !quizState.isQuizComplete) {
      timer = window.setInterval(() => {
        setQuizState((prev) => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizState.email, quizState.isQuizComplete]);

  // Initialize quiz with user's email and fetch questions
  const handleEmailSubmit = async (email: string) => {
    const questions = await fetchQuestions();
    setQuizState((prev) => ({
      ...prev,
      questions,
      email,
    }));
  };

  // Record user's answer for the current question
  const handleAnswerSelect = (answer: string) => {
    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestionIndex]: answer,
      },
    }));
  };

  // Handle direct navigation to a specific question
  const handleQuestionSelect = (index: number) => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: index,
      visitedQuestions: new Set([...prev.visitedQuestions, index]),
    }));
  };

  // Auto-submit quiz when time runs out
  const handleTimeUp = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      isQuizComplete: true,
    }));
  }, []);

  // Reset quiz state to initial values for a new attempt
  const handleRetry = () => {
    setQuizState(initialQuizState);
  };

  // Handle navigation between questions using prev/next buttons
  const navigateQuestion = (direction: 'prev' | 'next') => {
    setQuizState((prev) => {
      // Calculate new index within bounds
      const newIndex =
        direction === 'next'
          ? Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
          : Math.max(prev.currentQuestionIndex - 1, 0);
      return {
        ...prev,
        currentQuestionIndex: newIndex,
        visitedQuestions: new Set([...prev.visitedQuestions, newIndex]),
      };
    });
  };

  // Show email form if user hasn't started quiz
  if (!quizState.email) {
    return <EmailForm onSubmit={handleEmailSubmit} />;
  }

  // Show results if quiz is complete or time is up
  if (quizState.isQuizComplete || quizState.timeRemaining <= 0) {
    return (
      <QuizReport
        questions={quizState.questions}
        answers={quizState.answers}
        email={quizState.email}
        onRetry={handleRetry}
      />
    );
  }

  // Main quiz interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Timer timeRemaining={quizState.timeRemaining} onTimeUp={handleTimeUp} />
          <button
            onClick={handleTimeUp}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Submit Quiz
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {quizState.questions.length > 0 && (
              <QuizQuestion
                question={quizState.questions[quizState.currentQuestionIndex]}
                currentAnswer={quizState.answers[quizState.currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
              />
            )}

            <div className="flex justify-between">
              <button
                onClick={() => navigateQuestion('prev')}
                disabled={quizState.currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-md shadow-md disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button
                onClick={() => navigateQuestion('next')}
                disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-md shadow-md disabled:opacity-50"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <QuestionNavigation
              totalQuestions={quizState.questions.length}
              currentQuestion={quizState.currentQuestionIndex}
              visitedQuestions={quizState.visitedQuestions}
              answers={quizState.answers}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;