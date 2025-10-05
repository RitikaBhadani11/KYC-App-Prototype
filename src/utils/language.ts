export interface LanguageContent {
  [key: string]: string | LanguageContent;
}

export const translations: Record<string, LanguageContent> = {
  hi: {
    // Common
    back: 'वापस',
    continue: 'आगे बढ़ें',
    submit: 'जमा करें',
    retry: 'दोबारा',
    yes: 'हाँ',
    no: 'नहीं',
    close: 'बंद करें',
    voice: 'आवाज़',
    
    // Splash Page
    appName: 'सुरक्षित पहचान',
    appSubtitle: 'आपकी सुरक्षित और आसान KYC',
    start: 'शुरू करें',
    safe: 'सुरक्षित',
    trusted: 'भरोसेमंद',
    easy: 'आसान',
    trustedByMillions: 'लाखों लोगों का भरोसा',
    
    // Language Selection
    selectLanguageTitle: 'अपना राज्य और भाषा चुनें',
    state: 'राज्य',
    language: 'भाषा',
    selectState: 'अपना राज्य चुनें',
    yourInfoSafe: 'आपकी जानकारी सुरक्षित रहेगी',
    
    // Login Page
    enterMobile: 'अपना मोबाइल नंबर डालें',
    mobileNumber: 'मोबाइल नंबर',
    yourNumberSafe: 'आपका नंबर सुरक्षित है',
    dataEncrypted: 'हम आपकी जानकारी को एन्क्रिप्टेड रखते हैं और किसी के साथ साझा नहीं करते',
    sendOtp: 'OTP भेजें',
    otpVerification: 'OTP सत्यापन',
    enterOtp: '6 अंकों का OTP डालें',
    otpSentTo: 'OTP भेजा गया',
    verifying: 'सत्यापन हो रहा है...',
    resendOtp: 'OTP दोबारा भेजें',
    verify: 'सत्यापित करें',
    secureAndTrusted: 'सुरक्षित और भरोसेमंद',
    
    // KYC Method Selection
    chooseDocument: 'KYC डॉक्यूमेंट चुनें',
    aiSuggestion: 'AI सुझाव',
    bestOptionFor: 'आपके लिए सबसे अच्छा विकल्प है',
    recommendation: 'सुझाव',
    aadhaar: 'आधार कार्ड',
    pan: 'पैन कार्ड',
    driving: 'ड्राइविंग लाइसेंस',
    voter: 'मतदाता पहचान पत्र',
    easiestFastest: 'सबसे आसान और तेज़',
    betterForBusiness: 'बिजनेस के लिए बेहतर',
    forDrivers: 'ड्राइवरों के लिए',
    forVoters: 'वोटर्स के लिए',
    endorsement: 'मैं इस ऐप को सुरक्षित KYC के लिए उपयोग करता हूं!',
    communityLeader: 'आपके समुदाय के नेता',
    
    // Document Scanner
    scanDocument: 'स्कैन करें',
    scanInstructions: 'स्कैन करने के निर्देश:',
    instruction1: '• दस्तावेज़ को समतल सतह पर रखें',
    instruction2: '• अच्छी रोशनी में तस्वीर लें',
    instruction3: '• पूरा दस्तावेज़ फ्रेम में आना चाहिए',
    instruction4: '• साफ़ और स्पष्ट तस्वीर लें',
    takePhoto: 'दस्तावेज़ की तस्वीर लें',
    capture: 'कैप्चर करें',
    scanning: 'AI स्कैन हो रहा है...',
    excellent: 'बहुत अच्छा! दस्तावेज़ साफ़ है',
    blurry: 'तस्वीर धुंधली है, दोबारा लें',
    incomplete: 'पूरा दस्तावेज़ दिखाई नहीं दे रहा',
    retake: 'दोबारा लें',
    confirm: 'कन्फर्म करें',
    offlineMode: 'ऑफलाइन मोड',
    online: 'ऑनलाइन',
    savingOffline: 'ऑफलाइन मोड में सेव हो रहा है',
    willUpdateOnline: 'इंटरनेट आने पर अपडेट हो जाएगा',
    
    // Face Verification
    faceVerification: 'चेहरा सत्यापन',
    faceInstructions: 'निर्देश:',
    faceInstruction1: '• अपने चेहरे को फ्रेम में रखें',
    faceInstruction2: '• अच्छी रोशनी में बैठें',
    faceInstruction3: '• निर्देशों का पालन करें',
    faceInstruction4: '• स्थिर रहें जब तक कि कहा न जाए',
    positionFace: 'अपना चेहरा फ्रेम में लाएं',
    startVerification: 'सत्यापन शुरू करें',
    lookStraight: 'सीधे कैमरे में देखें',
    turnLeft: 'बाएं तरफ मुड़ें',
    turnRight: 'दाएं तरफ मुड़ें',
    smile: 'मुस्कुराएं',
    complete: 'पूर्ण!',
    progress: 'प्रगति',
    step: 'चरण',
    verificationSuccess: 'सत्यापन सफल!',
    faceVerified: 'आपका चेहरा सफलतापूर्वक सत्यापित हो गया है',
    dataEncryptedSecure: 'आपका डेटा एन्क्रिप्टेड और सुरक्षित है',
    
    // Upload Queue
    uploading: 'अपलोड हो रहा है',
    uploadingDocuments: 'दस्तावेज़ अपलोड हो रहे हैं',
    totalProgress: 'कुल प्रगति',
    faceVerificationDoc: 'चेहरा सत्यापन',
    uploadComplete: 'अपलोड पूर्ण',
    uploadingDoc: 'अपलोड हो रहा...',
    uploadFailed: 'अपलोड असफल',
    pending: 'कतार में',
    offlineQueue: 'ऑफलाइन - कतार में है',
    youAreSafe: 'आप सुरक्षित हैं! अपलोड कतार में है',
    willResumeAuto: 'इंटरनेट कनेक्शन आने पर अपने आप रिज्यूम हो जाएगा',
    allUploaded: 'सभी फाइलें सफलतापूर्वक अपलोड हो गईं!',
    dataStoredSecure: 'आपका डेटा सुरक्षित रूप से संग्रहीत हो गया है',
    proceedReview: 'समीक्षा के लिए आगे बढ़ें',
    retryUpload: 'पुनः प्रयास करें',
    uploadTips: 'टिप: बेहतर अपलोड के लिए',
    strongSignal: 'मजबूत सिग्नल',
    bePatient: 'धैर्य रखें',
    
    // Review & Confirm
    reviewConfirm: 'समीक्षा और पुष्टि',
    personalInfo: 'व्यक्तिगत जानकारी:',
    verified: 'सत्यापित',
    edit: 'संपादित',
    documentPreview: 'दस्तावेज़ पूर्वावलोकन',
    agreeTerms: 'मैं नियम और शर्तों से सहमत हूं',
    agreePrivacy: 'मैं गोपनीयता नीति से सहमत हूं',
    allDataEncrypted: 'सभी डेटा एन्क्रिप्टेड और सुरक्षित है',
    dataOnlyForKyc: 'आपकी व्यक्तिगत जानकारी केवल KYC सत्यापन के लिए उपयोग की जाएगी',
    submitting: 'जमा हो रहा है...',
    submitKyc: 'KYC जमा करें',
    reviewCarefully: 'सावधानी से जांच करें और फिर जमा करें!',
    
    // Success Page
    congratulations: 'बधाई हो! 🎉',
    kycComplete: 'आपका KYC सफलतापूर्वक पूर्ण हो गया!',
    kycVerificationComplete: 'Your KYC verification is complete',
    kycId: 'KYC पहचान संख्या:',
    keepSafe: 'इसे सुरक्षित रखें',
    downloadReceipt: 'रसीद डाउनलोड करें',
    shareStatus: 'स्टेटस शेयर करें',
    nowYouCan: 'अब आप इन सेवाओं का उपयोग कर सकते हैं:',
    openBankAccount: 'बैंक खाता खोलें',
    governmentServices: 'सरकारी सेवाएं',
    digitalPayments: 'डिजिटल पेमेंट',
    thankYou: 'धन्यवाद! 🙏',
    trustingSurakshit: 'सुरक्षित पहचान पर भरोसा करने के लिए',
    goHome: 'होम पर जाएं',
    
    // Feedback Page
    feedback: 'फीडबैक',
    howWasExperience: 'आपका अनुभव कैसा रहा?',
    rateExperience: 'अपना अनुभव रेट करें',
    excellent: 'उत्कृष्ट',
    good: 'अच्छा',
    average: 'ठीक-ठाक',
    poor: 'खराब',
    terrible: 'बहुत खराब',
    whatCanImprove: 'हम क्या सुधार सकते हैं?',
    easyToUse: 'उपयोग में आसान',
    fastProcess: 'तेज़ प्रक्रिया',
    clearInstructions: 'स्पष्ट निर्देश',
    betterDesign: 'बेहतर डिज़ाइन',
    moreLanguages: 'अधिक भाषाएं',
    betterSupport: 'बेहतर सहायता',
    submitFeedback: 'फीडबैक भेजें',
    thankYouFeedback: 'आपके फीडबैक के लिए धन्यवाद!',
    helpUsImprove: 'आपकी राय हमारे लिए महत्वपूर्ण है',
    feedbackPersonality: 'आपका फीडबैक हमें बेहतर बनाने में मदद करता है। हमें बताएं कि हम कैसे सुधार सकते हैं!',
  },
  en: {
    // Common
    back: 'Back',
    continue: 'Continue',
    submit: 'Submit',
    retry: 'Retry',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    voice: 'Voice',
    
    // Splash Page
    appName: 'Surakshit Pehchaan',
    appSubtitle: 'Your Safe & Easy KYC',
    start: 'Start',
    safe: 'Safe',
    trusted: 'Trusted',
    easy: 'Easy',
    trustedByMillions: 'Trusted by millions',
    
    // Language Selection
    selectLanguageTitle: 'Select Your State & Language',
    state: 'State',
    language: 'Language',
    selectState: 'Select your state',
    yourInfoSafe: 'Your information will be secure',
    
    // Login Page
    enterMobile: 'Enter Your Mobile Number',
    mobileNumber: 'Mobile Number',
    yourNumberSafe: 'Your number is safe',
    dataEncrypted: 'We keep your information encrypted and do not share with anyone',
    sendOtp: 'Send OTP',
    otpVerification: 'OTP Verification',
    enterOtp: 'Enter 6-digit OTP',
    otpSentTo: 'OTP sent to',
    verifying: 'Verifying...',
    resendOtp: 'Resend OTP',
    verify: 'Verify',
    secureAndTrusted: 'Secure & Trusted',
    
    // And so on... I'll continue with other translations as needed
  }
};

export const getTranslation = (key: string, language: string = 'hi'): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to Hindi if key not found in selected language
      value = translations['hi'];
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};

export const t = (key: string, language?: string) => getTranslation(key, language);