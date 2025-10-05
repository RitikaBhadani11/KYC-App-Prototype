import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Download, Share2, Home, CreditCard, Building2, Smartphone, Heart, MessageSquare, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getTranslation } from '../utils/language';
import type { Page, UserData } from '../App';

interface SuccessPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentLanguage: string;
}

export default function SuccessPage({ navigateToPage, userData, currentLanguage }: SuccessPageProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [kycId] = useState(() => `KYC${Date.now().toString().slice(-6)}`);
  
  const t = (key: string) => getTranslation(key, currentLanguage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReceipt = () => {
    // In real app, this would generate and download a PDF receipt
    console.log('Downloading KYC receipt');
    alert(currentLanguage === 'hi' ? 'KYC रसीद डाउनलोड हो रही है...' : 'Downloading KYC receipt...');
  };

  const handleShareStatus = () => {
    // In real app, this would share via WhatsApp/SMS
    if (navigator.share) {
      navigator.share({
        title: t('appName'),
        text: currentLanguage === 'hi' 
          ? `मेरा KYC सफलतापूर्वक पूर्ण हो गया! ID: ${kycId}` 
          : `My KYC verification completed successfully! ID: ${kycId}`,
      });
    } else {
      alert(currentLanguage === 'hi' ? 'स्टेटस शेयर करने की सुविधा उपलब्ध नहीं है' : 'Share feature not available');
    }
  };

  const handleGoHome = () => {
    navigateToPage('splash');
  };

  const handleGiveFeedback = () => {
    navigateToPage('feedback');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 ${
                i % 4 === 0 ? 'bg-green-500' : 
                i % 4 === 1 ? 'bg-yellow-500' : 
                i % 4 === 2 ? 'bg-orange-500' : 'bg-red-500'
              } opacity-80`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `confetti 3s ease-out ${Math.random() * 2}s both`,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-md mx-auto relative z-20">
        {/* Success Header */}
        <Card className="village-card p-8 mb-6 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <div className="w-28 h-28 mx-auto mb-4 village-green-gradient rounded-full flex items-center justify-center pulsing-glow">
              <CheckCircle className="w-14 h-14 text-white bounce-gentle" />
            </div>
            <h1 className="text-4xl mb-3 text-green-800 hindi-text">
              {t('congratulations')}
            </h1>
            <p className="text-xl text-gray-700 mb-2 hindi-text">
              {t('kycComplete')}
            </p>
          </div>

          {/* KYC ID */}
          <div className="mb-6 p-4 village-sunset rounded-lg shadow-lg">
            <p className="text-sm text-orange-800 mb-1 hindi-text">{t('kycId')}</p>
            <p className="text-xl text-orange-900 tracking-wider font-mono">{kycId}</p>
            <p className="text-xs text-orange-700 mt-1 hindi-text">
              {t('keepSafe')}
            </p>
          </div>

          {/* Status Badge */}
          <Badge className="bg-green-100 text-green-800 px-6 py-3 text-lg mb-6 border-2 border-green-300">
            <CheckCircle className="w-5 h-5 mr-2" />
            {t('verified')}
          </Badge>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button 
              onClick={handleDownloadReceipt}
              className="w-full village-button text-white py-4 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              {t('downloadReceipt')}
            </Button>
            
            <Button 
              onClick={handleShareStatus}
              variant="outline"
              className="w-full py-4 border-3 border-amber-400 text-amber-700 hover:bg-amber-50 text-lg interactive-glow"
            >
              <Share2 className="w-5 h-5 mr-2" />
              {t('shareStatus')}
            </Button>

            {/* Feedback Button */}
            <Button 
              onClick={handleGiveFeedback}
              variant="outline"
              className="w-full py-4 border-3 border-purple-400 text-purple-700 hover:bg-purple-50 text-lg interactive-glow"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              <Star className="w-4 h-4 mr-1" />
              {t('feedback')}
            </Button>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="village-card p-6 mb-6">
          <h3 className="text-xl mb-4 text-center text-gray-800 hindi-text">
            {t('nowYouCan')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg border-2 border-green-200 interactive-glow">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg text-gray-800 hindi-text">{t('openBankAccount')}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200 interactive-glow">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg text-gray-800 hindi-text">{t('governmentServices')}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200 interactive-glow">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg text-gray-800 hindi-text">{t('digitalPayments')}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Thank You Message */}
        <Card className="village-card p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1657348365664-448ab1b59fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBydXJhbHxlbnwxfHx8fDE3NTY5OTY2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Happy User"
              className="w-20 h-20 rounded-full object-cover mr-4 border-4 border-yellow-300"
            />
            <div>
              <p className="text-2xl text-gray-800 mb-1 hindi-text">
                {t('thankYou')}
              </p>
              <p className="text-lg text-gray-600 hindi-text">
                {t('trustingSurakshit')}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center items-center text-lg text-gray-600 mb-6">
            <Heart className="w-6 h-6 text-red-500 mr-2 pulse-gentle" />
            <span className="hindi-text">{t('trustedByMillions')}</span>
          </div>

          <Button 
            onClick={handleGoHome}
            variant="outline"
            className="w-full py-4 border-3 border-gray-400 text-gray-700 hover:bg-gray-50 text-lg interactive-glow"
          >
            <Home className="w-5 h-5 mr-2" />
            {t('goHome')}
          </Button>
        </Card>
      </div>

      {/* Add confetti animation styles */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}