import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Download, 
  Play, 
  Flame, 
  BookOpen, 
  Check, 
  Zap, 
  Filter,
  BarChart3,
  Compass,
  ChevronRight,
  TrendingUp,
  Volume2,
  HardDrive,
  Target
} from 'lucide-react';
import { translations, sampleCourses, getLocalized } from '../data/mockData';

export function StudentView({ 
  lang, 
  isLowData, 
  isOffline,
  diagnosticData,
  onOpenDiagnostic,
  onOpenLesson,
  downloadedIds,
  onToggleDownload,
  onOpenAiSaathi,
  studentStats
}) {
  const t = translations[lang] || translations['en'];
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'remedial' | 'progress'
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [filterOfflineOnly, setFilterOfflineOnly] = useState(false);

  const filteredCourses = sampleCourses.filter(c => {
    if (selectedSubject !== 'all' && c.subject !== selectedSubject) return false;
    return true;
  });

  return (
    <div className="space-y-7 pb-28 max-w-6xl mx-auto">
      {/* 1. Modern Hero Section with Bento Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Welcome Hero Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200/60">
                Class 7A • Roll 24
              </span>
              <span className="text-xs text-slate-400 font-medium">Govt Upper Primary School Rampur</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {lang === 'hi' ? 'नमस्ते, रोहन! 👋' : 'Welcome back, Rohan! 👋'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
              {lang === 'hi' 
                ? 'कम डेटा में भी आपकी पढ़ाई कभी नहीं रुकेगी। आज का प्राथमिकता पाठ: भिन्न एवं दशमलव।'
                : 'Study uninterrupted even on slow 2G/3G connections. Today\'s priority topic: Fractions & Decimals.'}
            </p>
          </div>

          {/* Daily Goal & Next Step Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {lang === 'hi' ? 'आज का लक्ष्य (2/3 पाठ पूर्ण)' : 'Daily Learning Quest (2 of 3 Completed)'}
                </div>
                <div className="text-[11px] text-slate-400">1 practice quiz remaining for today's streak</div>
              </div>
            </div>

            <button
              onClick={() => onOpenLesson(sampleCourses[0].chapters[0])}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-sm hover:shadow-md transition active:scale-95 flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{lang === 'hi' ? 'पाठ शुरू करें' : 'Resume Lesson'}</span>
            </button>
          </div>
        </div>

        {/* Bento Stats Column */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3.5">
          {/* Day Streak & XP Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                <Flame className="w-6 h-6 fill-amber-500 animate-bounce" />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900 leading-tight">{studentStats.streakDays} Days</div>
                <div className="text-[11px] text-slate-400 font-medium">Learning Streak 🔥</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-base font-black text-emerald-600 leading-tight">+{studentStats.pointsXP}</div>
              <div className="text-[10px] text-slate-400 font-medium">XP Points</div>
            </div>
          </div>

          {/* Rural Data Saver & Offline Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                <HardDrive className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900 leading-tight">{downloadedIds.length} Chapters</div>
                <div className="text-[11px] text-slate-400 font-medium">Cached on Device 📦</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-200">
                &lt; 50 KB total
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modern Segmented Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Courses & Modules</span>
          </button>

          <button
            onClick={() => setActiveTab('remedial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'remedial'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI Diagnostic Path</span>
            {diagnosticData.weakTopics.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'progress'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics & Badges</span>
          </button>
        </div>

        {/* Retake Diagnostic Shortcut */}
        <button
          onClick={onOpenDiagnostic}
          className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 transition self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs"
        >
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>{lang === 'hi' ? 'दक्षता स्तर जांच परीक्षा दें' : 'Retake Diagnostic Test'}</span>
        </button>
      </div>

      {/* TAB 1: COURSES & MODULES */}
      {activeTab === 'courses' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Subject Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition ${selectedSubject === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedSubject('math')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition ${selectedSubject === 'math' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                📐 Mathematics
              </button>
              <button
                onClick={() => setSelectedSubject('science')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition ${selectedSubject === 'science' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                🔬 Science
              </button>
            </div>

            <button
              onClick={() => setFilterOfflineOnly(!filterOfflineOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                filterOfflineOnly
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Offline Ready Only</span>
            </button>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCourses.map(course => (
              <React.Fragment key={course.id}>
                {course.chapters
                  .filter(ch => !filterOfflineOnly || downloadedIds.includes(ch.id))
                  .map(chapter => {
                    const isDownloaded = downloadedIds.includes(chapter.id);
                    return (
                      <div 
                        key={chapter.id}
                        className="modern-card rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden"
                      >
                        {/* Concept Visual Illustration Banner */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
                              {getLocalized(course.title, lang)}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span>{chapter.sizeKB} KB</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-emerald-700 transition">
                            {getLocalized(chapter.title, lang)}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {getLocalized(chapter.summary, lang)}
                          </p>
                        </div>

                        {/* Interactive Footer Actions */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => onToggleDownload(chapter.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                              isDownloaded
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                            title={isDownloaded ? 'Saved in device memory' : 'Download for offline use'}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{isDownloaded ? 'Downloaded ✓' : 'Save Offline'}</span>
                          </button>

                          <button
                            onClick={() => onOpenLesson(chapter)}
                            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition"
                          >
                            <span>Study & Quiz</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AI DIAGNOSTIC & REMEDIAL PATH */}
      {activeTab === 'remedial' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Topic Mastery & Remedial Roadmap
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our diagnostic engine evaluates foundational prerequisites before unlocking complex topics
                </p>
              </div>
              <button
                onClick={onOpenDiagnostic}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-xl text-xs shadow-xs transition"
              >
                Retake Assessment
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/90 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-rose-950">Fractions (भिन्न)</span>
                  <span className="text-[10px] font-bold bg-rose-200/80 text-rose-900 px-2.5 py-0.5 rounded-full">
                    Priority Weak (40%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Difficulty identified in adding unequal denominators. Reviewing the roti division model is recommended.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenLesson(sampleCourses[0].chapters[0])}
                    className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1"
                  >
                    <span>Start Remedial Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-amber-950">Percentages (प्रतिशत)</span>
                  <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full">
                    Prerequisite Locked
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Locked until Fractions Chapter 1 is completed with 70%+ score to prevent learning confusion.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-emerald-950">Decimals (दशमलव)</span>
                  <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2.5 py-0.5 rounded-full">
                    Mastered (90%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strong conceptual foundation in comparing decimals and hundredths.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-emerald-950">Geometry Basics</span>
                  <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2.5 py-0.5 rounded-full">
                    Proficient (75%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear understanding of perimeter calculations for rectangular fields and squares.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBJECT PROGRESS & BADGES */}
      {activeTab === 'progress' && (
        <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Curriculum Mastery & Badges
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Track your syllabus completion across Class 7 core subjects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-900">Mathematics</span>
                <span className="text-emerald-700 font-black">{studentStats.subjectProgress.math}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.math}%` }} />
              </div>
              <div className="text-[11px] text-slate-400">Chapters: 2 completed • 1 remaining</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-900">Science</span>
                <span className="text-emerald-700 font-black">{studentStats.subjectProgress.science}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.science}%` }} />
              </div>
              <div className="text-[11px] text-slate-400">Nutrition in Plants: Completed</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-900">English</span>
                <span className="text-emerald-700 font-black">{studentStats.subjectProgress.english}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.english}%` }} />
              </div>
              <div className="text-[11px] text-slate-400">Basic Grammar: In progress</div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Floating AI Doubt Saathi Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={onOpenAiSaathi}
          className="flex items-center gap-2.5 bg-slate-900 hover:bg-emerald-600 text-white px-5 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-slate-700"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          <span className="text-xs font-bold">Ask AI Saathi</span>
        </button>
      </div>
    </div>
  );
}
