
import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
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
}

const traitDescriptions: TraitDescription[] = [
  {
    trait: "Openness",
    high: "High openness indicates creativity, curiosity, and preference for variety and intellectual stimulation.",
    low: "Low openness suggests preference for routine, traditional values, and practicality.",
    color: "#4299E1" // blue
  },
  {
    trait: "Conscientiousness",
    high: "High conscientiousness indicates organization, reliability, self-discipline, and goal-oriented behavior.",
    low: "Low conscientiousness suggests spontaneity, flexibility, and a more relaxed attitude toward goals and standards.",
    color: "#48BB78" // green
  },
  {
    trait: "Extraversion",
    high: "High extraversion indicates sociability, assertiveness, and a preference for social interaction.",
    low: "Low extraversion (introversion) suggests preference for solitude, quieter environments, and deeper one-on-one relationships.",
    color: "#ED8936" // orange
  },
  {
    trait: "Agreeableness",
    high: "High agreeableness indicates compassion, cooperation, and interest in maintaining harmony with others.",
    low: "Low agreeableness suggests a focus on self-interest, skepticism about others' motives, and competitiveness.",
    color: "#9F7AEA" // purple
  },
  {
    trait: "Neuroticism",
    high: "High neuroticism indicates tendency toward negative emotions, sensitivity to stress, and emotional reactivity.",
    low: "Low neuroticism (emotional stability) suggests calmness, resilience to stress, and emotional balance.",
    color: "#F56565" // red
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

  // Helper function to calculate trait scores with scaled scoring
  const calculateTraitScore = (answers: Record<string, number>, startId: number, endId: number): number => {
    let sum = 0;
    let count = 0;
    
    for (let i = startId; i <= endId; i++) {
      const questionId = `ocean-${i}`;
      if (answers[questionId] !== undefined) {
        sum += answers[questionId];
        count++;
      }
    }
    
    // Apply the scaled scoring formula: (Sum / 10) * 20 to get a score in the range of 0-100
    return count > 0 ? Math.round((sum / count) * 20) : 0;
  };

  const scores = calculateScores();

  // Format scores for the chart
  const chartData = Object.entries(scores).map(([trait, score]) => ({
    trait,
    score,
    fill: traitDescriptions.find(t => t.trait === trait)?.color || "#000000"
  }));

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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
          <div className="h-80 w-full">
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
                <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 10, left: 40, bottom: 10 }}>
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="trait" type="category" />
                  <Bar dataKey="score" radius={[4, 4, 4, 4]} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {traitDescriptions.map((trait) => (
          <Card key={trait.trait}>
            <CardHeader
              className="pb-2"
              style={{ borderBottom: `4px solid ${trait.color}` }}
            >
              <CardTitle className="text-xl flex items-center justify-between">
                {trait.trait}
                <span className="text-2xl font-bold">
                  {scores[trait.trait as keyof OceanScores]}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-2">
                <span className="font-medium">If high:</span> {trait.high}
              </p>
              <p>
                <span className="font-medium">If low:</span> {trait.low}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssessmentResults;
