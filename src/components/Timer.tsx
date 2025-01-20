import React, { useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export function Timer({ timeRemaining, onTimeUp }: TimerProps) {
  // Format seconds into MM:SS display
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Trigger onTimeUp callback when timer reaches zero
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
      <Clock className="w-5 h-5 text-indigo-600" />
      <span className="font-mono text-lg font-semibold text-gray-800">
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
}