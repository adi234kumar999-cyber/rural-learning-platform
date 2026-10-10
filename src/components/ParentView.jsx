import React from 'react';
import { Smartphone, MessageSquare, CheckCheck, AlertCircle, Signal, Battery, Radio } from 'lucide-react';
import { translations, supportedLanguages } from '../data/mockData';

export function ParentView({ lang }) {
  const t = translations[lang] || translations['en'];
  const langConfig = supportedLanguages.find(l => l.code === lang);

  const getSms1 = () => {
    switch (lang) {
      case 'mr':
        return 'प्रिय पालक, तुमच्या मुलाने रोहनने आज गणितात 80% गुण मिळवले. त्याने अपूर्णांकांचा (Fractions) पाठ पूर्ण केला. अभिनंदन!';
      case 'bn':
        return 'প্রিয় অভিভাবক, আপনার সন্তান রোহন আজ গণিতে ৮০% নম্বর পেয়েছে। সে ভগ্নাংশের (Fractions) পাঠ সম্পন্ন করেছে। সাবাশ!';
      case 'te':
        return 'ప్రియమైన తల్లిదండ్రులకు, మీ అబ్బాయి రోహన్ ఈరోజు గణితంలో 80% మార్కులు సాధించాడు. అతను భిన్నాల (Fractions) పాఠాన్ని పూర్తి చేశాడు!';
      case 'ta':
        return 'அன்புள்ள பெற்றோரே, உங்கள் மகன் ரோஹன் இன்று கணிதத்தில் 80% மதிப்பெண்கள் பெற்றுள்ளார். பின்னங்கள் (Fractions) பாடத்தை வெற்றிகரமாக முடித்துள்ளார்!';
      case 'gu':
        return 'પ્રિય વાલી, આપના પુત્ર રોહને આજે ગણિતમાં 80% ગુણ મેળવ્યા છે. તેણે અપૂર્ણાંકનો (Fractions) પાઠ પૂર્ણ કર્યો છે. ખૂબ સરસ!';
      case 'kn':
        return 'ಆತ್ಮೀಯ ಪೋಷಕರೇ, ನಿಮ್ಮ ಮಗ ರೋಹನ್ ಇಂದು ಗಣಿತದಲ್ಲಿ 80% ಅಂಕಗಳನ್ನು ಗಳಿಸಿದ್ದಾನೆ. ಭಿನ್ನರಾಶಿಗಳ (Fractions) ಪಾಠವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದಾನೆ!';
      case 'pa':
        return 'ਪਿਆਰੇ ਮਾਪਿਓ, ਤੁਹਾਡੇ ਬੇਟੇ ਰੋਹਨ ਨੇ ਅੱਜ ਗਣਿਤ ਵਿੱਚ 80% ਅੰਕ ਪ੍ਰਾਪਤ ਕੀਤੇ। ਉਸਨੇ ਭਿੰਨਾਂ (Fractions) ਦਾ ਪਾਠ ਪੂਰਾ ਕਰ ਲਿਆ ਹੈ। ਸ਼ਾਬਾਸ਼!';
      case 'od':
        return 'ପ୍ରିୟ ଅଭିଭାବକ, ଆପଣଙ୍କ ପୁଅ ରୋହନ ଆଜି ଗଣିତରେ ୮୦% ନମ୍ବର ପାଇଛି। ସେ ଭଗ୍ନାଂଶ (Fractions) ପାଠ ସମ୍ପୂର୍ଣ୍ଣ କରିଛି!';
      case 'hi':
        return 'प्रिय अभिभावक, आपके पुत्र रोहन ने आज गणित में 80% अंक प्राप्त किए। उन्होंने भिन्न (Fractions) का पाठ पूरा किया। शाबाश!';
      default:
        return 'Dear Parent, your child Rohan scored 80% in Math today after completing the Fractions module. Keep up the encouragement!';
    }
  };

  const getSms2 = () => {
    switch (lang) {
      case 'mr':
        return 'नमस्ते. रोहनला टक्केवारीमध्ये (Percentages) थोडा सराव हवा आहे. शाळेने त्याच्या डिव्हाइसवर ऑफलाइन सराव चाचणी सेव्ह केली आहे.';
      case 'bn':
        return 'নমস্কার। রোহনের শতকরা (Percentages) অধ্যায়ে সামান্য অতিরিক্ত অনুশীলনের প্রয়োজন। অফলাইনে অনুশীলনের জন্য কুইজ ডিভাইসে সংরক্ষিত হয়েছে।';
      case 'te':
        return 'నమస్కారం. రోహన్‌కు శాతాలు (Percentages) అంశంలో అదనపు సాధన అవసరం. ఆఫ్‌లైన్ క్విజ్ డివైజ్‌లో సేవ్ చేయబడింది.';
      case 'ta':
        return 'வணக்கம். ரோஹனுக்கு சதவீதம் (Percentages) பாடத்தில் கூடுதல் பயிற்சி தேவைப்படுகிறது. ஆஃப்லைன் வினாடி வினா சாதனத்தில் சேமிக்கப்பட்டுள்ளது.';
      case 'gu':
        return 'નમસ્તે. રોહનને ટકાવારીમાં (Percentages) થોડી વધુ પ્રેક્ટિસની જરૂર છે. શાળાએ ડિવાઇસમાં ઑફલાઇન ક્વિઝ સેવ કરી આપી છે.';
      case 'kn':
        return 'ನಮಸ್ಕಾರ. ರೋಹನ್‌ಗೆ ಶೇಕಡಾವಾರು (Percentages) ವಿಷಯದಲ್ಲಿ ಹೆಚ್ಚಿನ ಅಭ್ಯಾಸ ಬೇಕಿದೆ. ಆಫ್‌ಲೈನ್ ರಸಪ್ರಶ್ನೆ ಸಾಧನದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.';
      case 'pa':
        return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ। ਰੋਹਨ ਨੂੰ ਪ੍ਰਤੀਸ਼ਤ (Percentages) ਵਿੱਚ ਕੁਝ ਹੋਰ ਅਭਿਆਸ ਦੀ ਲੋੜ ਹੈ। ਸਕੂਲ ਨੇ ਆਫਲਾਈਨ ਕਵਿਜ਼ ਡਿਵਾਈਸ ਵਿੱਚ ਸੇਵ ਕਰ ਦਿੱਤੀ ਹੈ।';
      case 'od':
        return 'ନମସ୍କାର। ରୋହନକୁ ଶତକଡ଼ା (Percentages) ପାଠରେ କିଛି ଅଧିକ ଅଭ୍ୟାସ ଦରକାର। ଡିଭାଇସ୍‌ରେ ଅଫଲାଇନ୍ କ୍ୱିଜ୍ ସେଭ୍ କରାଯାଇଛି।';
      case 'hi':
        return 'नमस्ते। रोहन को प्रतिशत (Percentages) में थोड़ी कठिनाई आ रही है। स्कूल ने उनके फोन/टैबलेट में ऑफ़लाइन अभ्यास क्विज़ सेव कर दिया है।';
      default:
        return 'Greetings. Rohan requires extra practice with Percentages. School has cached remedial offline quizzes onto their shared device.';
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-28">
      {/* Overview Card */}
      <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Low-Tech Vernacular SMS & IVR Portal
            </h2>
            <p className="text-xs text-slate-500">
              Bridging the digital divide for rural parents using basic 2G feature phones
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          💡 <strong>Rural Innovation:</strong> In villages where parents own simple keypad phones without internet data packs, GyanSetu automatically broadcasts weekly SMS alerts and automated voice calls (IVR) in their mother tongue.
        </p>
      </div>

      {/* Modern Feature Phone Device Mockup */}
      <div className="bg-slate-900 text-white rounded-[40px] p-6 shadow-2xl border-4 border-slate-700 max-w-sm mx-auto space-y-4">
        {/* Phone Earpiece */}
        <div className="flex justify-center items-center gap-2 mb-1">
          <div className="w-12 h-1.5 bg-slate-800 rounded-full" />
          <div className="w-2 h-2 bg-slate-800 rounded-full" />
        </div>

        {/* Feature Phone Screen */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 shadow-inner">
          <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800/80 pb-2">
            <span className="flex items-center gap-1 font-bold">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>BSNL 2G</span>
            </span>
            <span>10:30 AM</span>
          </div>

          <div className="space-y-3 py-1">
            {/* SMS Message 1 */}
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>GyanSetu-School</span>
                </span>
                <span className="text-slate-500 text-[10px]">Today</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {getSms1()}
              </p>
              <div className="flex justify-end text-[10px] text-slate-400 items-center gap-1 pt-0.5">
                <CheckCheck className="w-3 h-3 text-emerald-400" />
                <span>Delivered</span>
              </div>
            </div>

            {/* SMS Message 2 */}
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Sharma Ji (Teacher)</span>
                </span>
                <span className="text-slate-500 text-[10px]">Yesterday</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {getSms2()}
              </p>
            </div>
          </div>
        </div>

        {/* Keypad Buttons Simulation */}
        <div className="pt-2 px-3 space-y-2">
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-400">
            <div className="bg-slate-800 py-1.5 rounded-lg border border-slate-700">1</div>
            <div className="bg-slate-800 py-1.5 rounded-lg border border-slate-700">2 <span className="text-[8px] block opacity-50">ABC</span></div>
            <div className="bg-slate-800 py-1.5 rounded-lg border border-slate-700">3 <span className="text-[8px] block opacity-50">DEF</span></div>
            <div className="bg-slate-800 py-1.5 rounded-lg border border-slate-700">4 <span className="text-[8px] block opacity-50">GHI</span></div>
            <div className="bg-slate-800 py-1.5 rounded-lg border border-slate-700">5 <span className="text-[8px] block opacity-50">JKL</span></div>
            <div className="bg-slate-800 py-1.5 rounded-lg border border-slate-700">6 <span className="text-[8px] block opacity-50">MNO</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
