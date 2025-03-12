
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import { ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';

const Index = () => {
  const processRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (processRef.current) {
      observer.observe(processRef.current);
    }
    
    return () => {
      if (processRef.current) {
        observer.unobserve(processRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Feature Section */}
        <FeatureSection />
        
        {/* Process Section */}
        <section ref={processRef} className="py-20 px-6 reveal-on-scroll">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                How It Works
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                A comprehensive approach to measuring professional capabilities
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform combines standardized assessments, real-time tracking, and objective skill validation to create a holistic view of professional growth.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
              
              <div className="space-y-16 relative">
                {[
                  {
                    number: "01",
                    title: "Comprehensive Assessment",
                    description: "Take role-specific standardized assessments that evaluate technical knowledge, problem-solving abilities, and growth potential.",
                    align: "right"
                  },
                  {
                    number: "02",
                    title: "Skills Passport Creation",
                    description: "Receive a detailed profile that quantifies your strengths, identifies growth areas, and provides a baseline for future development.",
                    align: "left"
                  },
                  {
                    number: "03",
                    title: "Continuous Growth Tracking",
                    description: "Connect your daily work tools to track real-time performance metrics and skill development without additional effort.",
                    align: "right"
                  },
                  {
                    number: "04",
                    title: "Data-Driven Career Advancement",
                    description: "Leverage objective performance data to identify opportunities, demonstrate capabilities, and make strategic career decisions.",
                    align: "left"
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className={`flex flex-col ${step.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                      <div className="md:w-1/2 relative">
                        <div className="hidden md:block absolute top-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium -mt-5 z-10 shadow-md"
                             style={{ [step.align === 'left' ? 'right' : 'left']: '-5rem' }}>
                          {step.number}
                        </div>
                        <div className={`p-6 rounded-xl ${step.align === 'left' ? 'md:mr-8' : 'md:ml-8'} bg-background border border-border/40`}>
                          <div className="md:hidden mb-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                            {step.number}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <div className="md:w-1/2 relative">
                        <div className="aspect-video rounded-xl bg-secondary/30 overflow-hidden flex items-center justify-center">
                          <div className="p-6 text-center">
                            <p className="text-muted-foreground">Illustration for {step.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-20 text-center">
              <Button 
                size="lg" 
                className="rounded-full px-8 font-medium transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg group"
              >
                Start Your Assessment
                <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary/5">
          <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-12 border border-primary/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-2/3">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Ready to transform how you measure professional growth?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Join thousands of professionals who are using objective data to showcase their capabilities and advance their careers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 font-medium transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg group"
                  >
                    Get Started
                    <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full px-8 font-medium border-2 hover:bg-background/80"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Request Demo
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/3 bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/40">
                <div className="font-medium mb-4">Join companies already using our platform</div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-secondary/40 rounded flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Company {i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 text-2xl font-medium tracking-tight mb-4">
                <span className="text-primary">Skill</span>
                <span>Snapshot</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Redefining how we measure, track, and showcase professional growth.
              </p>
            </div>
            
            {['Product', 'Company', 'Resources'].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{section}</h4>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                        {section} Link {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-muted-foreground text-sm">
              © 2023 SkillSnapshot. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <ul className="flex justify-center sm:justify-end space-x-6">
                {['Privacy', 'Terms', 'Cookies'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
