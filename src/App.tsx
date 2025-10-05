import React, { useState, useEffect } from 'react';
import { Volume2, ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { Button } from './components/ui/button';

// Import all page components
import SplashPage from './components/SplashPage';
import LanguageSelectionPage from './components/LanguageSelectionPage';
import LoginPage from './components/LoginPage';
import KYCMethodSelectionPage from './components/KYCMethodSelectionPage';
import DocumentScannerPage from './components/DocumentScannerPage';
import FaceVerificationPage from './components/FaceVerificationPage';
import UploadQueuePage from './components/UploadQueuePage';
import ReviewConfirmPage from './components/ReviewConfirmPage';
import SuccessPage from './components/SuccessPage';
import FeedbackPage from './components/FeedbackPage';

// Import language utilities
import { getTranslation } from './utils/language';

// Import mobile app utilities
import { initializeMobileApp, DeviceCapabilities, MobileInteractions } from './utils/mobileApp';
import { WakeLockManager } from './utils/wakeLock';

export type Page = 
  | 'splash'
  | 'language'
  | 'login'
  | 'kyc-method'
  | 'document-scanner'
  | 'face-verification'
  | 'upload-queue'
  | 'review-confirm'
  | 'success'
  | 'feedback';

export interface UserData {
  phone?: string;
  selectedState?: string;
  selectedLanguage?: string;
  kycMethod?: string;
  documents?: any[];
  faceVerified?: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [userData, setUserData] = useState<UserData>({ selectedLanguage: 'hi' });
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [navigationHistory, setNavigationHistory] = useState<Page[]>(['splash']);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wakeLockStatus, setWakeLockStatus] = useState({
    supported: null as boolean | null,
    active: false,
    hasUserGesture: false
  });

  // Initialize mobile app on mount
  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeMobileApp();
        
        // Initialize wake lock manager
        await WakeLockManager.init();
        
        // Update wake lock status
        setWakeLockStatus(WakeLockManager.getStatus());
        
        console.log('Mobile app initialized successfully');
        console.log('Device is standalone app:', DeviceCapabilities.isStandalone());
        console.log('Wake lock status:', WakeLockManager.getStatus());
        
      } catch (error) {
        console.error('Mobile app initialization error:', error);
        // App should still work even if some mobile features fail
      }
    };
    
    initApp();
  }, []);

  // Mobile app lifecycle effects
  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Handle app visibility for battery optimization
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        // App went to background - wake lock will be automatically released
        console.log('App backgrounded');
      } else {
        // App came to foreground - try to re-acquire wake lock
        console.log('App foregrounded');
        if (wakeLockStatus.supported) {
          const success = await WakeLockManager.request();
          setWakeLockStatus(WakeLockManager.getStatus());
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle hardware back button on Android
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (navigationHistory.length > 1) {
        goBack();
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Request initial wake lock if supported
    const requestInitialWakeLock = async () => {
      if (wakeLockStatus.supported) {
        const success = await WakeLockManager.request();
        setWakeLockStatus(WakeLockManager.getStatus());
      }
    };
    
    requestInitialWakeLock();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
      WakeLockManager.release();
    };
  }, [navigationHistory]);

  // Wake lock management (now handled by WakeLockManager)
  const toggleWakeLock = async () => {
    if (wakeLockStatus.active) {
      await WakeLockManager.release();
    } else {
      await WakeLockManager.request();
    }
    setWakeLockStatus(WakeLockManager.getStatus());
    
    // Provide haptic feedback
    MobileInteractions.hapticFeedback('light');
  };

  // Fullscreen management
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
      
      // Provide haptic feedback
      MobileInteractions.hapticFeedback('medium');
      
    } catch (error) {
      console.log('Fullscreen not supported or not allowed:', error);
      
      // Fallback: Try to simulate fullscreen with CSS
      if (!document.fullscreenElement) {
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
        document.body.style.left = '0';
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
        document.body.style.zIndex = '9999';
        setIsFullscreen(true);
      } else {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.zIndex = '';
        setIsFullscreen(false);
      }
    }
  };

  const navigateToPage = (page: Page) => {
    // Add to browser history for hardware back button
    window.history.pushState({ page }, '', `#${page}`);
    setNavigationHistory(prev => [...prev, page]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
      
      // Update browser history
      window.history.replaceState({ page: previousPage }, '', `#${previousPage}`);
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    
    // Provide haptic feedback
    MobileInteractions.hapticFeedback('light');
    
    // In a real app, this would toggle text-to-speech functionality
    if (voiceEnabled) {
      console.log('Voice assistance disabled');
      MobileInteractions.showNotification('Voice Assistance Disabled', {
        body: 'Voice guidance has been turned off',
        silent: true
      });
    } else {
      console.log('Voice assistance enabled');
      MobileInteractions.showNotification('Voice Assistance Enabled', {
        body: 'Voice guidance is now active',
        silent: true
      });
    }
  };

  const canGoBack = navigationHistory.length > 1 && currentPage !== 'splash';
  const currentLanguage = userData.selectedLanguage || 'hi';

  const renderCurrentPage = () => {
    const pageProps = {
      navigateToPage,
      userData,
      updateUserData,
      currentLanguage,
    };

    switch (currentPage) {
      case 'splash':
        return <SplashPage {...pageProps} />;
      case 'language':
        return <LanguageSelectionPage {...pageProps} />;
      case 'login':
        return <LoginPage {...pageProps} />;
      case 'kyc-method':
        return <KYCMethodSelectionPage {...pageProps} />;
      case 'document-scanner':
        return <DocumentScannerPage {...pageProps} />;
      case 'face-verification':
        return <FaceVerificationPage {...pageProps} />;
      case 'upload-queue':
        return <UploadQueuePage {...pageProps} />;
      case 'review-confirm':
        return <ReviewConfirmPage {...pageProps} />;
      case 'success':
        return <SuccessPage {...pageProps} />;
      case 'feedback':
        return <FeedbackPage {...pageProps} />;
      default:
        return <SplashPage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen village-gradient relative mobile-scroll no-pull-refresh safe-area-inset">
      {/* Dynamic Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 village-bg-pattern"
        style={{
          backgroundImage: currentPage === 'splash' 
            ? `url("https://images.unsplash.com/photo-1632414237690-7713a79fe9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwY291bnRyeXNpZGV8ZW58MXx8fHwxNzU2OTk2NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`
            : currentPage === 'language' || currentPage === 'login'
            ? `url("https://images.unsplash.com/photo-1611262360544-af37696056b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwaHV0cyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1Njk5Nzc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`
            : currentPage === 'kyc-method' || currentPage === 'document-scanner'
            ? `url("https://images.unsplash.com/photo-1717065165653-bb853b7e6e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwbWFya2V0JTIwdmVuZG9yc3xlbnwxfHx8fDE3NTY5OTc3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`
            : currentPage === 'face-verification' || currentPage === 'upload-queue'
            ? `url("https://images.unsplash.com/photo-1671769195188-8b5f3fac791d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwdHJlZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzU2OTk3NzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`
            : `url("https://images.unsplash.com/photo-1598549865095-7a5c08adcf2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwcG9uZCUyMGNoaWxkcmVufGVufDF8fHx8MTc1Njk5Nzc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Mobile App Status Bar */}
      {currentPage !== 'splash' && (
        <div className="absolute top-0 left-0 right-0 z-50">
          {/* Connection Status Indicator */}
          {!isOnline && (
            <div className="bg-red-600 text-white px-4 py-2 text-center text-sm">
              <WifiOff className="w-4 h-4 inline mr-2" />
              {currentLanguage === 'hi' ? 'ऑफ़लाइन मोड - डेटा सहेजा जा रहा है' : 'Offline Mode - Data will sync when connected'}
            </div>
          )}
          
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center p-4">
            {/* Back Button */}
            {canGoBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                className="bg-white/90 border-2 border-amber-200 text-amber-800 hover:bg-amber-50 shadow-lg interactive-glow touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {getTranslation('back', currentLanguage)}
              </Button>
            )}
            
            {!canGoBack && <div></div>}
            
            {/* Mobile Controls */}
            <div className="flex gap-2">
              {/* Connection Status */}
              <div className={`p-2 rounded-full ${isOnline ? 'bg-green-100' : 'bg-red-100'}`}>
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-600" />
                )}
              </div>
              
              {/* Voice Toggle Button */}
              <Button
                variant={voiceEnabled ? "default" : "outline"}
                size="sm"
                onClick={toggleVoice}
                className={`shadow-lg interactive-glow touch-manipulation ${
                  voiceEnabled 
                    ? 'village-button text-white' 
                    : 'bg-white/90 border-2 border-green-200 text-green-700 hover:bg-green-50'
                }`}
              >
                <Volume2 className={`w-4 h-4 mr-1 ${voiceEnabled ? 'wiggle' : ''}`} />
                {getTranslation('voice', currentLanguage)}
              </Button>
              
              {/* Wake Lock Toggle (keep screen on) */}
              {wakeLockStatus.supported && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleWakeLock}
                  className={`shadow-lg interactive-glow touch-manipulation ${
                    wakeLockStatus.active
                      ? 'bg-yellow-100 border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-white/90 border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  title={wakeLockStatus.active ? 'Allow Screen Sleep' : 'Keep Screen On'}
                >
                  {wakeLockStatus.active ? '🔆' : '🌙'}
                </Button>
              )}
              
              {/* Fullscreen Toggle (for immersive experience) */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="bg-white/90 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 shadow-lg interactive-glow touch-manipulation"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? '⛶' : '⛶'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 gpu-accelerated">
        <div className="fade-in-scale">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
}