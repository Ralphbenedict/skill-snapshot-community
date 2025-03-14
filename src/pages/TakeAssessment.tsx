import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AssessmentQuestion, { Question } from '@/components/assessment/AssessmentQuestion';
import AssessmentProgress from '@/components/assessment/AssessmentProgress';
import { ArrowLeft } from 'lucide-react';

// Sample questions for each assessment type
const assessmentQuestions: Record<string, Question[]> = {
  'role-based': [
    {
      id: '1',
      number: 1,
      text: 'Which of the following best describes the primary role of product strategy?',
      answers: [
        { id: 'a', text: 'Determining the technical architecture of the product' },
        { id: 'b', text: 'Defining how the product will achieve business goals while meeting user needs' },
        { id: 'c', text: 'Designing the user interface and experience' },
        { id: 'd', text: 'Managing the development team\'s workflow' },
        { id: 'e', text: 'Creating marketing materials for the product' }
      ],
      correctAnswerId: 'b',
      explanation: 'Product strategy defines how a product will meet both business objectives and user needs, providing a roadmap for product decisions.'
    },
    {
      id: '2',
      number: 2,
      text: 'When prioritizing features for a product roadmap, which of the following approaches is most effective?',
      answers: [
        { id: 'a', text: 'Implementing all requested features from the sales team' },
        { id: 'b', text: 'Focusing exclusively on what competitors are doing' },
        { id: 'c', text: 'Building whatever the development team finds most interesting' },
        { id: 'd', text: 'Balancing user value, business value, and implementation effort/risk' },
        { id: 'e', text: 'Adding as many features as possible in each release' }
      ],
      correctAnswerId: 'd',
      explanation: 'Effective prioritization balances the value to users, value to the business, and the effort/risk of implementation.'
    },
    {
      id: '3',
      number: 3,
      text: 'What is the most appropriate way to handle stakeholder disagreement about product direction?',
      answers: [
        { id: 'a', text: 'Always defer to the highest-ranking stakeholder' },
        { id: 'b', text: 'Avoid the conflict by implementing all requested features' },
        { id: 'c', text: 'Facilitate data-informed discussion focused on user needs and business goals' },
        { id: 'd', text: 'Let the development team decide what to build' },
        { id: 'e', text: 'Postpone all decisions until everyone agrees' }
      ],
      correctAnswerId: 'c',
      explanation: 'Productive stakeholder management involves facilitating discussions based on data and evidence, focusing on how decisions serve user needs and business goals.'
    }
  ],
  'technical': [
    {
      id: '1',
      number: 1,
      text: 'Which approach to state management in React is most appropriate for sharing data between deeply nested components?',
      answers: [
        { id: 'a', text: 'Passing props down through each component level' },
        { id: 'b', text: 'Using a global state management library like Redux or Context API' },
        { id: 'c', text: 'Storing all data in local component state' },
        { id: 'd', text: 'Using URL parameters' },
        { id: 'e', text: 'Relying on browser localStorage' }
      ],
      correctAnswerId: 'b',
      explanation: 'Context API or state management libraries like Redux are designed to solve the "prop drilling" problem when sharing data across deeply nested components.'
    },
    {
      id: '2',
      number: 2,
      text: 'What is the primary benefit of code splitting in a frontend application?',
      answers: [
        { id: 'a', text: 'Reducing the number of HTTP requests' },
        { id: 'b', text: 'Improving initial load time by only loading necessary code' },
        { id: 'c', text: 'Making the codebase easier to understand' },
        { id: 'd', text: 'Allowing multiple developers to work on the same feature' },
        { id: 'e', text: 'Preventing CSS conflicts' }
      ],
      correctAnswerId: 'b',
      explanation: 'Code splitting improves application performance by only loading the code necessary for the current view, reducing initial bundle size and load time.'
    }
  ],
  'design': [
    {
      id: '1',
      number: 1,
      text: 'In the UI shown below, rank the design issues from most critical to least critical:',
      image: '/placeholder.svg',
      answers: [
        { id: 'a', text: 'Visual Hierarchy - Users cannot easily identify the most important elements' },
        { id: 'b', text: 'Information Architecture - Related items are not properly grouped' },
        { id: 'c', text: 'Progressive Disclosure - Too much information is shown at once' },
        { id: 'd', text: 'Cognitive Load - The interface requires too much mental effort' },
        { id: 'e', text: 'Learnability - New users would struggle to understand how to use this interface' }
      ],
      correctAnswerId: 'a',
      explanation: 'Visual hierarchy is the most critical issue here as it impacts the user\'s ability to navigate and use the interface effectively.'
    },
    {
      id: '2',
      number: 2,
      text: 'Which principle best describes the concept of making important elements more visually prominent?',
      answers: [
        { id: 'a', text: 'Consistency' },
        { id: 'b', text: 'Visual Hierarchy' },
        { id: 'c', text: 'Proximity' },
        { id: 'd', text: 'Alignment' },
        { id: 'e', text: 'Contrast' }
      ],
      correctAnswerId: 'b',
      explanation: 'Visual hierarchy refers to the arrangement of elements to show their order of importance, making key elements stand out through size, color, placement, etc.'
    }
  ],
  'leadership': [
    {
      id: '1',
      number: 1,
      text: 'Which approach is most effective when a team member consistently misses deadlines?',
      answers: [
        { id: 'a', text: 'Publicly call out the issue during team meetings to create accountability' },
        { id: 'b', text: 'Reassign all their tasks to more reliable team members' },
        { id: 'c', text: 'Have a private conversation to understand underlying causes and offer support' },
        { id: 'd', text: 'Immediately escalate the issue to upper management' },
        { id: 'e', text: 'Set even tighter deadlines to motivate them to work faster' }
      ],
      correctAnswerId: 'c',
      explanation: 'Effective leadership involves understanding root causes behind performance issues and providing appropriate support and coaching.'
    }
  ],
  'competency': [
    {
      id: '1',
      number: 1,
      text: 'When faced with conflicting priorities from different stakeholders, what is the most effective first step?',
      answers: [
        { id: 'a', text: 'Immediately escalate to upper management for a decision' },
        { id: 'b', text: 'Try to satisfy everyone by working longer hours' },
        { id: 'c', text: 'Identify the underlying needs and business objectives driving each request' },
        { id: 'd', text: 'Avoid the conflict by delaying less urgent requests indefinitely' },
        { id: 'e', text: 'Choose the stakeholder with the highest position in the organization' }
      ],
      correctAnswerId: 'c',
      explanation: 'Understanding the underlying needs and business objectives allows you to find potential compromises or alternative solutions that address the core requirements.'
    }
  ],
  'ocean-trait': [
    {
      id: 'o1',
      number: 1,
      text: 'I enjoy trying new and unfamiliar activities.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o2',
      number: 2,
      text: 'I have a vivid imagination.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o3',
      number: 3,
      text: 'I am interested in abstract ideas.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o4',
      number: 4,
      text: 'I prefer variety over routine.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o5',
      number: 5,
      text: 'I am creative in my approach to problem-solving.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o6',
      number: 6,
      text: 'I enjoy artistic and cultural experiences.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o7',
      number: 7,
      text: 'I find new experiences exciting.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o8',
      number: 8,
      text: 'I am curious about different perspectives.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o9',
      number: 9,
      text: 'I embrace change easily.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'o10',
      number: 10,
      text: 'I think deeply about philosophical questions.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c1',
      number: 11,
      text: 'I am highly organized in my daily life.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c2',
      number: 12,
      text: 'I pay close attention to details.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c3',
      number: 13,
      text: 'I set clear goals and follow through.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c4',
      number: 14,
      text: 'I am disciplined in my work habits.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c5',
      number: 15,
      text: 'I plan my tasks well in advance.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c6',
      number: 16,
      text: 'I prefer structured routines over spontaneity.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c7',
      number: 17,
      text: 'I complete tasks thoroughly and carefully.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c8',
      number: 18,
      text: 'I find it easy to stick to a schedule.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c9',
      number: 19,
      text: 'I rarely make impulsive decisions.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'c10',
      number: 20,
      text: 'I take responsibility for my actions.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e1',
      number: 21,
      text: 'I enjoy being the center of attention.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e2',
      number: 22,
      text: 'I am energized by social interactions.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e3',
      number: 23,
      text: 'I like to engage in group activities.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e4',
      number: 24,
      text: 'I feel comfortable in large gatherings.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e5',
      number: 25,
      text: 'I speak up in discussions and meetings.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e6',
      number: 26,
      text: 'I find it easy to make new friends.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e7',
      number: 27,
      text: 'I prefer to be around others rather than alone.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e8',
      number: 28,
      text: 'I am outgoing and talkative.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e9',
      number: 29,
      text: 'I often take the lead in social settings.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'e10',
      number: 30,
      text: 'I enjoy lively and energetic environments.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a1',
      number: 31,
      text: 'I sympathize with others\' feelings.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a2',
      number: 32,
      text: 'I enjoy helping others.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a3',
      number: 33,
      text: 'I avoid conflict whenever possible.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a4',
      number: 34,
      text: 'I trust people easily.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a5',
      number: 35,
      text: 'I am considerate and kind to others.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a6',
      number: 36,
      text: 'I feel compassion for people in distress.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a7',
      number: 37,
      text: 'I prioritize relationships over personal gain.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a8',
      number: 38,
      text: 'I often think about others\' well-being.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a9',
      number: 39,
      text: 'I rarely hold grudges.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'a10',
      number: 40,
      text: 'I work well with others.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n1',
      number: 41,
      text: 'I often feel anxious or worried.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n2',
      number: 42,
      text: 'I get stressed easily.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n3',
      number: 43,
      text: 'I experience mood swings frequently.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n4',
      number: 44,
      text: 'I dwell on negative emotions.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n5',
      number: 45,
      text: 'I often feel self-conscious.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n6',
      number: 46,
      text: 'I struggle with uncertainty.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n7',
      number: 47,
      text: 'I find it difficult to relax.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n8',
      number: 48,
      text: 'I get frustrated easily.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n9',
      number: 49,
      text: 'I am highly sensitive to criticism.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    },
    {
      id: 'n10',
      number: 50,
      text: 'I sometimes feel overwhelmed by emotions.',
      answers: [
        { id: '1', text: 'Strongly Disagree' },
        { id: '2', text: 'Disagree' },
        { id: '3', text: 'Neutral' },
        { id: '4', text: 'Agree' },
        { id: '5', text: 'Strongly Agree' }
      ]
    }
  ]
};

const oceanTraitMetadata = {
  'o': { name: 'Openness', description: 'Openness to Experience' },
  'c': { name: 'Conscientiousness', description: 'Conscientiousness' },
  'e': { name: 'Extraversion', description: 'Extraversion' },
  'a': { name: 'Agreeableness', description: 'Agreeableness' },
  'n': { name: 'Neuroticism', description: 'Neuroticism/Emotional Stability' }
};

const TakeAssessment = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [oceanScores, setOceanScores] = useState<Record<string, number>>({});

  // Get questions for the current assessment
  const questions = assessmentId ? assessmentQuestions[assessmentId] || [] : [];

  const handleSelectAnswer = (answerId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate OCEAN scores for ocean-trait assessment
      if (assessmentId === 'ocean-trait') {
        calculateOceanScores();
      }
      // Submit assessment
      setIsComplete(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGoBack = () => {
    navigate('/assessment');
  };

  // Calculate the OCEAN trait scores
  const calculateOceanScores = () => {
    // Initialize scores for each trait
    const scores = {
      'o': 0, // Openness
      'c': 0, // Conscientiousness
      'e': 0, // Extraversion
      'a': 0, // Agreeableness
      'n': 0  // Neuroticism
    };
    
    // Calculate raw scores
    Object.entries(userAnswers).forEach(([questionId, answerId]) => {
      const traitPrefix = questionId.charAt(0);
      if (traitPrefix in scores) {
        scores[traitPrefix] += parseInt(answerId);
      }
    });
    
    // Scale scores to a 0-100 range (10 questions per trait, max 5 points per question)
    // Formula: (raw score / (number of questions × max points per question)) × 100
    const scaledScores = {
      'o': Math.round((scores['o'] / (10 * 5)) * 100),
      'c': Math.round((scores['c'] / (10 * 5)) * 100),
      'e': Math.round((scores['e'] / (10 * 5)) * 100),
      'a': Math.round((scores['a'] / (10 * 5)) * 100),
      'n': Math.round((scores['n'] / (10 * 5)) * 100)
    };
    
    setOceanScores(scaledScores);
    
    // In a real app, you would send this data to MongoDB here
    console.log('OCEAN Scores:', scaledScores);
    console.log('Raw answers:', userAnswers);
  };

  if (!assessmentId || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Assessment Not Found</h1>
          <p className="text-muted-foreground">The assessment you're looking for doesn't exist or hasn't been configured.</p>
          <Button onClick={handleGoBack}>Return to Assessments</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestion.id] || null;

  // Render results for the OCEAN trait assessment
  if (isComplete && assessmentId === 'ocean-trait') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="p-4 border-b bg-card">
          <div className="container mx-auto flex justify-between items-center">
            <button 
              onClick={handleGoBack}
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Return to Assessments
            </button>
            <span className="font-medium">OCEAN Trait Assessment Results</span>
          </div>
        </div>
        
        <div className="flex-1 container mx-auto flex flex-col items-center px-4 py-8 space-y-8">
          <div className="w-full max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Your Personality Profile</h1>
            <div className="grid gap-6">
              {Object.entries(oceanTraitMetadata).map(([trait, metadata]) => (
                <div key={trait} className="border rounded-lg p-6 bg-card">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">{metadata.name}</h2>
                    <span className="text-lg font-medium">{oceanScores[trait]}%</span>
                  </div>
                  <div className="w-full bg-secondary h-3 rounded-full mb-4">
                    <div 
                      className="bg-primary h-3 rounded-full" 
                      style={{ width: `${oceanScores[trait]}%` }}
                    ></div>
                  </div>
                  <p className="text-muted-foreground">{metadata.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button onClick={handleGoBack} className="w-full max-w-md">
                Return to Assessments
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular assessment taking UI
  if (isComplete) {
    // Simple completion screen - in a real app, this would calculate and store results
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold">Assessment Complete!</h1>
          <p className="text-muted-foreground">Thank you for completing the assessment. Your results are being processed.</p>
          <Button onClick={handleGoBack}>Return to Assessments</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b bg-card">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Exit Assessment
          </button>
          <span className="font-medium">
            {assessmentId === 'role-based' ? 'Product Principles Assessment' : 
             assessmentId === 'design' ? 'Design Language & Principles' : 
             assessmentId === 'technical' ? 'Technical Skills' :
             assessmentId === 'leadership' ? 'Leadership & Soft Skills' : 
             assessmentId === 'ocean-trait' ? 'OCEAN Personality Trait Assessment' :
             'Competency Evaluation'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 container mx-auto flex flex-col items-center px-4 py-8 space-y-6">
        <AssessmentProgress 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          timeRemaining="45:00"
        />
        
        <AssessmentQuestion 
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          showPrevious={currentQuestionIndex > 0}
          showNext={true}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
};

export default TakeAssessment;
