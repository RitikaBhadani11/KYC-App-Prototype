import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CreditCard, FileText, Car, Vote, Star, ArrowRight, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Page, UserData } from '../App';

interface KYCMethodSelectionPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const kycMethods = [
  {
    id: 'aadhaar',
    name: 'आधार कार्ड',
    nameEn: 'Aadhaar Card',
    icon: CreditCard,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    recommended: true,
    description: 'सबसे आसान और तेज़',
    descriptionEn: 'Easiest & Fastest'
  },
  {
    id: 'pan',
    name: 'पैन कार्ड',
    nameEn: 'PAN Card',
    icon: FileText,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    recommended: false,
    description: 'बिजनेस के लिए बेहतर',
    descriptionEn: 'Better for Business'
  },
  {
    id: 'driving',
    name: 'ड्राइविंग लाइसेंस',
    nameEn: 'Driving License',
    icon: Car,
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    recommended: false,
    description: 'ड्राइवरों के लिए',
    descriptionEn: 'For Drivers'
  },
  {
    id: 'voter',
    name: 'मतदाता पहचान पत्र',
    nameEn: 'Voter ID',
    icon: Vote,
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    recommended: false,
    description: 'वोटर्स के लिए',
    descriptionEn: 'For Voters'
  }
];

export default function KYCMethodSelectionPage({ navigateToPage, userData, updateUserData }: KYCMethodSelectionPageProps) {
  const [selectedMethod, setSelectedMethod] = useState(userData.kycMethod || '');

  const handleContinue = () => {
    updateUserData({ kycMethod: selectedMethod });
    navigateToPage('document-scanner');
  };

  const recommendedMethod = kycMethods.find(method => method.recommended);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6 bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-800">
              KYC डॉक्यूमेंट चुनें
            </h1>
            <p className="text-sm text-gray-600">
              Choose Your KYC Document
            </p>
          </div>

          {/* AI Recommendation */}
          {recommendedMethod && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <div className="flex items-center mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">AI सुझाव</span>
              </div>
              <p className="text-sm text-yellow-700">
                आपके लिए <strong>{recommendedMethod.name}</strong> सबसे अच्छा विकल्प है
              </p>
            </div>
          )}

          {/* Method Selection */}
          <div className="space-y-3 mb-6">
            {kycMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedMethod === method.id
                      ? `${method.borderColor} ${method.bgColor} shadow-md`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center mr-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="text-lg text-gray-800 mr-2">{method.name}</h3>
                        {method.recommended && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            सुझाव
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.nameEn}</p>
                      <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Button 
            onClick={handleContinue}
            disabled={!selectedMethod}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 disabled:bg-gray-300"
          >
            आगे बढ़ें / Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        {/* Trust Building with Celebrity Endorsement */}
        <Card className="p-4 bg-white/90 backdrop-blur-sm border border-green-200">
          <div className="flex items-center">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1657348365664-448ab1b59fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBydXJhbHxlbnwxfHx8fDE3NTY5OTY2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Local Leader"
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                "मैं इस ऐप को सुरक्षित KYC के लिए उपयोग करता हूं!"
              </p>
              <p className="text-xs text-gray-500 mt-1">
                - आपके समुदाय के नेता
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}