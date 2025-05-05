
import { useState } from 'react';
import { TopicForm } from './TopicForm';
import { QuizHeader } from './QuizHeader';
import { QuizQuestion, Question } from './QuizQuestion';
import { QuizResults } from './QuizResults';
import { LoadingQuiz } from './LoadingQuiz';
import { generateQuizQuestions } from '@/lib/quiz-service';
import { useToast } from "@/components/ui/use-toast";

type QuizState = 'initial' | 'loading' | 'quiz' | 'results';

export const QuizApp = () => {
  const [state, setState] = useState<QuizState>('initial');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();
  
  const handleStartQuiz = async (selectedTopic: string, questionCount: number) => {
    setTopic(selectedTopic);
    setState('loading');
    
    try {
      const generatedQuestions = await generateQuizQuestions(selectedTopic, questionCount);
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setState('quiz');
    } catch (error) {
      toast({
        title: "Error generating quiz",
        description: "There was a problem creating your quiz. Please try again.",
        variant: "destructive"
      });
      setState('initial');
    }
  };
  
  const handleAnswer = (questionId: string, selectedOption: number, isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setState('results');
    }
  };
  
  const handleRestart = () => {
    setState('initial');
    setTopic('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };
  
  const renderContent = () => {
    switch (state) {
      case 'initial':
        return <TopicForm onStartQuiz={handleStartQuiz} />;
      
      case 'loading':
        return <LoadingQuiz />;
      
      case 'quiz':
        return (
          <>
            <QuizHeader 
              currentStep={currentQuestionIndex + 1} 
              totalSteps={questions.length}
              onExit={handleRestart}
            />
            <QuizQuestion 
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
            />
          </>
        );
      
      case 'results':
        return (
          <QuizResults 
            score={score} 
            totalQuestions={questions.length}
            onNewQuiz={handleRestart}
          />
        );
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-quiz-dark mb-2">
          AI Quiz Quest
        </h1>
        <p className="text-gray-600">
          {state === 'initial' 
            ? "Generate quizzes on any topic using AI" 
            : state === 'quiz' 
              ? `Topic: ${topic}`
              : ""}
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};
