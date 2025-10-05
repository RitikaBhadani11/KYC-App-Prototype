import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Phone, Lock, Shield, CheckCircle, ArrowRight, Smartphone, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getTranslation } from '../utils/language';
import type { Page, UserData } from '../App';

interface LoginPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentLanguage: string;
}

export default function LoginPage({ navigateToPage, userData, updateUserData, currentLanguage }: LoginPageProps) {
  const [phoneNumber, setPhoneNumber] = useState(userData.phone || '');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const t = (key: string) => getTranslation(key, currentLanguage);

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      // In real app, this would send OTP via API
      console.log('OTP sent to:', phoneNumber);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      // Simulate verification delay
      setTimeout(() => {
        updateUserData({ phone: phoneNumber });
        navigateToPage('kyc-method');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-20">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Card className="village-card p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 village-green-gradient rounded-full flex items-center justify-center relative pulsing-glow">
              {!otpSent ? (
                <>
                  <Smartphone className="w-10 h-10 text-white" />
                  <Sparkles className="w-5 h-5 text-yellow-200 absolute -top-1 -right-1 wiggle" />
                </>
              ) : (
                <>
                  <Lock className="w-10 h-10 text-white" />
                  <Sparkles className="w-5 h-5 text-yellow-200 absolute -top-1 -right-1 wiggle" />
                </>
              )}
            </div>
            <h1 className="text-2xl mb-2 text-gray-800 hindi-text">
              {!otpSent ? t('enterMobile') : t('otpVerification')}
            </h1>
          </div>

          {!otpSent ? (
            <>
              {/* Phone Number Input */}
              <div className="mb-6">
                <label className="block mb-3 text-gray-700 hindi-text">
                  {t('mobileNumber')}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 font-semibold">
                    +91
                  </span>
                  <Input
                    type="tel"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-16 py-4 text-xl border-3 border-amber-200 focus:border-green-500 rounded-lg interactive-glow"
                  />
                </div>
              </div>

              {/* Trust Messages */}
              <div className="mb-6 p-4 village-green-gradient rounded-lg shadow-lg">
                <div className="flex items-center mb-2">
                  <Shield className="w-5 h-5 text-white mr-2" />
                  <span className="text-sm text-white hindi-text">{t('yourNumberSafe')}</span>
                </div>
                <p className="text-xs text-green-100 hindi-text">
                  {t('dataEncrypted')}
                </p>
              </div>

              <Button 
                onClick={handleSendOTP}
                disabled={phoneNumber.length !== 10}
                className="w-full village-button text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hindi-text">{t('sendOtp')}</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="mb-6">
                <label className="block mb-3 text-gray-700 hindi-text">
                  {t('enterOtp')}
                </label>
                <p className="text-sm text-gray-600 mb-4 hindi-text">
                  {t('otpSentTo')} +91-{phoneNumber}
                </p>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-3xl tracking-widest py-6 border-3 border-amber-200 focus:border-green-500 rounded-lg interactive-glow"
                />
              </div>

              {/* Verification Status */}
              {isVerifying && (
                <div className="mb-6 p-4 village-sunset rounded-lg shadow-lg">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="text-white hindi-text">{t('verifying')}</span>
                  </div>
                </div>
              )}

              {/* Resend OTP */}
              <div className="text-center mb-6">
                <Button 
                  variant="ghost" 
                  onClick={handleSendOTP}
                  className="text-base text-amber-700 hover:text-amber-800 interactive-glow hindi-text"
                >
                  {t('resendOtp')}
                </Button>
              </div>

              <Button 
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isVerifying}
                className="w-full village-button text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <span className="hindi-text">{t('verifying')}</span>
                ) : (
                  <>
                    <span className="hindi-text">{t('verify')}</span>
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </>
          )}
        </Card>

        {/* Security Assurance */}
        <div className="text-center">
          <Card className="village-card p-4 inline-block">
            <div className="flex justify-center items-center mb-3">
              <Shield className="w-6 h-6 text-green-600 mr-2 pulse-gentle" />
              <span className="text-base text-gray-700 hindi-text">{t('secureAndTrusted')}</span>
            </div>
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1657348365664-448ab1b59fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBydXJhbHxlbnwxfHx8fDE3NTY5OTY2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Trusted User"
              className="w-24 h-24 mx-auto rounded-full object-cover border-3 border-green-300 interactive-glow"
            />
            <p className="text-sm text-gray-600 mt-3 hindi-text">
              {t('trustedByMillions')}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}