import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, X, MessageSquare, Volume2, Lightbulb } from 'lucide-react';
import { prebuiltAiDoubtAnswers, getLocalized, translations, supportedLanguages } from '../data/mockData';

export function AiSaathiChat({ isOpen, onClose, lang, onSpeakText }) {
  const t = translations[lang] || translations['en'];
  const langConfig = supportedLanguages.find(l => l.code === lang);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'en' 
        ? "Hello Rohan! I am your 'Gyan Saathi' AI Tutor. Ask me any doubt in Math or Science, and I will explain with simple real-world examples."
        : `नमस्ते रोहन! मी/मी/હું/నేను ನಿಮ್ಮ 'ज्ञान साथी' AI ट्यूटर आहे/છું/ఉన్నాను. Ask me any doubt in ${langConfig ? langConfig.name : 'your language'}!`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "Fractions (अपूर्णांक / भिन्न) क्या हैं?",
    "Photosynthesis (प्रकाश संश्लेषण) क्या है?",
    "Percentages (प्रतिशत / टक्केवारी) का उपयोग?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // Add user message
    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    setInputVal('');
    setIsTyping(true);

    // AI answer synthesis
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matched = prebuiltAiDoubtAnswers.find(item => 
        item.triggerWords.some(w => qLower.includes(w))
      );

      let reply = "";
      if (matched) {
        reply = getLocalized(matched.response, lang);
      } else {
        reply = lang === 'en'
          ? `Great question! To understand "${query}", remember that math and science reflect our natural surroundings—like water flow in irrigation channels or counting sacks of harvest in the village market. Try listening to the audio summary for this chapter!`
          : `शानदार सवाल! "${query}" को समझने के लिए याद रखें: विज्ञान और गणित हमारे आसपास के वातावरण से जुड़े हैं। जैसे खेती में पानी का प्रवाह या हाट-बाजार में हिसाब-किताब।`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-amber-200/80 overflow-hidden flex flex-col h-[520px] animate-slideUp">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-300/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1.5">
              <span>{lang === 'hi' ? 'ज्ञान साथी AI ट्यूटर' : 'Gyan Saathi AI Tutor'}</span>
              <span className="text-[10px] bg-emerald-500/40 px-1.5 py-0.5 rounded text-emerald-100 font-medium">Rural AI</span>
            </h3>
            <p className="text-[11px] text-emerald-200">
              {lang === 'hi' ? 'ग्रामीण छात्रों के लिए सरल स्पष्टीकरण' : 'Simple vernacular explanations & analogies'}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-amber-50/20 text-xs">
        {messages.map((m, idx) => (
          <div 
            key={idx}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'bot' && (
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                AI
              </div>
            )}
            <div className={`max-w-[82%] rounded-2xl p-3 shadow-sm leading-relaxed ${
              m.sender === 'user'
                ? 'bg-emerald-600 text-white rounded-br-none'
                : 'bg-white text-slate-800 border border-amber-200/60 rounded-bl-none'
            }`}>
              <p>{m.text}</p>
              {m.sender === 'bot' && (
                <button
                  onClick={() => onSpeakText(m.text)}
                  className="mt-2 text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{lang === 'hi' ? 'सुनो' : 'Listen'}</span>
                </button>
              )}
            </div>
            {m.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                <User className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{lang === 'hi' ? 'ज्ञान साथी सोच रहा है...' : 'Saathi is thinking...'}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-full bg-amber-100/70 hover:bg-amber-200 text-amber-900 border border-amber-300/50 flex items-center gap-1 transition"
          >
            <Lightbulb className="w-2.5 h-2.5 text-amber-700" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={lang === 'hi' ? 'शंका पूछें (जैसे: भिन्न क्या है?)...' : 'Ask doubt in Hindi or English...'}
          className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
