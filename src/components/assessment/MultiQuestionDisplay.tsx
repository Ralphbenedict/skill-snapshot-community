import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: string;
  text: string;
}

interface MultiQuestionDisplayProps {
  questions: Question[];
  currentAnswers: Record<string, number>;
  onAnswerSelected: (questionId: string, value: number) => void;
}

const MultiQuestionDisplay: React.FC<MultiQuestionDisplayProps> = ({
  questions,
  currentAnswers,
  onAnswerSelected,
}) => {
  // Handle keyboard shortcuts (1-5)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      // Check if key is a number from 1 to 5
      if (['1', '2', '3', '4', '5'].includes(key)) {
        const answerValue = parseInt(key);
        
        // If we have a focused question, answer that one
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.getAttribute('data-question-id')) {
          const questionId = focusedElement.getAttribute('data-question-id');
          if (questionId) {
            onAnswerSelected(questionId, answerValue);
            return;
          }
        }
        
        // Otherwise, answer the first unanswered question we find
        for (const question of questions) {
          if (!currentAnswers[question.id]) {
            onAnswerSelected(question.id, answerValue);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [questions, currentAnswers, onAnswerSelected]);

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <Card key={question.id} className="shadow-sm">
          <CardContent className="pt-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium">{question.text}</h3>
            </div>
            
            <RadioGroup 
              value={currentAnswers[question.id]?.toString()} 
              onValueChange={(value) => onAnswerSelected(question.id, parseInt(value))}
              className="space-y-1"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div 
                  key={value} 
                  className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors hover:bg-accent ${
                    currentAnswers[question.id] === value ? 'bg-accent border-primary' : ''
                  }`}
                  onClick={() => onAnswerSelected(question.id, value)}
                  data-question-id={question.id}
                  tabIndex={0}
                >
                  <RadioGroupItem 
                    value={value.toString()} 
                    id={`${question.id}-${value}`}
                  />
                  <Label 
                    htmlFor={`${question.id}-${value}`}
                    className="flex-grow cursor-pointer"
                  >
                    {value === 1 && "Strongly Disagree"}
                    {value === 2 && "Disagree"}
                    {value === 3 && "Neutral"}
                    {value === 4 && "Agree"}
                    {value === 5 && "Strongly Agree"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MultiQuestionDisplay;
