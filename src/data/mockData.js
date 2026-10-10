// GyanSetu - Rural Digital Learning Platform Mock Data & Multi-language strings

export const translations = {
  en: {
    appName: "GyanSetu",
    tagline: "Rural-First Digital Education Platform",
    online: "Online",
    offline: "Offline Mode",
    lowDataOn: "Low Data Mode ON",
    lowDataOff: "Low Data Mode OFF",
    dataSaved: "Bandwidth Saved",
    switchRole: "Role",
    studentRole: "Student (Rohan)",
    teacherRole: "Teacher (Mr. Sharma)",
    parentRole: "Parent Portal (SMS View)",
    diagnosticTitle: "Diagnostic Assessment",
    diagnosticDesc: "Identify your strengths and weak topics to unlock a personalized study path.",
    startDiagnostic: "Start Diagnostic Test",
    recommendedTitle: "AI Personalized Learning Path",
    basedOnDiagnostic: "Based on your latest diagnostic assessment & quiz performance",
    weakTopicsIdentified: "Weak Topics Identified",
    courses: "Subjects & Courses",
    allSubjects: "All Subjects",
    math: "Mathematics",
    science: "Science",
    english: "English",
    hindi: "Hindi",
    lessons: "Lessons",
    practiceQuiz: "Practice Quiz",
    downloadForOffline: "Download for Offline",
    downloaded: "Saved Offline",
    readAloud: "Listen (Audio)",
    stopAudio: "Stop Audio",
    aiSaathi: "AI Doubt Saathi",
    askDoubt: "Ask any academic doubt in simple language...",
    teacherDashboard: "Teacher Analytics Dashboard",
    totalStudents: "Total Students",
    classAverage: "Class Average Score",
    offlineSyncPending: "Offline Sync Queue",
    studentsNeedingHelp: "Students Needing Attention",
    classWeakAreas: "Class-wide Weak Topics",
    aiQuestionGen: "AI Question Generator",
    generateQuestions: "Generate Questions for Class",
    syncNow: "Sync Offline Data Now",
    syncSuccess: "Synced successfully with school server!",
    normalModeLabel: "Normal Mode (Videos + Rich Visuals)",
    lowDataModeLabel: "Low-Data Mode (<40KB Text + Audio)",
    ruralFeatures: "Rural-First Innovations"
  },
  hi: {
    appName: "ज्ञानसेतु",
    tagline: "ग्रामीण विद्यार्थियों के लिए डिजिटल शिक्षा मंच",
    online: "ऑनलाइन",
    offline: "ऑफ़लाइन मोड",
    lowDataOn: "कम डेटा मोड चालू",
    lowDataOff: "कम डेटा मोड बंद",
    dataSaved: "डेटा बचत",
    switchRole: "भूमिका बदलें",
    studentRole: "विद्यार्थी (रोहन)",
    teacherRole: "अध्यापक (शर्मा जी)",
    parentRole: "अभिभावक दृश्य (SMS/संदेश)",
    diagnosticTitle: "प्रारंभिक स्तर जांच परीक्षा (Diagnostic Test)",
    diagnosticDesc: "अपनी कमजोरियों और मजबूत विषयों की पहचान करें और अपने अनुसार पढ़ाई शुरू करें।",
    startDiagnostic: "जांच परीक्षा शुरू करें",
    recommendedTitle: "एआई व्यक्तिगत अध्ययन योजना",
    basedOnDiagnostic: "आपकी पिछली परीक्षा और क्विज़ के आधार पर",
    weakTopicsIdentified: "पहचाने गए कमजोर विषय",
    courses: "विषय और पाठ्यक्रम",
    allSubjects: "सभी विषय",
    math: "गणित",
    science: "विज्ञान",
    english: "अंग्रेजी",
    hindi: "हिंदी",
    lessons: "अध्याय व पाठ",
    practiceQuiz: "अभ्यास प्रश्नोत्तरी",
    downloadForOffline: "ऑफ़लाइन के लिए डाउनलोड करें",
    downloaded: "डिवाइस में सुरक्षित",
    readAloud: "पाठ सुनें (ऑडियो)",
    stopAudio: "ऑडियो रोकें",
    aiSaathi: "एआई साथी (शंका समाधान)",
    askDoubt: "अपनी भाषा में कोई भी सवाल पूछें...",
    teacherDashboard: "अध्यापक मॉनिटरिंग डैशबोर्ड",
    totalStudents: "कुल विद्यार्थी",
    classAverage: "कक्षा का औसत स्कोर",
    offlineSyncPending: "ऑफ़लाइन सिंक प्रतीक्षा सूची",
    studentsNeedingHelp: "जिन छात्रों पर विशेष ध्यान चाहिए",
    classWeakAreas: "कक्षा के कमजोर विषय",
    aiQuestionGen: "एआई प्रश्न निर्माता",
    generateQuestions: "कक्षा के लिए नए प्रश्न बनाएं",
    syncNow: "ऑफ़लाइन डेटा अभी सिंक करें",
    syncSuccess: "स्कूल सर्वर के साथ सफलतापूर्वक सिंक हो गया!",
    normalModeLabel: "सामान्य मोड (वीडियो + चित्र)",
    lowDataModeLabel: "कम-डेटा मोड (<40KB पाठ + ऑडियो)",
    ruralFeatures: "ग्रामीण केंद्रित विशेषताएं"
  }
};

