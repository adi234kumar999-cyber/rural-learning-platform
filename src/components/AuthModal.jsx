import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  User, 
  Lock, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Smartphone,
  School,
  Globe
} from 'lucide-react';
import { supportedLanguages } from '../data/mockData';

export function AuthModal({ isOpen, onClose, lang, onLoginSuccess }) {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'teacher' | 'parent' | 'admin'

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('Class 7');
  const [schoolName, setSchoolName] = useState('Govt Model Upper Primary School');
  const [regLanguage, setRegLanguage] = useState(lang || 'en');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');

  // Quick Demo Accounts for College Evaluators
  const demoAccounts = [
    {
      role: 'student',
      title: lang === 'hi' ? 'छात्र (रोहन वर्मा)' : 'Student (Rohan Verma)',
      badge: 'Class 7A • Roll 24',
      icon: '🎓',
      data: {
        id: 'stu-4',
        name: 'Rohan Verma',
        role: 'student',
        grade: 'Class 7A',
        rollNo: '24',
        school: 'Govt Upper Primary School Rampur',
        avatar: '🎓'
      }
    },
    {
      role: 'teacher',
      title: lang === 'hi' ? 'शिक्षक (श्री आर.के. शर्मा)' : 'Teacher (Mr. R.K. Sharma)',
      badge: 'Senior Math & Science',
      icon: '👨‍🏫',
      data: {
        id: 'teach-1',
        name: 'Mr. R.K. Sharma',
        role: 'teacher',
        designation: 'Senior Math & Science Teacher',
        school: 'Govt Upper Primary School Rampur',
        avatar: '👨‍🏫'
      }
    },
    {
      role: 'parent',
      title: lang === 'hi' ? 'अभिभावक (कैलाश वर्मा)' : 'Parent (Kailash Verma)',
      badge: 'SMS & IVR Portal',
      icon: '📱',
      data: {
        id: 'par-1',
        name: 'Kailash Verma (Rohan\'s Father)',
        role: 'parent',
        phone: '+91 98765 43210',
        device: 'Basic Keypad Phone (SMS/IVR)',
        avatar: '📱'
      }
    },
    {
      role: 'admin',
      title: lang === 'hi' ? 'प्रधानाध्यापिका (डॉ. अनीता)' : 'Headmistress (Dr. Anita)',
      badge: 'School Admin Portal',
      icon: '🏛️',
      data: {
        id: 'adm-1',
        name: 'Dr. Anita Deshmukh',
        role: 'admin',
        designation: 'School Headmaster & Admin',
        school: 'Govt Model Senior Secondary School Rampur',
        avatar: '🏛️'
      }
    }
  ];

  const handleQuickLogin = (demoUser) => {
    // Simulate JWT token issuance
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(demoUser.data))}.signature`;
    localStorage.setItem('gyansetu_jwt', mockJwt);
    localStorage.setItem('gyansetu_user', JSON.stringify(demoUser.data));
    onLoginSuccess(demoUser.data);
    onClose();
  };

  const handleCustomLogin = (e) => {
    e.preventDefault();
    let userObj = {
      id: `user-${Date.now()}`,
      name: identifier || (selectedRole === 'student' ? 'Student User' : 'Staff Member'),
      role: selectedRole,
      grade: selectedGrade,
      school: schoolName,
      avatar: selectedRole === 'student' ? '🎓' : selectedRole === 'teacher' ? '👨‍🏫' : selectedRole === 'parent' ? '📱' : '🏛️'
    };

    const mockJwt = `mock_jwt_token_${Date.now()}`;
    localStorage.setItem('gyansetu_jwt', mockJwt);
    localStorage.setItem('gyansetu_user', JSON.stringify(userObj));
    onLoginSuccess(userObj);
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      id: `stu-${Date.now()}`,
      name: studentName || 'New Rural Student',
      role: 'student',
      grade: selectedGrade,
      rollNo: Math.floor(Math.random() * 50 + 1).toString(),
      school: schoolName,
      language: regLanguage,
      avatar: '🎓'
    };

    localStorage.setItem('gyansetu_jwt', `mock_jwt_registered_${Date.now()}`);
    localStorage.setItem('gyansetu_user', JSON.stringify(newUser));
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-upnavy-900 via-upnavy-800 to-upnavy-700 flex items-center justify-center text-upsaffron-400 shadow-md shadow-upnavy-900/30 border border-upnavy-700/50 font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-upnavy-950 flex items-center gap-2">
                <span>GyanSetu Portal</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-upnavy-100 text-upnavy-900 border border-upnavy-200">
                  JWT Auth
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'hi' ? 'ग्रामीण स्कूल लॉगिन व पंजीकरण गेटवे' : 'Rural-First Authentication & Role Gateway'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Quick Demo Login Section (Crucial for Viva Demonstrations) */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-upsaffron-600" />
              <span>{lang === 'hi' ? 'त्वरित डेमो लॉगिन (एक क्लिक में प्रवेश)' : '1-Click Quick Evaluator Demo'}</span>
            </span>
            <span className="text-[10px] text-amber-700 font-semibold bg-white px-2 py-0.5 rounded border border-amber-200">
              Viva Shortcut
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickLogin(acc)}
                className="p-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200 text-left transition flex items-center gap-2.5 hover:shadow-sm active:scale-95 group"
              >
                <span className="text-xl">{acc.icon}</span>
                <div className="overflow-hidden">
                  <div className="font-bold text-xs text-slate-900 truncate group-hover:text-amber-950">
                    {acc.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {acc.badge}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Auth Mode Tabs (Login vs Register) */}
        <div className="flex gap-2 mb-6 border-b border-slate-100 pb-2">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              authMode === 'login'
                ? 'bg-upnavy-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'लॉगिन करें (Login)' : 'Sign In'}</span>
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              authMode === 'register'
                ? 'bg-upnavy-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'नया छात्र पंजीकरण (Register)' : 'New Student Registration'}</span>
          </button>
        </div>

        {/* TAB 1: CUSTOM LOGIN */}
        {authMode === 'login' && (
          <form onSubmit={handleCustomLogin} className="space-y-4 text-xs">
            {/* Role Select Pills */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {lang === 'hi' ? 'आपकी भूमिका (Select Role):' : 'Select User Role:'}
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`py-1.5 rounded-lg transition ${selectedRole === 'student' ? 'bg-upnavy-800 text-white shadow-sm font-bold' : 'text-slate-600'}`}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`py-1.5 rounded-lg transition ${selectedRole === 'teacher' ? 'bg-upnavy-800 text-white shadow-sm font-bold' : 'text-slate-600'}`}
                >
                  👨‍🏫 Teacher
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('parent')}
                  className={`py-1.5 rounded-lg transition ${selectedRole === 'parent' ? 'bg-upnavy-800 text-white shadow-sm font-bold' : 'text-slate-600'}`}
                >
                  📱 Parent
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`py-1.5 rounded-lg transition ${selectedRole === 'admin' ? 'bg-upnavy-800 text-white shadow-sm font-bold' : 'text-slate-600'}`}
                >
                  🏛️ Admin
                </button>
              </div>
            </div>

            {selectedRole === 'parent' ? (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर (10 अंक):' : 'Mobile Number (10 digits):'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="9876543210"
                      className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50"
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-3 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-700"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {lang === 'hi' ? 'SMS ओटीपी दर्ज करें (डिफ़ॉल्ट: 1234):' : 'Enter SMS OTP (Default: 1234):'}
                    </label>
                    <input
                      type="text"
                      placeholder="1234"
                      className="w-full p-2.5 rounded-xl border border-emerald-400 bg-emerald-50/50 text-xs"
                      value={otpVal}
                      onChange={e => setOtpVal(e.target.value)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {selectedRole === 'student' ? 'Student Roll No / Username' : selectedRole === 'teacher' ? 'Teacher ID / Email' : 'Admin Key / Username'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={selectedRole === 'student' ? 'e.g. rohan24 or roll-24' : 'e.g. sharma_teacher'}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'hi' ? 'पासवर्ड / पिन:' : 'Password / PIN:'}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-upsaffron-600/30 transition active:scale-95"
            >
              <span>{lang === 'hi' ? 'लॉगिन करें' : 'Sign In to GyanSetu'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* TAB 2: STUDENT REGISTRATION */}
        {authMode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'विद्यार्थी का नाम (Student Full Name):' : 'Student Full Name:'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Kumar, Pooja Devi"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Grade:</label>
                <select
                  value={selectedGrade}
                  onChange={e => setSelectedGrade(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs"
                >
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Language:</label>
                <select
                  value={regLanguage}
                  onChange={e => setRegLanguage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                >
                  {supportedLanguages.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'विद्यालय / गाँव का नाम (School / Village):' : 'School or Village Name:'}
              </label>
              <input
                type="text"
                placeholder="Govt Upper Primary School Rampur"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Rural-First Provision:</strong> No continuous email or personal device required. Accounts work with local device caches and sync with the school server whenever connectivity is present.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-upsaffron-600/30 transition active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'नया खाता बनाएं व पढ़ाई शुरू करें' : 'Create Student Account & Begin Learning'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
