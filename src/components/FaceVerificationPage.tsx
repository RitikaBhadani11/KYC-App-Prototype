import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { User, Shield, ArrowLeft, ArrowRight, RotateCcw, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Page, UserData } from '../App';

interface FaceVerificationPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

type VerificationStep = 'center' | 'left' | 'right' | 'smile' | 'complete';

const stepInstructions: Record<VerificationStep, { hi: string; en: string }> = {
  center: { hi: 'सीधे कैमरे में देखें', en: 'Look straight at camera' },
  left: { hi: 'बाएं तरफ मुड़ें', en: 'Turn left' },
  right: { hi: 'दाएं तरफ मुड़ें', en: 'Turn right' },
  smile: { hi: 'मुस्कुराएं', en: 'Smile' },
  complete: { hi: 'पूर्ण!', en: 'Complete!' }
};

export default function FaceVerificationPage({ navigateToPage, userData, updateUserData }: FaceVerificationPageProps) {
  const [currentStep, setCurrentStep] = useState<VerificationStep>('center');
  const [progress, setProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [capturedFace, setCapturedFace] = useState<string | null>(null);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const steps: VerificationStep[] = ['center', 'left', 'right', 'smile', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);

  useEffect(() => {
    setProgress((currentStepIndex / (steps.length - 1)) * 100);
  }, [currentStep, currentStepIndex, steps.length]);

  const handleStartVerification = () => {
    setIsVerifying(true);
    setCapturedFace('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="40" cy="40" r="5" fill="%23333"/><circle cx="60" cy="40" r="5" fill="%23333"/><path d="M35 60 Q50 70 65 60" stroke="%23333" stroke-width="2" fill="none"/></svg>');
    
    // Simulate step-by-step verification
    const stepTimer = setInterval(() => {
      setCurrentStep(prevStep => {
        const currentIndex = steps.indexOf(prevStep);
        if (currentIndex < steps.length - 1) {
          return steps[currentIndex + 1];
        } else {
          clearInterval(stepTimer);
          setVerificationComplete(true);
          setIsVerifying(false);
          return prevStep;
        }
      });
    }, 2000);

    return () => clearInterval(stepTimer);
  };

  const handleRetake = () => {
    setCurrentStep('center');
    setProgress(0);
    setIsVerifying(false);
    setCapturedFace(null);
    setVerificationComplete(false);
  };

  const handleContinue = () => {
    updateUserData({ faceVerified: true });
    navigateToPage('upload-queue');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6 bg-white/95 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-800">
              चेहरा सत्यापन
            </h1>
            <p className="text-sm text-gray-600">
              Face Verification
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">प्रगति</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Instructions */}
          {!verificationComplete && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm text-blue-800 mb-2">निर्देश:</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• अपने चेहरे को फ्रेम में रखें</li>
                <li>• अच्छी रोशनी में बैठें</li>
                <li>• निर्देशों का पालन करें</li>
                <li>• स्थिर रहें जब तक कि कहा न जाए</li>
              </ul>
            </div>
          )}

          {/* Face Capture Area */}
          <div className="mb-6">
            {!capturedFace ? (
              <div className="relative">
                <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 border-4 border-purple-300 rounded-full flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-purple-400" />
                  </div>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    अपना चेहरा फ्रेम में लाएं
                    <br />
                    <span className="text-xs">Position your face in the frame</span>
                  </p>
                  <Button 
                    onClick={handleStartVerification}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    सत्यापन शुरू करें
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-40 h-40 border-4 border-purple-400 rounded-full bg-white flex items-center justify-center">
                      <img 
                        src={capturedFace} 
                        alt="User face" 
                        className="w-32 h-32 rounded-full"
                      />
                    </div>
                  </div>
                  
                  {/* Step Instructions Overlay */}
                  {isVerifying && currentStep !== 'complete' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-lg p-4 shadow-lg">
                        <div className="text-center">
                          <p className="text-lg text-gray-800 mb-1">
                            {stepInstructions[currentStep].hi}
                          </p>
                          <p className="text-sm text-gray-600">
                            {stepInstructions[currentStep].en}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Step Badge */}
                {isVerifying && (
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      चरण {currentStepIndex + 1} / {steps.length - 1}
                    </Badge>
                  </div>
                )}

                {/* Verification Complete */}
                {verificationComplete && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-center mb-3">
                      <Check className="w-6 h-6 text-green-600 mr-2" />
                      <span className="text-lg text-green-800">सत्यापन सफल!</span>
                    </div>
                    <p className="text-sm text-green-700 text-center">
                      आपका चेहरा सफलतापूर्वक सत्यापित हो गया है
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {!isVerifying && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleRetake}
                      variant="outline"
                      className="flex-1"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      दोबारा करें
                    </Button>
                    <Button
                      onClick={handleContinue}
                      disabled={!verificationComplete}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                    >
                      आगे बढ़ें
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Security Assurance */}
        <Card className="p-4 bg-white/90 backdrop-blur-sm border border-purple-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-1">
                आपका डेटा एन्क्रिप्टेड और सुरक्षित है
              </p>
              <p className="text-xs text-gray-500">
                Your data is encrypted & secure
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}