export const sampleCourses = [
  {
    id: "math-c7",
    subject: "math",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Mathematics",
      hi: "कक्षा 7 गणित"
    },
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        id: "math-c7-ch1",
        title: {
          en: "Fractions & Decimals",
          hi: "भिन्न एवं दशमलव"
        },
        topicKey: "Fractions",
        sizeKB: 24,
        isDownloaded: true,
        summary: {
          en: "Understanding parts of a whole using everyday examples like dividing roti or land.",
          hi: "रोटी या खेत बांटने जैसे दैनिक उदाहरणों से हिस्से और भिन्न को समझें।"
        },
        lowDataContent: {
          en: `### 1. What is a Fraction?
A fraction represents a part of a whole. 
If 1 roti is equally divided among 4 children, each child receives **1/4 (one-fourth)** of the roti.

- **Numerator (अंश):** The top number (how many parts we have). Example: in 3/4, numerator is 3.
- **Denominator (हर):** The bottom number (total equal parts). Example: in 3/4, denominator is 4.

### 2. Types of Fractions
1. **Proper Fraction:** Numerator is smaller than denominator (e.g. 2/5, 3/7). Value is less than 1.
2. **Improper Fraction:** Numerator is larger than or equal to denominator (e.g. 7/4, 5/2). Value is >= 1.
3. **Mixed Fraction:** Combination of whole number and proper fraction (e.g. 1 3/4 roti).

### 3. Adding Fractions with Same Denominator
Add only the top numbers (numerators):
- 1/5 + 2/5 = (1 + 2)/5 = **3/5**

### 4. Real-life Rural Application
If a farmer gives 2/6 part of his field to wheat and 3/6 part to mustard, the total cultivated field is (2+3)/6 = **5/6** of the farm!`,
          hi: `### 1. भिन्न क्या होती है?
भिन्न किसी पूरी वस्तु के एक हिस्से को दर्शाती है।
यदि 1 रोटी को 4 बच्चों में बराबर बांटा जाए, तो प्रत्येक बच्चे को **1/4 (एक चौथाई)** रोटी मिलेगी।

- **अंश (Numerator):** ऊपर की संख्या (हमारे पास कितने हिस्से हैं)। उदाहरण: 3/4 में अंश 3 है।
- **हर (Denominator):** नीचे की संख्या (कुल कितने बराबर हिस्से किए गए)। उदाहरण: 3/4 में हर 4 है।

### 2. भिन्न के प्रकार
1. **उचित भिन्न (Proper):** अंश हर से छोटा होता है (जैसे 2/5, 3/7)। इसका मान 1 से कम होता है।
2. **अनुचित भिन्न (Improper):** अंश हर से बड़ा होता है (जैसे 7/4, 5/2)। इसका मान 1 या उससे अधिक होता है।
3. **मिश्रित भिन्न (Mixed):** पूर्ण संख्या और उचित भिन्न का मेल (जैसे 1 पूरी रोटी और 3/4 रोटी = 1 3/4)।

### 3. समान हर वाली भिन्नों को जोड़ना
केवल ऊपर की संख्याओं (अंशों) को जोड़ें:
- 1/5 + 2/5 = (1 + 2)/5 = **3/5**

### 4. ग्रामीण जीवन में प्रयोग
यदि एक किसान अपने खेत के 2/6 हिस्से पर गेहूं और 3/6 हिस्से पर सरसों बोता है, तो कुल बोया गया खेत = (2+3)/6 = **5/6** हिस्सा है!`
        },
        audioScript: {
          en: "Welcome to Fractions. A fraction represents a part of a whole. For example, if you divide one roti into four equal pieces and take one piece, that is one-fourth. The top number is the numerator, and the bottom number is the denominator.",
          hi: "भिन्न के पाठ में आपका स्वागत है। भिन्न किसी पूरी वस्तु का एक हिस्सा होती है। जैसे यदि आप एक रोटी के चार बराबर टुकड़े करें और एक टुकड़ा लें, तो वह एक बटा चार कहलाता है। ऊपर की संख्या अंश और नीचे की संख्या हर होती है।"
        },
        quiz: [
          {
            id: "q-frac-1",
            question: {
              en: "In the fraction 3/8, what is the numerator?",
              hi: "भिन्न 3/8 में अंश (Numerator) कौन सी संख्या है?"
            },
            options: ["3", "8", "11", "5"],
            correct: 0,
            explanation: {
              en: "The top number is the numerator. In 3/8, 3 is on top.",
              hi: "ऊपर लिखी संख्या अंश होती है। 3/8 में 3 ऊपर है, अतः 3 अंश है।"
            }
          },
          {
            id: "q-frac-2",
            question: {
              en: "Solve: 2/7 + 3/7 = ?",
              hi: "हल कीजिए: 2/7 + 3/7 = ?"
            },
            options: ["5/14", "5/7", "6/7", "1/7"],
            correct: 1,
            explanation: {
              en: "When denominators are identical, simply add numerators: (2 + 3)/7 = 5/7.",
              hi: "जब हर समान हों, तो केवल अंशों को जोड़ते हैं: 2 + 3 = 5, उत्तर 5/7 होगा।"
            }
          },
          {
            id: "q-frac-3",
            question: {
              en: "Which of the following is an Improper Fraction?",
              hi: "इनमें से कौन सी अनुचित भिन्न (Improper Fraction) है?"
            },
            options: ["2/5", "3/8", "9/4", "1/6"],
            correct: 2,
            explanation: {
              en: "An improper fraction has a numerator greater than or equal to the denominator (9/4).",
              hi: "अनुचित भिन्न में अंश हर से बड़ा होता है। 9/4 में 9, 4 से बड़ा है।"
            }
          }
        ]
      },
      {
        id: "math-c7-ch2",
        title: {
          en: "Percentages & Simple Interest",
          hi: "प्रतिशत एवं साधारण ब्याज"
        },
        topicKey: "Percentages",
        sizeKB: 28,
        isDownloaded: false,
        summary: {
          en: "Percentage means 'per hundred'. Learn how village markets, crops, and loans calculate percentages.",
          hi: "प्रतिशत का अर्थ है 'प्रति सैकड़ा'। जाने मंडी के भाव, फसल उपज और ब्याज में प्रतिशत का महत्व।"
        },
        lowDataContent: {
          en: `### 1. Meaning of Percentage
Percentage is derived from Latin 'per centum', meaning **out of 100**.
Symbol: **%**

- 25% means 25 out of 100 (or 25/100 = 1/4).
- 50% means half of the total.

### 2. Converting Fraction to Percentage
Multiply the fraction by 100:
- 3/5 × 100 = 3 × 20 = **60%**

### 3. Rural Context Example
If a bag of seeds costs ₹500 and the Krishi Seva Kendra offers a **10% discount**:
- Discount = 10% of 500 = (10/100) × 500 = **₹50**
- Final price = 500 - 50 = **₹450**`,
          hi: `### 1. प्रतिशत का अर्थ
प्रतिशत का मतलब होता है **प्रति 100 में से**।
चिन्ह: **%**

- 25% का अर्थ है 100 में से 25 (या 25/100 = 1/4)।
- 50% का अर्थ है कुल का आधा।

### 2. भिन्न को प्रतिशत में बदलना
भिन्न को 100 से गुणा करें:
- 3/5 × 100 = 3 × 20 = **60%**

### 3. ग्रामीण उदाहरण
यदि खाद की एक बोरी ₹500 की है और कृषि केंद्र पर **10% की छूट** मिल रही है:
- छूट की राशि = (10/100) × 500 = **₹50**
- किसान को देने होंगे = 500 - 50 = **₹450**`
        },
        audioScript: {
          en: "Percentage means out of 100. Fifty percent means half. To find ten percent of five hundred rupees, multiply ten by five hundred and divide by one hundred, which gives fifty rupees.",
          hi: "प्रतिशत का अर्थ है प्रति 100 में से। पचास प्रतिशत का मतलब आधा होता है। पांच सौ रुपये का दस प्रतिशत निकालने के लिए दस को पांच सौ से गुणा कर सौ से भाग दें, जो पचास रुपये बनता है।"
        },
        quiz: [
          {
            id: "q-perc-1",
            question: {
              en: "What is 20% of 200?",
              hi: "200 का 20% कितना होगा?"
            },
            options: ["20", "40", "50", "10"],
            correct: 1,
            explanation: {
              en: "(20 / 100) * 200 = 40.",
              hi: "(20 / 100) × 200 = 40."
            }
          },
          {
            id: "q-perc-2",
            question: {
              en: "Convert fraction 1/2 into percentage:",
              hi: "भिन्न 1/2 को प्रतिशत में बदलें:"
            },
            options: ["25%", "50%", "75%", "100%"],
            correct: 1,
            explanation: {
              en: "(1/2) * 100 = 50%.",
              hi: "(1/2) × 100 = 50%."
            }
          }
        ]
      }
    ]
  },
  {
    id: "sci-c7",
    subject: "science",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Science",
      hi: "कक्षा 7 विज्ञान"
    },
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "sci-c7-ch1",
        title: {
          en: "Nutrition in Plants (Photosynthesis)",
          hi: "पादपों में पोषण (प्रकाश संश्लेषण)"
        },
        topicKey: "Photosynthesis",
        sizeKB: 26,
        isDownloaded: true,
        summary: {
          en: "How green leaves prepare food using sunlight, water, and air like a solar kitchen.",
          hi: "हरी पत्तियां धूप, पानी और हवा से भोजन कैसे बनाती हैं - प्रकृति की रसोई।"
        },
        lowDataContent: {
          en: `### 1. What is Photosynthesis?
Green plants make their own food using:
1. **Chlorophyll:** Green pigment present in leaves (like solar panels).
2. **Sunlight:** Natural solar energy from the sun.
3. **Carbon Dioxide (CO2):** Gas absorbed from air through small pores called **Stomata**.
4. **Water & Minerals:** Absorbed from soil by roots.

### 2. Equation of Food Making
Carbon Dioxide + Water --[Sunlight + Chlorophyll]--> **Glucose (Food) + Oxygen**

### 3. Why are plants called Autotrophs?
'Auto' means self, and 'troph' means nourishment. Because they prepare their own food without depending on hunting or buying, they are called **Autotrophs (स्वपोषी)**.`,
          hi: `### 1. प्रकाश संश्लेषण क्या है?
हरे पौधे अपना भोजन स्वयं बनाते हैं। इसके लिए 4 मुख्य चीजें चाहिए:
1. **क्लोरोफिल (पर्णहरित):** पत्तियों में मौजूद हरा रंग जो धूप को सोखता है।
2. **सूर्य का प्रकाश:** ऊर्जा का प्राकृतिक स्रोत।
3. **कार्बन डाइऑक्साइड:** हवा से पत्तियों के छोटे छिद्रों (रंध्र / Stomata) द्वारा ली जाती है।
4. **जल और खनिज:** जड़ों द्वारा मिट्टी से सोखे जाते हैं।

### 2. रासायनिक प्रक्रिया
कार्बन डाइऑक्साइड + जल --[सूर्य का प्रकाश + क्लोरोफिल]--> **ग्लूकोज (भोजन) + ऑक्सीजन**

### 3. पौधे स्वपोषी क्यों कहलाते हैं?
'स्व' का अर्थ है खुद और 'पोषी' का अर्थ पोषण करने वाला। चूंकि वे अपना भोजन स्वयं बनाते हैं, इसलिए उन्हें **स्वपोषी (Autotrophs)** कहते हैं।`
        },
        audioScript: {
          en: "Plants make their food using sunlight, water, carbon dioxide, and chlorophyll. This process is called photosynthesis. In return, plants release fresh oxygen for us to breathe.",
          hi: "पौधे सूर्य के प्रकाश, पानी, कार्बन डाइऑक्साइड और क्लोरोफिल की मदद से अपना भोजन बनाते हैं। इस प्रक्रिया को प्रकाश संश्लेषण कहते हैं और बदले में वे हमें सांस लेने के लिए ऑक्सीजन देते हैं।"
        },
        quiz: [
          {
            id: "q-sci-1",
            question: {
              en: "Which green pigment in leaves captures sunlight?",
              hi: "पत्तियों में कौन सा हरा वर्णक सूर्य के प्रकाश को अवशोषित करता है?"
            },
            options: ["Stomata", "Chlorophyll", "Glucose", "Hemoglobin"],
            correct: 1,
            explanation: {
              en: "Chlorophyll is the green pigment that traps sunlight.",
              hi: "क्लोरोफिल पत्तियों में पाया जाने वाला हरा रंगद्रव्य है जो धूप सोखता है।"
            }
          },
          {
            id: "q-sci-2",
            question: {
              en: "What gas do plants release during photosynthesis?",
              hi: "प्रकाश संश्लेषण के दौरान पौधे कौन सी गैस छोड़ते हैं?"
            },
            options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Methane"],
            correct: 1,
            explanation: {
              en: "Plants produce glucose and release Oxygen (O2).",
              hi: "पौधे ग्लूकोज बनाते हैं और ऑक्सीजन गैस वातावरण में छोड़ते हैं।"
            }
          }
        ]
      }
    ]
  }
];

