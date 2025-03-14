import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AssessmentProgress from '@/components/assessment/AssessmentProgress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MultiQuestionDisplay from '@/components/assessment/MultiQuestionDisplay';
import { useToast } from '@/hooks/use-toast';

// Define question interface
interface Question {
  id: string;
  text: string;
}

// Define assessment questions
const assessmentQuestions: Record<string, Question[]> = {
  'role-based': [
    { id: 'pm-1', text: 'I regularly conduct user research to inform product decisions.' },
    { id: 'pm-2', text: 'I can effectively prioritize features based on business value and user needs.' },
    { id: 'pm-3', text: 'I understand how to define and track product metrics and KPIs.' },
    { id: 'pm-4', text: 'I can create clear and compelling product roadmaps.' },
    { id: 'pm-5', text: 'I effectively communicate product vision to stakeholders.' },
    { id: 'pm-6', text: 'I understand the technical constraints that affect product development.' },
    { id: 'pm-7', text: 'I can write detailed user stories with clear acceptance criteria.' },
    { id: 'pm-8', text: 'I regularly analyze product data to inform decisions.' },
    { id: 'pm-9', text: 'I understand my product\'s market and competitive landscape.' },
    { id: 'pm-10', text: 'I can effectively manage stakeholder expectations.' },
    { id: 'pm-11', text: 'I run effective product discovery sessions.' },
    { id: 'pm-12', text: 'I understand the financial aspects of product management (budgeting, ROI).' },
    { id: 'pm-13', text: 'I can create and validate product prototypes.' },
    { id: 'pm-14', text: 'I effectively collaborate with design and engineering teams.' },
    { id: 'pm-15', text: 'I understand how to conduct A/B tests to validate hypotheses.' },
  ],
  'technical': [
    { id: 'tech-1', text: 'I understand fundamental programming concepts (variables, loops, conditionals).' },
    { id: 'tech-2', text: 'I can write clean, maintainable code.' },
    { id: 'tech-3', text: 'I understand object-oriented programming principles.' },
    { id: 'tech-4', text: 'I can design and implement efficient algorithms.' },
    { id: 'tech-5', text: 'I understand database design and SQL queries.' },
    { id: 'tech-6', text: 'I can implement responsive web designs.' },
    { id: 'tech-7', text: 'I understand RESTful API design principles.' },
    { id: 'tech-8', text: 'I can implement proper error handling in my code.' },
    { id: 'tech-9', text: 'I understand version control systems like Git.' },
    { id: 'tech-10', text: 'I can write effective unit tests.' },
    { id: 'tech-11', text: 'I understand web security best practices.' },
    { id: 'tech-12', text: 'I can optimize code for performance.' },
    { id: 'tech-13', text: 'I understand cloud computing concepts.' },
    { id: 'tech-14', text: 'I can implement CI/CD pipelines.' },
    { id: 'tech-15', text: 'I understand containerization technologies like Docker.' },
  ],
  'leadership': [
    { id: 'lead-1', text: 'I effectively delegate tasks to team members.' },
    { id: 'lead-2', text: 'I provide constructive feedback to help others improve.' },
    { id: 'lead-3', text: 'I can manage conflicts within a team effectively.' },
    { id: 'lead-4', text: 'I inspire and motivate team members to perform at their best.' },
    { id: 'lead-5', text: 'I communicate clear expectations and goals.' },
    { id: 'lead-6', text: 'I actively listen to team members\' concerns and ideas.' },
    { id: 'lead-7', text: 'I make decisions confidently, even with incomplete information.' },
    { id: 'lead-8', text: 'I take responsibility for team failures and share credit for successes.' },
    { id: 'lead-9', text: 'I adapt my leadership style to different situations and individuals.' },
    { id: 'lead-10', text: 'I effectively manage team performance and address underperformance.' },
    { id: 'lead-11', text: 'I create an inclusive environment where diverse perspectives are valued.' },
    { id: 'lead-12', text: 'I mentor and develop team members to reach their potential.' },
    { id: 'lead-13', text: 'I communicate complex information clearly to different audiences.' },
    { id: 'lead-14', text: 'I build trust through consistent and ethical behavior.' },
    { id: 'lead-15', text: 'I effectively manage change and help others navigate transitions.' },
  ],
  'competency': [
    { id: 'comp-1', text: 'I consistently meet deadlines and deliver on commitments.' },
    { id: 'comp-2', text: 'I effectively prioritize tasks based on importance and urgency.' },
    { id: 'comp-3', text: 'I communicate clearly and effectively in writing.' },
    { id: 'comp-4', text: 'I communicate clearly and effectively verbally.' },
    { id: 'comp-5', text: 'I actively seek feedback and use it to improve.' },
    { id: 'comp-6', text: 'I adapt quickly to changing priorities and requirements.' },
    { id: 'comp-7', text: 'I collaborate effectively with colleagues across different functions.' },
    { id: 'comp-8', text: 'I take initiative to solve problems without being asked.' },
    { id: 'comp-9', text: 'I maintain a positive attitude even in challenging situations.' },
    { id: 'comp-10', text: 'I continuously learn and develop new skills.' },
    { id: 'comp-11', text: 'I manage my time effectively to maximize productivity.' },
    { id: 'comp-12', text: 'I make decisions that balance short-term needs with long-term goals.' },
    { id: 'comp-13', text: 'I take ownership of my mistakes and learn from them.' },
    { id: 'comp-14', text: 'I maintain attention to detail in my work.' },
    { id: 'comp-15', text: 'I effectively manage multiple projects simultaneously.' },
  ],
  'design': [
    { id: 'design-1', text: 'I understand fundamental design principles (contrast, repetition, alignment, proximity).' },
    { id: 'design-2', text: 'I can create consistent visual hierarchies to guide users.' },
    { id: 'design-3', text: 'I understand how to use typography effectively in interfaces.' },
    { id: 'design-4', text: 'I can create and apply color systems appropriately.' },
    { id: 'design-5', text: 'I design with accessibility in mind.' },
    { id: 'design-6', text: 'I understand how to create and maintain design systems.' },
    { id: 'design-7', text: 'I can effectively communicate design decisions to stakeholders.' },
    { id: 'design-8', text: 'I understand responsive design principles.' },
    { id: 'design-9', text: 'I can create effective user flows and information architecture.' },
    { id: 'design-10', text: 'I understand how to conduct usability testing.' },
    { id: 'design-11', text: 'I can translate user research into design requirements.' },
    { id: 'design-12', text: 'I understand interaction design patterns and best practices.' },
    { id: 'design-13', text: 'I can create effective visual designs that support brand identity.' },
    { id: 'design-14', text: 'I understand how to design for different platforms (web, mobile, etc.).' },
    { id: 'design-15', text: 'I can create and use design documentation effectively.' },
  ],
  'ocean-trait': [
    // Openness to Experience
    { id: 'ocean-1', text: 'I have a vivid imagination.' },
    { id: 'ocean-2', text: 'I enjoy abstract ideas and theoretical concepts.' },
    { id: 'ocean-3', text: 'I enjoy trying new activities and experiences.' },
    { id: 'ocean-4', text: 'I value artistic and creative expression.' },
    { id: 'ocean-5', text: 'I enjoy exploring new places and cultures.' },
    { id: 'ocean-6', text: 'I enjoy thinking about complex problems.' },
    { id: 'ocean-7', text: 'I am interested in learning about different subjects.' },
    { id: 'ocean-8', text: 'I enjoy experimenting with new approaches to tasks.' },
    { id: 'ocean-9', text: 'I am open to unconventional ideas and viewpoints.' },
    { id: 'ocean-10', text: 'I enjoy intellectual discussions and debates.' },
    
    // Conscientiousness
    { id: 'ocean-11', text: 'I am organized and keep things in order.' },
    { id: 'ocean-12', text: 'I pay attention to details.' },
    { id: 'ocean-13', text: 'I follow through on my commitments and obligations.' },
    { id: 'ocean-14', text: 'I work hard to accomplish my goals.' },
    { id: 'ocean-15', text: 'I think carefully before making decisions.' },
    { id: 'ocean-16', text: 'I prefer to have a schedule and stick to it.' },
    { id: 'ocean-17', text: 'I complete tasks thoroughly and reliably.' },
    { id: 'ocean-18', text: 'I keep my belongings neat and clean.' },
    { id: 'ocean-19', text: 'I am self-disciplined and can resist temptations.' },
    { id: 'ocean-20', text: 'I plan ahead rather than acting spontaneously.' },
    
    // Extraversion
    { id: 'ocean-21', text: 'I enjoy being the center of attention.' },
    { id: 'ocean-22', text: 'I feel energized after spending time with others.' },
    { id: 'ocean-23', text: 'I start conversations with people I don\'t know.' },
    { id: 'ocean-24', text: 'I have many friends and acquaintances.' },
    { id: 'ocean-25', text: 'I am talkative in social situations.' },
    { id: 'ocean-26', text: 'I prefer group activities over solitary ones.' },
    { id: 'ocean-27', text: 'I express my opinions and feelings openly.' },
    { id: 'ocean-28', text: 'I am enthusiastic and energetic.' },
    { id: 'ocean-29', text: 'I enjoy attending social events and parties.' },
    { id: 'ocean-30', text: 'I find it easy to approach and talk to strangers.' },
    
    // Agreeableness
    { id: 'ocean-31', text: 'I am concerned about others\' well-being.' },
    { id: 'ocean-32', text: 'I avoid conflicts and disagreements.' },
    { id: 'ocean-33', text: 'I forgive others easily.' },
    { id: 'ocean-34', text: 'I enjoy helping and supporting others.' },
    { id: 'ocean-35', text: 'I try to see the best in people.' },
    { id: 'ocean-36', text: 'I am considerate and kind to almost everyone.' },
    { id: 'ocean-37', text: 'I cooperate well with others.' },
    { id: 'ocean-38', text: 'I value harmony in my relationships.' },
    { id: 'ocean-39', text: 'I am empathetic to others\' feelings.' },
    { id: 'ocean-40', text: 'I am willing to compromise to maintain relationships.' },
    
    // Neuroticism (Emotional Stability)
    { id: 'ocean-41', text: 'I worry about things often.' },
    { id: 'ocean-42', text: 'I get stressed easily.' },
    { id: 'ocean-43', text: 'I experience mood swings frequently.' },
    { id: 'ocean-44', text: 'I get upset easily.' },
    { id: 'ocean-45', text: 'I feel anxious in new or uncertain situations.' },
    { id: 'ocean-46', text: 'I dwell on mistakes I\'ve made.' },
    { id: 'ocean-47', text: 'I feel overwhelmed by my responsibilities.' },
    { id: 'ocean-48', text: 'I take criticism personally.' },
    { id: 'ocean-49', text: 'I feel insecure about myself or my abilities.' },
    { id: 'ocean-50', text: 'I experience negative emotions intensely.' },
  ]
};

