import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentView } from './components/StudentView';
import { TeacherView } from './components/TeacherView';
import { ParentView } from './components/ParentView';
import { DiagnosticModal } from './components/DiagnosticModal';
import { LessonModal } from './components/LessonModal';
import { AiSaathiChat } from './components/AiSaathiChat';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';
import { DownloadsModal } from './components/DownloadsModal';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [role, setRole] = useState('student'); // 'student' | 'teacher' | 'parent'
  const [lang, setLang] = useState('hi'); // default to 'hi' to highlight vernacular rural focus
  const [isOffline, setIsOffline] = useState(false);
  const [isLowData, setIsLowData] = useState(true); // default to low-data mode
  const [pendingSyncCount, setPendingSyncCount] = useState(1);
  const [downloadedIds, setDownloadedIds] = useState(['math-c7-ch1', 'sci-c7-ch1']);
  const [toastMessage, setToastMessage] = useState(null);

  // Diagnostic State
  const [diagnosticData, setDiagnosticData] = useState({
    completed: true,
    weakTopics: ['Fractions (भिन्न)', 'Percentages (प्रतिशत)'],
    masteredTopics: ['Decimals (दशमलव)', 'Geometry']
  });

  // Student Gamification & Mastery State
  const [studentStats, setStudentStats] = useState({
    streakDays: 4,
    pointsXP: 350,
    subjectProgress: {
      math: 72,
      science: 81,
      english: 64
    }
  });

  // Modals
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isAiSaathiOpen, setIsAiSaathiOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle download in IndexedDB / local state
  const handleToggleDownload = (chapterId) => {
    if (downloadedIds.includes(chapterId)) {
      setDownloadedIds(downloadedIds.filter(id => id !== chapterId));
      showToast(lang === 'hi' ? 'अध्याय डिवाइस मेमोरी से हटा दिया गया' : 'Chapter removed from offline cache');
    } else {
      setDownloadedIds([...downloadedIds, chapterId]);
      showToast(lang === 'hi' ? 'अध्याय ऑफ़लाइन पढ़ने के लिए सहेजा गया (24 KB)' : 'Chapter cached for offline study (24 KB)');
    }
  };

  // Sync Offline Queue
  const handleSyncNow = () => {
    if (isOffline) {
      alert(lang === 'hi' 
        ? "सिंक करने के लिए इंटरनेट चालू करें (ऊपर दिए गए 'Offline' बटन पर क्लिक करके ऑनलाइन मोड चुनें)।"
        : "Please restore internet connection (toggle Offline button to Online) before syncing.");
      return;
    }

    setToastMessage(lang === 'hi' ? 'स्कूल सर्वर के साथ डेटा सिंक हो रहा है...' : 'Syncing local progress with school database...');
    setTimeout(() => {
      setPendingSyncCount(0);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.2 }
        });
      } catch (e) {}
      setToastMessage(lang === 'hi' ? '✅ सभी ऑफ़लाइन क्विज़ सफलतापूर्वक सर्वर में सिंक हो गए!' : '✅ All offline records synced with school server successfully!');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1000);
  };

  // Record Quiz Result
  const handleRecordQuizResult = ({ chapterId, topicKey, score, total, isOffline: wasOffline }) => {
    // Increase points
    const earnedXP = score * 20;
    setStudentStats(prev => ({
      ...prev,
      pointsXP: prev.pointsXP + earnedXP,
      subjectProgress: {
        ...prev.subjectProgress,
        math: Math.min(100, prev.subjectProgress.math + 4)
      }
    }));

    if (wasOffline) {
      setPendingSyncCount(prev => prev + 1);
      showToast(lang === 'hi' 
        ? `क्विज़ सहेजा गया! इंटरनेट बंद होने के कारण यह सिंक कतार (Sync Queue) में सुरक्षित है।`
        : `Quiz recorded offline! Added to background sync queue.`);
    } else {
      showToast(lang === 'hi'
        ? `क्विज़ पूरा हुआ! +${earnedXP} XP अर्जित किए।`
        : `Quiz completed! Earned +${earnedXP} XP.`);
    }
  };

  // Save Diagnostic
  const handleSaveDiagnostic = ({ weakTopics }) => {
    setDiagnosticData({
      completed: true,
      weakTopics: weakTopics.length ? weakTopics : ['None (All Mastered)']
    });
    showToast(lang === 'hi' ? 'दक्षता स्तर जांच परिणाम अपडेट हो गए!' : 'Diagnostic assessment results recorded!');
  };

  // Global Speech synthesis
  const handleSpeakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/25 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        role={role}
        setRole={setRole}
        lang={lang}
        setLang={setLang}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        isLowData={isLowData}
        setIsLowData={setIsLowData}
        pendingSyncCount={pendingSyncCount}
        onSyncNow={handleSyncNow}
        downloadedCount={downloadedIds.length}
        onOpenDownloads={() => setIsDownloadsOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* Main Body Content by Active Role */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
        {role === 'student' && (
          <StudentView
            lang={lang}
            isLowData={isLowData}
            isOffline={isOffline}
            diagnosticData={diagnosticData}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onOpenLesson={(ch) => setActiveLesson(ch)}
            downloadedIds={downloadedIds}
            onToggleDownload={handleToggleDownload}
            onOpenAiSaathi={() => setIsAiSaathiOpen(true)}
            studentStats={studentStats}
          />
        )}

        {role === 'teacher' && (
          <TeacherView lang={lang} />
        )}

        {role === 'parent' && (
          <ParentView lang={lang} />
        )}
      </main>

      {/* Modals */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        lang={lang}
        onSaveResults={handleSaveDiagnostic}
      />

      <LessonModal
        chapter={activeLesson}
        isOpen={Boolean(activeLesson)}
        onClose={() => setActiveLesson(null)}
        lang={lang}
        isLowData={isLowData}
        isOffline={isOffline}
        isDownloaded={activeLesson ? downloadedIds.includes(activeLesson.id) : false}
        onToggleDownload={handleToggleDownload}
        onRecordQuizResult={handleRecordQuizResult}
      />

      <AiSaathiChat
        isOpen={isAiSaathiOpen}
        onClose={() => setIsAiSaathiOpen(false)}
        lang={lang}
        onSpeakText={handleSpeakText}
      />

      <SystemArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
        lang={lang}
      />

      <DownloadsModal
        isOpen={isDownloadsOpen}
        onClose={() => setIsDownloadsOpen(false)}
        lang={lang}
        downloadedIds={downloadedIds}
        onRemoveDownload={handleToggleDownload}
        onOpenLesson={(ch) => setActiveLesson(ch)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-200/60 bg-white/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>GyanSetu (ज्ञानसेतु)</strong> • Final Year Major Project 2026-27
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setIsArchitectureOpen(true)} className="hover:underline text-emerald-700 font-semibold">
              System Architecture & Viva Defense
            </button>
            <span>•</span>
            <span>React + Node.js + FastAPI AI Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
