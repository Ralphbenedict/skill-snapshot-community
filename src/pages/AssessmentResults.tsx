
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
  scaledMax: number; // Max score on the scaled range (76-100, 51-75, etc.)
  minScaledScore: number; // Min score on the scaled range (76-100, 51-75, etc.)
  maxScaledScore: number; // Max score on the scaled range
}

const traitDescriptions: TraitDescription[] = [
  {
    trait: "Openness",
    high: "High openness indicates creativity, curiosity, and preference for variety and intellectual stimulation.",
    low: "Low openness suggests preference for routine, traditional values, and practicality.",
    color: "#4299E1", // blue
    maxScore: 50,
    scaledMax: 100,
    minScaledScore: 76,
    maxScaledScore: 100
  },
  {
    trait: "Conscientiousness",
    high: "High conscientiousness indicates organization, reliability, self-discipline, and goal-oriented behavior.",
    low: "Low conscientiousness suggests spontaneity, flexibility, and a more relaxed attitude toward goals and standards.",
    color: "#48BB78", // green
    maxScore: 50,
    scaledMax: 75,
    minScaledScore: 51,
    maxScaledScore: 75
  },
  {
    trait: "Extraversion",
    high: "High extraversion indicates sociability, assertiveness, and a preference for social interaction.",
    low: "Low extraversion (introversion) suggests preference for solitude, quieter environments, and deeper one-on-one relationships.",
    color: "#ED8936", // orange
    maxScore: 50,
    scaledMax: 100,
    minScaledScore: 76,
    maxScaledScore: 100
  },
  {
    trait: "Agreeableness",
    high: "High agreeableness indicates compassion, cooperation, and interest in maintaining harmony with others.",
    low: "Low agreeableness suggests a focus on self-interest, skepticism about others' motives, and competitiveness.",
    color: "#9F7AEA", // purple
    maxScore: 50,
    scaledMax: 100,
    minScaledScore: 76,
    maxScaledScore: 100
  },
  {
    trait: "Neuroticism",
    high: "High neuroticism indicates tendency toward negative emotions, sensitivity to stress, and emotional reactivity.",
    low: "Low neuroticism (emotional stability) suggests calmness, resilience to stress, and emotional balance.",
    color: "#F56565", // red
    maxScore: 50,
    scaledMax: 75,
    minScaledScore: 51,
    maxScaledScore: 75
  }
];

// Trait combinations with their score ranges
const traitCombinations = [
  {
    traits: ["Openness", "Extraversion"],
    minScaledScore: 150,
    maxScaledScore: 200,
    description: "Combining high Openness and Extraversion indicates a dynamic personality that thrives on both social interaction and intellectual exploration. You likely enjoy sharing new ideas and experiences with others."
  },
  {
    traits: ["Conscientiousness", "Neuroticism"],
    minScaledScore: 100,
    maxScaledScore: 150,
    description: "This combination of Conscientiousness and Neuroticism suggests you are detail-oriented and may experience emotional intensity when striving for perfection or when plans don't go as expected."
  },
  {
    traits: ["Agreeableness", "Conscientiousness"],
    minScaledScore: 150,
    maxScaledScore: 200,
    description: "High scores in both Agreeableness and Conscientiousness indicate you likely excel in team environments, combining reliability with a cooperative nature that makes you valuable in collaborative settings."
  }
];

// Global analysis score range
const globalAnalysis = {
  minScaledScore: 400,
  maxScaledScore: 500,
  description: "Your overall personality profile shows pronounced traits across multiple dimensions, creating a unique and influential personality that shapes how you navigate life, make decisions, and interact with others."
};

// Calculate the equivalent score on the specific trait's scale
const calculateScaledScore = (percentageScore: number, traitInfo: TraitDescription): number => {
  // Map the 0-100 percentage scale to the trait's specific scale (e.g., 76-100, 51-75)
  const range = traitInfo.maxScaledScore - traitInfo.minScaledScore;
  const minScore = traitInfo.minScaledScore;
  
  // For high scores, map to the trait's scale
  if (percentageScore >= 75) {
    return Math.round(minScore + (range * (percentageScore - 75) / 25));
  }
  // For medium scores (50-75), map to 26-50 or 51-minScaledScore depending on the trait
  else if (percentageScore >= 50) {
    if (minScore === 76) { // For 76-100 traits
      return Math.round(51 + ((75 - 51) * (percentageScore - 50) / 25));
    } else { // For 51-75 traits
      const mediumRange = minScore - 26;
      return Math.round(26 + (mediumRange * (percentageScore - 50) / 25));
    }
  }
  // For low scores, map to 0-25
  else {
    return Math.round(percentageScore);
  }
};

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
const getScoreCategory = (score: number, traitInfo: TraitDescription): string => {
  // Scale the percentage score to the trait's specific range
  const scaledScore = calculateScaledScore(score, traitInfo);
  
  // Use the scaled scores for categorization
  if (scaledScore >= traitInfo.minScaledScore) return 'high';
  // If the trait has a range of 51-75, then anything below 51 is considered low
  if (traitInfo.minScaledScore === 51 && scaledScore < 51) return 'low';
  // If the trait has a range of 76-100, then anything below 76 is considered low/moderate
  if (traitInfo.minScaledScore === 76 && scaledScore < 76) return 'low';
  
  return 'moderate';
};

