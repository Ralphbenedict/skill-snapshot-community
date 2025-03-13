import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AssessmentQuestion, { Question } from '@/components/assessment/AssessmentQuestion';
import AssessmentProgress from '@/components/assessment/AssessmentProgress';
import { ArrowLeft } from 'lucide-react';

// Sample questions for each assessment type
const assessmentQuestions: Record<string, Question[]> = {
  'role-based': [
    {
      id: '1',
      number: 1,
      text: 'Which of the following best describes the primary role of product strategy?',
      answers: [
        { id: 'a', text: 'Determining the technical architecture of the product' },
        { id: 'b', text: 'Defining how the product will achieve business goals while meeting user needs' },
        { id: 'c', text: 'Designing the user interface and experience' },
        { id: 'd', text: 'Managing the development team's workflow' },
        { id: 'e', text: 'Creating marketing materials for the product' }
      ],
      correctAnswerId: 'b',
      explanation: 'Product strategy defines how a product will meet both business objectives and user needs, providing a roadmap for product decisions.'
    },
    {
      id: '2',
      number: 2,
      text: 'When prioritizing features for a product roadmap, which of the following approaches is most effective?',
      answers: [
        { id: 'a', text: 'Implementing all requested features from the sales team' },
        { id: 'b', text: 'Focusing exclusively on what competitors are doing' },
        { id: 'c', text: 'Building whatever the development team finds most interesting' },
        { id: 'd', text: 'Balancing user value, business value, and implementation effort/risk' },
        { id: 'e', text: 'Adding as many features as possible in each release' }
      ],
      correctAnswerId: 'd',
      explanation: 'Effective prioritization balances the value to users, value to the business, and the effort/risk of implementation.'
    },
    {
      id: '3',
      number: 3,
      text: 'What is the most appropriate way to handle stakeholder disagreement about product direction?',
      answers: [
        { id: 'a', text: 'Always defer to the highest-ranking stakeholder' },
        { id: 'b', text: 'Avoid the conflict by implementing all requested features' },
        { id: 'c', text: 'Facilitate data-informed discussion focused on user needs and business goals' },
        { id: 'd', text: 'Let the development team decide what to build' },
        { id: 'e', text: 'Postpone all decisions until everyone agrees' }
      ],
      correctAnswerId: 'c',
      explanation: 'Productive stakeholder management involves facilitating discussions based on data and evidence, focusing on how decisions serve user needs and business goals.'
    }
  ],
  'technical': [
    {
      id: '1',
      number: 1,
      text: 'Which approach to state management in React is most appropriate for sharing data between deeply nested components?',
      answers: [
        { id: 'a', text: 'Passing props down through each component level' },
        { id: 'b', text: 'Using a global state management library like Redux or Context API' },
        { id: 'c', text: 'Storing all data in local component state' },
        { id: 'd', text: 'Using URL parameters' },
        { id: 'e', text: 'Relying on browser localStorage' }
      ],
      correctAnswerId: 'b',
      explanation: 'Context API or state management libraries like Redux are designed to solve the "prop drilling" problem when sharing data across deeply nested components.'
    },
    {
      id: '2',
      number: 2,
      text: 'What is the primary benefit of code splitting in a frontend application?',
      answers: [
        { id: 'a', text: 'Reducing the number of HTTP requests' },
        { id: 'b', text: 'Improving initial load time by only loading necessary code' },
        { id: 'c', text: 'Making the codebase easier to understand' },
        { id: 'd', text: 'Allowing multiple developers to work on the same feature' },
        { id: 'e', text: 'Preventing CSS conflicts' }
      ],
      correctAnswerId: 'b',
      explanation: 'Code splitting improves application performance by only loading the code necessary for the current view, reducing initial bundle size and load time.'
    }
  ],
  'design': [
    {
      id: '1',
      number: 1,
      text: 'In the UI shown below, rank the design issues from most critical to least critical:',
      image: '/placeholder.svg',
      answers: [
        { id: 'a', text: 'Visual Hierarchy - Users cannot easily identify the most important elements' },
        { id: 'b', text: 'Information Architecture - Related items are not properly grouped' },
        { id: 'c', text: 'Progressive Disclosure - Too much information is shown at once' },
        { id: 'd', text: 'Cognitive Load - The interface requires too much mental effort' },
        { id: 'e', text: 'Learnability - New users would struggle to understand how to use this interface' }
      ],
      correctAnswerId: 'a',
      explanation: 'Visual hierarchy is the most critical issue here as it impacts the user\'s ability to navigate and use the interface effectively.'
    },
    {
      id: '2',
      number: 2,
      text: 'Which principle best describes the concept of making important elements more visually prominent?',
      answers: [
        { id: 'a', text: 'Consistency' },
        { id: 'b', text: 'Visual Hierarchy' },
        { id: 'c', text: 'Proximity' },
        { id: 'd', text: 'Alignment' },
        { id: 'e', text: 'Contrast' }
      ],
      correctAnswerId: 'b',
      explanation: 'Visual hierarchy refers to the arrangement of elements to show their order of importance, making key elements stand out through size, color, placement, etc.'
    }
  ],
  'leadership': [
    {
      id: '1',
      number: 1,
      text: 'Which approach is most effective when a team member consistently misses deadlines?',
      answers: [
        { id: 'a', text: 'Publicly call out the issue during team meetings to create accountability' },
        { id: 'b', text: 'Reassign all their tasks to more reliable team members' },
        { id: 'c', text: 'Have a private conversation to understand underlying causes and offer support' },
        { id: 'd', text: 'Immediately escalate the issue to upper management' },
        { id: 'e', text: 'Set even tighter deadlines to motivate them to work faster' }
      ],
      correctAnswerId: 'c',
      explanation: 'Effective leadership involves understanding root causes behind performance issues and providing appropriate support and coaching.'
    }
  ],
  'competency': [
    {
      id: '1',
      number: 1,
      text: 'When faced with conflicting priorities from different stakeholders, what is the most effective first step?',
      answers: [
        { id: 'a', text: 'Immediately escalate to upper management for a decision' },
        { id: 'b', text: 'Try to satisfy everyone by working longer hours' },
        { id: 'c', text: 'Identify the underlying needs and business objectives driving each request' },
        { id: 'd', text: 'Avoid the conflict by delaying less urgent requests indefinitely' },
        { id: 'e', text: 'Choose the stakeholder with the highest position in the organization' }
      ],
      correctAnswerId: 'c',
      explanation: 'Understanding the underlying needs and business objectives allows you to find potential compromises or alternative solutions that address the core requirements.'
    }
  ]
};

const TakeAssessment = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  // Get questions for the current assessment
  const questions = assessmentId ? assessmentQuestions[assessmentId] || [] : [];

  const handleSelectAnswer = (answerId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit assessment
      setIsComplete(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGoBack = () => {
    navigate('/assessment');
  };

  if (!assessmentId || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Assessment Not Found</h1>
          <p className="text-muted-foreground">The assessment you're looking for doesn't exist or hasn't been configured.</p>
          <Button onClick={handleGoBack}>Return to Assessments</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestion.id] || null;

  if (isComplete) {
    // Simple completion screen - in a real app, this would calculate and store results
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold">Assessment Complete!</h1>
          <p className="text-muted-foreground">Thank you for completing the assessment. Your results are being processed.</p>
          <Button onClick={handleGoBack}>Return to Assessments</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b bg-card">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Exit Assessment
          </button>
          <span className="font-medium">
            {assessmentId === 'role-based' ? 'Product Principles Assessment' : 
             assessmentId === 'design' ? 'Design Language & Principles' : 
             assessmentId === 'technical' ? 'Technical Skills' :
             assessmentId === 'leadership' ? 'Leadership & Soft Skills' : 
             'Competency Evaluation'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 container mx-auto flex flex-col items-center px-4 py-8 space-y-6">
        <AssessmentProgress 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          timeRemaining="45:00"
        />
        
        <AssessmentQuestion 
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          showPrevious={currentQuestionIndex > 0}
          showNext={true}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
};

export default TakeAssessment;
