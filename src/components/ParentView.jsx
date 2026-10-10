import React from 'react';
import { Smartphone, MessageSquare, PhoneCall, CheckCheck, Clock, Award, AlertCircle } from 'lucide-react';

export function ParentView({ lang }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Intro */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {lang === 'hi' ? 'अभिभावक दृश्य (कम-इंटरनेट SMS / IVR रिपोर्ट)' : 'Parent Low-Tech SMS & Voice Portal'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'hi' ? 'स्मार्टफोन न होने पर भी साधारण फोन पर हिंदी में प्रगति रिपोर्ट' : 'Automated weekly updates for basic feature phones without internet'}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200">
          {lang === 'hi' 
            ? '💡 ग्रामीण क्षेत्रों में माता-पिता के पास हमेशा इंटरनेट या स्मार्टफोन नहीं होता। ज्ञानसेतु प्रत्येक शनिवार को विद्यार्थी की प्रगति का मुफ्त SMS और वॉइस कॉल (IVR) अभिभावक के सामान्य कीपैड फोन पर भेजता है।'
            : '💡 Rural innovation: To bridge the digital divide for parents with basic keypad phones, GyanSetu delivers automated vernacular SMS and IVR voice summaries of their child\'s school progress.'}
        </p>
      </div>

      {/* Simulated Keypad Phone Screen */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border-4 border-slate-700 max-w-md mx-auto">
        <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2 mb-4">
          <span>BSNL 2G • 4 Bars</span>
          <span>10:30 AM</span>
        </div>

        <div className="space-y-4">
          {/* SMS Bubble 1 */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>SMS from: GyanSetu-School</span>
              </span>
              <span className="text-slate-400 text-[10px]">Today</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {lang === 'hi'
                ? 'प्रिय अभिभावक, आपके पुत्र रोहन ने आज गणित में 80% अंक प्राप्त किए। उन्होंने भिन्न (Fractions) का पाठ पूरा किया। शाबाश!'
                : 'Dear Parent, your child Rohan scored 80% in Math today after completing the Fractions module. Keep up the encouragement!'}
            </p>
            <div className="flex justify-end text-[10px] text-slate-400 flex items-center gap-1">
              <CheckCheck className="w-3 h-3 text-emerald-400" />
              <span>Delivered</span>
            </div>
          </div>

          {/* SMS Bubble 2 */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Teacher Note: Sharma Ji</span>
              </span>
              <span className="text-slate-400 text-[10px]">Yesterday</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {lang === 'hi'
                ? 'नमस्ते। रोहन को प्रतिशत (Percentages) में थोड़ी कठिनाई आ रही है। स्कूल ने उनके टैबलेट/फोन में ऑफ़लाइन अभ्यास क्विज़ सेव कर दिया है।'
                : 'Greetings. Rohan requires extra practice with Percentages. School has cached remedial offline quizzes onto their shared device.'}
            </p>
          </div>
        </div>

        {/* Feature phone home button simulation */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-center">
          <div className="w-12 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
