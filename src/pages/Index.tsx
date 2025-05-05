
import { QuizApp } from "@/components/QuizApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-quiz-light flex flex-col">
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 py-8 flex items-center justify-center">
        <QuizApp />
      </main>
      
      <footer className="w-full py-4 text-center text-sm text-gray-500">
        <p>© 2025 AI Quiz Quest. Powered by AI.</p>
      </footer>
    </div>
  );
};

export default Index;
