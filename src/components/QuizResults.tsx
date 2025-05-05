
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onNewQuiz: () => void;
}

export const QuizResults = ({ score, totalQuestions, onNewQuiz }: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedback = () => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };
  
  return (
    <div className="w-full max-w-md mx-auto text-center animate-bounce-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-quiz-dark mb-2">Quiz Complete!</h2>
        <p className="text-gray-600">{getFeedback()}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="text-5xl font-bold text-quiz-primary mb-2">
          {percentage}%
        </div>
        <div className="text-gray-500 mb-4">
          You scored {score} out of {totalQuestions}
        </div>
        
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <CheckIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-sm">
              <div className="font-medium">{score}</div>
              <div className="text-gray-500">Correct</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <XIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-sm">
              <div className="font-medium">{totalQuestions - score}</div>
              <div className="text-gray-500">Wrong</div>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onNewQuiz}
        className="bg-quiz-primary hover:bg-quiz-primary/90 text-white"
      >
        Start New Quiz
      </Button>
    </div>
  );
};
