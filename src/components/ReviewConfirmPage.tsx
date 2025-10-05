import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { FileText, User, Shield, Edit, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Page, UserData } from '../App';

interface ReviewConfirmPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

export default function ReviewConfirmPage({ navigateToPage, userData }: ReviewConfirmPageProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDocumentName = (method: string) => {
    const names: Record<string, string> = {
      aadhaar: 'आधार कार्ड',
      pan: 'पैन कार्ड',
      driving: 'ड्राइविंग लाइसेंस',
      voter: 'मतदाता पहचान पत्र'
    };
    return names[method] || 'KYC दस्तावेज़';
  };

  const handleEdit = (section: 'document' | 'face') => {
    if (section === 'document') {
      navigateToPage('document-scanner');
    } else {
      navigateToPage('face-verification');
    }
  };

  const handleSubmit = () => {
    if (termsAccepted && privacyAccepted) {
      setIsSubmitting(true);
      // Simulate submission process
      setTimeout(() => {
        navigateToPage('success');
      }, 3000);
    }
  };

  const canSubmit = termsAccepted && privacyAccepted && !isSubmitting;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6 bg-white/95 backdrop-blur-sm border-2 border-green-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-800">
              समीक्षा और पुष्टि
            </h1>
            <p className="text-sm text-gray-600">
              Review & Confirm
            </p>
          </div>

          {/* User Information */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm text-blue-800 mb-3">व्यक्तिगत जानकारी:</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>मोबाइल नंबर:</span>
                <span>+91-{userData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>राज्य:</span>
                <span>{userData.selectedState}</span>
              </div>
              <div className="flex justify-between">
                <span>भाषा:</span>
                <span>{userData.selectedLanguage === 'hi' ? 'हिंदी' : userData.selectedLanguage}</span>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="mb-6">
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-800">
                    {getDocumentName(userData.kycMethod || '')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    सत्यापित
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit('document')}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    संपादित
                  </Button>
                </div>
              </div>
              <div className="w-full h-24 bg-gray-100 rounded border flex items-center justify-center">
                <span className="text-xs text-gray-500">दस्तावेज़ पूर्वावलोकन</span>
              </div>
            </Card>
          </div>

          {/* Face Verification Preview */}
          <div className="mb-6">
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-800">चेहरा सत्यापन</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    पूर्ण
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit('face')}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    संपादित
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full border flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  मैं <span className="text-blue-600 underline">नियम और शर्तों</span> से सहमत हूं
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  I agree to the terms and conditions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={privacyAccepted}
                onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                  मैं <span className="text-blue-600 underline">गोपनीयता नीति</span> से सहमत हूं
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  I agree to the privacy policy
                </p>
              </div>
            </div>
          </div>

          {/* Security Assurance */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">सभी डेटा एन्क्रिप्टेड और सुरक्षित है</span>
            </div>
            <p className="text-xs text-green-700">
              आपकी व्यक्तिगत जानकारी केवल KYC सत्यापन के लिए उपयोग की जाएगी
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 disabled:bg-gray-300"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                जमा हो रहा है...
              </div>
            ) : (
              <>
                KYC जमा करें / Submit KYC
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </Card>

        {/* Celebrity Endorsement */}
        <Card className="p-4 bg-white/90 backdrop-blur-sm border border-green-200">
          <div className="flex items-center">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1657348365664-448ab1b59fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBydXJhbHxlbnwxfHx8fDE3NTY5OTY2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Local Leader"
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                "सावधानी से जांच करें और फिर जमा करें!"
              </p>
              <p className="text-xs text-gray-500 mt-1">
                - आपके समुदाय के नेता
              </p>
            </div>
            <Lock className="w-5 h-5 text-green-600" />
          </div>
        </Card>
      </div>
    </div>
  );
}