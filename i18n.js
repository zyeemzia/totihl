/* ZyeemZia™ TOT-IHL — interface language. Course content lives in data/ (English), data/bn/ and data/fr/. */
(function () {
  const LANGS = ['en', 'bn', 'fr'];
  const KEY = 'zz-totihl-lang';
  let q = null; try { q = new URLSearchParams(location.search).get('lang'); } catch (e) { /* old browser */ }
  let saved = null; try { saved = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  const lang = LANGS.includes(q) ? q : LANGS.includes(saved) ? saved : 'en';
  if (LANGS.includes(q)) { try { localStorage.setItem(KEY, q); } catch (e) { /* private mode */ } }
  document.documentElement.lang = lang;

  const S = {
    en: {
      langName: 'English', codes: {}, brand: 'Training of Trainers · IHL', home: 'Home', modules: 'Modules', workshops: 'Workshops', updates: '2026 Updates', exam: 'Exam', capstone: 'Capstone', certificate: 'Certificate', book: 'Book',
      search: 'Search lessons…', theme: 'Theme', menu: 'Menu', progress: 'Progress', language: 'Language',
      kicker: 'ZyeemZia™ Training of Trainers', start: 'Start the course', readBook: 'Read the book',
      sModules: 'MODULES', sLessons: 'LESSONS', sWorkshops: 'WORKSHOPS', sExam: 'EXAM BANK',
      pathTitle: 'Your path to certification', complete: 'complete', step: 'STEP',
      learn: 'Learn', lessonsDone: n => `${n} lessons`, practise: 'Practise', practiseSub: (w, f) => `${w} syndicate workshops · ${f} flashcards`,
      certify: 'Certify', certifySub: (n, p) => `Exam: ${n} questions, pass ${p}%`, getCert: 'Get certificate', getCertSub: 'Unlocks after lessons + exam',
      courseMap: 'The course map', module: 'MODULE', lessonsOf: (d, n) => `${d}/${n} lessons`,
      bookTitle: n => `The ${n} Book`, bookKick: 'Course book · Trainer’s manual · Exam prep', bookH: 'The whole course as a beautiful book',
      bookP: 'Every module and lesson, all syndicate workshops with model answers, the MOGADI scenario, the trainer’s toolkit, the full practice exam with explanations, glossary and latest IHL developments. Read online or save as PDF.',
      readOnline: 'Read online', downloadPdf: 'Download PDF', whoFor: 'Who it is for',
      modulesTitle: 'Modules & lessons', modulesLead: (m, l) => `${m} modules · ${l} lessons. Tick each lesson as complete; progress is saved in this browser.`, min: 'min',
      lessonN: (i, n) => `Lesson ${i}/${n}`, objectives: 'Learning objectives', keyTakeaways: 'Key takeaways', trainerNote: 'Trainer’s note (TOT)', check: 'Check your understanding',
      source: 'Source material', markComplete: 'Mark complete', completed: '✓ Completed', goExam: 'Go to exam',
      wsTitle: 'Workshops & syndicate exercises', wsLead: 'Practical, trainer-led exercises from the BIPSOT Training of Trainers. Work in syndicates, then open the model answers.', workshop: 'WORKSHOP',
      modelAnswers: 'Model answers & debrief points', flashcards: 'Flashcards', prev: '‹ Prev', next: 'Next ›', shuffle: 'Shuffle', flipHint: 'Tap the card to flip it',
      examTitle: 'Certification exam', examLead: (n, b, p, d) => `${n} random questions from a bank of ${b}. Pass mark ${p}% · Distinction ${d}%.`, best: 'Best score',
      startExam: 'Start a new exam', submitExam: 'Submit exam', answered: (a, n) => `${a} of ${n} answered`, unanswered: n => `${n} question(s) still unanswered. Submit anyway?`,
      score: 'Score', distinction: 'Distinction! ', passed: 'Passed. ', notYet: 'Not yet — review and retry. ', correctIs: 'Correct answer: ', certLink: 'Certificate ›',
      deliverables: 'Deliverables', rubric: 'Assessment rubric', criterion: 'Criterion', developing: 'Developing', proficient: 'Proficient', distinguished: 'Distinguished',
      certTitle: 'Certificate', certStatus: (p, b, m) => `Lessons: <b>${p}%</b> · Best exam score: <b>${b}%</b> (need 100% lessons and ≥${m}%)`,
      namePh: 'Your full name as on certificate', generate: 'Generate', print: 'Print / Save PDF', locked: 'Complete all lessons and pass the exam to unlock your certificate.',
      certAcademy: 'ZYEEMZIA™ ACADEMY', certOf: 'Certificate of Completion', certifies: 'This certifies that', completedThe: 'has successfully completed the',
      withDist: 'With Distinction · ', examScore: s => `Exam score ${s}%`, certId: 'Certificate ID', ceo: 'Chairman & CEO, ZyeemZia™', verifyNote: 'Issued by the course site. Keep this page as your record.',
      searchTitle: q => `Search: “${q}”`, results: n => `${n} lessons`, noResults: 'No lesson matches. Try another word.',
      footer1: 'Training of Trainers on International Humanitarian Law', footer2: 'Developed & published by Zyeem Bin Zia · Dhaka, Bangladesh', policies: 'Policies', privacy: 'Privacy',
      disclaimer: 'Educational resource. Not affiliated with or endorsed by the ICRC, the UN or BIPSOT. Emblems shown for teaching only.',
      back: '‹ Back to course', bookBar: 'THE TOT-IHL BOOK', contents: 'Contents', toc: 'Table of contents', howTo: 'How to use this book', preface: 'Preface', chapter: 'Chapter',
      howToP: 'Each chapter matches a module of the online course. Every lesson opens with objectives, sets out the rules with their treaty references, illustrates them with cases, and closes with key takeaways, a trainer’s note where relevant, and check questions with answers.',
      forTrainers: 'For trainers', forTrainersP: 'Look for the Trainer’s note boxes and the Workshops chapter: ready-to-run exercises including the symbols quiz, Rupali and Shonali, the flower-pot demonstration, Grdelica, the Belgian soldiers in Somalia, the Georgian peacekeepers, the Kunduz tankers and the MOGADI planning exercise.',
      bookDisc: 'This is an educational resource compiled from the BIPSOT ToT materials, ICRC teaching resources and public sources. It is not affiliated with or endorsed by the ICRC, the UN or BIPSOT. Always check the current status of treaties and policies.',
      edition: 'Edition', publisher: 'Developed & published by Zyeem Bin Zia · Dhaka, Bangladesh', checkQ: n => `Check questions (${n})`, answer: 'Answer', practice: 'Practice', assessment: 'Assessment',
      wsChapter: 'Workshops & syndicate exercises (with model answers)', capChapter: 'Capstone', planChapter: 'Two-day TOT programme & 6-week self-study plan', examChapter: 'Practice exam with answers', glosChapter: 'Glossary', srcChapter: 'Sources & further reading',
      planning: 'Planning', planTitle: 'Programme & study plan', twoDay: 'The two-day ToT (as delivered at BIPSOT)', session: 'Session', day1: 'Day 1', day2: 'Day 2',
      sixWeek: 'Six-week self-study plan', week: 'Week', chapters: 'Chapters', activity: 'Activity', examPrep: 'Exam prep', practiceExam: n => `Practice exam (${n} questions)`, answerKey: 'Answer key',
      reference: 'Reference', glossary: 'Glossary', abbrev: 'Abbreviations', sources: 'Sources', srcTitle: 'Sources & further reading', modelDebrief: 'Model answers & debrief',
      days: [['ICRC in Bangladesh: who we are; origins, Movement, emblem (Ch. 1)', 'Civilian-centric military operations and CIMIC (Ch. 8)'], ['Introduction to IHL: sources, classification, protection, enforcement (Ch. 1)', 'Case study: ISAF CIVCAS mitigation and the LEGAD role (Ch. 8)'], ['Importance of IHL in contemporary conflict (Ch. 5)', 'Real case studies: Syndicates A, B, C (Workshops)'], ['Principles of IHL: distinction, proportionality, precaution (Ch. 2)', 'MOGADI scenario: LEGAD, CIMIC and PA planning (Workshop)'], ['Integration of IHL into military operations (Ch. 5)', 'Syndicate presentations and debrief'], ['IHL in targeting and the San Remo matrix; Grdelica Bridge (Ch. 5)', 'Trainer’s toolkit, teach-back, 2026 updates (Ch. 10)'], ['IHL in peacekeeping operations (Ch. 7)', 'Exam and closing']],
      weeks: [['1–2', 'Foundations and principles; symbols quiz; flower-pot demonstration'], ['3–4', 'Status, objects and conduct of operations; book scenarios'], ['5–6', 'Operations, targeting and weapons; command responsibility; Grdelica'], ['7–8', 'Peacekeeping and civilians; Syndicates A, B and C'], ['9–10', 'Integration and the trainer toolkit; MOGADI capstone'], ['All', 'Updates seminar, micro-teach, practice exam']],
      srcList: ['BIPSOT ToT course materials (Day 1 and Day 2 presentations, ICRC Dhaka Delegation 2025–2026): ICRC General Presentation; Introduction to IHL; Importance of IHL; Integration of IHL; IHL in Targeting; IHL in PKO; Civilian-Centric Operations; CIVCAS case study; Principles of IHL; Grdelica Bridge; Scenario MOGADI; Annex A.', 'LOAC instructor lesson books: Lesson 1 Introduction; Lesson 2 Terms and Definitions; Lesson 3 Conduct of Operations; Lesson 5 Weapons; Lesson 6 Command Responsibility.', 'ICRC, Integrating the Law; ICRC, How Does Law Protect in War? (Belgian soldiers in Somalia case).', 'Geneva Conventions 1949 and Additional Protocols; ICRC Customary IHL Study; Rome Statute; UN ST/SGB/1999/13.', 'Recent developments: ICRC and UN statements on autonomous weapons (2023–2026); 34th International Conference resolutions (2024); EWIPA Declaration (2022); the Global Initiative on IHL (2024–).', 'Further reading: ICRC Updated Commentaries; International Review of the Red Cross; the San Remo IIHL; A.P.V. Rogers, Law on the Battlefield.']
    },
    bn: {
      langName: 'বাংলা', codes: {FOUNDATIONS:'ভিত্তি',PRINCIPLES:'নীতিমালা',STATUS:'মর্যাদা',CONDUCT:'অভিযান পরিচালনা',OPERATIONS:'অভিযান',COMMAND:'কমান্ড',PEACEKEEPING:'শান্তিরক্ষা',CIVILIANS:'বেসামরিক',INTEGRATE:'অন্তর্ভুক্তি',TRAINER:'প্রশিক্ষক'}, brand: 'প্রশিক্ষকদের প্রশিক্ষণ · IHL', home: 'হোম', modules: 'মডিউল', workshops: 'কর্মশালা', updates: '২০২৬ হালনাগাদ', exam: 'পরীক্ষা', capstone: 'ক্যাপস্টোন', certificate: 'সনদ', book: 'বই',
      search: 'পাঠ খুঁজুন…', theme: 'থিম', menu: 'মেনু', progress: 'অগ্রগতি', language: 'ভাষা',
      kicker: 'জাইমজিয়া™ প্রশিক্ষকদের প্রশিক্ষণ', start: 'কোর্স শুরু করুন', readBook: 'বইটি পড়ুন',
      sModules: 'মডিউল', sLessons: 'পাঠ', sWorkshops: 'কর্মশালা', sExam: 'প্রশ্নব্যাংক',
      pathTitle: 'সনদ অর্জনের পথ', complete: 'সম্পন্ন', step: 'ধাপ',
      learn: 'শিখুন', lessonsDone: n => `${n}টি পাঠ`, practise: 'অনুশীলন', practiseSub: (w, f) => `${w}টি সিন্ডিকেট কর্মশালা · ${f}টি ফ্ল্যাশকার্ড`,
      certify: 'যাচাই', certifySub: (n, p) => `পরীক্ষা: ${n}টি প্রশ্ন, পাস ${p}%`, getCert: 'সনদ নিন', getCertSub: 'সব পাঠ ও পরীক্ষা শেষে খুলবে',
      courseMap: 'কোর্সের মানচিত্র', module: 'মডিউল', lessonsOf: (d, n) => `${d}/${n} পাঠ`,
      bookTitle: n => `${n} বই`, bookKick: 'কোর্স বই · প্রশিক্ষক সহায়িকা · পরীক্ষা প্রস্তুতি', bookH: 'পুরো কোর্স একটি সুন্দর বইয়ে',
      bookP: 'প্রতিটি মডিউল ও পাঠ, মডেল উত্তরসহ সব সিন্ডিকেট কর্মশালা, MOGADI দৃশ্যকল্প, প্রশিক্ষকের টুলকিট, ব্যাখ্যাসহ পূর্ণ অনুশীলন পরীক্ষা, পরিভাষা এবং আন্তর্জাতিক মানবিক আইনের সর্বশেষ অগ্রগতি। অনলাইনে পড়ুন বা PDF হিসেবে সংরক্ষণ করুন।',
      readOnline: 'অনলাইনে পড়ুন', downloadPdf: 'PDF ডাউনলোড', whoFor: 'কাদের জন্য',
      modulesTitle: 'মডিউল ও পাঠ', modulesLead: (m, l) => `${m}টি মডিউল · ${l}টি পাঠ। প্রতিটি পাঠ শেষে সম্পন্ন চিহ্ন দিন; অগ্রগতি এই ব্রাউজারে সংরক্ষিত থাকে।`, min: 'মিনিট',
      lessonN: (i, n) => `পাঠ ${i}/${n}`, objectives: 'শিখনফল', keyTakeaways: 'মূল শিক্ষা', trainerNote: 'প্রশিক্ষকের নোট (TOT)', check: 'নিজেকে যাচাই করুন',
      source: 'উৎস উপকরণ', markComplete: 'সম্পন্ন চিহ্নিত করুন', completed: '✓ সম্পন্ন', goExam: 'পরীক্ষায় যান',
      wsTitle: 'কর্মশালা ও সিন্ডিকেট অনুশীলন', wsLead: 'BIPSOT প্রশিক্ষকদের প্রশিক্ষণের ব্যবহারিক, প্রশিক্ষক-পরিচালিত অনুশীলন। সিন্ডিকেটে কাজ করুন, তারপর মডেল উত্তর খুলুন।', workshop: 'কর্মশালা',
      modelAnswers: 'মডেল উত্তর ও আলোচনার বিষয়', flashcards: 'ফ্ল্যাশকার্ড', prev: '‹ আগের', next: 'পরের ›', shuffle: 'এলোমেলো', flipHint: 'কার্ড উল্টাতে ট্যাপ করুন',
      examTitle: 'সনদ পরীক্ষা', examLead: (n, b, p, d) => `${b}টি প্রশ্নের ব্যাংক থেকে এলোমেলো ${n}টি প্রশ্ন। পাস নম্বর ${p}% · বিশেষ কৃতিত্ব ${d}%।`, best: 'সর্বোচ্চ স্কোর',
      startExam: 'নতুন পরীক্ষা শুরু করুন', submitExam: 'পরীক্ষা জমা দিন', answered: (a, n) => `${n}টির মধ্যে ${a}টির উত্তর দেওয়া হয়েছে`, unanswered: n => `এখনও ${n}টি প্রশ্নের উত্তর বাকি। তবুও জমা দেবেন?`,
      score: 'স্কোর', distinction: 'বিশেষ কৃতিত্ব! ', passed: 'উত্তীর্ণ। ', notYet: 'এখনও নয় — আবার পড়ে চেষ্টা করুন। ', correctIs: 'সঠিক উত্তর: ', certLink: 'সনদ ›',
      deliverables: 'যা জমা দিতে হবে', rubric: 'মূল্যায়ন রুব্রিক', criterion: 'মানদণ্ড', developing: 'উন্নয়নশীল', proficient: 'দক্ষ', distinguished: 'অসাধারণ',
      certTitle: 'সনদ', certStatus: (p, b, m) => `পাঠ: <b>${p}%</b> · সর্বোচ্চ পরীক্ষার স্কোর: <b>${b}%</b> (প্রয়োজন ১০০% পাঠ এবং ≥${m}%)`,
      namePh: 'সনদে যেভাবে থাকবে আপনার পূর্ণ নাম', generate: 'তৈরি করুন', print: 'প্রিন্ট / PDF সংরক্ষণ', locked: 'সব পাঠ শেষ করে পরীক্ষায় উত্তীর্ণ হলে সনদ খুলবে।',
      certAcademy: 'জাইমজিয়া™ একাডেমি', certOf: 'সমাপনী সনদ', certifies: 'এই মর্মে প্রত্যয়ন করা যাচ্ছে যে', completedThe: 'সফলভাবে সম্পন্ন করেছেন',
      withDist: 'বিশেষ কৃতিত্বসহ · ', examScore: s => `পরীক্ষার স্কোর ${s}%`, certId: 'সনদ আইডি', ceo: 'চেয়ারম্যান ও সিইও, জাইমজিয়া™', verifyNote: 'কোর্স সাইট কর্তৃক প্রদত্ত। এই পাতাটি আপনার রেকর্ড হিসেবে রাখুন।',
      searchTitle: q => `অনুসন্ধান: “${q}”`, results: n => `${n}টি পাঠ`, noResults: 'কোনো পাঠ মেলেনি। অন্য শব্দ দিয়ে চেষ্টা করুন।',
      footer1: 'আন্তর্জাতিক মানবিক আইন বিষয়ে প্রশিক্ষকদের প্রশিক্ষণ', footer2: 'উন্নয়ন ও প্রকাশনা: জাইম বিন জিয়া · ঢাকা, বাংলাদেশ', policies: 'নীতিমালা', privacy: 'গোপনীয়তা',
      disclaimer: 'শিক্ষামূলক উপকরণ। ICRC, জাতিসংঘ বা BIPSOT-এর সঙ্গে সম্পৃক্ত বা তাদের অনুমোদিত নয়। প্রতীকগুলো কেবল শিক্ষার উদ্দেশ্যে দেখানো হয়েছে।',
      back: '‹ কোর্সে ফিরুন', bookBar: 'TOT-IHL বই', contents: 'সূচিপত্র', toc: 'সূচিপত্র', howTo: 'এই বই কীভাবে ব্যবহার করবেন', preface: 'ভূমিকা', chapter: 'অধ্যায়',
      howToP: 'প্রতিটি অধ্যায় অনলাইন কোর্সের একটি মডিউলের সঙ্গে মিলে যায়। প্রতিটি পাঠ শিখনফল দিয়ে শুরু হয়, চুক্তির রেফারেন্সসহ নিয়মগুলো তুলে ধরে, ঘটনার উদাহরণ দিয়ে ব্যাখ্যা করে এবং মূল শিক্ষা, প্রয়োজনে প্রশিক্ষকের নোট ও উত্তরসহ যাচাই প্রশ্ন দিয়ে শেষ হয়।',
      forTrainers: 'প্রশিক্ষকদের জন্য', forTrainersP: 'প্রশিক্ষকের নোট বক্স ও কর্মশালা অধ্যায় দেখুন: প্রতীক কুইজ, রূপালী ও সোনালী, ফুলের টব প্রদর্শনী, গ্রদেলিৎসা, সোমালিয়ায় বেলজিয়ান সৈন্য, জর্জিয়ার শান্তিরক্ষী, কুন্দুজ ট্যাংকার এবং MOGADI পরিকল্পনা অনুশীলনসহ প্রস্তুত অনুশীলন।',
      bookDisc: 'এটি BIPSOT ToT উপকরণ, ICRC শিক্ষণ উপকরণ ও উন্মুক্ত উৎস থেকে সংকলিত একটি শিক্ষামূলক উপকরণ। এটি ICRC, জাতিসংঘ বা BIPSOT-এর সঙ্গে সম্পৃক্ত বা তাদের অনুমোদিত নয়। চুক্তি ও নীতির বর্তমান অবস্থা সবসময় যাচাই করুন।',
      edition: 'সংস্করণ', publisher: 'উন্নয়ন ও প্রকাশনা: জাইম বিন জিয়া · ঢাকা, বাংলাদেশ', checkQ: n => `যাচাই প্রশ্ন (${n})`, answer: 'উত্তর', practice: 'অনুশীলন', assessment: 'মূল্যায়ন',
      wsChapter: 'কর্মশালা ও সিন্ডিকেট অনুশীলন (মডেল উত্তরসহ)', capChapter: 'ক্যাপস্টোন', planChapter: 'দুই দিনের TOT কর্মসূচি ও ছয় সপ্তাহের স্ব-অধ্যয়ন পরিকল্পনা', examChapter: 'উত্তরসহ অনুশীলন পরীক্ষা', glosChapter: 'পরিভাষা', srcChapter: 'উৎস ও আরও পাঠ',
      planning: 'পরিকল্পনা', planTitle: 'কর্মসূচি ও অধ্যয়ন পরিকল্পনা', twoDay: 'দুই দিনের ToT (BIPSOT-এ যেভাবে পরিচালিত)', session: 'সেশন', day1: 'দিন ১', day2: 'দিন ২',
      sixWeek: 'ছয় সপ্তাহের স্ব-অধ্যয়ন পরিকল্পনা', week: 'সপ্তাহ', chapters: 'অধ্যায়', activity: 'কার্যক্রম', examPrep: 'পরীক্ষা প্রস্তুতি', practiceExam: n => `অনুশীলন পরীক্ষা (${n}টি প্রশ্ন)`, answerKey: 'উত্তরমালা',
      reference: 'সহায়িকা', glossary: 'পরিভাষা', abbrev: 'সংক্ষেপ', sources: 'উৎস', srcTitle: 'উৎস ও আরও পাঠ', modelDebrief: 'মডেল উত্তর ও আলোচনা',
      days: [['বাংলাদেশে ICRC: আমরা কারা; উৎপত্তি, আন্দোলন, প্রতীক (অধ্যায় ১)', 'বেসামরিক-কেন্দ্রিক সামরিক অভিযান ও CIMIC (অধ্যায় ৮)'], ['আন্তর্জাতিক মানবিক আইনের পরিচিতি: উৎস, শ্রেণীবিভাগ, সুরক্ষা, প্রয়োগ (অধ্যায় ১)', 'কেস স্টাডি: ISAF-এর বেসামরিক হতাহত হ্রাস ও LEGAD-এর ভূমিকা (অধ্যায় ৮)'], ['সমকালীন সংঘাতে আন্তর্জাতিক মানবিক আইনের গুরুত্ব (অধ্যায় ৫)', 'বাস্তব কেস স্টাডি: সিন্ডিকেট A, B, C (কর্মশালা)'], ['আন্তর্জাতিক মানবিক আইনের নীতি: পার্থক্যকরণ, আনুপাতিকতা, সতর্কতা (অধ্যায় ২)', 'MOGADI দৃশ্যকল্প: LEGAD, CIMIC ও PA পরিকল্পনা (কর্মশালা)'], ['সামরিক অভিযানে আন্তর্জাতিক মানবিক আইনের অন্তর্ভুক্তি (অধ্যায় ৫)', 'সিন্ডিকেট উপস্থাপনা ও পর্যালোচনা'], ['লক্ষ্যবস্তু নির্ধারণে আন্তর্জাতিক মানবিক আইন ও সান রেমো ম্যাট্রিক্স; গ্রদেলিৎসা সেতু (অধ্যায় ৫)', 'প্রশিক্ষকের টুলকিট, টিচ-ব্যাক, ২০২৬ হালনাগাদ (অধ্যায় ১০)'], ['শান্তিরক্ষা অভিযানে আন্তর্জাতিক মানবিক আইন (অধ্যায় ৭)', 'পরীক্ষা ও সমাপনী']],
      weeks: [['১–২', 'ভিত্তি ও নীতি; প্রতীক কুইজ; ফুলের টব প্রদর্শনী'], ['৩–৪', 'মর্যাদা, বস্তু ও অভিযান পরিচালনা; বইয়ের দৃশ্যকল্প'], ['৫–৬', 'অভিযান, লক্ষ্যবস্তু নির্ধারণ ও অস্ত্র; কমান্ড দায়িত্ব; গ্রদেলিৎসা'], ['৭–৮', 'শান্তিরক্ষা ও বেসামরিক জনগণ; সিন্ডিকেট A, B ও C'], ['৯–১০', 'আইনের অন্তর্ভুক্তি ও প্রশিক্ষক টুলকিট; MOGADI ক্যাপস্টোন'], ['সব', 'হালনাগাদ সেমিনার, মাইক্রো-টিচ, অনুশীলন পরীক্ষা']],
      srcList: ['BIPSOT ToT কোর্স উপকরণ (দিন ১ ও দিন ২-এর উপস্থাপনা, ICRC ঢাকা প্রতিনিধিদল ২০২৫–২০২৬): ICRC সাধারণ উপস্থাপনা; আন্তর্জাতিক মানবিক আইনের পরিচিতি; আন্তর্জাতিক মানবিক আইনের গুরুত্ব; অন্তর্ভুক্তি; লক্ষ্যবস্তু নির্ধারণ; শান্তিরক্ষা; বেসামরিক-কেন্দ্রিক অভিযান; CIVCAS কেস স্টাডি; নীতিসমূহ; গ্রদেলিৎসা সেতু; MOGADI দৃশ্যকল্প; সংযুক্তি A।', 'LOAC প্রশিক্ষক পাঠ বই: পাঠ ১ পরিচিতি; পাঠ ২ পরিভাষা ও সংজ্ঞা; পাঠ ৩ অভিযান পরিচালনা; পাঠ ৫ অস্ত্র; পাঠ ৬ কমান্ড দায়িত্ব।', 'ICRC, Integrating the Law; ICRC, How Does Law Protect in War? (সোমালিয়ায় বেলজিয়ান সৈন্য মামলা)।', '১৯৪৯ সালের জেনেভা কনভেনশন ও অতিরিক্ত প্রটোকল; ICRC প্রথাগত আন্তর্জাতিক মানবিক আইন গবেষণা; রোম সংবিধি; জাতিসংঘ ST/SGB/1999/13।', 'সাম্প্রতিক অগ্রগতি: স্বয়ংক্রিয় অস্ত্র নিয়ে ICRC ও জাতিসংঘের বিবৃতি (২০২৩–২০২৬); ৩৪তম আন্তর্জাতিক সম্মেলনের প্রস্তাব (২০২৪); EWIPA ঘোষণা (২০২২); আন্তর্জাতিক মানবিক আইন বিষয়ক বৈশ্বিক উদ্যোগ (২০২৪–)।', 'আরও পাঠ: ICRC হালনাগাদ ভাষ্য; International Review of the Red Cross; সান রেমো IIHL; A.P.V. Rogers, Law on the Battlefield।']
    },
    fr: {
      langName: 'Français', codes: {FOUNDATIONS:'FONDEMENTS',PRINCIPLES:'PRINCIPES',STATUS:'STATUT',CONDUCT:'CONDUITE',OPERATIONS:'OPÉRATIONS',COMMAND:'COMMANDEMENT',PEACEKEEPING:'MAINTIEN DE LA PAIX',CIVILIANS:'CIVILS',INTEGRATE:'INTÉGRER',TRAINER:'FORMATEUR'}, brand: 'Formation de formateurs · DIH', home: 'Accueil', modules: 'Modules', workshops: 'Ateliers', updates: 'Actualités 2026', exam: 'Examen', capstone: 'Projet final', certificate: 'Certificat', book: 'Livre',
      search: 'Rechercher…', theme: 'Thème', menu: 'Menu', progress: 'Progression', language: 'Langue',
      kicker: 'ZyeemZia™ Formation de formateurs', start: 'Commencer le cours', readBook: 'Lire le livre',
      sModules: 'MODULES', sLessons: 'LEÇONS', sWorkshops: 'ATELIERS', sExam: 'BANQUE D’EXAMEN',
      pathTitle: 'Votre parcours vers la certification', complete: 'terminé', step: 'ÉTAPE',
      learn: 'Apprendre', lessonsDone: n => `${n} leçons`, practise: 'S’exercer', practiseSub: (w, f) => `${w} ateliers en syndicat · ${f} cartes mémoire`,
      certify: 'Se certifier', certifySub: (n, p) => `Examen : ${n} questions, réussite à ${p} %`, getCert: 'Obtenir le certificat', getCertSub: 'Débloqué après les leçons et l’examen',
      courseMap: 'La carte du cours', module: 'MODULE', lessonsOf: (d, n) => `${d}/${n} leçons`,
      bookTitle: n => `Le livre ${n}`, bookKick: 'Manuel du cours · Guide du formateur · Préparation à l’examen', bookH: 'Tout le cours dans un beau livre',
      bookP: 'Chaque module et chaque leçon, tous les ateliers en syndicat avec corrigés, le scénario MOGADI, la boîte à outils du formateur, l’examen blanc complet avec explications, le glossaire et les dernières évolutions du DIH. À lire en ligne ou à enregistrer en PDF.',
      readOnline: 'Lire en ligne', downloadPdf: 'Télécharger le PDF', whoFor: 'À qui s’adresse ce cours',
      modulesTitle: 'Modules et leçons', modulesLead: (m, l) => `${m} modules · ${l} leçons. Marquez chaque leçon comme terminée ; la progression est enregistrée dans ce navigateur.`, min: 'min',
      lessonN: (i, n) => `Leçon ${i}/${n}`, objectives: 'Objectifs d’apprentissage', keyTakeaways: 'À retenir', trainerNote: 'Note du formateur (TOT)', check: 'Vérifiez vos connaissances',
      source: 'Documents sources', markComplete: 'Marquer comme terminée', completed: '✓ Terminée', goExam: 'Aller à l’examen',
      wsTitle: 'Ateliers et exercices en syndicat', wsLead: 'Exercices pratiques animés par le formateur, issus de la formation de formateurs du BIPSOT. Travaillez en syndicat, puis ouvrez les corrigés.', workshop: 'ATELIER',
      modelAnswers: 'Corrigés et points de débriefing', flashcards: 'Cartes mémoire', prev: '‹ Précédente', next: 'Suivante ›', shuffle: 'Mélanger', flipHint: 'Touchez la carte pour la retourner',
      examTitle: 'Examen de certification', examLead: (n, b, p, d) => `${n} questions tirées au hasard d’une banque de ${b}. Réussite : ${p} % · Mention : ${d} %.`, best: 'Meilleur score',
      startExam: 'Commencer un nouvel examen', submitExam: 'Soumettre l’examen', answered: (a, n) => `${a} sur ${n} répondues`, unanswered: n => `${n} question(s) sans réponse. Soumettre quand même ?`,
      score: 'Score', distinction: 'Mention ! ', passed: 'Réussi. ', notYet: 'Pas encore — révisez et réessayez. ', correctIs: 'Bonne réponse : ', certLink: 'Certificat ›',
      deliverables: 'Livrables', rubric: 'Grille d’évaluation', criterion: 'Critère', developing: 'En progression', proficient: 'Maîtrisé', distinguished: 'Excellent',
      certTitle: 'Certificat', certStatus: (p, b, m) => `Leçons : <b>${p} %</b> · Meilleur score : <b>${b} %</b> (requis : 100 % des leçons et ≥ ${m} %)`,
      namePh: 'Votre nom complet tel qu’il figurera sur le certificat', generate: 'Générer', print: 'Imprimer / Enregistrer en PDF', locked: 'Terminez toutes les leçons et réussissez l’examen pour débloquer votre certificat.',
      certAcademy: 'ACADÉMIE ZYEEMZIA™', certOf: 'Certificat de réussite', certifies: 'Nous certifions que', completedThe: 'a suivi avec succès la',
      withDist: 'Avec mention · ', examScore: s => `Score à l’examen : ${s} %`, certId: 'N° de certificat', ceo: 'Président-directeur général, ZyeemZia™', verifyNote: 'Délivré par le site du cours. Conservez cette page comme justificatif.',
      searchTitle: q => `Recherche : « ${q} »`, results: n => `${n} leçons`, noResults: 'Aucune leçon ne correspond. Essayez un autre mot.',
      footer1: 'Formation de formateurs en droit international humanitaire', footer2: 'Conçu et publié par Zyeem Bin Zia · Dhaka, Bangladesh', policies: 'Politiques', privacy: 'Confidentialité',
      disclaimer: 'Ressource pédagogique. Non affiliée au CICR, à l’ONU ni au BIPSOT et non approuvée par eux. Emblèmes présentés à des fins d’enseignement uniquement.',
      back: '‹ Retour au cours', bookBar: 'LE LIVRE TOT-DIH', contents: 'Sommaire', toc: 'Table des matières', howTo: 'Comment utiliser ce livre', preface: 'Préface', chapter: 'Chapitre',
      howToP: 'Chaque chapitre correspond à un module du cours en ligne. Chaque leçon s’ouvre sur des objectifs, expose les règles avec leurs références conventionnelles, les illustre par des cas et se termine par l’essentiel à retenir, une note du formateur le cas échéant et des questions de contrôle corrigées.',
      forTrainers: 'Pour les formateurs', forTrainersP: 'Repérez les encadrés « Note du formateur » et le chapitre Ateliers : des exercices prêts à l’emploi, dont le quiz des signes, Rupali et Shonali, la démonstration des pots de fleurs, Grdelica, les soldats belges en Somalie, les soldats de la paix géorgiens, les camions-citernes de Kunduz et l’exercice de planification MOGADI.',
      bookDisc: 'Ressource pédagogique compilée à partir des supports de la formation de formateurs du BIPSOT, de ressources pédagogiques du CICR et de sources publiques. Elle n’est ni affiliée au CICR, à l’ONU ou au BIPSOT, ni approuvée par eux. Vérifiez toujours l’état actuel des traités et des politiques.',
      edition: 'Édition', publisher: 'Conçu et publié par Zyeem Bin Zia · Dhaka, Bangladesh', checkQ: n => `Questions de contrôle (${n})`, answer: 'Réponse', practice: 'Pratique', assessment: 'Évaluation',
      wsChapter: 'Ateliers et exercices en syndicat (avec corrigés)', capChapter: 'Projet final', planChapter: 'Programme de deux jours et plan d’autoformation de six semaines', examChapter: 'Examen blanc corrigé', glosChapter: 'Glossaire', srcChapter: 'Sources et lectures complémentaires',
      planning: 'Planification', planTitle: 'Programme et plan d’étude', twoDay: 'La formation de deux jours (telle que dispensée au BIPSOT)', session: 'Séance', day1: 'Jour 1', day2: 'Jour 2',
      sixWeek: 'Plan d’autoformation de six semaines', week: 'Semaine', chapters: 'Chapitres', activity: 'Activité', examPrep: 'Préparation à l’examen', practiceExam: n => `Examen blanc (${n} questions)`, answerKey: 'Corrigé',
      reference: 'Référence', glossary: 'Glossaire', abbrev: 'Abréviations', sources: 'Sources', srcTitle: 'Sources et lectures complémentaires', modelDebrief: 'Corrigés et débriefing',
      days: [['Le CICR au Bangladesh : qui nous sommes ; origines, Mouvement, emblème (ch. 1)', 'Opérations militaires centrées sur les civils et CIMIC (ch. 8)'], ['Introduction au DIH : sources, qualification, protection, mise en œuvre (ch. 1)', 'Étude de cas : réduction des pertes civiles de la FIAS et rôle du LEGAD (ch. 8)'], ['Importance du DIH dans les conflits contemporains (ch. 5)', 'Études de cas réels : syndicats A, B, C (Ateliers)'], ['Principes du DIH : distinction, proportionnalité, précaution (ch. 2)', 'Scénario MOGADI : planification LEGAD, CIMIC et PA (Atelier)'], ['Intégration du DIH dans les opérations militaires (ch. 5)', 'Présentations des syndicats et débriefing'], ['Le DIH dans le ciblage et la matrice de San Remo ; pont de Grdelica (ch. 5)', 'Boîte à outils du formateur, restitution, actualités 2026 (ch. 10)'], ['Le DIH dans les opérations de maintien de la paix (ch. 7)', 'Examen et clôture']],
      weeks: [['1–2', 'Fondements et principes ; quiz des signes ; démonstration des pots de fleurs'], ['3–4', 'Statut, biens et conduite des opérations ; scénarios du livre'], ['5–6', 'Opérations, ciblage et armes ; responsabilité du commandement ; Grdelica'], ['7–8', 'Maintien de la paix et civils ; syndicats A, B et C'], ['9–10', 'Intégration et boîte à outils du formateur ; projet final MOGADI'], ['Tous', 'Séminaire d’actualité, micro-enseignement, examen blanc']],
      srcList: ['Supports de la formation de formateurs du BIPSOT (présentations des jours 1 et 2, délégation du CICR à Dhaka 2025–2026) : présentation générale du CICR ; introduction au DIH ; importance du DIH ; intégration ; ciblage ; maintien de la paix ; opérations centrées sur les civils ; étude de cas CIVCAS ; principes ; pont de Grdelica ; scénario MOGADI ; annexe A.', 'Livrets d’instruction sur le droit des conflits armés : leçon 1 Introduction ; leçon 2 Termes et définitions ; leçon 3 Conduite des opérations ; leçon 5 Armes ; leçon 6 Responsabilité du commandement.', 'CICR, Intégrer le droit ; CICR, Un droit dans la guerre ? (affaire des soldats belges en Somalie).', 'Conventions de Genève de 1949 et Protocoles additionnels ; étude du CICR sur le DIH coutumier ; Statut de Rome ; ONU ST/SGB/1999/13.', 'Évolutions récentes : déclarations du CICR et de l’ONU sur les armes autonomes (2023–2026) ; résolutions de la 34e Conférence internationale (2024) ; Déclaration EWIPA (2022) ; Initiative mondiale sur le DIH (2024–).', 'Pour aller plus loin : commentaires actualisés du CICR ; Revue internationale de la Croix-Rouge ; IIDH de San Remo ; A.P.V. Rogers, Law on the Battlefield.']
    }
  };
  // Bangla numerals for counts shown in the interface
  const BN = '০১২৩৪৫৬৭৮৯';
  const num = v => lang === 'bn' ? String(v).replace(/\d/g, d => BN[d]) : String(v);
  const t = (k, ...a) => { const v = (S[lang] && S[lang][k] !== undefined) ? S[lang][k] : S.en[k]; return typeof v === 'function' ? v(...a.map(x => typeof x === 'number' ? num(x) : x)) : v; };
  const code = c => ((S[lang] && S[lang].codes) || {})[c] || c;
  const setLang = l => { try { localStorage.setItem(KEY, l); } catch (e) { /* private mode */ } const u = new URL(location.href); u.searchParams.delete('lang'); location.replace(u.pathname + u.search + u.hash); };
  const base = lang === 'en' ? 'data/' : 'data/' + lang + '/';
  window.ZZI18N = { lang, LANGS, t, num, code, setLang, base, names: { en: 'English', bn: 'বাংলা', fr: 'Français' } };
})();
