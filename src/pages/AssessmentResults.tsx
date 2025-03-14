
import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell, Text } from 'recharts';
import { ArrowLeft } from 'lucide-react';

interface OceanScores {
  Openness: number;
  Conscientiousness: number;
  Extraversion: number;
  Agreeableness: number;
  Neuroticism: number;
}

interface TraitDescription {
  trait: string;
  high: string;
  low: string;
  color: string;
  maxScore: number;
}

const traitDescriptions: TraitDescription[] = [
  {
    trait: "Openness",
    high: "High openness indicates creativity, curiosity, and preference for variety and intellectual stimulation.",
    low: "Low openness suggests preference for routine, traditional values, and practicality.",
    color: "#4299E1", // blue
    maxScore: 50
  },
  {
    trait: "Conscientiousness",
    high: "High conscientiousness indicates organization, reliability, self-discipline, and goal-oriented behavior.",
    low: "Low conscientiousness suggests spontaneity, flexibility, and a more relaxed attitude toward goals and standards.",
    color: "#48BB78", // green
    maxScore: 50
  },
  {
    trait: "Extraversion",
    high: "High extraversion indicates sociability, assertiveness, and a preference for social interaction.",
    low: "Low extraversion (introversion) suggests preference for solitude, quieter environments, and deeper one-on-one relationships.",
    color: "#ED8936", // orange
    maxScore: 50
  },
  {
    trait: "Agreeableness",
    high: "High agreeableness indicates compassion, cooperation, and interest in maintaining harmony with others.",
    low: "Low agreeableness suggests a focus on self-interest, skepticism about others' motives, and competitiveness.",
    color: "#9F7AEA", // purple
    maxScore: 50
  },
  {
    trait: "Neuroticism",
    high: "High neuroticism indicates tendency toward negative emotions, sensitivity to stress, and emotional reactivity.",
    low: "Low neuroticism (emotional stability) suggests calmness, resilience to stress, and emotional balance.",
    color: "#F56565", // red
    maxScore: 50
  }
];

// Custom label component for the bar chart
const CustomBarLabel = (props: any) => {
  const { x, y, width, value, scoreText } = props;
  
  return (
    <Text
      x={x + width + 5}
      y={y + 19}
      fill="#333"
      textAnchor="start"
      fontWeight="bold"
      fontSize={14}
    >
      {scoreText}
    </Text>
  );
};

// Function to determine which description to show based on score
const getScoreCategory = (score: number): string => {
  if (score >= 75) return 'high';
  if (score <= 25) return 'low';
  return 'moderate';
};

// Function to get appropriate description based on score
const getTraitDescription = (trait: string, score: number): string => {
  const traitInfo = traitDescriptions.find(t => t.trait === trait);
  const category = getScoreCategory(score);
  
  if (!traitInfo) return '';
  
  if (category === 'high') {
    return traitInfo.high;
  } else if (category === 'low') {
    return traitInfo.low;
  } else {
    return `You have a balanced level of ${trait.toLowerCase()}. ${traitInfo.high.replace('High', 'Higher')} ${traitInfo.low.replace('Low', 'Lower')}`;
  }
};

