
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, LineChart, Users, Award } from 'lucide-react';
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="pt-32 pb-20 px-6 reveal-on-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              The Future of Professional Growth
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Redefining <span className="text-primary">professional</span> development
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              A comprehensive platform that tracks skills, measures growth, and connects talent with opportunity through verified performance data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 font-medium transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg group"
              >
                Get Started
                <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 font-medium border-2 hover:bg-secondary/80 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <LineChart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Skill Analytics</h4>
                  <p className="text-sm text-muted-foreground">Real-time growth tracking</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Talent Matching</h4>
                  <p className="text-sm text-muted-foreground">Precision recruitment</p>
                </div>
              </div>
              <div className="flex items-center col-span-2 md:col-span-1">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Verified Growth</h4>
                  <p className="text-sm text-muted-foreground">Data-driven validation</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "w-full lg:w-1/2 relative rounded-xl overflow-hidden minimal-shadow",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/30 before:to-transparent before:opacity-70 before:rounded-xl"
          )}>
            <div className="glass rounded-xl p-8 relative z-10">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Skill Profile: Product Manager</h3>
                  <div className="px-3 py-1 bg-primary/10 rounded-full text-sm text-primary font-medium">
                    94% Match
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Design Thinking</span>
                      <span className="text-sm text-muted-foreground">85/100</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Technical Fluency</span>
                      <span className="text-sm text-muted-foreground">72/100</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Stakeholder Management</span>
                      <span className="text-sm text-muted-foreground">91/100</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Analytics Understanding</span>
                      <span className="text-sm text-muted-foreground">78/100</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm font-medium mb-2">Growth Trajectory</div>
                  <div className="h-20 bg-secondary/50 rounded-lg p-2 flex items-end">
                    {[25, 40, 35, 65, 55, 75, 70, 85, 80, 95].map((height, i) => (
                      <div 
                        key={i} 
                        className="h-full flex-1 mx-0.5 first:ml-0 last:mr-0 group relative"
                      >
                        <div 
                          className="absolute bottom-0 w-full bg-primary/80 rounded-sm transition-all duration-500 ease-out" 
                          style={{ height: `${height}%`, animationDelay: `${i * 100}ms` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
