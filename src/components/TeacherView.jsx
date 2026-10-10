import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  AlertTriangle, 
  Sparkles, 
  PlusCircle, 
  Send, 
  CheckCircle2, 
  BookOpen, 
  Brain, 
  Download, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { mockStudents } from '../data/mockData';

export function TeacherView({ lang }) {
  const [students, setStudents] = useState(mockStudents);
  const [assignedRemedial, setAssignedRemedial] = useState({});
  const [copyStatus, setCopyStatus] = useState(false);

  // AI Question Generator State
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('Fractions (भिन्न)');
  const [grade, setGrade] = useState('Class 7');
  const [numQuestions, setNumQuestions] = useState(3);
  const [difficulty, setDifficulty] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([
    {
      q: lang === 'hi' ? "यदि 20 आमों में से 5 आम खराब निकलें, तो खराब आमों की भिन्न क्या होगी?" : "If 5 out of 20 mangoes are spoiled, what is the fraction of spoiled mangoes?",
      options: ["1/4", "1/5", "5/10", "4/1"],
      answer: "1/4",
      explanation: lang === 'hi' ? "5 / 20 को सरल करने पर 1/4 प्राप्त होता है।" : "5 / 20 simplified equals 1/4."
    },
    {
      q: lang === 'hi' ? "3/5 और 4/5 में से कौन सी भिन्न बड़ी है?" : "Which fraction is greater: 3/5 or 4/5?",
      options: ["3/5", "4/5", "दोनों बराबर हैं", "इनमें से कोई नहीं"],
      answer: "4/5",
      explanation: lang === 'hi' ? "जब हर समान होते हैं, तो बड़े अंश वाली भिन्न बड़ी होती है।" : "When denominators are equal, the fraction with the larger numerator is greater."
    }
  ]);

  const handleAssignRemedial = (studentId, studentName) => {
    setAssignedRemedial({
      ...assignedRemedial,
      [studentId]: true
    });
    alert(lang === 'hi' 
      ? `${studentName} को उपचारात्मक (Remedial) क्विज़ सफलतापूर्वक असाइन कर दिया गया!` 
      : `Remedial practice quiz assigned to ${studentName}!`);
  };

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      if (topic.includes('Fraction') || topic.includes('भिन्न')) {
        setGeneratedQuestions([
          {
            q: lang === 'hi' ? "रामू ने 1/3 खेत में गेहूं और 1/3 में चना बोया। कुल कितना खेत बोया गया?" : "Ramu cultivated wheat on 1/3 of his land and gram on 1/3. What fraction is cultivated in total?",
            options: ["2/3", "1/6", "2/6", "3/3"],
            answer: "2/3",
            explanation: lang === 'hi' ? "1/3 + 1/3 = (1+1)/3 = 2/3 भाग।" : "1/3 + 1/3 = 2/3."
          },
          {
            q: lang === 'hi' ? "किसी भिन्न का अंश 7 और हर 10 है। वह भिन्न क्या होगी?" : "A fraction has numerator 7 and denominator 10. Write the fraction:",
            options: ["10/7", "7/10", "17/10", "70/100"],
            answer: "7/10",
            explanation: lang === 'hi' ? "अंश ऊपर और हर नीचे लिखा जाता है = 7/10." : "Numerator on top, denominator below = 7/10."
          },
          {
            q: lang === 'hi' ? "2 सही 1/2 (2 ½) को विषम भिन्न (Improper fraction) में बदलिए:" : "Convert 2 ½ into an improper fraction:",
            options: ["5/2", "3/2", "4/2", "5/4"],
            answer: "5/2",
            explanation: lang === 'hi' ? "(2 × 2 + 1)/2 = 5/2." : "(2 × 2 + 1)/2 = 5/2."
          }
        ]);
      } else {
        setGeneratedQuestions([
          {
            q: lang === 'hi' ? "पौधे पत्तियों में मौजूद किस छिद्र से कार्बन डाइऑक्साइड गैस लेते हैं?" : "Through which leaf pores do plants take in Carbon Dioxide?",
            options: ["रंध्र (Stomata)", "जाइलम", "क्लोरोफिल", "जड़"],
            answer: lang === 'hi' ? "रंध्र (Stomata)" : "Stomata",
            explanation: lang === 'hi' ? "पत्तियों की सतह पर छोटे-छोटे रंध्र (Stomata) होते हैं।" : "Tiny microscopic pores called stomata allow gas exchange."
          },
          {
            q: lang === 'hi' ? "प्रकाश संश्लेषण के लिए सूर्य के प्रकाश के अलावा क्या आवश्यक है?" : "What else is required for photosynthesis besides sunlight?",
            options: ["जल एवं CO2", "केवल मिट्टी", "केवल ऑक्सीजन", "नाइट्रोजन"],
            answer: lang === 'hi' ? "जल एवं CO2" : "Water & CO2",
            explanation: lang === 'hi' ? "जल और कार्बन डाइऑक्साइड मुख्य कच्चे माल हैं।" : "Water and carbon dioxide are the core chemical reactants."
          }
        ]);
      }
      setIsGenerating(false);
    }, 800);
  };

  const handleCopyQuestions = () => {
    const text = generatedQuestions.map((q, i) => `${i+1}. ${q.q}\nOptions: ${q.options.join(', ')}\nAns: ${q.answer}\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white rounded-2xl p-5 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              {lang === 'hi' ? 'शिक्षक निगरानी पोर्टल' : 'Teacher Monitoring Dashboard'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              {lang === 'hi' ? 'श्री आर.के. शर्मा (वरिष्ठ अध्यापक)' : 'Mr. R.K. Sharma (Lead Teacher)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === 'hi' 
                ? 'शासकीय उच्च प्राथमिक विद्यालय रामपुर • कक्षा 7 गणित एवं विज्ञान'
                : 'Govt Upper Primary School Rampur • Class 7 Math & Science'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold text-emerald-200">
              Academic Year 2026-27
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'कुल नामांकित विद्यार्थी' : 'Total Students'}</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">42</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            {lang === 'hi' ? '100% ग्रामीण क्षेत्र' : 'Class 7A Cohort'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'कक्षा का औसत स्कोर' : 'Class Average Score'}</span>
            <BarChart3 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">68%</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            {lang === 'hi' ? '+6% पिछले माह से वृद्धि' : '+6% improvement from baseline'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'विशेष ध्यान योग्य छात्र' : 'Needing Attention'}</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">3</div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            {lang === 'hi' ? 'स्कोर < 50% (उपचारात्मक आवश्यक)' : 'Scoring < 50% in diagnostic'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{lang === 'hi' ? 'आज ऑफ़लाइन सिंक' : 'Offline Syncs Today'}</span>
            <RefreshCw className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-700">14</div>
          <div className="text-[11px] text-sky-600 font-semibold mt-1">
            {lang === 'hi' ? 'लोकल PWA से डेटा प्राप्त' : 'Synced from device caches'}
          </div>
        </div>
      </div>

      {/* 3. Class-wide Weak Topics Heatmap (From Project PDF) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'कक्षा के कमजोर विषय (Class-wide Weak Topics)' : 'Class-wide Weak Topics Heatmap'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'hi' ? 'प्रारंभिक जांच और क्विज़ परिणामों के आधार पर' : 'Aggregated from Diagnostic Tests & Chapter Quizzes'}
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
            AI Analytics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-rose-950">Fractions (भिन्न)</span>
              <span className="text-xs font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded">64% Weak</span>
            </div>
            <p className="text-[11px] text-slate-600 mb-3">
              {lang === 'hi' ? '27 विद्यार्थी असमान हर वाले भिन्नों को जोड़ने में उलझ रहे हैं।' : '27 students struggling with adding unequal denominators.'}
            </p>
            <div className="w-full bg-rose-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-600 h-1.5 rounded-full" style={{ width: '64%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-amber-950">Percentages (प्रतिशत)</span>
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded">52% Weak</span>
            </div>
            <p className="text-[11px] text-slate-600 mb-3">
              {lang === 'hi' ? '22 विद्यार्थियों को भिन्न से प्रतिशत बदलने में कठिनाई है।' : '22 students need practice converting fractions to %.'}
            </p>
            <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '52%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-slate-900">Decimals (दशमलव)</span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">18% Weak</span>
            </div>
            <p className="text-[11px] text-slate-600 mb-3">
              {lang === 'hi' ? 'अधिकांश छात्रों ने दशमलव के जोड़-घटाव में महारत हासिल की।' : 'Majority of students showed high baseline proficiency.'}
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Students Needing Attention (Directly from Project Document) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'hi' ? 'विशेष ध्यान योग्य विद्यार्थी (Students Needing Attention)' : 'Students Needing Individual Attention'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'hi' ? 'जिनका स्कोर 50% से कम है और उपचारात्मक अभ्यास की आवश्यकता है' : 'Targeted interventions for lowest scoring students'}
            </p>
          </div>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            {lang === 'hi' ? '3 विद्यार्थी चिन्हित' : '3 Flagged by AI'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="px-5 py-3">Roll & Name</th>
                <th className="px-5 py-3">Diagnostic Score</th>
                <th className="px-5 py-3">Weak Topics</th>
                <th className="px-5 py-3">Last Active</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {students.map(s => {
                const isAssigned = assignedRemedial[s.id];
                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[11px] text-slate-400">Roll: {s.rollNo} • {s.classGrade}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        s.overallScore < 50 
                          ? 'bg-rose-100 text-rose-800' 
                          : s.overallScore < 75 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {s.overallScore}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {s.weakTopics.length > 0 ? (
                          s.weakTopics.map((wt, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]">
                              {wt}
                            </span>
                          ))
                        ) : (
                          <span className="text-emerald-700 text-[10px] font-semibold">None (Mastered)</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-[11px]">
                      {s.lastActive}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleAssignRemedial(s.id, s.name)}
                        disabled={isAssigned}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
                          isAssigned
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                        }`}
                      >
                        {isAssigned ? (
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>{lang === 'hi' ? 'असाइन किया गया' : 'Assigned'}</span>
                          </span>
                        ) : (
                          lang === 'hi' ? 'उपचारात्मक क्विज़ भेजें' : 'Assign Remedial'
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. AI Question Generator for Teachers (Core AI Requirement) */}
      <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-2xl border border-amber-200/80 p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'hi' ? 'एआई प्रश्न निर्माता (AI Question Generator)' : 'AI Question Generator for Teachers'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'hi' ? 'कक्षा और विषय चुनें, एआई कुछ ही सेकंड में नए प्रश्न तैयार करेगा' : 'Generate localized questions for tests or offline printouts'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 w-fit">
            FastAPI + LLM Backend Powered
          </span>
        </div>

        {/* Generator Controls */}
        <form onSubmit={handleGenerateQuestions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Class Grade</label>
            <select 
              value={grade} 
              onChange={e => setGrade(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject</label>
            <select 
              value={subject} 
              onChange={e => setSubject(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option>Mathematics</option>
              <option>Science</option>
              <option>Hindi</option>
              <option>English</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Topic</label>
            <select 
              value={topic} 
              onChange={e => setTopic(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option>Fractions (भिन्न)</option>
              <option>Percentages (प्रतिशत)</option>
              <option>Photosynthesis (प्रकाश संश्लेषण)</option>
              <option>Geometry (क्षेत्रमिति)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Difficulty</label>
            <select 
              value={difficulty} 
              onChange={e => setDifficulty(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option>Easy (Foundational)</option>
              <option>Medium (Standard)</option>
              <option>Hard (Challenging)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-40"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating...' : (lang === 'hi' ? 'प्रश्न बनाएं' : 'Generate Qs')}</span>
            </button>
          </div>
        </form>

        {/* Results Output */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-800">
              {lang === 'hi' ? `एआई द्वारा निर्मित प्रश्न: ${topic}` : `AI Generated Questions for ${topic}`}
            </div>
            <button
              onClick={handleCopyQuestions}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition"
            >
              {copyStatus ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyStatus ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {generatedQuestions.map((gq, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800">
                  {idx + 1}. {gq.q}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {gq.options.map((opt, oIdx) => (
                    <div key={oIdx} className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700">
                      <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <strong>Correct Answer:</strong> {gq.answer} • <em>{gq.explanation}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
