
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Clock } from 'lucide-react';

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining?: string;
}

const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  currentQuestion,
  totalQuestions,
  timeRemaining
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
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
