
import React from 'react';
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import CustomBadge from "@/components/ui/custom-badge";
import { 
  LineChart, 
  BarChart, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Target, 
  Award, 
  TrendingUp,
  ChevronRight,
  BarChart4
} from 'lucide-react';

const Dashboard = () => {
  const skills = [
    { name: "Design Thinking", level: 85, growth: 12 },
    { name: "Technical Fluency", level: 72, growth: 8 },
    { name: "Stakeholder Management", level: 91, growth: 5 },
    { name: "Analytics Understanding", level: 78, growth: 15 },
    { name: "Communication", level: 88, growth: 7 },
  ];

  const recentActivity = [
    { type: "Assessment", title: "Completed Product Strategy Assessment", time: "2 days ago" },
    { type: "Skill Growth", title: "Analytics Understanding increased by 5 points", time: "1 week ago" },
    { type: "Project", title: "Completed Feature Launch project", time: "2 weeks ago" },
    { type: "Certification", title: "Earned Agile Methodology Certificate", time: "1 month ago" },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Header />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Track your professional growth and skill development
              </p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full border-dashed border-2"
            >
              <Calendar className="mr-2 h-4 w-4" />
              May 15, 2023
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Skills Score</CardTitle>
                <CardDescription>Average across all skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        className="text-secondary" 
                        strokeWidth="8" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="42" 
                        cx="50" 
                        cy="50" 
                      />
                      <circle 
                        className="text-primary" 
                        strokeWidth="8" 
                        strokeDasharray={264}
                        strokeDashoffset={264 - (264 * 82) / 100} 
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="42" 
                        cx="50" 
                        cy="50" 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">82</span>
                      <span className="text-xs text-muted-foreground">out of 100</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4 text-sm font-medium text-accent-foreground">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                    <span className="text-green-600">+7 points</span>
                    <span className="ml-2 text-muted-foreground">since last quarter</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Assessments</CardTitle>
                <CardDescription>Completed and upcoming</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-4">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">Product Management Fundamentals</h4>
                        <CustomBadge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          94/100
                        </CustomBadge>
                      </div>
                      <p className="text-sm text-muted-foreground">Completed on May 1, 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Advanced Product Strategy</h4>
                      <p className="text-sm text-muted-foreground">Scheduled for May 25, 2023</p>
                      <div className="mt-1">
                        <Button size="sm" variant="outline" className="h-7 text-xs rounded-full px-3">
                          Prepare
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Milestones</CardTitle>
                <CardDescription>Growth achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-4">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Senior Product Manager</h4>
                      <div className="flex items-center mt-1">
                        <Progress value={85} className="h-1.5 w-24" />
                        <span className="ml-2 text-xs text-muted-foreground">85%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-4">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Product Lead</h4>
                      <div className="flex items-center mt-1">
                        <Progress value={42} className="h-1.5 w-24" />
                        <span className="ml-2 text-xs text-muted-foreground">42%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="ghost" className="w-full justify-between text-primary">
                      View all milestones
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 hover-lift">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">Skill Development</CardTitle>
                    <CardDescription>Track your progress across key areas</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <BarChart4 className="h-4 w-4 mr-2" />
                    Detailed Analysis
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skills.map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center text-sm">
                          <span>{skill.level}/100</span>
                          <div className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +{skill.growth}
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                <CardDescription>Latest updates and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-4 w-px bg-border"></div>
                  
                  <div className="space-y-6">
                    {recentActivity.map((activity, i) => (
                      <div key={i} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          {activity.type === "Assessment" && <BarChart className="h-4 w-4 text-primary" />}
                          {activity.type === "Skill Growth" && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {activity.type === "Project" && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                          {activity.type === "Certification" && <Award className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Growth Trajectory</CardTitle>
                <CardDescription>Visualize your skill development over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-lg">
                  <div className="text-center p-6">
                    <LineChart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Growth chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Recommendations</CardTitle>
                <CardDescription>Personalized growth opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-secondary/10">
                    <h4 className="font-medium mb-1">Boost Technical Fluency</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Improving your technical understanding will help you collaborate more effectively with engineering teams.
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">
                      View Resources
                    </Button>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-secondary/10">
                    <h4 className="font-medium mb-1">Advanced Analytics Workshop</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      This workshop aligns with your growth in analytics understanding and will help reach the next level.
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
