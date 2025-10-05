import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Camera, RotateCcw, Check, AlertCircle, Wifi, WifiOff, ArrowRight } from 'lucide-react';
import type { Page, UserData } from '../App';

interface DocumentScannerPageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

export default function DocumentScannerPage({ navigateToPage, userData, updateUserData }: DocumentScannerPageProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<{
    quality: 'good' | 'blur' | 'incomplete';
    message: string;
  } | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDocumentName = (method: string) => {
    const names: Record<string, string> = {
      aadhaar: 'आधार कार्ड',
      pan: 'पैन कार्ड',
      driving: 'ड्राइविंग लाइसेंस',
      voter: 'मतदाता पहचान पत्र'
    };
    return names[method] || 'डॉक्यूमेंट';
  };

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setCapturedImage(imageUrl);
        setIsScanning(true);
        
        // Simulate AI scanning
        setTimeout(() => {
          const quality = Math.random() > 0.3 ? 'good' : (Math.random() > 0.5 ? 'blur' : 'incomplete');
          let message = '';
          
          switch (quality) {
            case 'good':
              message = 'बहुत अच्छा! दस्तावेज़ साफ़ है';
              break;
            case 'blur':
              message = 'तस्वीर धुंधली है, दोबारा लें';
              break;
            case 'incomplete':
              message = 'पूरा दस्तावेज़ दिखाई नहीं दे रहा';
              break;
          }
          
          setScanResults({ quality, message });
          setIsScanning(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setScanResults(null);
    setIsScanning(false);
  };

  const handleConfirm = () => {
    if (capturedImage && scanResults?.quality === 'good') {
      updateUserData({ 
        documents: [{ 
          type: userData.kycMethod, 
          image: capturedImage,
          timestamp: new Date().toISOString()
        }] 
      });
      navigateToPage('face-verification');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6 bg-white/95 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-800">
              {getDocumentName(userData.kycMethod || '')} स्कैन करें
            </h1>
            <p className="text-sm text-gray-600">
              Scan Your Document
            </p>
          </div>

          {/* Network Status */}
          <div className="mb-4 flex items-center justify-center">
            {isOffline ? (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                <WifiOff className="w-3 h-3 mr-1" />
                ऑफलाइन मोड
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Wifi className="w-3 h-3 mr-1" />
                ऑनलाइन
              </Badge>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm text-blue-800 mb-2">स्कैन करने के निर्देश:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• दस्तावेज़ को समतल सतह पर रखें</li>
              <li>• अच्छी रोशनी में तस्वीर लें</li>
              <li>• पूरा दस्तावेज़ फ्रेम में आना चाहिए</li>
              <li>• साफ़ और स्पष्ट तस्वीर लें</li>
            </ul>
          </div>

          {/* Camera Interface */}
          <div className="mb-6">
            {!capturedImage ? (
              <div className="relative">
                <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center mb-4">
                    दस्तावेज़ की तस्वीर लें
                    <br />
                    <span className="text-xs">Take photo of document</span>
                  </p>
                  <Button onClick={handleCapture} className="bg-orange-600 hover:bg-orange-700">
                    <Camera className="w-4 h-4 mr-2" />
                    कैप्चर करें
                  </Button>
                </div>
                
                {/* Frame Overlay */}
                <div className="absolute inset-4 border-2 border-white rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured document" 
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <div className="bg-white/90 rounded-lg p-4 flex items-center">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span className="text-sm text-blue-800">AI स्कैन हो रहा है...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scan Results */}
                {scanResults && (
                  <div className={`p-4 rounded-lg border ${
                    scanResults.quality === 'good' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center">
                      {scanResults.quality === 'good' ? (
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span className={`text-sm ${
                        scanResults.quality === 'good' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {scanResults.message}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    onClick={handleRetake}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    दोबारा लें
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={!scanResults || scanResults.quality !== 'good'}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                  >
                    कन्फर्म करें
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            capture="environment"
            className="hidden"
          />
        </Card>

        {/* Offline Support Indicator */}
        {isOffline && (
          <Card className="p-4 bg-yellow-50 border border-yellow-200">
            <div className="flex items-center text-yellow-800">
              <WifiOff className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm">ऑफलाइन मोड में सेव हो रहा है</p>
                <p className="text-xs text-yellow-700">इंटरनेट आने पर अपडेट हो जाएगा</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}