const TakeAssessment = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get questions for the specified assessment type
  const questions = assessmentId ? assessmentQuestions[assessmentId as keyof typeof assessmentQuestions] || [] : [];
  
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  
  // Get the questions for the current page
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage, 
    Math.min((currentPage + 1) * questionsPerPage, questions.length)
  );
  
  // Calculate progress
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);
  
  // Handle answer selection
  const handleAnswerSelected = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Navigate to next page
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } else {
      // All questions completed, show completion screen or redirect
      handleComplete();
    }
  };
  
  // Navigate to previous page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Check if current page questions are all answered
  const areCurrentQuestionsAnswered = () => {
    return currentQuestions.every(q => answers[q.id] !== undefined);
  };
  
  // Handle assessment completion
  const handleComplete = () => {
    // Check if all questions are answered
    const unansweredCount = questions.filter(q => answers[q.id] === undefined).length;
    
    if (unansweredCount > 0) {
      toast({
        title: "Incomplete Assessment",
        description: `You still have ${unansweredCount} unanswered questions. Please review your answers.`,
        variant: "destructive",
      });
      return;
    }
    
    // Calculate results based on assessment type
    calculateResults();
    
    // Navigate to results page
    navigate(`/assessment/results/${assessmentId}`, { state: { answers } });
  };
  
  // Calculate assessment results
  const calculateResults = () => {
    // Implement assessment-specific scoring logic
    if (assessmentId === 'ocean-trait') {
      // Calculate OCEAN trait scores
      const traitScores = {
        Openness: calculateTraitScore(answers, 1, 10),
        Conscientiousness: calculateTraitScore(answers, 11, 20),
        Extraversion: calculateTraitScore(answers, 21, 30),
        Agreeableness: calculateTraitScore(answers, 31, 40),
        Neuroticism: calculateTraitScore(answers, 41, 50)
      };
      
      console.log("OCEAN Scores:", traitScores);
    }
    
    // For other assessment types
    if (assessmentId === 'role-based') {
      const pmScores = {
        Strategy: calculatePMScore(answers, ['pm-1', 'pm-3', 'pm-4', 'pm-5', 'pm-9']),
        Execution: calculatePMScore(answers, ['pm-2', 'pm-7', 'pm-10', 'pm-11', 'pm-15']),
        Technical: calculatePMScore(answers, ['pm-6', 'pm-8', 'pm-13', 'pm-15']),
        Leadership: calculatePMScore(answers, ['pm-5', 'pm-10', 'pm-12', 'pm-14'])
      };
      
      console.log("PM Scores:", pmScores);
    }
  };
  
  // Helper function to calculate trait scores for OCEAN assessment
  const calculateTraitScore = (answers: Record<string, number>, startId: number, endId: number) => {
    let sum = 0;
    let count = 0;
    
    for (let i = startId; i <= endId; i++) {
      const questionId = `ocean-${i}`;
      if (answers[questionId] !== undefined) {
        sum += answers[questionId];
        count++;
      }
    }
    
    return count > 0 ? Math.round((sum / count) * 20) : 0; // Scale to 0-100
  };
  
  // Helper function to calculate PM scores
  const calculatePMScore = (answers: Record<string, number>, questionIds: string[]) => {
    let sum = 0;
    let count = 0;
    
    for (const id of questionIds) {
      if (answers[id] !== undefined) {
        sum += answers[id];
        count++;
      }
    }
    
    return count > 0 ? Math.round((sum / count) * 20) : 0; // Scale to 0-100
  };
  
  return (
    <div className="container mx-auto px-4 pt-8 pb-20 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {assessmentId === 'role-based' && 'Product Principles Assessment'}
          {assessmentId === 'technical' && 'Technical Skills Assessment'}
          {assessmentId === 'leadership' && 'Leadership & Soft Skills Assessment'}
          {assessmentId === 'competency' && 'Competency Evaluation'}
          {assessmentId === 'design' && 'Design Language & Principles Assessment'}
          {assessmentId === 'ocean-trait' && 'OCEAN Personality Trait Assessment'}
        </h1>
        <p className="text-muted-foreground">
          Page {currentPage + 1} of {totalPages}
        </p>
      </div>
      
      <AssessmentProgress progress={progress} />
      
      <div className="my-8">
        <MultiQuestionDisplay 
          questions={currentQuestions}
          currentAnswers={answers}
          onAnswerSelected={handleAnswerSelected}
        />
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        
        <Button 
          onClick={handleNextPage}
          disabled={!areCurrentQuestionsAnswered()}
        >
          {currentPage < totalPages - 1 ? (
            <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
          ) : (
            'Complete Assessment'
          )}
        </Button>
      </div>
      
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Use keyboard shortcuts (1-5) to quickly answer questions.
      </div>
    </div>
  );
};

export default TakeAssessment;
