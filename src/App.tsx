/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  ChevronRight,
  AlertCircle,
  Info
} from 'lucide-react';
import { QUESTIONS, Question } from './data/questions';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(QUESTIONS.length).fill(null));

  const currentQuestion = QUESTIONS[currentIndex];

  const handleSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    setIsSubmitted(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setShowExplanation(false);
    setIsFinished(false);
    setAnswers(new Array(QUESTIONS.length).fill(null));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case '中级': return 'bg-amber-100 text-amber-700 border-amber-200';
      case '高级': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getEncouragement = () => {
    const percentage = (score / QUESTIONS.length) * 100;
    if (percentage === 100) return "太棒了！你是语法大师！";
    if (percentage >= 80) return "做得好！你的语法基础非常扎实。";
    if (percentage >= 60) return "不错，继续努力，离精通不远了。";
    return "加油！多练习解析中的规则，你会进步的。";
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">练习完成</h2>
          <p className="text-slate-500 mb-6">{getEncouragement()}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <div className="text-5xl font-black text-indigo-600 mb-2">
              {score}<span className="text-2xl text-slate-400 font-normal"> / {QUESTIONS.length}</span>
            </div>
            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">最终得分</div>
          </div>

          <button 
            onClick={resetQuiz}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            <RotateCcw className="w-5 h-5" />
            重新开始
          </button>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-400 mb-3">推荐复习链接</p>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-indigo-600 hover:underline text-sm flex items-center justify-center gap-1">
                <BookOpen className="w-4 h-4" /> 英语复合句深度解析
              </a>
              <a href="#" className="text-indigo-600 hover:underline text-sm flex items-center justify-center gap-1">
                <BookOpen className="w-4 h-4" /> 非谓语动词常见陷阱
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg hidden sm:block">Grammar Master</h1>
          </div>
          
          <div className="flex-1 max-w-xs mx-8">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-sm font-bold text-slate-400">
            {currentIndex + 1} <span className="text-slate-300">/</span> {QUESTIONS.length}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10 mb-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
              {currentQuestion.category}
            </span>
          </div>

          <div className="text-xl md:text-2xl leading-relaxed font-medium text-slate-800 mb-10">
            {currentQuestion.sentenceBefore}
            <span className={`inline-flex min-w-[120px] mx-2 px-4 py-1 border-b-2 transition-all ${
              isSubmitted 
                ? (selectedAnswer === currentQuestion.correctAnswer ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-rose-500 text-rose-600 bg-rose-50')
                : (selectedAnswer ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-slate-300 text-slate-300')
            } rounded-t-lg items-center justify-center`}>
              {selectedAnswer || '______'}
            </span>
            {currentQuestion.sentenceAfter}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let buttonClass = "p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ";
              
              if (isSubmitted) {
                if (isCorrect) {
                  buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                } else if (isSelected) {
                  buttonClass += "border-rose-500 bg-rose-50 text-rose-700";
                } else {
                  buttonClass += "border-slate-100 bg-white text-slate-300";
                }
              } else {
                if (isSelected) {
                  buttonClass += "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100";
                } else {
                  buttonClass += "border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={isSubmitted}
                  className={buttonClass}
                >
                  <span>{option}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                selectedAnswer 
                  ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              提交答案
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
            >
              {currentIndex === QUESTIONS.length - 1 ? '查看结果' : '下一题'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Explanation Card */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className={`p-4 flex items-center gap-2 font-bold ${
                selectedAnswer === currentQuestion.correctAnswer ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <><CheckCircle2 className="w-5 h-5" /> 回答正确！</>
                ) : (
                  <><AlertCircle className="w-5 h-5" /> 回答错误，正确答案是: {currentQuestion.correctAnswer}</>
                )}
              </div>
              
              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" /> 语法规则
                    </h4>
                    <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">典型例句</h4>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-600">
                        "{currentQuestion.explanation.example}"
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">易错辨析</h4>
                      <p className="text-slate-600 text-sm">{currentQuestion.explanation.pitfall}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