export const diagnosticQuestions = [
  {
    id: "diag-1",
    topic: "Fractions",
    question: {
      en: "Which fraction represents half of an object?",
      hi: "कौन सी भिन्न किसी वस्तु के आधे भाग को दर्शाती है?"
    },
    options: ["1/4", "1/2", "3/4", "2/1"],
    correct: 1
  },
  {
    id: "diag-2",
    topic: "Fractions",
    question: {
      en: "Calculate: 1/4 + 2/4 = ?",
      hi: "गणना करें: 1/4 + 2/4 = ?"
    },
    options: ["3/8", "3/4", "1/2", "2/4"],
    correct: 1
  },
  {
    id: "diag-3",
    topic: "Percentages",
    question: {
      en: "How would you write 50% as a fraction in simplest form?",
      hi: "50% को सबसे सरल भिन्न के रूप में कैसे लिखेंगे?"
    },
    options: ["50/10", "1/4", "1/2", "5/100"],
    correct: 2
  },
  {
    id: "diag-4",
    topic: "Percentages",
    question: {
      en: "A student scored 40 marks out of 50 in an exam. What is their percentage?",
      hi: "एक छात्र ने 50 में से 40 अंक प्राप्त किए। उसका प्रतिशत क्या है?"
    },
    options: ["40%", "75%", "80%", "90%"],
    correct: 2
  },
  {
    id: "diag-5",
    topic: "Decimals",
    question: {
      en: "Which number is greater: 0.7 or 0.07?",
      hi: "इनमें से कौन सी संख्या बड़ी है: 0.7 या 0.07?"
    },
    options: ["0.07", "0.7", "Both are equal", "Cannot say"],
    correct: 1
  },
  {
    id: "diag-6",
    topic: "Geometry",
    question: {
      en: "What is the perimeter of a square with side length 5 cm?",
      hi: "5 सेमी भुजा वाले वर्ग का परिमाप क्या होगा?"
    },
    options: ["10 cm", "20 cm", "25 cm", "15 cm"],
    correct: 1
  }
];

