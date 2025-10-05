import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Shield, Users, Heart, Sparkles, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getTranslation } from '../utils/language';
import type { Page, UserData } from '../App';

interface SplashPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentLanguage: string;
}

export default function SplashPage({ navigateToPage, currentLanguage }: SplashPageProps) {
  const t = (key: string) => getTranslation(key, currentLanguage);

  useEffect(() => {
    // Auto-advance to language selection after 4 seconds (increased for better UX)
    const timer = setTimeout(() => {
      navigateToPage('language');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigateToPage]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Transparent Village Background - More Prominent */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1632414237690-7713a79fe9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwY291bnRyeXNpZGV8ZW58MXx8fHwxNzU2OTk2NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Indian Village"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 via-transparent to-yellow-100/50"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 text-4xl opacity-20 bounce-gentle">🌾</div>
      <div className="absolute top-20 right-16 text-3xl opacity-30 bounce-gentle" style={{ animationDelay: '0.5s' }}>🏠</div>
      <div className="absolute bottom-32 left-8 text-3xl opacity-25 bounce-gentle" style={{ animationDelay: '1s' }}>🐄</div>
      <div className="absolute bottom-20 right-12 text-2xl opacity-30 bounce-gentle" style={{ animationDelay: '1.5s' }}>🌳</div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* App Logo and Title */}
        <Card className="village-card p-8 mb-8 transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 village-green-gradient rounded-full flex items-center justify-center relative pulsing-glow overflow-hidden">
              {/* Logo image */}
              <img 
                src="logo.png" 
                alt="App Logo" 
                className="w-full h-full object-contain p-3"
                onError={(e) => {
                  // Fallback to the Shield icon if logo fails to load
                  e.target.style.display = 'none';
                }}
              />
              <Shield className="w-12 h-12 text-white absolute" style={{ display: 'none' }} />
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 wiggle" />
            </div>
          </div>
          
          <h1 className="text-4xl mb-3 text-amber-800 hindi-text">
            {t('appName')}
          </h1>
          <p className="text-lg text-amber-700 mb-6 hindi-text">
            {t('appSubtitle')}
          </p>
          
          {/* Trust Indicators with Animation */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="text-center interactive-glow">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 pulse-gentle" />
              </div>
              <p className="text-sm text-gray-700 hindi-text">{t('safe')}</p>
            </div>
            <div className="text-center interactive-glow">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 pulse-gentle" style={{ animationDelay: '0.3s' }} />
              </div>
              <p className="text-sm text-gray-700 hindi-text">{t('trusted')}</p>
            </div>
            <div className="text-center interactive-glow">
              <div className="w-12 h-12 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600 pulse-gentle" style={{ animationDelay: '0.6s' }} />
              </div>
              <p className="text-sm text-gray-700 hindi-text">{t('easy')}</p>
            </div>
          </div>

          <Button 
            onClick={() => navigateToPage('language')}
            className="w-full village-button text-white py-4 text-xl relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <Star className="w-5 h-5 mr-2 wiggle" />
              {t('start')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
        </Card>

        {/* Community Image */}
        <div className="mb-8">
          <div className="relative inline-block">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1657348365664-448ab1b59fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBydXJhbHxlbnwxfHx8fDE3NTY5OTY2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Happy Farmer"
              className="w-36 h-36 mx-auto rounded-full object-cover border-4 border-amber-300 shadow-lg interactive-glow"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 hindi-text">
            {t('trustedByMillions')}
          </p>
        </div>

        {/* Enhanced Loading indicator */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}