// Function to get appropriate description based on score
const getTraitDescription = (trait: string, score: number): string => {
  const traitInfo = traitDescriptions.find(t => t.trait === trait);
  
  if (!traitInfo) return '';
  
  const category = getScoreCategory(score, traitInfo);
  
  if (category === 'high') {
    return traitInfo.high;
  } else if (category === 'low') {
    return traitInfo.low;
  } else {
    return `You have a balanced level of ${trait.toLowerCase()}. ${traitInfo.high.replace('High', 'Higher')} ${traitInfo.low.replace('Low', 'Lower')}`;
  }
};

// Function to get score range band text based on the trait's specific scale
const getScoreRangeBand = (score: number, traitInfo: TraitDescription): string => {
  const scaledScore = calculateScaledScore(score, traitInfo);
  
  if (traitInfo.minScaledScore === 76) {
    // For traits with 76-100 range
    if (scaledScore >= 76) return `Score ${traitInfo.minScaledScore}-${traitInfo.maxScaledScore}`;
    if (scaledScore >= 51) return 'Score 51-75';
    if (scaledScore >= 26) return 'Score 26-50';
    return 'Score 0-25';
  } else if (traitInfo.minScaledScore === 51) {
    // For traits with 51-75 range
    if (scaledScore >= 51) return `Score ${traitInfo.minScaledScore}-${traitInfo.maxScaledScore}`;
    if (scaledScore >= 26) return 'Score 26-50';
    return 'Score 0-25';
  }
  
  return `Score ${scaledScore}`;
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

  // Calculate the equivalent score on the specific trait's scale
  const calculateScaledScore = (percentageScore: number, traitInfo: TraitDescription): number => {
    // Map the 0-100 percentage scale to the trait's specific scale (e.g., 76-100, 51-75)
    const range = traitInfo.maxScaledScore - traitInfo.minScaledScore;
    const minScore = traitInfo.minScaledScore;
    
    // For high scores, map to the trait's scale
    if (percentageScore >= 75) {
      return Math.round(minScore + (range * (percentageScore - 75) / 25));
    }
    // For medium scores (50-75), map to 26-50 or 51-minScaledScore depending on the trait
    else if (percentageScore >= 50) {
      if (minScore === 76) { // For 76-100 traits
        return Math.round(51 + ((75 - 51) * (percentageScore - 50) / 25));
      } else { // For 51-75 traits
        const mediumRange = minScore - 26;
        return Math.round(26 + (mediumRange * (percentageScore - 50) / 25));
      }
    }
    // For low scores, map to 0-25
    else {
      return Math.round(percentageScore);
    }
  };

  // Calculate combination scores
  const calculateCombinationScore = (traits: string[]): number => {
    let sum = 0;
    
    for (const trait of traits) {
      const traitInfo = traitDescriptions.find(t => t.trait === trait);
      if (traitInfo) {
        const percentageScore = scores[trait as keyof OceanScores];
        const scaledScore = calculateScaledScore(percentageScore, traitInfo);
        sum += scaledScore;
      }
    }
    
    return sum;
  };

  // Calculate global analysis score (sum of all scaled trait scores)
  const calculateGlobalScore = (): number => {
    let sum = 0;
    
    for (const traitInfo of traitDescriptions) {
      const percentageScore = scores[traitInfo.trait as keyof OceanScores];
      const scaledScore = calculateScaledScore(percentageScore, traitInfo);
      sum += scaledScore;
    }
    
    return sum;
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
  const chartData = Object.entries(scores).map(([trait, percentageScore]) => {
    const traitInfo = traitDescriptions.find(t => t.trait === trait);
    if (!traitInfo) return { trait, score: percentageScore, rawScore: 0, maxPossible: 50, fill: "#000000", scoreText: "" };
    
    const rawScore = rawScores[trait as keyof typeof rawScores];
    const maxPossible = traitInfo.maxScore;
    const scaledScore = calculateScaledScore(percentageScore, traitInfo);
    
    return {
      trait,
      score: percentageScore,
      rawScore,
      maxPossible,
      fill: traitInfo.color,
      scoreText: `${percentageScore}% (${rawScore}/${maxPossible} ≈ ${scaledScore}/${traitInfo.minScaledScore}-${traitInfo.maxScaledScore})`
    };
  });

  // Calculate combination scores
  const combinationScores = traitCombinations.map(combo => {
    const combinedScore = calculateCombinationScore(combo.traits);
    return {
      ...combo,
      score: combinedScore,
      inRange: combinedScore >= combo.minScaledScore && combinedScore <= combo.maxScaledScore
    };
  });

  // Calculate global score
  const globalScore = calculateGlobalScore();
  const globalScoreInRange = globalScore >= globalAnalysis.minScaledScore && globalScore <= globalAnalysis.maxScaledScore;

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
                  margin={{ top: 20, right: 220, left: 120, bottom: 30 }}
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
            const percentageScore = scores[trait.trait as keyof OceanScores];
            const rawScore = rawScores[trait.trait as keyof typeof rawScores];
            const description = getTraitDescription(trait.trait, percentageScore);
            const category = getScoreCategory(percentageScore, trait);
            const scoreRangeBand = getScoreRangeBand(percentageScore, trait);
            const scaledScore = calculateScaledScore(percentageScore, trait);
            
            return (
              <Card key={trait.trait} className="w-full">
                <CardHeader
                  className="pb-2"
                  style={{ borderBottom: `4px solid ${trait.color}` }}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{trait.trait}</CardTitle>
                      <div className="text-2xl font-bold">
                        {scaledScore}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-medium text-muted-foreground">Where you stand</div>
                      <div className="text-sm font-medium">
                        {scoreRangeBand}
                      </div>
                    </div>
                    <div className="text-sm mt-1">
                      Raw score: {rawScore}/{trait.maxScore} ≈ {scaledScore} on standard scale
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

        {/* Trait Combinations Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trait Combinations</CardTitle>
            <CardDescription>
              How your personality traits interact with each other can reveal deeper insights into your behavior patterns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {combinationScores.map((combo, index) => (
                <div key={index} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                  <h3 className="text-lg font-semibold mb-2">
                    {combo.traits.join(" & ")}
                  </h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className={`text-lg font-medium ${combo.inRange ? 'text-green-600' : 'text-gray-600'}`}>
                      {combo.score} / {combo.minScaledScore}-{combo.maxScaledScore}
                    </span>
                  </div>
                  <p>{combo.description}</p>
                </div>
              ))}
              
              {/* Global Analysis */}
              <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800 md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">
                  Global Analysis
                </h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">Overall Score</span>
                  <span className={`text-lg font-medium ${globalScoreInRange ? 'text-green-600' : 'text-gray-600'}`}>
                    {globalScore} / {globalAnalysis.minScaledScore}-{globalAnalysis.maxScaledScore}
                  </span>
                </div>
                <p>{globalAnalysis.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The OCEAN personality assessment measures five key personality traits. Your scores are mapped to specialized ranges that provide deeper insights:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Openness:</strong> Typically scored on a 76-100 scale for high scores</li>
              <li><strong>Conscientiousness:</strong> Typically scored on a 51-75 scale for high scores</li>
              <li><strong>Extraversion:</strong> Typically scored on a 76-100 scale for high scores</li>
              <li><strong>Agreeableness:</strong> Typically scored on a 76-100 scale for high scores</li>
              <li><strong>Neuroticism:</strong> Typically scored on a 51-75 scale for high scores</li>
            </ul>
            <p className="mt-4">
              We've also analyzed combinations of traits, which can reveal more complex aspects of your personality:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Openness & Extraversion:</strong> Scored on a 150-200 scale</li>
              <li><strong>Conscientiousness & Neuroticism:</strong> Scored on a 100-150 scale</li>
              <li><strong>Agreeableness & Conscientiousness:</strong> Scored on a 150-200 scale</li>
              <li><strong>Global Analysis:</strong> Scored on a 400-500 scale, representing your overall personality profile</li>
            </ul>
            <p className="mt-4">
              Your raw scores (what you answered on our assessment) have been mathematically scaled to match the specialized scoring system used by professional personality assessments that typically use 300+ data points.
            </p>
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
