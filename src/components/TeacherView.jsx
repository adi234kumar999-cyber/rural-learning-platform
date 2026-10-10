import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { mockStudents, translations } from '../data/mockData';

export function TeacherView({ lang }) {
  const t = translations[lang] || translations['en'];
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'generator'
  const [students, setStudents] = useState(mockStudents);
  const [assignedRemedial, setAssignedRemedial] = useState({});
  const [copyStatus, setCopyStatus] = useState(false);

  // AI Question Generator State
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('Fractions (भिन्न)');
  const [grade, setGrade] = useState('Class 7');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([
    {
      q: "If 5 out of 20 mangoes are spoiled, what is the fraction of spoiled mangoes?",
      options: ["1/4", "1/5", "5/10", "4/1"],
      answer: "1/4",
      explanation: "5 / 20 simplified equals 1/4."
    },
    {
      q: "Which fraction is greater: 3/5 or 4/5?",
      options: ["3/5", "4/5", "Both are equal", "None of these"],
      answer: "4/5",
      explanation: "When denominators are equal, the fraction with the larger numerator is greater."
    }
  ]);

  const handleAssignRemedial = (studentId, studentName) => {
    setAssignedRemedial({
      ...assignedRemedial,
      [studentId]: true
    });
  };

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      if (topic.includes('Fraction') || topic.includes('भिन्न')) {
        setGeneratedQuestions([
          {
            q: "Ramu cultivated wheat on 1/3 of his field and gram on 1/3. What fraction is cultivated in total?",
            options: ["2/3", "1/6", "2/6", "3/3"],
            answer: "2/3",
            explanation: "1/3 + 1/3 = (1+1)/3 = 2/3."
          },
          {
            q: "A fraction has numerator 7 and denominator 10. Write the fraction:",
            options: ["10/7", "7/10", "17/10", "70/100"],
            answer: "7/10",
            explanation: "Numerator on top, denominator below = 7/10."
          },
          {
            q: "Convert 2 ½ into an improper fraction:",
            options: ["5/2", "3/2", "4/2", "5/4"],
            answer: "5/2",
            explanation: "(2 × 2 + 1)/2 = 5/2."
          }
        ]);
      } else {
        setGeneratedQuestions([
          {
            q: "Through which leaf pores do plants take in Carbon Dioxide?",
            options: ["Stomata (रंध्र)", "Xylem", "Chlorophyll", "Roots"],
            answer: "Stomata (रंध्र)",
            explanation: "Tiny microscopic pores called stomata allow gas exchange."
          },
          {
            q: "What else is required for photosynthesis besides sunlight?",
            options: ["Water & CO2", "Only Soil", "Only Oxygen", "Nitrogen"],
            answer: "Water & CO2",
            explanation: "Water and carbon dioxide are the core chemical reactants."
          }
        ]);
      }
      setIsGenerating(false);
    }, 700);
  };

  const handleCopyQuestions = () => {
    const text = generatedQuestions.map((q, i) => `${i+1}. ${q.q}\nOptions: ${q.options.join(', ')}\nAns: ${q.answer}\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100/80 px-3 py-1 rounded-full border border-upnavy-200">
              Teacher Analytics
            </span>
            <span className="text-xs text-slate-400">Class 7A • Math & Science</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight">
            Mr. R.K. Sharma
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Govt Upper Primary School Rampur • Academic Year 2026-27
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'overview' ? 'bg-upnavy-800 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-upnavy-900'}`}
          >
            Class Overview
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'generator' ? 'bg-upnavy-800 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-upnavy-900'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-upsaffron-400" />
            <span>AI Quiz Generator</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-upnavy-800" />
          </div>
          <div className="text-2xl font-black text-upnavy-950">42</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Class 7A Cohort</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Class Average</span>
            <BarChart3 className="w-4 h-4 text-upsaffron-600" />
          </div>
          <div className="text-2xl font-black text-upsaffron-600">68%</div>
          <div className="text-[11px] text-upnavy-800 font-bold mt-1">+6% this month</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Needs Attention</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">3</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">Score &lt; 50% in test</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Offline Syncs</span>
            <RefreshCw className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-700">14</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">PWA Caches pushed</div>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & WEAK TOPICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Class Weak Topics Radar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-upnavy-950">
                  Class-Wide Weak Topics Heatmap
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated automatically from student diagnostic tests and practice quizzes
                </p>
              </div>
              <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100 px-3 py-1 rounded-full border border-upnavy-200">
                AI Diagnostics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-rose-950">Fractions (भिन्न)</span>
                  <span className="font-black text-rose-700">64% Weak</span>
                </div>
                <div className="w-full bg-rose-200/70 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-600 h-1.5 rounded-full" style={{ width: '64%' }} />
                </div>
                <p className="text-[11px] text-slate-600">27 students struggling with adding unequal denominators.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-950">Percentages (प्रतिशत)</span>
                  <span className="font-black text-amber-700">52% Weak</span>
                </div>
                <div className="w-full bg-amber-200/70 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '52%' }} />
                </div>
                <p className="text-[11px] text-slate-600">22 students need practice converting fractions to %.</p>
              </div>

              <div className="p-4 rounded-2xl bg-upnavy-50/60 border border-upnavy-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-upnavy-950">Decimals (दशमलव)</span>
                  <span className="font-black text-upnavy-800">18% Weak</span>
                </div>
                <div className="w-full bg-upnavy-200/70 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-upnavy-800 h-1.5 rounded-full" style={{ width: '18%' }} />
                </div>
                <p className="text-[11px] text-slate-600">Majority mastered decimal place additions.</p>
              </div>
            </div>
          </div>

          {/* Students Needing Attention */}
          <div className="bg-white rounded-3xl border border-slate-200/70 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Students Needing Intervention
                </h3>
                <p className="text-xs text-slate-500">
                  Flagged by AI based on lowest diagnostic scores
                </p>
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                3 Students Flagged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-5 py-3">Student Name</th>
                    <th className="px-5 py-3">Diagnostic Score</th>
                    <th className="px-5 py-3">Weak Topics</th>
                    <th className="px-5 py-3">Last Active</th>
                    <th className="px-5 py-3 text-right">Intervention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map(s => {
                    const isAssigned = assignedRemedial[s.id];
                    return (
                      <tr key={s.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5 font-bold text-slate-900">
                          {s.name}
                          <span className="text-[10px] text-slate-400 block font-normal">Roll {s.rollNo}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            s.overallScore < 50 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {s.overallScore}%
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                            {s.weakTopics.join(', ') || 'Mastered'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 text-[11px]">{s.lastActive}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleAssignRemedial(s.id, s.name)}
                            disabled={isAssigned}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                              isAssigned
                                ? 'bg-upnavy-100 text-upnavy-900 border border-upnavy-300'
                                : 'bg-upsaffron-600 hover:bg-upsaffron-700 text-white shadow-upsaffron-600/30 active:scale-95'
                            }`}
                          >
                            {isAssigned ? 'Assigned ✓' : 'Assign Quiz'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI QUESTION GENERATOR */}
      {activeTab === 'generator' && (
        <div className="bg-white rounded-3xl border border-slate-200/70 p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-upnavy-950">
              AI Classroom Question Generator
            </h3>
            <p className="text-xs text-slate-500">
              Generate localized quiz questions with answer keys in seconds for homework or paper tests
            </p>
          </div>

          <form onSubmit={handleGenerateQuestions} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Class Grade</label>
              <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white">
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white">
                <option>Mathematics</option>
                <option>Science</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Topic</label>
              <select value={topic} onChange={e => setTopic(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white">
                <option>Fractions (भिन्न)</option>
                <option>Percentages (प्रतिशत)</option>
                <option>Photosynthesis</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-2.5 px-4 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs shadow-upsaffron-600/30 transition active:scale-95 disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating...' : 'Generate Questions'}</span>
              </button>
            </div>
          </form>

          {/* Generated Questions List */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-upnavy-950">Generated Questions for {topic}</span>
              <button
                onClick={handleCopyQuestions}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition font-semibold"
              >
                {copyStatus ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copyStatus ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {generatedQuestions.map((gq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-2">
                <div className="font-bold text-slate-900">{idx + 1}. {gq.q}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {gq.options.map((opt, oIdx) => (
                    <div key={oIdx} className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-slate-700">
                      <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-upnavy-950 bg-upnavy-50/90 px-3 py-1.5 rounded-xl border border-upnavy-200">
                  <strong>Answer:</strong> {gq.answer} • <em>{gq.explanation}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
