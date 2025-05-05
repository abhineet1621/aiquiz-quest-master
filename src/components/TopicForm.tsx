
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface TopicFormProps {
  onStartQuiz: (topic: string, questionCount: number) => void;
}

export const TopicForm = ({ onStartQuiz }: TopicFormProps) => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        title: "Topic is required",
        description: "Please enter a topic for your quiz",
        variant: "destructive"
      });
      return;
    }
    
    onStartQuiz(topic, questionCount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="topic">Quiz Topic</Label>
        <Input 
          id="topic"
          placeholder="Enter any topic (e.g., World History, Science, Technology)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="questionCount">Number of Questions</Label>
        <div className="flex items-center gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setQuestionCount(Math.max(3, questionCount - 1))}
            disabled={questionCount <= 3}
          >
            -
          </Button>
          <span className="font-medium text-lg w-8 text-center">{questionCount}</span>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setQuestionCount(Math.min(10, questionCount + 1))}
            disabled={questionCount >= 10}
          >
            +
          </Button>
        </div>
        <p className="text-xs text-gray-500">Choose between 3 and 10 questions</p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-quiz-primary hover:bg-quiz-primary/90 text-white py-6"
      >
        Generate Quiz
      </Button>
    </form>
  );
};
