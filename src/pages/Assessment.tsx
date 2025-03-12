
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomBadge from "@/components/ui/custom-badge";
import { FileText, ListChecks, BarChart4, Clock, Award, Target } from 'lucide-react';
import Header from '@/components/Header';

const Assessment = () => {
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
                    <AssessmentTypeCard 
                      title="Role-Based Assessment"
                      description="Evaluate your skills for specific roles"
                      icon={<FileText className="h-5 w-5 text-primary" />}
                      status="Recommended"
                    />
                    
                    <AssessmentTypeCard 
                      title="Technical Skills"
                      description="Test your technical expertise and knowledge"
                      icon={<ListChecks className="h-5 w-5 text-primary" />}
                      status="Popular"
                    />
                    
                    <AssessmentTypeCard 
                      title="Leadership & Soft Skills"
                      description="Evaluate your leadership and interpersonal abilities"
                      icon={<Award className="h-5 w-5 text-primary" />}
                    />
                    
                    <AssessmentTypeCard 
                      title="Competency Evaluation"
                      description="Measure overall job competency and performance"
                      icon={<Target className="h-5 w-5 text-primary" />}
                    />
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
                  <CardTitle>Featured Assessment: Product Manager Skills</CardTitle>
                  <CardDescription>Evaluate your product management capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="skills">Skills Tested</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4 pt-4">
                      <p>This comprehensive assessment evaluates your product management skills across multiple dimensions including strategy, execution, and leadership.</p>
                      
                      <div className="space-y-3 pt-2">
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Strategy & Vision</span>
                            <span className="text-sm text-muted-foreground">Strong</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Execution & Delivery</span>
                            <span className="text-sm text-muted-foreground">Advanced</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Technical Understanding</span>
                            <span className="text-sm text-muted-foreground">Intermediate</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Stakeholder Management</span>
                            <span className="text-sm text-muted-foreground">Expert</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="skills" className="pt-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-primary/10 p-1 rounded">
                            <BarChart4 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Product Strategy</p>
                            <p className="text-sm text-muted-foreground">Vision setting, market analysis, and roadmap planning</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-primary/10 p-1 rounded">
                            <Target className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">User Research</p>
                            <p className="text-sm text-muted-foreground">User interviews, usability testing, and requirements gathering</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-primary/10 p-1 rounded">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Execution</p>
                            <p className="text-sm text-muted-foreground">Sprint planning, prioritization, and delivery management</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-primary/10 p-1 rounded">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Leadership</p>
                            <p className="text-sm text-muted-foreground">Cross-functional team collaboration and stakeholder management</p>
                          </div>
                        </li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="details" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Assessment Format</p>
                          <p className="text-sm text-muted-foreground">60-minute adaptive test with a combination of multiple-choice questions, scenario-based exercises, and short answer responses.</p>
                        </div>
                        <div>
                          <p className="font-medium">Scoring</p>
                          <p className="text-sm text-muted-foreground">Scores are calculated based on accuracy, problem-solving approach, and speed. Results are compared to industry benchmarks.</p>
                        </div>
                        <div>
                          <p className="font-medium">Time Commitment</p>
                          <p className="text-sm text-muted-foreground">Approximately 60-75 minutes to complete the full assessment.</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Assessment</Button>
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
  status 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  status?: string;
}) => {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 hover-lift cursor-pointer">
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
