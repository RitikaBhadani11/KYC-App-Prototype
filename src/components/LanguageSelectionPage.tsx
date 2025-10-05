import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight, MapPin, Globe, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getTranslation } from '../utils/language';
import type { Page, UserData } from '../App';

interface LanguageSelectionPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentLanguage: string;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

const languages = [
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
];

export default function LanguageSelectionPage({ navigateToPage, userData, updateUserData, currentLanguage }: LanguageSelectionPageProps) {
  const [selectedState, setSelectedState] = useState(userData.selectedState || '');
  const [selectedLanguage, setSelectedLanguage] = useState(userData.selectedLanguage || 'hi');
  
  const t = (key: string) => getTranslation(key, selectedLanguage || 'hi');

  const handleContinue = () => {
    updateUserData({ selectedState, selectedLanguage });
    navigateToPage('login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-20">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Card className="village-card p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 village-sunset rounded-full flex items-center justify-center relative">
              <Globe className="w-10 h-10 text-white" />
              <Sparkles className="w-5 h-5 text-yellow-200 absolute -top-1 -right-1 wiggle" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-800 hindi-text">
              {t('selectLanguageTitle')}
            </h1>
          </div>

          {/* State Selection */}
          <div className="mb-6">
            <label className="flex items-center mb-3 text-gray-700">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              <span className="hindi-text">{t('state')}</span>
            </label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full bg-white border-3 border-amber-200 focus:border-green-500 interactive-glow">
                <SelectValue placeholder={t('selectState')} />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <label className="flex items-center mb-3 text-gray-700">
              <Globe className="w-5 h-5 mr-2 text-purple-600" />
              <span className="hindi-text">{t('language')}</span>
            </label>
            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`flex items-center p-4 rounded-lg border-3 transition-all interactive-glow ${
                    selectedLanguage === lang.code
                      ? 'border-green-500 bg-green-50 text-green-800 transform scale-105'
                      : 'border-amber-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <span className="text-2xl mr-4">{lang.flag}</span>
                  <span className="text-base flex-1 text-left hindi-text">{lang.name}</span>
                  {selectedLanguage === lang.code && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleContinue}
            disabled={!selectedState || !selectedLanguage}
            className="w-full village-button text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="hindi-text">{t('continue')}</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>

        {/* Rural Background Image */}
        <div className="text-center">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1611262360544-af37696056b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwaHV0cyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1Njk5Nzc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Indian Village Huts"
            className="w-56 h-36 mx-auto rounded-lg object-cover opacity-40 interactive-glow"
          />
          <p className="text-sm text-gray-600 mt-3 hindi-text">
            {t('yourInfoSafe')}
          </p>
        </div>
      </div>
    </div>
  );
}