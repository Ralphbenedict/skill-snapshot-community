
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomBadge from "@/components/ui/custom-badge";
import { FileText, ListChecks, BarChart4, Clock, Award, Target, Palette, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

// Define assessment types
const assessmentTypes = [
  {
    id: 'role-based',
    title: 'Product Principles Assessment',
    description: 'Evaluate your product management capabilities',
    icon: <FileText className="h-5 w-5 text-primary" />,
    status: 'Recommended'
  },
  {
    id: 'technical',
    title: 'Technical Skills',
    description: 'Test your technical expertise and knowledge',
    icon: <ListChecks className="h-5 w-5 text-primary" />,
    status: 'Popular'
  },
  {
    id: 'leadership',
    title: 'Leadership & Soft Skills',
    description: 'Evaluate your leadership and interpersonal abilities',
    icon: <Award className="h-5 w-5 text-primary" />
  },
  {
    id: 'competency',
    title: 'Competency Evaluation',
    description: 'Measure overall job competency and performance',
    icon: <Target className="h-5 w-5 text-primary" />
  },
  {
    id: 'design',
    title: 'Design Language & Principles',
    description: 'Evaluate your design thinking and system knowledge',
    icon: <Palette className="h-5 w-5 text-primary" />,
    status: 'New'
  }
];

// Featured assessments content
const featuredAssessments = {
  'role-based': {
    title: "Product Principles Assessment",
    description: "Evaluate your product management capabilities",
    overview: "This comprehensive assessment evaluates your product management skills across multiple dimensions including strategy, execution, and leadership.",
    skills: [
      { name: "Strategy & Vision", value: 78, level: "Strong" },
      { name: "Execution & Delivery", value: 85, level: "Advanced" },
      { name: "Technical Understanding", value: 65, level: "Intermediate" },
      { name: "Stakeholder Management", value: 92, level: "Expert" }
    ],
    skillsList: [
      { name: "Product Strategy", description: "Vision setting, market analysis, and roadmap planning", icon: <BarChart4 className="h-4 w-4 text-primary" /> },
      { name: "User Research", description: "User interviews, usability testing, and requirements gathering", icon: <Target className="h-4 w-4 text-primary" /> },
      { name: "Execution", description: "Sprint planning, prioritization, and delivery management", icon: <Clock className="h-4 w-4 text-primary" /> },
      { name: "Leadership", description: "Cross-functional team collaboration and stakeholder management", icon: <Award className="h-4 w-4 text-primary" /> }
    ],
    details: [
      { name: "Assessment Format", description: "60-minute adaptive test with a combination of multiple-choice questions, scenario-based exercises, and short answer responses." },
      { name: "Scoring", description: "Scores are calculated based on accuracy, problem-solving approach, and speed. Results are compared to industry benchmarks." },
      { name: "Time Commitment", description: "Approximately 60-75 minutes to complete the full assessment." }
    ]
  },
  'technical': {
    title: "Frontend Development Assessment",
    description: "Evaluate your frontend coding and architecture skills",
    overview: "This technical assessment evaluates your ability to build responsive, accessible, and performant web applications using modern frameworks and tools.",
    skills: [
      { name: "JavaScript Proficiency", value: 82, level: "Advanced" },
      { name: "React Framework", value: 90, level: "Expert" },
      { name: "CSS & Layout", value: 75, level: "Strong" },
      { name: "Performance Optimization", value: 68, level: "Intermediate" }
    ],
    skillsList: [
      { name: "Code Architecture", description: "Component design, state management, and code organization", icon: <FileText className="h-4 w-4 text-primary" /> },
      { name: "Responsive Design", description: "Building layouts that work across devices and screen sizes", icon: <Palette className="h-4 w-4 text-primary" /> },
      { name: "Testing & QA", description: "Unit testing, integration testing, and debugging", icon: <ListChecks className="h-4 w-4 text-primary" /> },
      { name: "Development Process", description: "Version control, code review, and deployment workflows", icon: <Clock className="h-4 w-4 text-primary" /> }
    ],
    details: [
      { name: "Assessment Format", description: "90-minute coding exercise with real-world scenarios and problem-solving challenges." },
      { name: "Scoring", description: "Evaluation based on code quality, functionality, performance, and thoughtful implementation." },
      { name: "Time Commitment", description: "Approximately 90-100 minutes to complete the full assessment." }
    ]
  },
  'leadership': {
    title: "Leadership Competency Assessment",
    description: "Evaluate your leadership and management capabilities",
    overview: "This assessment evaluates your leadership skills, emotional intelligence, and ability to guide teams through challenges and opportunities.",
    skills: [
      { name: "Team Management", value: 88, level: "Advanced" },
      { name: "Communication", value: 92, level: "Expert" },
      { name: "Decision Making", value: 79, level: "Strong" },
      { name: "Conflict Resolution", value: 85, level: "Advanced" }
    ],
    skillsList: [
      { name: "People Development", description: "Coaching, mentoring, and growing team members", icon: <Award className="h-4 w-4 text-primary" /> },
      { name: "Strategic Thinking", description: "Long-term planning and vision setting", icon: <BarChart4 className="h-4 w-4 text-primary" /> },
      { name: "Change Management", description: "Leading teams through transformation and adaptation", icon: <Clock className="h-4 w-4 text-primary" /> },
      { name: "Emotional Intelligence", description: "Self-awareness and empathetic team leadership", icon: <Target className="h-4 w-4 text-primary" /> }
    ],
    details: [
      { name: "Assessment Format", description: "Scenario-based questions, self-reflection exercises, and leadership style analysis." },
      { name: "Scoring", description: "Evaluation based on leadership frameworks and established management principles." },
      { name: "Time Commitment", description: "Approximately 45-60 minutes to complete the full assessment." }
    ]
  },
  'competency': {
    title: "Professional Competency Assessment",
    description: "Evaluate your overall professional abilities",
    overview: "This comprehensive assessment evaluates your overall professional competencies across multiple dimensions relevant to your role and career stage.",
    skills: [
      { name: "Technical Knowledge", value: 75, level: "Strong" },
      { name: "Critical Thinking", value: 82, level: "Advanced" },
      { name: "Adaptability", value: 88, level: "Advanced" },
      { name: "Project Execution", value: 78, level: "Strong" }
    ],
    skillsList: [
      { name: "Problem Solving", description: "Analytical thinking and creative solution development", icon: <Target className="h-4 w-4 text-primary" /> },
      { name: "Professional Growth", description: "Learning agility and skill development", icon: <Award className="h-4 w-4 text-primary" /> },
      { name: "Work Management", description: "Organization, prioritization, and time management", icon: <Clock className="h-4 w-4 text-primary" /> },
      { name: "Collaboration", description: "Cross-functional teamwork and relationship building", icon: <ListChecks className="h-4 w-4 text-primary" /> }
    ],
    details: [
      { name: "Assessment Format", description: "Mixed format with multiple-choice, situational judgment, and open-ended questions." },
      { name: "Scoring", description: "Multi-dimensional scoring against industry benchmarks and role expectations." },
      { name: "Time Commitment", description: "Approximately 50-60 minutes to complete the full assessment." }
    ]
  },
  'design': {
    title: "Design Language & Principles Assessment",
    description: "Evaluate your design system knowledge and application",
    overview: "This assessment evaluates your understanding of design systems, visual language principles, and ability to create consistent user experiences.",
    skills: [
      { name: "Visual Design", value: 86, level: "Advanced" },
      { name: "Design Systems", value: 92, level: "Expert" },
      { name: "Accessibility", value: 78, level: "Strong" },
      { name: "User Experience", value: 89, level: "Advanced" }
    ],
    skillsList: [
      { name: "Typography & Hierarchy", description: "Font selection, readability, and information hierarchy", icon: <Palette className="h-4 w-4 text-primary" /> },
      { name: "Color Theory", description: "Color palettes, contrast, and emotional impact", icon: <Palette className="h-4 w-4 text-primary" /> },
      { name: "Component Design", description: "Reusable elements, patterns, and states", icon: <FileText className="h-4 w-4 text-primary" /> },
      { name: "Design-to-Development", description: "Collaboration with engineers and implementation considerations", icon: <ListChecks className="h-4 w-4 text-primary" /> }
    ],
    details: [
      { name: "Assessment Format", description: "Critique exercises, component building challenges, and design system knowledge tests." },
      { name: "Scoring", description: "Evaluation of design thinking, technical knowledge, and practical application skills." },
      { name: "Time Commitment", description: "Approximately 60-75 minutes to complete the full assessment." }
    ]
  }
};

const Assessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState('role-based');
  const navigate = useNavigate();

  const handleAssessmentClick = (id: string) => {
    setSelectedAssessment(id);
  };

  // Get the current featured assessment based on selection
  const currentAssessment = featuredAssessments[selectedAssessment as keyof typeof featuredAssessments];

  const handleStartAssessment = () => {
    // Open the assessment in a new tab
    window.open(`/assessment/take/${selectedAssessment}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid gap-8">
          {/* Page Header */}
          <div className="text-left mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Skill Assessment</h1>
            <p className="text-muted-foreground mt-2">Measure, track, and improve your professional skills over time</p>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Assessment Options */}
            <div className="space-y-6 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Options</CardTitle>
                  <CardDescription>Choose an assessment type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {assessmentTypes.map((assessment) => (
                      <AssessmentTypeCard 
                        key={assessment.id}
                        title={assessment.title}
                        description={assessment.description}
                        icon={assessment.icon}
                        status={assessment.status}
                        isSelected={selectedAssessment === assessment.id}
                        onClick={() => handleAssessmentClick(assessment.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Previous Results</CardTitle>
                  <CardDescription>Your assessment history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Product Management</p>
                        <p className="text-sm text-muted-foreground">Completed 3 weeks ago</p>
                      </div>
                      <CustomBadge>85/100</CustomBadge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">UX Design Fundamentals</p>
                        <p className="text-sm text-muted-foreground">Completed 2 months ago</p>
                      </div>
                      <CustomBadge>78/100</CustomBadge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center and Right Columns - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{currentAssessment.title}</CardTitle>
                  <CardDescription>{currentAssessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="skills">Skills Tested</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4 pt-4">
                      <p>{currentAssessment.overview}</p>
                      
                      <div className="space-y-3 pt-2">
                        {currentAssessment.skills.map((skill, index) => (
                          <div key={index} className="flex flex-col space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-sm text-muted-foreground">{skill.level}</span>
                            </div>
                            <Progress value={skill.value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="skills" className="pt-4">
                      <ul className="space-y-2">
                        {currentAssessment.skillsList.map((skill, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 bg-primary/10 p-1 rounded">
                              {skill.icon}
                            </div>
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="details" className="pt-4">
                      <div className="space-y-4">
                        {currentAssessment.details.map((detail, index) => (
                          <div key={index}>
                            <p className="font-medium">{detail.name}</p>
                            <p className="text-sm text-muted-foreground">{detail.description}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleStartAssessment}>
                    Start Assessment
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Skills Passport</CardTitle>
                  <CardDescription>Track your professional development over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 hover-lift">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Product Design</h3>
                          <p className="text-sm text-muted-foreground">Advanced Level</p>
                        </div>
                        <CustomBadge variant="secondary">84/100</CustomBadge>
                      </div>
                      <Progress value={84} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Last updated 2 weeks ago</p>
                    </div>

                    <div className="border rounded-lg p-4 hover-lift">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Data Analysis</h3>
                          <p className="text-sm text-muted-foreground">Intermediate Level</p>
                        </div>
                        <CustomBadge variant="secondary">72/100</CustomBadge>
                      </div>
                      <Progress value={72} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Last updated 1 month ago</p>
                    </div>

                    <div className="border rounded-lg p-4 hover-lift">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Team Leadership</h3>
                          <p className="text-sm text-muted-foreground">Expert Level</p>
                        </div>
                        <CustomBadge variant="secondary">91/100</CustomBadge>
                      </div>
                      <Progress value={91} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Last updated 2 months ago</p>
                    </div>

                    <div className="border rounded-lg p-4 hover-lift">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Technical Knowledge</h3>
                          <p className="text-sm text-muted-foreground">Intermediate Level</p>
                        </div>
                        <CustomBadge variant="secondary">68/100</CustomBadge>
                      </div>
                      <Progress value={68} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Last updated 3 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Complete Skills Profile</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Assessment Type Card Component
const AssessmentTypeCard = ({ 
  title, 
  description, 
  icon, 
  status,
  isSelected,
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  status?: string;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div 
      className={`flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 hover-lift cursor-pointer ${isSelected ? 'border-primary bg-accent/50' : ''}`}
      onClick={onClick}
    >
      <div className="bg-primary/10 p-2 rounded-md">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          {status && (
            <CustomBadge className="text-xs" variant="secondary">{status}</CustomBadge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default Assessment;
