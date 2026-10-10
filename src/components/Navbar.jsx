import React from 'react';
import { 
  Wifi, 
  WifiOff, 
  Zap, 
  Globe, 
  UserCheck, 
  Layers, 
  Download, 
  RefreshCw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { translations } from '../data/mockData';

export function Navbar({ 
  role, 
  setRole, 
  lang, 
  setLang, 
  isOffline, 
  setIsOffline, 
  isLowData, 
  setIsLowData,
  pendingSyncCount,
  onSyncNow,
  downloadedCount,
  onOpenDownloads,
  onOpenArchitecture
}) {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-sm transition-all">
      {/* Top Emergency / Rural Network Info Bar */}
      <div className={`px-4 py-1.5 text-xs font-medium flex items-center justify-between transition-colors ${
        isOffline 
          ? 'bg-amber-600 text-amber-50' 
          : isLowData 
            ? 'bg-emerald-700 text-emerald-50' 
            : 'bg-gradient-to-r from-emerald-800 to-teal-900 text-white'
      }`}>
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold">
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                  <span>{t.offline} (Local-First IndexedDB Active)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{t.online} • Rural 2G/3G Optimized</span>
                </>
              )}
            </span>

            {isLowData && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-[11px]">
                <Zap className="w-3 h-3 text-amber-300" />
                <span>Text+Audio Mode (&lt;40 KB/lesson)</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {pendingSyncCount > 0 && (
              <button
                onClick={onSyncNow}
                className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded text-[11px] shadow transition active:scale-95 animate-pulse"
                title="Click to push offline quiz results to school database"
              >
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>{pendingSyncCount} {lang === 'hi' ? 'क्विज़ सिंक बाकी' : 'Pending Sync'}</span>
              </button>
            )}

            <button 
              onClick={onOpenArchitecture}
              className="text-[11px] text-amber-200 hover:text-white underline decoration-dotted flex items-center gap-1"
            >
              <Layers className="w-3 h-3" />
              <span className="hidden md:inline">Project Architecture (Major Viva)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
                {t.appName}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                Rural EdTech
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Low Data Mode Toggle */}
          <button
            onClick={() => setIsLowData(!isLowData)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition shadow-sm ${
              isLowData
                ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/40'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle between rich media and ultra-lightweight text+audio for slow internet"
          >
            <Zap className={`w-3.5 h-3.5 ${isLowData ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden md:inline">{isLowData ? t.lowDataOn : t.lowDataOff}</span>
            <span className="md:hidden">{isLowData ? 'Low Data' : 'Normal'}</span>
          </button>

          {/* Network Simulator Toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition shadow-sm ${
              isOffline
                ? 'bg-rose-100 text-rose-900 border-rose-300 ring-2 ring-rose-400/40'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Simulate losing internet to demo offline PWA functionality"
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-rose-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isOffline ? 'Offline (Simulated)' : 'Online (Demo)'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 flex items-center gap-1.5 transition"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Role Switcher */}
          <div className="relative inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-300">
            <button
              onClick={() => setRole('student')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                role === 'student'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 {lang === 'hi' ? 'छात्र' : 'Student'}
            </button>
            <button
              onClick={() => setRole('teacher')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                role === 'teacher'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👨‍🏫 {lang === 'hi' ? 'अध्यापक' : 'Teacher'}
            </button>
            <button
              onClick={() => setRole('parent')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition ${
                role === 'parent'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📱 {lang === 'hi' ? 'SMS' : 'Parent'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
