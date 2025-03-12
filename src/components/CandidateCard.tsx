
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
import { 
  Clock, 
  User, 
  CheckCircle2, 
  Target, 
  Zap, 
  Calendar, 
  Briefcase,
  FileText,
  AtSign,
  Github,
  Linkedin,
  ExternalLink
} from 'lucide-react';

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
  currentRole?: string;
  recommendedLevel?: 'Below Current' | 'At Level' | 'Above Current';
  resumeUrl?: string;
  contacts?: {
    email?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
};

const CandidateCard = ({ 
  name, 
  role, 
  matchPercentage, 
  appliedDate, 
  status, 
  skills,
  assessmentScore,
  currentRole,
  recommendedLevel,
  resumeUrl,
  contacts 
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

  const getLevelColor = () => {
    switch (recommendedLevel) {
      case 'Above Current':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'At Level':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Below Current':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-secondary text-secondary-foreground';
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
        
        {currentRole && (
          <div className="mb-4 flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm">Current: {currentRole}</span>
            </div>
            {recommendedLevel && (
              <Badge className={`${getLevelColor()} text-xs`}>
                {recommendedLevel}
              </Badge>
            )}
          </div>
        )}
        
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
        
        {contacts && (
          <div className="flex flex-wrap gap-2 mt-4">
            {contacts.email && (
              <Button variant="outline" size="sm" className="h-8 px-2" asChild>
                <a href={`mailto:${contacts.email}`} target="_blank" rel="noopener noreferrer">
                  <AtSign className="w-3.5 h-3.5 mr-1" />
                  Email
                </a>
              </Button>
            )}
            {contacts.github && (
              <Button variant="outline" size="sm" className="h-8 px-2" asChild>
                <a href={contacts.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3.5 h-3.5 mr-1" />
                  GitHub
                </a>
              </Button>
            )}
            {contacts.linkedin && (
              <Button variant="outline" size="sm" className="h-8 px-2" asChild>
                <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-3.5 h-3.5 mr-1" />
                  LinkedIn
                </a>
              </Button>
            )}
            {contacts.portfolio && (
              <Button variant="outline" size="sm" className="h-8 px-2" asChild>
                <a href={contacts.portfolio} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Portfolio
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        {resumeUrl ? (
          <Button variant="outline" size="sm" asChild>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" />
              View Resume
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            View Profile
          </Button>
        )}
        <Button size="sm">
          Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
