
import React, { useEffect, useRef } from 'react';
import { 
  LineChart, 
  Users, 
  Award, 
  Briefcase, 
  TrendingUp, 
  Zap, 
  Check, 
  BarChart4,
  FileText 
} from 'lucide-react';
import { cn } from "@/lib/utils";

const FeatureSection = () => {
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

  const features = [
    {
      icon: <LineChart className="w-6 h-6 text-primary" />,
      title: "Comprehensive Skills Tracking",
      description: "Monitor your professional growth with real-time metrics and detailed analytics."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Precision Talent Matching",
      description: "Connect talent with opportunity through verified performance data and objective skill assessments."
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Validated Professional Growth",
      description: "Showcase your capabilities through objective measurements and data-driven validation."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "Advanced Applicant Tracking",
      description: "Streamline recruitment with detailed candidate profiles and quantitative skill metrics."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Growth Trajectory Insights",
      description: "Understand your professional development path with predictive analytics and milestones."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Standardized Assessments",
      description: "Measure competency and potential with role-specific standardized assessments."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-secondary/30 reveal-on-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Core Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Transform how you measure and showcase professional growth
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform bridges the gap between subjective assessments and objective performance data, creating a comprehensive view of professional capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-background rounded-xl p-6 hover-lift",
                "border border-border/40 hover:border-primary/20 transition-colors duration-300"
              )}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-8 border border-border/40">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Skill assessments that predict real-world performance
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our proprietary assessment methodology evaluates not just knowledge, but application, adaptability, and growth potential.
              </p>
              <ul className="space-y-3">
                {['Role-specific evaluations', 'Adaptive difficulty levels', 'Psychometric insights', 'Technical competency', 'Growth potential indicators'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 sm:h-80 relative rounded-lg overflow-hidden minimal-shadow">
              <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <BarChart4 className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Assessment Overview</span>
                    </div>
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                      86% Complete
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Critical Thinking</span>
                        <span className="text-sm text-muted-foreground">92/100</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Domain Knowledge</span>
                        <span className="text-sm text-muted-foreground">83/100</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '83%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <span className="text-sm text-muted-foreground">75/100</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Adaptability</span>
                        <span className="text-sm text-muted-foreground">88/100</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Full report available upon completion</span>
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

export default FeatureSection;
