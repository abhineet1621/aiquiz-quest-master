
import { cn } from "@/lib/utils";

export type OptionState = "default" | "selected" | "correct" | "incorrect";

interface QuizOptionProps {
  option: string;
  index: number;
  state: OptionState;
  onClick: () => void;
  disabled?: boolean;
}

export const QuizOption = ({ option, index, state, onClick, disabled }: QuizOptionProps) => {
  const optionLabels = ["A", "B", "C", "D"];
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full p-4 rounded-lg flex items-center gap-3 border-2 transition-all duration-300 animate-fade-in",
        "hover:bg-quiz-light hover:border-quiz-primary",
        state === "default" && "bg-white border-gray-200",
        state === "selected" && "bg-quiz-light border-quiz-primary",
        state === "correct" && "bg-green-100 border-green-500",
        state === "incorrect" && "bg-red-100 border-red-500",
        disabled && "opacity-70 cursor-not-allowed"
      )}
    >
      <span className={cn(
        "flex items-center justify-center h-8 w-8 rounded-full text-white",
        state === "default" && "bg-gray-400",
        state === "selected" && "bg-quiz-primary",
        state === "correct" && "bg-green-500",
        state === "incorrect" && "bg-red-500"
      )}>
        {optionLabels[index]}
      </span>
      <span className="text-left">{option}</span>
    </button>
  );
};
