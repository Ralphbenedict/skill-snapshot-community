
import React from 'react';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, CheckCircle2, Target, Zap, Calendar } from 'lucide-react';

export type CandidateProps = {
  id: string;
  name: string;
  role: string;
  matchPercentage: number;
  appliedDate: string;
  status: 'Applied' | 'Assessment Completed' | 'In Review' | 'Interview' | 'Offer';
  skills: {
    name: string;
    level: number;
  }[];
  assessmentScore?: number;
};

const CandidateCard = ({ 
  name, 
  role, 
  matchPercentage, 
  appliedDate, 
  status, 
  skills,
  assessmentScore 
}: CandidateProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Assessment Completed':
        return 'bg-green-100 text-green-800';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview':
        return 'bg-purple-100 text-purple-800';
      case 'Offer':
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{name}</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">{role}</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={`${matchPercentage >= 85 ? 'bg-green-100 text-green-800 border-green-200' : 
                          matchPercentage >= 70 ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                          'bg-yellow-100 text-yellow-800 border-yellow-200'} 
                         font-medium`}
          >
            {matchPercentage}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Applied {appliedDate}</span>
          <div className="mx-2 w-1 h-1 bg-muted-foreground rounded-full"></div>
          <Badge variant="secondary" className={`text-xs font-normal ${getStatusColor()}`}>
            {status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {skills.slice(0, 4).map((skill, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium truncate">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}/100</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {assessmentScore !== undefined && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 mb-2">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm font-medium">Assessment Score</span>
            </div>
            <span className={`font-medium ${
              assessmentScore >= 85 ? 'text-green-600' : 
              assessmentScore >= 70 ? 'text-primary' : 
              'text-yellow-600'
            }`}>
              {assessmentScore}/100
            </span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="font-normal bg-secondary/50 hover:bg-secondary text-foreground">
            <Zap className="w-3 h-3 mr-1" />
            Quick Learner
          </Badge>
          <Badge variant="outline" className="font-normal bg-secondary/50 hover:bg-secondary text-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Team Player
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          View Profile
        </Button>
        <Button size="sm">
          Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
