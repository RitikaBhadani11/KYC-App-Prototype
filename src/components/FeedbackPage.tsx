import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageSquare, Send, Heart, Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getTranslation } from '../utils/language';
import type { Page, UserData } from '../App';

interface FeedbackPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentLanguage: string;
}

type RatingValue = 5 | 4 | 3 | 2 | 1;
type FeedbackOption = 'easyToUse' | 'fastProcess' | 'clearInstructions' | 'betterDesign' | 'moreLanguages' | 'betterSupport';

const ratingEmojis = {
  5: { emoji: '😍', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300' },
  4: { emoji: '😊', color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300' },
  3: { emoji: '😐', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300' },
  2: { emoji: '😞', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300' },
  1: { emoji: '😡', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300' },
};

const ratingLabels = {
  5: { hi: 'उत्कृष्ट', en: 'Excellent' },
  4: { hi: 'अच्छा', en: 'Good' },
  3: { hi: 'ठीक-ठाक', en: 'Average' },
  2: { hi: 'खराब', en: 'Poor' },
  1: { hi: 'बहुत खराब', en: 'Terrible' },
};

const feedbackOptions = {
  easyToUse: { hi: 'उपयोग में आसान', en: 'Easy to Use', icon: ThumbsUp, color: 'bg-green-500' },
  fastProcess: { hi: 'तेज़ प्रक्रिया', en: 'Fast Process', icon: Star, color: 'bg-blue-500' },
  clearInstructions: { hi: 'स्पष्ट निर्देश', en: 'Clear Instructions', icon: MessageSquare, color: 'bg-purple-500' },
  betterDesign: { hi: 'बेहतर डिज़ाइन', en: 'Better Design', icon: Heart, color: 'bg-pink-500' },
  moreLanguages: { hi: 'अधिक भाषाएं', en: 'More Languages', icon: MessageSquare, color: 'bg-orange-500' },
  betterSupport: { hi: 'बेहतर सहायता', en: 'Better Support', icon: CheckCircle, color: 'bg-indigo-500' },
};

export default function FeedbackPage({ navigateToPage, currentLanguage }: FeedbackPageProps) {
  const [selectedRating, setSelectedRating] = useState<RatingValue | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<FeedbackOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = (key: string) => getTranslation(key, currentLanguage);

  const handleRatingSelect = (rating: RatingValue) => {
    setSelectedRating(rating);
  };

  const handleOptionToggle = (option: FeedbackOption) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmitFeedback = () => {
    if (!selectedRating) return;
    
    setIsSubmitting(true);
    
    // Simulate feedback submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Auto-navigate after showing success
      setTimeout(() => {
        navigateToPage('splash');
      }, 3000);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto">
          <Card className="village-card p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 bounce-gentle" />
            </div>
            
            <h1 className="text-2xl mb-4 text-green-800">
              {t('thankYouFeedback')}
            </h1>
            
            <p className="text-gray-700 mb-6">
              {t('helpUsImprove')}
            </p>
            
            <div className="text-6xl mb-4">🙏</div>
            
            <Button
              onClick={() => navigateToPage('splash')}
              className="village-button text-white px-6 py-3"
            >
              {t('goHome')}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-20">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header with Personality */}
        <Card className="village-card p-6">
          <div className="flex items-center mb-4">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1664101606938-e664f5852fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjZWxlYnJpdHklMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2OTk3NzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Feedback Personality"
              className="w-16 h-16 rounded-full object-cover mr-4 border-3 border-amber-300"
            />
            <div className="flex-1">
              <div className="bg-white/90 rounded-lg p-3 relative">
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white/90"></div>
                <p className="text-sm text-gray-700">
                  {t('feedbackPersonality')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-800">
              {t('feedback')}
            </h1>
            <p className="text-gray-600">
              {t('howWasExperience')}
            </p>
          </div>
        </Card>

        {/* Rating Section */}
        <Card className="village-card p-6">
          <h2 className="text-lg mb-4 text-center text-gray-800">
            {t('rateExperience')}
          </h2>
          
          <div className="flex justify-center space-x-2 mb-4">
            {(Object.keys(ratingEmojis) as unknown as RatingValue[]).reverse().map((rating) => {
              const config = ratingEmojis[rating];
              const isSelected = selectedRating === rating;
              
              return (
                <button
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-110 ${
                    isSelected 
                      ? `${config.bg} ${config.border} border-3 scale-110 pulsing-glow` 
                      : 'bg-gray-100 border-2 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{config.emoji}</span>
                </button>
              );
            })}
          </div>
          
          {selectedRating && (
            <div className="text-center">
              <Badge 
                className={`${ratingEmojis[selectedRating].bg} ${ratingEmojis[selectedRating].color} px-4 py-2`}
              >
                {ratingLabels[selectedRating][currentLanguage as 'hi' | 'en']}
              </Badge>
            </div>
          )}
        </Card>

        {/* Improvement Suggestions */}
        <Card className="village-card p-6">
          <h3 className="text-lg mb-4 text-center text-gray-800">
            {t('whatCanImprove')}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(feedbackOptions) as FeedbackOption[]).map((option) => {
              const config = feedbackOptions[option];
              const Icon = config.icon;
              const isSelected = selectedOptions.includes(option);
              
              return (
                <button
                  key={option}
                  onClick={() => handleOptionToggle(option)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50 transform scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    isSelected ? config.color : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <p className="text-xs text-gray-700">
                    {config[currentLanguage as 'hi' | 'en']}
                  </p>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmitFeedback}
          disabled={!selectedRating || isSubmitting}
          className="w-full village-button text-white py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {currentLanguage === 'hi' ? 'भेजा जा रहा है...' : 'Submitting...'}
            </div>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t('submitFeedback')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}