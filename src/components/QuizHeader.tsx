
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizHeaderProps {
  currentStep: number;
  totalSteps: number;
  timeRemaining?: number;
  onExit: () => void;
}

export const QuizHeader = ({ currentStep, totalSteps, onExit }: QuizHeaderProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full py-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          Question {currentStep} of {totalSteps}
        </div>
        <Button variant="outline" onClick={onExit} size="sm">
          Exit Quiz
        </Button>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
