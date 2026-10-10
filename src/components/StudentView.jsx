import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Award, 
  Download, 
  Play, 
  Flame, 
  BookOpen, 
  Check, 
  Zap, 
  Filter,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { translations, sampleCourses } from '../data/mockData';

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
  const t = translations[lang];
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [filterOfflineOnly, setFilterOfflineOnly] = useState(false);

  const filteredCourses = sampleCourses.filter(c => {
    if (selectedSubject !== 'all' && c.subject !== selectedSubject) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Welcome & Gamification Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/30 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                {lang === 'hi' ? 'शासकीय उच्च प्राथमिक विद्यालय' : 'Govt Model Upper Primary School'}
              </span>
              <span className="text-[11px] text-emerald-200">Class 7A • Roll No. 24</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {lang === 'hi' ? 'स्वागत है, रोहन वर्मा! 👋' : 'Welcome back, Rohan Verma! 👋'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {lang === 'hi' 
                ? 'कम इंटरनेट में भी बिना रुके सीखें। आज का लक्ष्य: भिन्न (Fractions) के प्रश्नों का अभ्यास।'
                : 'Learn uninterrupted under slow network. Today\'s goal: Practice Fractions & Decimals.'}
            </p>
          </div>

          {/* Gamification Stats */}
          <div className="flex items-center gap-2.5 sm:gap-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-base sm:text-lg">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
                <span>{studentStats.streakDays}</span>
              </div>
              <div className="text-[10px] text-slate-300 font-medium">
                {lang === 'hi' ? 'दिन स्ट्रीक' : 'Day Streak'}
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-emerald-300 font-black text-base sm:text-lg">
                <Award className="w-4 h-4 text-emerald-300" />
                <span>{studentStats.pointsXP}</span>
              </div>
              <div className="text-[10px] text-slate-300 font-medium">
                XP Points
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="text-cyan-300 font-black text-base sm:text-lg">
                {downloadedIds.length}
              </div>
              <div className="text-[10px] text-slate-300 font-medium">
                {lang === 'hi' ? 'ऑफ़लाइन' : 'Downloaded'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Diagnostic Assessment & AI Remedial Banner (Core Project Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Diagnostic Status Card */}
        <div className="md:col-span-1 bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                {t.diagnosticTitle}
              </span>
              <Brain className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              {diagnosticData.completed 
                ? (lang === 'hi' ? 'दक्षता स्तर जांच पूर्ण' : 'Baseline Assessment: Evaluated')
                : (lang === 'hi' ? 'प्रारंभिक जांच लंबित' : 'Baseline Assessment: Pending')}
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {diagnosticData.completed 
                ? (lang === 'hi' 
                    ? `पहचाने गए कमजोर विषय: ${diagnosticData.weakTopics.join(', ') || 'कोई नहीं'}`
                    : `Identified focus areas: ${diagnosticData.weakTopics.join(', ') || 'None'}`)
                : t.diagnosticDesc}
            </p>
          </div>

          <button
            onClick={onOpenDiagnostic}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>{diagnosticData.completed ? (lang === 'hi' ? 'जांच पुनः दें' : 'Retake Diagnostic') : t.startDiagnostic}</span>
          </button>
        </div>

        {/* AI Personalized Remedial Path Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50/70 p-5 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                  {t.recommendedTitle}
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Adaptive AI Engine
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              {t.basedOnDiagnostic}
            </p>

            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-200/80 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-0.5">
                    {lang === 'hi' 
                      ? 'प्राथमिकता: भिन्न (Fractions) के मूल सिद्धांत दोहराएं'
                      : 'Priority: Review Fractions & Equivalent Parts'}
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {lang === 'hi'
                      ? 'अनुशंसा: प्रतिशत (Percentage) शुरू करने से पहले भिन्न के 3 अभ्यास प्रश्न पूरे करें।'
                      : 'Recommendation: Master Fractions Chapter 1 before advancing to Percentages.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-200/50">
            <span className="text-[11px] text-emerald-800 font-medium">
              {lang === 'hi' ? 'सुझाए गए पाठ का आकार: 24 KB (कम डेटा मोड में अनुकूलित)' : 'Lesson download size: 24 KB (Optimized for 2G)'}
            </span>
            <button
              onClick={() => onOpenLesson(sampleCourses[0].chapters[0])}
              className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <span>{lang === 'hi' ? 'सुझाया गया पाठ पढ़ें' : 'Start Remedial Lesson'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Subject Progress Overview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>{lang === 'hi' ? 'विषयवार प्रगति' : 'Learning Progress'}</span>
          <span className="text-xs text-slate-500 font-normal">Class 7 NCERT Curriculum</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-amber-900">{lang === 'hi' ? 'गणित' : 'Mathematics'}</span>
              <span className="text-amber-700">{studentStats.subjectProgress.math}%</span>
            </div>
            <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${studentStats.subjectProgress.math}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-emerald-900">{lang === 'hi' ? 'विज्ञान' : 'Science'}</span>
              <span className="text-emerald-700">{studentStats.subjectProgress.science}%</span>
            </div>
            <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${studentStats.subjectProgress.science}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-sky-900">{lang === 'hi' ? 'अंग्रेजी' : 'English'}</span>
              <span className="text-sky-700">{studentStats.subjectProgress.english}%</span>
            </div>
            <div className="w-full bg-sky-200/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-sky-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${studentStats.subjectProgress.english}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Course Catalog / Chapters */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.courses}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'hi' ? 'ऑफ़लाइन अध्ययन हेतु अध्याय डाउनलोड करें और कभी भी पढ़ें' : 'Download chapters to study offline anytime'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter by Offline only */}
            <button
              onClick={() => setFilterOfflineOnly(!filterOfflineOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                filterOfflineOnly
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'केवल डाउनलोडेड' : 'Offline Only'}</span>
            </button>

            {/* Subject Filter Pills */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-2.5 py-1 rounded-md font-semibold ${selectedSubject === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                {t.allSubjects}
              </button>
              <button
                onClick={() => setSelectedSubject('math')}
                className={`px-2.5 py-1 rounded-md font-semibold ${selectedSubject === 'math' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                {t.math}
              </button>
              <button
                onClick={() => setSelectedSubject('science')}
                className={`px-2.5 py-1 rounded-md font-semibold ${selectedSubject === 'science' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                {t.science}
              </button>
            </div>
          </div>
        </div>

        {/* Chapters Grid */}
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
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {course.title[lang]}
                          </span>
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                            <Zap className="w-3 h-3 text-amber-500" />
                            <span>{chapter.sizeKB} KB</span>
                          </div>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 mb-1">
                          {chapter.title[lang]}
                        </h4>
                        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                          {chapter.summary[lang]}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onToggleDownload(chapter.id)}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                            isDownloaded
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          title={isDownloaded ? 'Downloaded to IndexedDB' : 'Download for offline use'}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="text-[11px]">
                            {isDownloaded ? (lang === 'hi' ? 'सहेजा गया' : 'Saved') : (lang === 'hi' ? 'डाउनलोड' : 'Download')}
                          </span>
                        </button>

                        <button
                          onClick={() => onOpenLesson(chapter)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition"
                        >
                          <span>{lang === 'hi' ? 'पाठ पढ़ें व क्विज़' : 'Study Lesson'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Floating AI Doubt Saathi Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={onOpenAiSaathi}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition duration-200 border-2 border-white/50"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-black leading-tight">
              {lang === 'hi' ? 'ज्ञान साथी AI' : 'AI Doubt Saathi'}
            </div>
            <div className="text-[10px] text-emerald-100 font-medium leading-tight">
              {lang === 'hi' ? 'शंका पूछें (Hindi/Eng)' : 'Instant rural doubt solver'}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