export const mockStudents = [
  {
    id: "stu-1",
    name: "Rahul Kumar",
    rollNo: "07",
    classGrade: "Class 7A",
    overallScore: 42,
    lastActive: "Today, 10:15 AM",
    weakTopics: ["Fractions", "Percentages"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced"
  },
  {
    id: "stu-2",
    name: "Amit Sharma",
    rollNo: "12",
    classGrade: "Class 7A",
    overallScore: 48,
    lastActive: "Yesterday",
    weakTopics: ["Percentages", "Geometry"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced"
  },
  {
    id: "stu-3",
    name: "Pooja Patel",
    rollNo: "19",
    classGrade: "Class 7A",
    overallScore: 52,
    lastActive: "2 days ago",
    weakTopics: ["Fractions"],
    status: "Average Progress",
    syncStatus: "1 Quiz Pending Offline"
  },
  {
    id: "stu-4",
    name: "Rohan Verma (You)",
    rollNo: "24",
    classGrade: "Class 7A",
    overallScore: 72,
    lastActive: "Active Now",
    weakTopics: ["Fractions (In Progress)"],
    status: "On Track",
    syncStatus: "Synced"
  },
  {
    id: "stu-5",
    name: "Sunita Devi",
    rollNo: "31",
    classGrade: "Class 7A",
    overallScore: 91,
    lastActive: "Today, 2:30 PM",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced"
  }
];

export const prebuiltAiDoubtAnswers = [
  {
    triggerWords: ["fraction", "भिन्न", "kya hai", "kya hote"],
    response: {
      en: "Think of a fraction like a fresh round roti! 🫓 If your mother cuts it into 4 equal slices and gives you 1 slice, you have 1/4 (one-fourth) of the roti. The bottom number (4) tells total parts made, and the top number (1) tells parts you took.",
      hi: "भिन्न को एक ताज़ी गोल रोटी की तरह समझें! 🫓 यदि आपकी माता जी उसे 4 बराबर हिस्सों में काटकर आपको 1 टुकड़ा दें, तो आपके पास रोटी का 1/4 (एक-चौथाई) हिस्सा है। नीचे की संख्या (4) कुल टुकड़ों को दर्शाती है और ऊपर की संख्या (1) आपको मिले टुकड़े को।"
    }
  },
  {
    triggerWords: ["photosynthesis", "प्रकाश संश्लेषण", "food", "khana", "plant"],
    response: {
      en: "Photosynthesis is the plant's solar kitchen! 🌿 Just like cooking in a village hearth requires wood, flour, and water: green leaves use sunlight (heat), chlorophyll (vessel), water from soil, and carbon dioxide from air to prepare glucose food. They also gift us pure oxygen to breathe!",
      hi: "प्रकाश संश्लेषण पौधों की प्राकृतिक सौर रसोई है! 🌿 जैसे चूल्हे पर रोटी बनाने के लिए आग, आटा और पानी चाहिए, वैसे ही हरी पत्तियां धूप (ऊर्जा), पत्तियों का हरा रंग (क्लोरोफिल), मिट्टी से पानी और हवा से कार्बन डाइऑक्साइड लेकर अपना भोजन बनाती हैं। साथ ही हमें शुद्ध ऑक्सीजन देती हैं!"
    }
  },
  {
    triggerWords: ["percentage", "प्रतिशत", "percent", "vyaj"],
    response: {
      en: "Percentage literally means 'how much out of 100'. If in a harvest of 100 quintals of wheat, 20 quintals are sold at the mandi, that is 20%! It makes comparing unequal crops or test marks very easy.",
      hi: "प्रतिशत का सीधा मतलब है '100 में से कितना'। यदि 100 बोरी गेहूं में से 20 बोरी मंडी में बिक गई, तो वह 20% बिका! इससे अलग-अलग चीजों या अंकों की तुलना करना बहुत आसान हो जाता है।"
    }
  }
];
