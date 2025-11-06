import React, { useState, useEffect } from 'react';
import { MCQ } from '../types';

interface QuestionModalProps {
  question: MCQ;
  onClose: (correct: boolean) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleOptionClick = (optionKey: string) => {
    if (selectedOption) return; 

    setSelectedOption(optionKey);
    const correct = optionKey === question.answer;
    setFeedback(correct ? 'Oikein!' : 'Väärin, yritä uudelleen ensi kerralla.');
    
    setTimeout(() => {
      onClose(correct);
    }, 1500);
  };
  
  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-wave-blue w-full max-w-2xl rounded-xl shadow-2xl border border-light-sand/20 p-8 transform animate-fade-in-up">
        <h2 className="text-2xl font-bold text-coral mb-4">Kysymys</h2>
        <p className="text-lg text-sand mb-6 bg-ocean-blue p-4 rounded-md">{question.question}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(question.options).map(([key, value]) => {
            const isSelected = selectedOption === key;
            const isCorrect = key === question.answer;
            
            let buttonClass = 'bg-light-sand/20 hover:bg-light-sand/40';
            if (isSelected) {
              buttonClass = isCorrect ? 'bg-green-500/80' : 'bg-red-500/80';
            }

            return (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                disabled={!!selectedOption}
                className={`p-4 rounded-lg text-left text-sand transition-all duration-300 ${buttonClass} disabled:cursor-not-allowed`}
              >
                <span className="font-bold mr-2">{key}.</span>
                <span>{value}</span>
              </button>
            );
          })}
        </div>
        {feedback && (
          <p className={`mt-6 text-center text-xl font-bold ${selectedOption === question.answer ? 'text-green-400' : 'text-red-400'}`}>
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;
