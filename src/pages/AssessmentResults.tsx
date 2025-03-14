
import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
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
      label: `${score}% (${rawScore}/${maxPossible})`
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
    <div className="w-full px-4 py-8 max-w-full">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={handleBackToAssessments}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assessments
        </Button>
        
        <Card className="mb-8 w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Your OCEAN Personality Profile</CardTitle>
            <CardDescription>
              The Big Five personality traits represent the most widely accepted model of personality in psychology.
              Each trait exists on a spectrum and your score indicates where you fall on that spectrum.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <ChartContainer
                config={{
                  Openness: { color: "#4299E1" },
                  Conscientiousness: { color: "#48BB78" },
                  Extraversion: { color: "#ED8936" },
                  Agreeableness: { color: "#9F7AEA" },
                  Neuroticism: { color: "#F56565" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={chartData} 
                    layout="vertical" 
                    margin={{ top: 20, right: 120, left: 80, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]} 
                      tickCount={6} 
                      label={{ value: 'Score (%)', position: 'bottom', dy: 10 }}
                    />
                    <YAxis 
                      dataKey="trait" 
                      type="category" 
                      width={90}
                      tickMargin={10}
                    />
                    <Bar dataKey="score" radius={[4, 4, 4, 4]}>
                      <LabelList 
                        dataKey="label" 
                        position="right" 
                        style={{ fill: "#333", fontWeight: "bold" }} 
                      />
                    </Bar>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value, name, entry) => {
                            const item = entry.payload;
                            return [`${value}% (${item.rawScore}/${item.maxPossible})`, name];
                          }}
                        />
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {traitDescriptions.map((trait) => {
            const score = scores[trait.trait as keyof OceanScores];
            const rawScore = rawScores[trait.trait as keyof typeof rawScores];
            
            return (
              <Card key={trait.trait} className="w-full">
                <CardHeader
                  className="pb-2"
                  style={{ borderBottom: `4px solid ${trait.color}` }}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{trait.trait}</CardTitle>
                    <span className="text-2xl font-bold">
                      {score}% ({rawScore}/{trait.maxScore})
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-2 text-left">
                    <span className="font-medium">If high:</span> {trait.high}
                  </p>
                  <p className="text-left">
                    <span className="font-medium">If low:</span> {trait.low}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
