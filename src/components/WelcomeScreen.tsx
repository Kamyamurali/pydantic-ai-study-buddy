import { BookOpen, Brain, Lightbulb, Target } from 'lucide-react';

export const WelcomeScreen = () => {
  const features = [
    {
      icon: Brain,
      title: 'Explain Concepts',
      description: 'Break down complex topics into simple explanations',
    },
    {
      icon: Lightbulb,
      title: 'Answer Questions',
      description: 'Get detailed answers to your study questions',
    },
    {
      icon: Target,
      title: 'Practice Problems',
      description: 'Work through exercises with step-by-step guidance',
    },
    {
      icon: BookOpen,
      title: 'Study Tips',
      description: 'Learn effective strategies for better retention',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-8 h-8 text-accent-foreground" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Welcome to <span className="gradient-text">StudyBuddy</span>
        </h1>
        
        <p className="text-muted-foreground text-base mb-8">
          Your AI-powered study companion. Ask questions, explore concepts, and accelerate your learning journey.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="study-card p-4 text-left">
              <feature.icon className="w-5 h-5 text-accent mb-2" />
              <h3 className="font-semibold text-sm text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Select a subject and start asking questions to begin
        </p>
      </div>
    </div>
  );
};
