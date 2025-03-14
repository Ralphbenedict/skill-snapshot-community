
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Clock } from 'lucide-react';

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining?: string;
  progress?: number; // Add this new optional property
}

const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  currentQuestion,
  totalQuestions,
  timeRemaining,
  progress: providedProgress
}) => {
  // Use provided progress if available, otherwise calculate it
  const progressPercentage = providedProgress !== undefined 
    ? providedProgress 
    : (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-3xl">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          Progress: {currentQuestion}/{totalQuestions} questions
        </div>
        {timeRemaining && (
          <div className="flex items-center text-sm font-medium">
            <Clock className="h-4 w-4 mr-1" />
            Time remaining: {timeRemaining}
          </div>
        )}
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default AssessmentProgress;
