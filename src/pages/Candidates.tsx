
import React, { useState } from 'react';
import Header from "@/components/Header";
import CandidateCard, { CandidateProps } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ArrowUpDown, Users, RefreshCw } from 'lucide-react';

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('matchPercentage');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const candidates: CandidateProps[] = [
    {
      id: '1',
      name: 'Alex Morgan',
      role: 'Senior Product Manager',
      matchPercentage: 94,
      appliedDate: 'May 10, 2023',
      status: 'Assessment Completed',
      assessmentScore: 89,
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
               candidate.role.toLowerCase().includes(searchQuery.toLowerCase());
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
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'matchPercentage') {
        return b.matchPercentage - a.matchPercentage;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        // Simple sorting for demo purposes - in real app would use proper date comparison
        return a.appliedDate.localeCompare(b.appliedDate);
      }
      return 0;
    });

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
                <CardTitle className="text-sm font-medium">Assessment Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {candidates.filter(c => c.assessmentScore !== undefined).length}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    / {candidates.length}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  83% completion rate
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(candidates.reduce((sum, c) => sum + c.matchPercentage, 0) / candidates.length)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +2% from previous role
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Time to Hire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18 <span className="text-lg">days</span></div>
                <p className="text-xs text-muted-foreground mt-1">
                  -3 days from average
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
              </TabsList>
              
              <div className="flex items-center space-x-3">
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
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-9">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matchPercentage">Match Score</SelectItem>
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
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Candidates;
