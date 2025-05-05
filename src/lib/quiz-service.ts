
import { Question } from "@/components/QuizQuestion";

// This is a mock service that simulates AI-generated quiz questions
// In a real implementation, this would connect to an AI service

export const generateQuizQuestions = async (topic: string, questionCount: number): Promise<Question[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const sampleQuestions: { [key: string]: Question[] } = {
    history: [
      {
        id: "h1",
        text: "Which empire was ruled by Julius Caesar?",
        options: ["Roman Empire", "Greek Empire", "Egyptian Empire", "Persian Empire"],
        correctOption: 0,
      },
      {
        id: "h2",
        text: "The Renaissance period began in which country?",
        options: ["France", "England", "Italy", "Spain"],
        correctOption: 2,
      },
      {
        id: "h3",
        text: "Who was the first president of the United States?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
        correctOption: 1,
      },
      {
        id: "h4",
        text: "Which war was fought between the North and South United States?",
        options: ["Revolutionary War", "World War I", "Civil War", "War of 1812"],
        correctOption: 2,
      },
      {
        id: "h5",
        text: "The Great Wall of China was built primarily to defend against which group?",
        options: ["Mongols", "Japanese", "Russians", "Vietnamese"],
        correctOption: 0,
      }
    ],
    science: [
      {
        id: "s1",
        text: "What is the chemical symbol for gold?",
        options: ["Gd", "Au", "Ag", "Fe"],
        correctOption: 1,
      },
      {
        id: "s2",
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correctOption: 2,
      },
      {
        id: "s3",
        text: "What is the hardest natural substance on Earth?",
        options: ["Titanium", "Platinum", "Diamond", "Quartz"],
        correctOption: 2,
      },
      {
        id: "s4",
        text: "Which of these is NOT a primary color of light?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctOption: 3,
      },
      {
        id: "s5",
        text: "What is the largest organ in the human body?",
        options: ["Brain", "Liver", "Skin", "Heart"],
        correctOption: 2,
      }
    ],
    technology: [
      {
        id: "t1",
        text: "Who is the co-founder of Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
        correctOption: 1,
      },
      {
        id: "t2",
        text: "Which programming language is known for building web pages?",
        options: ["Python", "Java", "HTML", "C++"],
        correctOption: 2,
      },
      {
        id: "t3",
        text: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
        correctOption: 0,
      },
      {
        id: "t4",
        text: "Which company developed the iPhone?",
        options: ["Microsoft", "Google", "Samsung", "Apple"],
        correctOption: 3,
      },
      {
        id: "t5",
        text: "Which of these is a type of computer network that covers a small physical area?",
        options: ["WAN", "LAN", "MAN", "PAN"],
        correctOption: 1,
      }
    ]
  };
  
  // Default to general questions if the topic doesn't match our samples
  let questions: Question[] = [
    {
      id: "g1",
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctOption: 2,
    },
    {
      id: "g2",
      text: "Which planet is closest to the sun?",
      options: ["Venus", "Earth", "Mars", "Mercury"],
      correctOption: 3,
    },
    {
      id: "g3",
      text: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctOption: 2,
    },
    {
      id: "g4",
      text: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctOption: 2,
    },
    {
      id: "g5",
      text: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
      correctOption: 1,
    }
  ];
  
  // Check if we have sample questions for the topic
  const normalizedTopic = topic.toLowerCase();
  if (normalizedTopic.includes("history")) {
    questions = sampleQuestions.history;
  } else if (normalizedTopic.includes("science")) {
    questions = sampleQuestions.science;
  } else if (normalizedTopic.includes("tech")) {
    questions = sampleQuestions.technology;
  }
  
  // Ensure we have the right number of questions (between 3 and 10)
  const count = Math.min(Math.max(3, questionCount), 10);
  
  // If we need more questions than we have, duplicate some with modified IDs
  while (questions.length < count) {
    const origQuestion = questions[questions.length % questions.length];
    questions.push({
      ...origQuestion,
      id: `${origQuestion.id}-${questions.length}`,
    });
  }
  
  // If we have too many questions, trim the array
  if (questions.length > count) {
    questions = questions.slice(0, count);
  }
  
  return questions;
};
