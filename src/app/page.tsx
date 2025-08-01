'use client';

import { useState, useEffect } from "react";
import { words } from "@/lib/word";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";

// Shuffle and get random words
function getRandomWords(list: string[], count: number) {
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Page() {
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [results, setResults] = useState<('correct' | 'wrong' | null)[]>([]);
  const [timer, setTimer] = useState(30);
  const [initialTimer, setInitialTimer] = useState(30);
  const [maxtimer, setmaxTimer] = useState(60);
  const mintimer = 30;

  const [hasStarted, setHasStarted] = useState(false);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [typedWordCount, setTypedWordCount] = useState(0);

  // Load words on mount
  useEffect(() => {
    const randomWords = getRandomWords(words, 32);
    setWordList(randomWords);
    setResults(new Array(32).fill(null));
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || timer === 0) return;
    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [hasStarted, timer]);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (timer === 0) return;
      if (!hasStarted) setHasStarted(true);

      if (e.key === ' ') {
        e.preventDefault();
        if (typed.trim() === '') return;

        const expected = wordList[currentWordIndex];
        const trimmed = typed.trim();
        const isCorrect = trimmed === expected;

        if (isCorrect) setCorrectWordCount((prev) => prev + 1);
        setTypedWordCount((prev) => prev + 1);

        const newResults = [...results];
        newResults[currentWordIndex] = isCorrect ? 'correct' : 'wrong';
        setResults(newResults);

        setCurrentWordIndex((prev) => Math.min(prev + 1, wordList.length - 1));
        setTyped('');
      } else if (e.key === 'Backspace') {
        setTyped((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setTyped((prev) => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typed, wordList, currentWordIndex, results, timer, hasStarted]);

  // Handle reset
  const handleReload = () => {
    const newWords = getRandomWords(words, 32);
    setWordList(newWords);
    setResults(new Array(32).fill(null));
    setTyped('');
    setCurrentWordIndex(0);
    setCorrectWordCount(0);
    setTypedWordCount(0);
    setHasStarted(false);
    setTimer(30);
  };

  const handleIncrease = () => {
    if (timer < maxtimer && !hasStarted) {
      setTimer((prev) => prev + 5);
      setInitialTimer((prev) => prev + 5);
    }
  };

  const handleDecrease = () => {
    if (timer > mintimer && !hasStarted) {
      setTimer((prev) => prev - 5);
      setInitialTimer((prev) => prev - 5);
    }
  };

  // Stats
  const accuracy = typedWordCount === 0 ? 0 : Math.round((correctWordCount / typedWordCount) * 100);
  const timeUsed = initialTimer - timer;
  const wpm = timeUsed > 0 ? Math.round((correctWordCount / (timeUsed / 60))) : 0;

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center gap-10">
      
      {/* Timer Controls */}
      <div className="flex items-center gap-4 mb-4">
        <FaArrowCircleDown
          className={`text-3xl cursor-pointer ${timer <= mintimer || hasStarted ? 'text-gray-500 cursor-not-allowed' : 'text-yellow-500 hover:text-yellow-300'}`}
          onClick={handleDecrease}
        />
       <div className="text-4xl font-bold text-center text-yellow-500">{timer}</div>
        <FaArrowCircleUp
          className={`text-3xl cursor-pointer ${timer >= maxtimer || hasStarted ? 'text-gray-500 cursor-not-allowed' : 'text-yellow-500 hover:text-yellow-300'}`}
          onClick={handleIncrease}
        />
      </div>

      {/* Timer */}
    

      {/* Time up message */}
      {timer === 0 && (
        <div className="text-3xl font-bold text-red-500">Time's Up!</div>
      )}

      {/* Word display */}
      <div className="flex flex-wrap gap-3 justify-center items-center max-w-5xl">
        {wordList.map((word, index) => {
          const isActive = index === currentWordIndex;
          const result = results[index];

          let color = 'text-gray-400';
          if (isActive) color = 'text-black';
          if (result === 'correct') color = 'text-green-400';
          if (result === 'wrong') color = 'text-red-500';

          return (
            <span key={index} className={`relative text-4xl font-mono ${color}`}>
              {isActive ? (
                <span>
                  <span className="text-blue-400">{typed}</span>
                  <span className="animate-blink">|</span>
                  <span className="opacity-30">{word.slice(typed.length)}</span>
                </span>
              ) : (
                word
              )}
            </span>
          );
        })}
      </div>

      <hr className="w-full border-gray-400" />

      {/* Results */}
      <div className="mt-10 text-center flex justify-between max-w-5xl items-center w-full px-8">
        <div className="text-2xl font-semibold text-blue-500">WPM: {wpm}</div>
        <RiResetLeftFill onClick={handleReload} className="text-3xl cursor-pointer hover:text-yellow-500" />
        <div className="text-2xl font-semibold text-green-500">Accuracy: {accuracy}%</div>
      </div>
    </div>
  );
}
