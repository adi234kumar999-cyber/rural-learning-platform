import React, { useState } from 'react';
import { 
  School, 
  Users, 
  Server, 
  HardDrive, 
  ShieldCheck, 
  Wifi, 
  BookOpen, 
  CheckCircle, 
  Database,
  Layers,
  Cpu,
  RefreshCw
} from 'lucide-react';

export function AdminView({ lang }) {
  const [isEdgeSyncing, setIsEdgeSyncing] = useState(false);
  const [edgeStatus, setEdgeStatus] = useState('Broadcasting via School Wi-Fi (No Internet Required)');

  const handleTriggerEdgeSync = () => {
    setIsEdgeSyncing(true);
    setTimeout(() => {
      setIsEdgeSyncing(false);
      setEdgeStatus('Synced with District Cloud Repository (All 128 Student Records Updated)');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-indigo-500/20 text-indigo-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/30">
              {lang === 'hi' ? 'विद्यालय प्रशासन व सर्वर प्रबंधन' : 'School Administration & Edge Hub'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              {lang === 'hi' ? 'डॉ. अनीता देशमुख (प्रधानाध्यापिका)' : 'Dr. Anita Deshmukh (Headmistress)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Govt Model Senior Secondary School Rampur • U-DISE: 09280104502
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-400/30 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Edge Server Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Key Administrative Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'कुल ग्रामीण छात्र' : 'Total Enrolled'}</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">128</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Classes 6 to 10</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'शिक्षक स्टाफ' : 'Teaching Faculty'}</span>
            <School className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-700">8</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">100% Verified</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'सक्रिय PWA टैबलेट्स' : 'Active PWA Devices'}</span>
            <HardDrive className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">34</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Synced to Local Edge</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'लोकल कैश फुटप्रिंट' : 'Local Edge Cache'}</span>
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-700">4.2 GB</div>
          <div className="text-[11px] text-sky-600 font-semibold mt-1">Full Curriculum Offline</div>
        </div>
      </div>

      {/* 3. Rural Edge / Community Offline Server Control (Major Innovation from Project Doc) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                School Community Offline Server (Raspberry Pi / Edge Node)
              </h3>
              <p className="text-xs text-slate-500">
                Local Wi-Fi distribution enabling zero-data student downloads across school grounds
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerEdgeSync}
            disabled={isEdgeSyncing}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEdgeSyncing ? 'animate-spin' : ''}`} />
            <span>{isEdgeSyncing ? 'Syncing...' : 'Sync Edge with District Cloud'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-indigo-950 font-medium">
            <Wifi className="w-4 h-4 text-indigo-700 shrink-0" />
            <span><strong>Status:</strong> {edgeStatus}</span>
          </div>
          <span className="text-[10px] font-bold bg-white text-indigo-800 px-2.5 py-1 rounded-md border border-indigo-200 shrink-0">
            Node: RAMPUR-EDGE-01
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-800 mb-1">Class 6–8 Mathematics</div>
            <div className="text-[11px] text-slate-500">All 14 chapters cached in 10 languages</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">✓ Ready for Local Wi-Fi sync</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-800 mb-1">Class 6–8 Science</div>
            <div className="text-[11px] text-slate-500">18 interactive lessons + audio summaries</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">✓ Ready for Local Wi-Fi sync</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-800 mb-1">Language Dictionaries</div>
            <div className="text-[11px] text-slate-500">Hindi, Marathi, Bengali, Telugu, Tamil, etc.</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">✓ 100% Cached Locally</div>
          </div>
        </div>
      </div>
    </div>
  );
}
