import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Volume2, 
  VolumeX, 
  Zap, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  WifiOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function LessonModal({ 
  chapter, 
  isOpen, 
  onClose, 
  lang, 
  isLowData, 
  isOffline,
  isDownloaded,
  onToggleDownload,
  onRecordQuizResult 
}) {
  if (!isOpen || !chapter) return null;

  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'quiz'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Web Speech API text-to-speech
  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel();
      const textToSpeak = chapter.audioScript[lang] || chapter.audioScript['en'];
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9; // clear, gentle speed for rural learners

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    } else {
      alert("Text-to-speech is not supported by your browser.");
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handleQuizAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optIdx
    });
  };

  const handleQuizSubmit = () => {
    let score = 0;
    chapter.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setQuizSubmitted(true);
    onRecordQuizResult({
      chapterId: chapter.id,
      topicKey: chapter.topicKey,
      score,
      total: chapter.quiz.length,
      isOffline
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {chapter.topicKey}
                </span>
                {isDownloaded && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{lang === 'hi' ? 'डिवाइस में सुरक्षित' : 'Offline Ready'}</span>
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {chapter.title[lang]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleDownload(chapter.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                isDownloaded
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="Store in device for studying without internet"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isDownloaded ? (lang === 'hi' ? 'डाउनलोड हुआ' : 'Downloaded') : `${chapter.sizeKB} KB`}
              </span>
            </button>
            <button 
              onClick={() => {
                handleStopAudio();
                onClose();
              }}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 my-4 border-b border-slate-100 pb-2">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'lesson'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'पाठ अध्ययन (Lesson)' : 'Lesson Reader'}</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? `अभ्यास क्विज़ (${chapter.quiz.length} प्रश्न)` : `Practice Quiz (${chapter.quiz.length} Qs)`}</span>
          </button>
        </div>

        {/* TAB 1: LESSON READER */}
        {activeTab === 'lesson' && (
          <div className="space-y-4">
            {/* Audio Bar & Low Data Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayAudio}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudio ? (lang === 'hi' ? 'ऑडियो रोकें' : 'Stop Narration') : (lang === 'hi' ? 'सुनो (हिंदी ऑडियो)' : 'Listen (Audio Narrator)')}</span>
                </button>
                <span className="text-[11px] text-amber-900 hidden sm:inline">
                  {lang === 'hi' ? 'कम साक्षरता वाले छात्रों हेतु ऑडियो' : 'Spoken narration for emerging readers'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>{chapter.sizeKB} KB total</span>
              </div>
            </div>

            {/* Visual Aid (Normal Mode vs Low Data Mode) */}
            {!isLowData ? (
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Interactive Visual Concept
                  </span>
                  <span className="text-[10px] text-slate-400">Normal Bandwidth Mode</span>
                </div>
                
                {chapter.topicKey === 'Fractions' ? (
                  <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
                    <div className="w-28 h-28 rounded-full border-4 border-amber-400 grid grid-cols-2 grid-rows-2 overflow-hidden bg-amber-100 shadow-inner">
                      <div className="bg-amber-500/80 border-r border-b border-amber-600 flex items-center justify-center font-bold text-white text-xs">1/4</div>
                      <div className="bg-amber-100 border-b border-amber-400 flex items-center justify-center font-bold text-amber-800 text-xs">1/4</div>
                      <div className="bg-amber-100 border-r border-amber-400 flex items-center justify-center font-bold text-amber-800 text-xs">1/4</div>
                      <div className="bg-amber-100 flex items-center justify-center font-bold text-amber-800 text-xs">1/4</div>
                    </div>
                    <div className="text-left text-xs max-w-xs space-y-1">
                      <p className="font-bold text-amber-300">Roti / Field Model: 1 Whole = 4 Quarters</p>
                      <p className="text-slate-300">1 shaded slice = <strong>1/4</strong></p>
                      <p className="text-slate-300">Remaining 3 slices = <strong>3/4</strong></p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 flex items-center justify-center gap-4 text-center">
                    <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 text-emerald-200 text-xs">
                      ☀️ Sun + 💧 Soil Water + 🍃 Chlorophyll = 🌾 Glucose + 💨 Oxygen
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-amber-100/60 border border-amber-300/60 text-amber-900 text-[11px] flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span><strong>Low Data Active:</strong> Heavy images skipped. Saved 1.8 MB. Displaying ultra-light text & audio summary.</span>
              </div>
            )}

            {/* Lesson Body Content */}
            <div className="prose prose-sm max-w-none text-slate-800 bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200 leading-relaxed font-sans">
              <div className="whitespace-pre-line text-xs sm:text-sm">
                {chapter.lowDataContent[lang]}
              </div>
            </div>

            {/* Quick Practice CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
              >
                <span>{lang === 'hi' ? 'पाठ का क्विज़ हल करें' : 'Start Chapter Quiz'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CHAPTER QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-5">
            {isOffline && (
              <div className="p-3 bg-amber-100 text-amber-900 rounded-xl text-xs flex items-center gap-2 border border-amber-300">
                <WifiOff className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {lang === 'hi' 
                    ? 'आप ऑफ़लाइन हैं! आपका क्विज़ डिवाइस में दर्ज होगा और इंटरनेट आने पर स्वतः सिंक हो जाएगा।' 
                    : 'You are offline! Your answers will be cached in IndexedDB and synced automatically when connected.'}
                </span>
              </div>
            )}

            {chapter.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              return (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {qIdx + 1}. {q.question[lang]}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700";

                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                        } else if (isSelected && optIdx !== q.correct) {
                          btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizAnswer(qIdx, optIdx)}
                          className={`p-2.5 rounded-lg border text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          <span className="text-[10px] opacity-70 font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-[11px] text-emerald-950">
                      <strong>{lang === 'hi' ? 'स्पष्टीकरण: ' : 'Explanation: '}</strong>
                      {q.explanation[lang]}
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <div className="flex justify-end pt-2">
                <button
                  disabled={Object.keys(selectedAnswers).length < chapter.quiz.length}
                  onClick={handleQuizSubmit}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold shadow-md transition active:scale-95"
                >
                  {lang === 'hi' ? 'उत्तर सबमिट करें' : 'Submit Quiz'}
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-100/70 border border-emerald-300 text-center space-y-2">
                <div className="font-bold text-sm text-emerald-900">
                  {lang === 'hi' ? 'क्विज़ पूरा हुआ!' : 'Quiz Completed!'}
                </div>
                <p className="text-xs text-emerald-800">
                  {lang === 'hi' ? 'अंक आपकी प्रोफाइल और शिक्षक डैशबोर्ड पर अपडेट हो गए हैं।' : 'Score updated in Student Mastery profile.'}
                </p>
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="px-4 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  {lang === 'hi' ? 'दोबारा हल करें' : 'Try Again'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
