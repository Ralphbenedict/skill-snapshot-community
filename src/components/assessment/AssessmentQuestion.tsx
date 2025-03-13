
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  number: number;
  text: string;
  image?: string;
  answers: Answer[];
  correctAnswerId?: string;
  explanation?: string;
}

interface AssessmentQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  showPrevious: boolean;
  showNext: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
  showPrevious,
  showNext,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4 mr-1" />
            Get Help
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">{question.text}</h2>
            {question.image && (
              <div className="my-4 border rounded-md overflow-hidden">
                <img src={question.image} alt="Question diagram" className="w-full h-auto" />
              </div>
            )}
          </div>
          
          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={onSelectAnswer}
            className="space-y-3"
          >
            {question.answers.map((answer) => (
              <div key={answer.id} className="flex items-start space-x-2 border p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                <RadioGroupItem value={answer.id} id={answer.id} className="mt-1" />
                <Label htmlFor={answer.id} className="cursor-pointer flex-1">{answer.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="border-t justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPreviousQuestion}
          disabled={!showPrevious}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button 
          onClick={onNextQuestion}
          disabled={!selectedAnswer || !showNext}
        >
          {currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next"}
          {currentQuestionIndex < totalQuestions - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentQuestion;