const AssessmentResults = () => {
  const { assessmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  // Calculate OCEAN trait scores
  const calculateScores = (): OceanScores => {
    if (assessmentId !== 'ocean-trait') {
      return { Openness: 0, Conscientiousness: 0, Extraversion: 0, Agreeableness: 0, Neuroticism: 0 };
    }

    // Apply the scaled scoring formula for each trait
    return {
      Openness: calculateTraitScore(answers, 1, 10),
      Conscientiousness: calculateTraitScore(answers, 11, 20),
      Extraversion: calculateTraitScore(answers, 21, 30),
      Agreeableness: calculateTraitScore(answers, 31, 40),
      Neuroticism: calculateTraitScore(answers, 41, 50)
    };
  };

  // Helper function to calculate raw trait scores
  const calculateRawTraitScore = (answers: Record<string, number>, startId: number, endId: number): number => {
    let sum = 0;
    let count = 0;
    
    for (let i = startId; i <= endId; i++) {
      const questionId = `ocean-${i}`;
      if (answers[questionId] !== undefined) {
        sum += answers[questionId];
        count++;
      }
    }
    
    return count > 0 ? sum : 0;
  };

  // Helper function to calculate trait scores with scaled scoring
  const calculateTraitScore = (answers: Record<string, number>, startId: number, endId: number): number => {
    const rawScore = calculateRawTraitScore(answers, startId, endId);
    const maxPossibleScore = (endId - startId + 1) * 5; // Each question can have max score of 5
    
    // Apply the scaled scoring formula: (Sum / MaxPossible) * 100 to get a percentage
    return maxPossibleScore > 0 ? Math.round((rawScore / maxPossibleScore) * 100) : 0;
  };

  const scores = calculateScores();

  // Get raw scores for each trait
  const rawScores = {
    Openness: calculateRawTraitScore(answers, 1, 10),
    Conscientiousness: calculateRawTraitScore(answers, 11, 20),
    Extraversion: calculateRawTraitScore(answers, 21, 30),
    Agreeableness: calculateRawTraitScore(answers, 31, 40),
    Neuroticism: calculateRawTraitScore(answers, 41, 50)
  };

  // Format scores for the chart
  const chartData = Object.entries(scores).map(([trait, score]) => {
    const traitInfo = traitDescriptions.find(t => t.trait === trait);
    const rawScore = rawScores[trait as keyof typeof rawScores];
    const maxPossible = traitInfo?.maxScore || 50;
    
    return {
      trait,
      score,
      rawScore,
      maxPossible,
      fill: traitInfo?.color || "#000000",
      scoreText: `${score}% (${rawScore}/${maxPossible})`
    };
  });

  const handleBackToAssessments = () => {
    navigate('/assessment');
  };

  if (assessmentId !== 'ocean-trait') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription>This assessment type does not have a results page yet.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleBackToAssessments}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assessments
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={handleBackToAssessments}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assessments
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your OCEAN Personality Profile</CardTitle>
            <CardDescription>
              The Big Five personality traits represent the most widely accepted model of personality in psychology.
              Each trait exists on a spectrum and your score indicates where you fall on that spectrum.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  layout="vertical" 
                  margin={{ top: 20, right: 180, left: 120, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    domain={[0, 100]} 
                    tickCount={6} 
                    label={{ value: 'Score (%)', position: 'bottom', offset: 15 }}
                  />
                  <YAxis 
                    dataKey="trait" 
                    type="category"
                    width={120} 
                    tick={{ fontSize: 14, fontWeight: 'bold' }}
                    tickMargin={10}
                  />
                  <Bar 
                    dataKey="score" 
                    barSize={40}
                    radius={[4, 4, 4, 4]}
                    label={(props) => <CustomBarLabel {...props} scoreText={props.scoreText} />}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {traitDescriptions.map((trait) => {
            const score = scores[trait.trait as keyof OceanScores];
            const rawScore = rawScores[trait.trait as keyof typeof rawScores];
            const description = getTraitDescription(trait.trait, score);
            const category = getScoreCategory(score);
            
            return (
              <Card key={trait.trait} className="w-full">
                <CardHeader
                  className="pb-2"
                  style={{ borderBottom: `4px solid ${trait.color}` }}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{trait.trait}</CardTitle>
                    <div className="text-2xl font-bold">
                      {score}% <span className="text-lg font-medium">({rawScore}/{trait.maxScore})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <p className="text-lg font-medium mb-1">
                      {category === 'high' 
                        ? 'You score high in this trait' 
                        : category === 'low' 
                          ? 'You score low in this trait' 
                          : 'You have a balanced score in this trait'}
                    </p>
                    <p>{description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The OCEAN personality assessment measures five key personality traits. Your scores reflect where you fall on the spectrum for each trait:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>75-100%:</strong> You have a high level of this trait</li>
              <li><strong>26-74%:</strong> You have a moderate or balanced level of this trait</li>
              <li><strong>0-25%:</strong> You have a low level of this trait</li>
            </ul>
            <p className="mt-4">
              Remember that there are no "good" or "bad" scores. Each trait combination creates a unique personality profile with its own strengths and challenges.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentResults;
