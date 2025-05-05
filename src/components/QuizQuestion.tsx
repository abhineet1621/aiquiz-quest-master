
import { useState, useEffect } from 'react';
import { QuizOption, OptionState } from './QuizOption';
import { Button } from "@/components/ui/button";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (questionId: string, selectedOption: number, isCorrect: boolean) => void;
  onNext: () => void;
}

export const QuizQuestion = ({ question, onAnswer, onNext }: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealAnswer, setRevealAnswer] = useState(false);
  
  // Reset state when the question changes
  useEffect(() => {
    setSelectedOption(null);
    setRevealAnswer(false);
  }, [question.id]);
  
  const handleOptionClick = (index: number) => {
    if (revealAnswer) return;
    setSelectedOption(index);
  };
  
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === question.correctOption;
    setRevealAnswer(true);
    onAnswer(question.id, selectedOption, isCorrect);
  };
  
  const getOptionState = (index: number): OptionState => {
    if (!revealAnswer) {
      return selectedOption === index ? 'selected' : 'default';
    }
    
    if (index === question.correctOption) {
      return 'correct';
    }
    
    if (index === selectedOption && selectedOption !== question.correctOption) {
      return 'incorrect';
    }
    
    return 'default';
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold mb-6 text-quiz-dark">{question.text}</h2>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <QuizOption 
            key={index}
            option={option}
            index={index}
            state={getOptionState(index)}
            onClick={() => handleOptionClick(index)}
            disabled={revealAnswer}
          />
        ))}
      </div>
      
      <div className="flex justify-end">
        {!revealAnswer ? (
          <Button 
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="bg-quiz-primary hover:bg-quiz-primary/90 text-white"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            className="bg-quiz-accent hover:bg-quiz-accent/90 text-white"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};
