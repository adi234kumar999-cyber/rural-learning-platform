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
  ChevronRight
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
    <div className="space-y-6 pb-24 max-w-6xl mx-auto">
      {/* 1. Sleek Modern Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                Class 7A • Roll 24
              </span>
              <span className="text-xs text-slate-400">Govt Upper Primary School Rampur</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {lang === 'hi' ? 'नमस्ते, रोहन! 👋' : 'Welcome back, Rohan! 👋'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
              {lang === 'hi' 
                ? 'कम इंटरनेट पर भी बिना रुकावट सीखें। आज का लक्ष्य: भिन्न (Fractions) का अभ्यास।'
                : 'Learn seamlessly even with slow 2G/3G connectivity. Today\'s priority: Fractions & Decimals.'}
            </p>
          </div>

          {/* Minimalist Stats Pill Bar */}
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/60 self-start md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl shadow-2xs border border-slate-100">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <div>
                <div className="text-xs font-black text-slate-900 leading-none">{studentStats.streakDays} Days</div>
                <div className="text-[10px] text-slate-400 font-medium">Streak</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl shadow-2xs border border-slate-100">
              <Award className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-xs font-black text-slate-900 leading-none">{studentStats.pointsXP} XP</div>
                <div className="text-[10px] text-slate-400 font-medium">Earned</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl shadow-2xs border border-slate-100">
              <Download className="w-4 h-4 text-cyan-600" />
              <div>
                <div className="text-xs font-black text-slate-900 leading-none">{downloadedIds.length} Cached</div>
                <div className="text-[10px] text-slate-400 font-medium">Offline</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation Banner: Compact modern callout */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/80">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                AI Next Step
              </span>
              <p className="text-xs font-semibold text-slate-800">
                {lang === 'hi' 
                  ? 'प्रतिशत शुरू करने से पहले "भिन्न (Fractions) पाठ 1" दोहराएं।'
                  : 'Master "Fractions Chapter 1" before starting Percentages.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenLesson(sampleCourses[0].chapters[0])}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>Resume Lesson</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Modern Tab Navigation (Reduces screen clutter drastically) */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Courses & Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('remedial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'remedial'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Diagnostic & Weak Topics</span>
            {diagnosticData.weakTopics.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'progress'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Subject Progress</span>
          </button>
        </div>

        {/* Quick Diagnostic Assessment Action */}
        <button
          onClick={onOpenDiagnostic}
          className="text-xs text-amber-700 hover:text-amber-900 font-bold hidden sm:flex items-center gap-1 hover:underline"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Retake Diagnostic Test</span>
        </button>
      </div>

      {/* TAB 1: COURSES & LESSONS */}
      {activeTab === 'courses' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/60 shadow-xs">
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${selectedSubject === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedSubject('math')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${selectedSubject === 'math' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Mathematics
              </button>
              <button
                onClick={() => setSelectedSubject('science')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${selectedSubject === 'science' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Science
              </button>
            </div>

            <button
              onClick={() => setFilterOfflineOnly(!filterOfflineOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                filterOfflineOnly
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Offline Ready Only</span>
            </button>
          </div>

          {/* Chapter Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map(course => (
              <React.Fragment key={course.id}>
                {course.chapters
                  .filter(ch => !filterOfflineOnly || downloadedIds.includes(ch.id))
                  .map(chapter => {
                    const isDownloaded = downloadedIds.includes(chapter.id);
                    return (
                      <div 
                        key={chapter.id}
                        className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                              {getLocalized(course.title, lang)}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                              <Zap className="w-3 h-3 text-amber-500" />
                              <span>{chapter.sizeKB} KB</span>
                            </div>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition">
                            {getLocalized(chapter.title, lang)}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {getLocalized(chapter.summary, lang)}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => onToggleDownload(chapter.id)}
                            className={`p-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                              isDownloaded
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                            title={isDownloaded ? 'Cached in device storage' : 'Save for offline'}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{isDownloaded ? 'Downloaded' : 'Save Offline'}</span>
                          </button>

                          <button
                            onClick={() => onOpenLesson(chapter)}
                            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition"
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

      {/* TAB 2: DIAGNOSTIC & REMEDIAL PATH */}
      {activeTab === 'remedial' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Diagnostic Mastery Map
                </h3>
                <p className="text-xs text-slate-500">
                  Topic-wise proficiency calculated from your baseline diagnostic assessment
                </p>
              </div>
              <button
                onClick={onOpenDiagnostic}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-xl text-xs shadow-xs transition"
              >
                Retake Assessment
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-rose-950">Fractions (भिन्न)</span>
                  <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">Weak Focus</span>
                </div>
                <p className="text-xs text-slate-600">
                  Scored &lt;50% in foundational addition of fractions. Remedial lesson assigned.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-amber-950">Percentages (प्रतिशत)</span>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">In Progress</span>
                </div>
                <p className="text-xs text-slate-600">
                  Prerequisite lock: Complete Fractions Chapter 1 to unlock Percentages practice.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-emerald-950">Decimals (दशमलव)</span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Mastered (90%)</span>
                </div>
                <p className="text-xs text-slate-600">
                  High proficiency in comparing decimal place values.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-emerald-950">Geometry Basics</span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Good (75%)</span>
                </div>
                <p className="text-xs text-slate-600">
                  Accurately calculated perimeters of square fields.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBJECT PROGRESS */}
      {activeTab === 'progress' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Curriculum Progress
            </h3>
            <p className="text-xs text-slate-500">
              Class 7 NCERT Curriculum completion rate
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-900">Mathematics</span>
                <span className="text-emerald-700">{studentStats.subjectProgress.math}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.math}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-900">Science</span>
                <span className="text-emerald-700">{studentStats.subjectProgress.science}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.science}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-900">English</span>
                <span className="text-emerald-700">{studentStats.subjectProgress.english}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.english}%` }} />
              </div>
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
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">Ask AI Saathi</span>
        </button>
      </div>
    </div>
  );
}
