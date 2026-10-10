import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, X, Award, ArrowRight, Brain, RotateCcw } from 'lucide-react';
import { diagnosticQuestions, getLocalized, translations } from '../data/mockData';
import confetti from 'canvas-confetti';

export function DiagnosticModal({ isOpen, onClose, lang, onSaveResults }) {
  if (!isOpen) return null;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const question = diagnosticQuestions[currentIdx];

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx
    });
  };

  const handleNext = () => {
    if (currentIdx < diagnosticQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateAndFinish();
    }
  };

  const calculateAndFinish = () => {
    // Topic breakdown analysis
    const topicStats = {};
    diagnosticQuestions.forEach((q, idx) => {
      const topic = q.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total += 1;
      if (selectedAnswers[idx] === q.correct) {
        topicStats[topic].correct += 1;
      }
    });

    const analysis = Object.entries(topicStats).map(([topic, stats]) => {
      const percentage = Math.round((stats.correct / stats.total) * 100);
      let status = 'Good';
      if (percentage < 50) status = 'Weak';
      else if (percentage < 75) status = 'Average';
      return { topic, percentage, status };
    });

    const weakTopics = analysis.filter(a => a.status === 'Weak').map(a => a.topic);
    
    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setIsSubmitted(true);
    onSaveResults({ analysis, weakTopics });
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'hi' ? 'प्रारंभिक स्तर जांच परीक्षा' : 'Diagnostic Baseline Assessment'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'hi' ? 'गणित दक्षता स्तर जांच (कक्षा 7)' : 'Evaluating Foundational Math Skills (Class 7)'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>{lang === 'hi' ? `प्रश्न ${currentIdx + 1} / ${diagnosticQuestions.length}` : `Question ${currentIdx + 1} of ${diagnosticQuestions.length}`}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Topic: {question.topic}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / diagnosticQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 mb-6">
              <p className="text-base font-semibold text-slate-800">
                {getLocalized(question.question, lang)}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 disabled:opacity-30"
              >
                {lang === 'hi' ? 'पिछला' : 'Previous'}
              </button>
              <button
                disabled={selectedAnswers[currentIdx] === undefined}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
              >
                <span>{currentIdx === diagnosticQuestions.length - 1 ? (lang === 'hi' ? 'जांच समाप्त करें' : 'Finish & Analyze') : (lang === 'hi' ? 'अगला प्रश्न' : 'Next Question')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {lang === 'hi' ? 'जांच विश्लेषण तैयार है!' : 'Diagnostic Report Generated!'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'hi' ? 'सिस्टम ने आपकी ताकत और कमजोरियों को चिन्हित कर लिया है।' : 'Our AI has mapped your strengths and remedial priorities.'}
            </p>

            {/* Topic Results Breakdown Grid */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {lang === 'hi' ? 'विषयवार दक्षता स्तर' : 'Topic-wise Mastery Breakdown'}
              </h4>
              <div className="space-y-3">
                {diagnosticQuestions.reduce((acc, q, idx) => {
                  if (!acc.some(item => item.topic === q.topic)) {
                    acc.push({ topic: q.topic });
                  }
                  return acc;
                }, []).map((tObj, idx) => {
                  // calculate for this topic
                  const qs = diagnosticQuestions.filter(q => q.topic === tObj.topic);
                  const correctCount = qs.filter(q => {
                    const qIdx = diagnosticQuestions.findIndex(dq => dq.id === q.id);
                    return selectedAnswers[qIdx] === q.correct;
                  }).length;
                  const pct = Math.round((correctCount / qs.length) * 100);
                  const isWeak = pct < 50;

                  return (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200">
                      <div>
                        <div className="font-bold text-sm text-slate-800">{tObj.topic}</div>
                        <div className="text-[11px] text-slate-500">
                          {correctCount} / {qs.length} {lang === 'hi' ? 'प्रश्न सही' : 'correct'} ({pct}%)
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isWeak 
                          ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                          : pct >= 80 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {isWeak ? (lang === 'hi' ? 'कमजोर (Weak)' : 'Weak Focus') : (lang === 'hi' ? 'मजबूत (Strong)' : 'Mastered')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Recommendation Alert */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-left mb-6 flex gap-3">
              <Brain className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900 mb-1">
                  {lang === 'hi' ? 'एआई सुझाई गई अध्ययन योजना:' : 'AI Learning Recommendation:'}
                </p>
                <p className="text-xs text-amber-800">
                  {lang === 'hi' 
                    ? '"प्रतिशत (Percentage) शुरू करने से पहले भिन्न (Fractions) के अध्याय 1 का पुनरीक्षण करें।"' 
                    : '"Revise Fractions Chapter 1 before advancing to Percentages."'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={restart}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'पुनः प्रयास करें' : 'Retake Test'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition active:scale-95"
              >
                {lang === 'hi' ? 'व्यक्तिगत पाठ शुरू करें' : 'Open Personalized Study Path'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
