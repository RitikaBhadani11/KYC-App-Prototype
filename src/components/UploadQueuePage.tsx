import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Upload, Wifi, WifiOff, CheckCircle, AlertCircle, RefreshCw, ArrowRight, Clock } from 'lucide-react';
import type { Page, UserData } from '../App';

interface UploadQueuePageProps {
  navigateToPage: (page: Page) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

interface UploadItem {
  id: string;
  name: string;
  type: 'document' | 'face';
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  progress: number;
  size: string;
}

export default function UploadQueuePage({ navigateToPage, userData }: UploadQueuePageProps) {
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([
    {
      id: '1',
      name: userData.kycMethod === 'aadhaar' ? 'आधार कार्ड' : 'KYC दस्तावेज़',
      type: 'document',
      status: 'pending',
      progress: 0,
      size: '2.1 MB'
    },
    {
      id: '2',
      name: 'चेहरा सत्यापन',
      type: 'face',
      status: 'pending',
      progress: 0,
      size: '1.8 MB'
    }
  ]);

  const [isOnline, setIsOnline] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Start upload process automatically
    if (!isUploading) {
      setIsUploading(true);
      startUpload();
    }
  }, [isUploading]);

  useEffect(() => {
    // Calculate overall progress
    const totalProgress = uploadItems.reduce((sum, item) => sum + item.progress, 0);
    setOverallProgress(totalProgress / uploadItems.length);
  }, [uploadItems]);

  const startUpload = () => {
    uploadItems.forEach((item, index) => {
      setTimeout(() => {
        uploadFile(item.id);
      }, index * 1000);
    });
  };

  const uploadFile = (itemId: string) => {
    setUploadItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'uploading' as const }
          : item
      )
    );

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setUploadItems(prev => 
          prev.map(item => 
            item.id === itemId 
              ? { ...item, status: 'completed' as const, progress: 100 }
              : item
          )
        );
      } else {
        setUploadItems(prev => 
          prev.map(item => 
            item.id === itemId 
              ? { ...item, progress }
              : item
          )
        );
      }
    }, 200);

    // Simulate network issues
    if (Math.random() < 0.2) {
      setTimeout(() => {
        setIsOnline(false);
        clearInterval(interval);
        setUploadItems(prev => 
          prev.map(item => 
            item.id === itemId && item.status === 'uploading'
              ? { ...item, status: 'failed' as const }
              : item
          )
        );
      }, 2000);
    }
  };

  const retryUpload = (itemId: string) => {
    setUploadItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'pending' as const, progress: 0 }
          : item
      )
    );
    setIsOnline(true);
    uploadFile(itemId);
  };

  const handleContinue = () => {
    navigateToPage('review-confirm');
  };

  const allUploadsComplete = uploadItems.every(item => item.status === 'completed');
  const hasFailedUploads = uploadItems.some(item => item.status === 'failed');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6 bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl mb-2 text-gray-800">
              अपलोड हो रहा है
            </h1>
            <p className="text-sm text-gray-600">
              Uploading Documents
            </p>
          </div>

          {/* Network Status */}
          <div className="mb-6 flex items-center justify-center">
            {isOnline ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Wifi className="w-3 h-3 mr-1" />
                ऑनलाइन
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                <WifiOff className="w-3 h-3 mr-1" />
                ऑफलाइन - कतार में है
              </Badge>
            )}
          </div>

          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">कुल प्रगति</span>
              <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          {/* Upload Items */}
          <div className="space-y-4 mb-6">
            {uploadItems.map((item) => (
              <Card key={item.id} className="p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      item.status === 'completed' ? 'bg-green-100' :
                      item.status === 'uploading' ? 'bg-blue-100' :
                      item.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : item.status === 'uploading' ? (
                        <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                      ) : item.status === 'failed' ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.size}</p>
                    </div>
                  </div>
                  
                  {item.status === 'failed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => retryUpload(item.id)}
                      className="text-xs"
                    >
                      दोबारा
                    </Button>
                  )}
                </div>
                
                {(item.status === 'uploading' || item.status === 'completed') && (
                  <Progress value={item.progress} className="h-1" />
                )}
                
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs ${
                    item.status === 'completed' ? 'text-green-600' :
                    item.status === 'uploading' ? 'text-blue-600' :
                    item.status === 'failed' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {item.status === 'completed' ? 'अपलोड पूर्ण' :
                     item.status === 'uploading' ? 'अपलोड हो रहा...' :
                     item.status === 'failed' ? 'अपलोड असफल' : 'कतार में'}
                  </span>
                  {item.status === 'uploading' && (
                    <span className="text-xs text-gray-500">{Math.round(item.progress)}%</span>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Offline Message */}
          {!isOnline && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center text-yellow-800">
                <WifiOff className="w-5 h-5 mr-2" />
                <div>
                  <p className="text-sm">आप सुरक्षित हैं! अपलोड कतार में है</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    इंटरनेट कनेक्शन आने पर अपने आप रिज्यूम हो जाएगा
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {allUploadsComplete && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center text-green-800">
                <CheckCircle className="w-5 h-5 mr-2" />
                <div>
                  <p className="text-sm">सभी फाइलें सफलतापूर्वक अपलोड हो गईं!</p>
                  <p className="text-xs text-green-700 mt-1">
                    आपका डेटा सुरक्षित रूप से संग्रहीत हो गया है
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleContinue}
            disabled={!allUploadsComplete}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 disabled:bg-gray-300"
          >
            {hasFailedUploads ? 'पुनः प्रयास करें' : 'समीक्षा के लिए आगे बढ़ें'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        {/* Upload Tips */}
        <Card className="p-4 bg-white/90 backdrop-blur-sm border border-blue-200">
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-2">
              टिप: बेहतर अपलोड के लिए
            </p>
            <div className="flex justify-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center">
                <Wifi className="w-3 h-3 mr-1" />
                मजबूत सिग्नल
              </div>
              <div className="flex items-center">
                <Upload className="w-3 h-3 mr-1" />
                धैर्य रखें
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}