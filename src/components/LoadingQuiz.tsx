
import { Progress } from "@/components/ui/progress";

export const LoadingQuiz = () => {
  return (
    <div className="w-full max-w-md mx-auto text-center py-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-quiz-dark mb-4">Generating Your Quiz</h2>
      <p className="text-gray-600 mb-8">Please wait while we create personalized questions...</p>
      
      <div className="space-y-4">
        <Progress value={65} className="h-2" />
        
        <div className="flex flex-col gap-3 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-8 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
