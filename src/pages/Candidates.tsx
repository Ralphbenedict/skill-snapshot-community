
import React, { useState } from 'react';
import Header from "@/components/Header";
import CandidateCard, { CandidateProps } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ArrowUpDown, Users, RefreshCw, Briefcase, Target, BarChart } from 'lucide-react';

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('matchPercentage');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  
  const candidates: CandidateProps[] = [
    {
      id: '1',
      name: 'Alex Morgan',
      role: 'Senior Product Manager',
      matchPercentage: 94,
      appliedDate: 'May 10, 2023',
      status: 'Assessment Completed',
      assessmentScore: 89,
      currentRole: 'Product Manager',
      recommendedLevel: 'Above Current',
      resumeUrl: '#',
      contacts: {
        email: 'alex.morgan@example.com',
        github: '#',
        linkedin: '#',
        portfolio: '#',
      },
      skills: [
        { name: 'Product Strategy', level: 92 },
        { name: 'User Research', level: 88 },
        { name: 'Technical Fluency', level: 75 },
        { name: 'Analytics', level: 85 },
      ],
    },
    {
      id: '2',
      name: 'Jamie Chen',
      role: 'Product Manager',
      matchPercentage: 87,
      appliedDate: 'May 12, 2023',
      status: 'In Review',
      assessmentScore: 82,
      currentRole: 'Associate Product Manager',
      recommendedLevel: 'Above Current',
      resumeUrl: '#',
      contacts: {
        email: 'jamie.chen@example.com',
        github: '#',
        linkedin: '#',
      },
      skills: [
        { name: 'Product Strategy', level: 84 },
        { name: 'User Research', level: 90 },
        { name: 'Technical Fluency', level: 72 },
        { name: 'Analytics', level: 78 },
      ],
    },
    {
      id: '3',
      name: 'Taylor Wilson',
      role: 'Associate Product Manager',
      matchPercentage: 78,
      appliedDate: 'May 15, 2023',
      status: 'Applied',
      currentRole: 'Junior Product Manager',
      recommendedLevel: 'At Level',
      contacts: {
        email: 'taylor.wilson@example.com',
        linkedin: '#',
      },
      skills: [
        { name: 'Product Strategy', level: 70 },
        { name: 'User Research', level: 85 },
        { name: 'Technical Fluency', level: 68 },
        { name: 'Analytics', level: 75 },
      ],
    },
    {
      id: '4',
      name: 'Jordan Smith',
      role: 'Product Manager',
      matchPercentage: 91,
      appliedDate: 'May 8, 2023',
      status: 'Interview',
      assessmentScore: 86,
      currentRole: 'Associate Product Manager',
      recommendedLevel: 'Above Current',
      resumeUrl: '#',
      contacts: {
        email: 'jordan.smith@example.com',
        github: '#',
        linkedin: '#',
        portfolio: '#',
      },
      skills: [
        { name: 'Product Strategy', level: 88 },
        { name: 'User Research', level: 92 },
        { name: 'Technical Fluency', level: 78 },
        { name: 'Analytics', level: 89 },
      ],
    },
    {
      id: '5',
      name: 'Casey Johnson',
      role: 'Senior Product Manager',
      matchPercentage: 83,
      appliedDate: 'May 14, 2023',
      status: 'Assessment Completed',
      assessmentScore: 79,
      currentRole: 'Senior Product Manager',
      recommendedLevel: 'At Level',
      resumeUrl: '#',
      contacts: {
        email: 'casey.johnson@example.com',
        linkedin: '#',
      },
      skills: [
        { name: 'Product Strategy', level: 85 },
        { name: 'User Research', level: 79 },
        { name: 'Technical Fluency', level: 81 },
        { name: 'Analytics', level: 76 },
      ],
    },
    {
      id: '6',
      name: 'Riley Thompson',
      role: 'Technical Product Manager',
      matchPercentage: 89,
      appliedDate: 'May 11, 2023',
      status: 'Offer',
      assessmentScore: 92,
      currentRole: 'Product Manager',
      recommendedLevel: 'Above Current',
      resumeUrl: '#',
      contacts: {
        email: 'riley.thompson@example.com',
        github: '#',
        linkedin: '#',
        portfolio: '#',
      },
      skills: [
        { name: 'Product Strategy', level: 82 },
        { name: 'User Research', level: 78 },
        { name: 'Technical Fluency', level: 94 },
        { name: 'Analytics', level: 90 },
      ],
    },
  ];
  
  const filteredCandidates = candidates
    .filter(candidate => {
      // Filter by search query
      if (searchQuery) {
        return candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (candidate.currentRole && candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return true;
    })
    .filter(candidate => {
      // Filter by status
      if (filterStatus !== 'All') {
        return candidate.status === filterStatus;
      }
      return true;
    })
    .filter(candidate => {
      // Filter by recommended level
      if (filterLevel !== 'All') {
        return candidate.recommendedLevel === filterLevel;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'matchPercentage') {
        return b.matchPercentage - a.matchPercentage;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        return a.appliedDate.localeCompare(b.appliedDate);
      } else if (sortBy === 'assessmentScore') {
        const scoreA = a.assessmentScore || 0;
        const scoreB = b.assessmentScore || 0;
        return scoreB - scoreA;
      }
      return 0;
    });

  const pipelineStats = {
    applied: candidates.filter(c => c.status === 'Applied').length,
    assessmentCompleted: candidates.filter(c => c.status === 'Assessment Completed').length,
    inReview: candidates.filter(c => c.status === 'In Review').length,
    interview: candidates.filter(c => c.status === 'Interview').length,
    offer: candidates.filter(c => c.status === 'Offer').length,
  };

  const levelStats = {
    aboveCurrent: candidates.filter(c => c.recommendedLevel === 'Above Current').length,
    atLevel: candidates.filter(c => c.recommendedLevel === 'At Level').length,
    belowCurrent: candidates.filter(c => c.recommendedLevel === 'Below Current').length,
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Header />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Candidate Tracking</h1>
              <p className="text-muted-foreground mt-1">
                View and manage applicants in your hiring pipeline
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                New Candidates
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{candidates.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +3 this week
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pipeline Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">
                    {pipelineStats.interview + pipelineStats.offer}
                  </div>
                  <div className="ml-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                      <span>Interview: {pipelineStats.interview}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Offer: {pipelineStats.offer}</span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full mt-2 overflow-hidden flex">
                  <div className="h-full bg-yellow-400" style={{ width: `${(pipelineStats.applied / candidates.length) * 100}%` }}></div>
                  <div className="h-full bg-blue-400" style={{ width: `${(pipelineStats.assessmentCompleted / candidates.length) * 100}%` }}></div>
                  <div className="h-full bg-purple-400" style={{ width: `${(pipelineStats.inReview / candidates.length) * 100}%` }}></div>
                  <div className="h-full bg-blue-500" style={{ width: `${(pipelineStats.interview / candidates.length) * 100}%` }}></div>
                  <div className="h-full bg-green-500" style={{ width: `${(pipelineStats.offer / candidates.length) * 100}%` }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Level Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">{levelStats.aboveCurrent}</div>
                  <div className="ml-2 text-xs text-muted-foreground">
                    candidates ready for promotion
                  </div>
                </div>
                <div className="flex space-x-1 items-center mt-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(levelStats.aboveCurrent / candidates.length) * 100}%` }}></div>
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(levelStats.atLevel / candidates.length) * 100}%` }}></div>
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(levelStats.belowCurrent / candidates.length) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Above: {levelStats.aboveCurrent}</span>
                  <span>At Level: {levelStats.atLevel}</span>
                  <span>Below: {levelStats.belowCurrent}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Assessment Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">
                    {candidates.filter(c => c.assessmentScore !== undefined).length}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      / {candidates.length}
                    </span>
                  </div>
                  <div className="ml-2 text-xs text-muted-foreground">
                    completed
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(candidates.filter(c => c.assessmentScore !== undefined).length / candidates.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  83% completion rate
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="all">All Candidates</TabsTrigger>
                <TabsTrigger value="assessment">Assessment Completed</TabsTrigger>
                <TabsTrigger value="interview">Interview Stage</TabsTrigger>
                <TabsTrigger value="offer">Offer Extended</TabsTrigger>
                <TabsTrigger value="aboveLevel">Above Level</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search candidates..." 
                    className="pl-10 w-full sm:w-64 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[160px] h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Assessment Completed">Assessment Completed</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-[160px] h-9">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Levels</SelectItem>
                    <SelectItem value="Above Current">Above Current</SelectItem>
                    <SelectItem value="At Level">At Level</SelectItem>
                    <SelectItem value="Below Current">Below Current</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-9">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matchPercentage">Match Score</SelectItem>
                    <SelectItem value="assessmentScore">Assessment Score</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="date">Application Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} {...candidate} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="assessment" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates
                  .filter(candidate => candidate.status === 'Assessment Completed')
                  .map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="interview" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates
                  .filter(candidate => candidate.status === 'Interview')
                  .map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="offer" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates
                  .filter(candidate => candidate.status === 'Offer')
                  .map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="aboveLevel" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates
                  .filter(candidate => candidate.recommendedLevel === 'Above Current')
                  .map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Candidates;
