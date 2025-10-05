// Mobile App Utilities for KYC Rural India

export interface KYCData {
  id: string;
  timestamp: number;
  userData: any;
  documents?: File[];
  faceData?: Blob;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
}

// Local storage management for offline functionality
export class OfflineDataManager {
  private static readonly STORAGE_KEY = 'kyc_offline_data';
  private static readonly USER_PREFS_KEY = 'kyc_user_preferences';

  // Save KYC data locally
  static saveKYCData(data: KYCData): void {
    try {
      const existingData = this.getKYCData();
      const updatedData = [...existingData, data];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
      console.log('KYC data saved offline:', data.id);
    } catch (error) {
      console.error('Failed to save KYC data:', error);
    }
  }

  // Get all offline KYC data
  static getKYCData(): KYCData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to retrieve KYC data:', error);
      return [];
    }
  }

  // Update KYC data status
  static updateKYCDataStatus(id: string, status: KYCData['status']): void {
    try {
      const data = this.getKYCData();
      const updatedData = data.map(item => 
        item.id === id ? { ...item, status } : item
      );
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to update KYC data status:', error);
    }
  }

  // Clear completed KYC data
  static clearCompletedData(): void {
    try {
      const data = this.getKYCData();
      const pendingData = data.filter(item => item.status !== 'completed');
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pendingData));
    } catch (error) {
      console.error('Failed to clear completed data:', error);
    }
  }

  // Save user preferences
  static saveUserPreferences(prefs: any): void {
    try {
      localStorage.setItem(this.USER_PREFS_KEY, JSON.stringify(prefs));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  }

  // Get user preferences
  static getUserPreferences(): any {
    try {
      const prefs = localStorage.getItem(this.USER_PREFS_KEY);
      return prefs ? JSON.parse(prefs) : {};
    } catch (error) {
      console.error('Failed to retrieve user preferences:', error);
      return {};
    }
  }
}

// Device capabilities detection
export class DeviceCapabilities {
  static hasCamera(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  static hasNotificationSupport(): boolean {
    return 'Notification' in window;
  }

  static hasWakeLockSupport(): boolean {
    return 'wakeLock' in navigator && 'request' in (navigator as any).wakeLock;
  }

  static async canUseWakeLock(): Promise<boolean> {
    if (!this.hasWakeLockSupport()) {
      return false;
    }

    // Check if we're on HTTPS or localhost
    const isSecureContext = window.isSecureContext;
    if (!isSecureContext) {
      console.warn('Wake Lock requires HTTPS context');
      return false;
    }

    // Test if wake lock is actually available (not blocked by permissions policy)
    try {
      const testLock = await (navigator as any).wakeLock.request('screen');
      await testLock.release();
      return true;
    } catch (error) {
      console.warn('Wake Lock not available:', error);
      return false;
    }
  }

  static hasVibrationSupport(): boolean {
    return 'vibrate' in navigator;
  }

  static hasGeolocationSupport(): boolean {
    return 'geolocation' in navigator;
  }

  static isStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           ('standalone' in window.navigator && window.navigator.standalone) ||
           document.referrer.includes('android-app://');
  }

  static getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,
      screenSize: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }
}

// Mobile gestures and interactions
export class MobileInteractions {
  static vibrate(pattern: number | number[] = 100): void {
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch (error) {
      // Vibration might be blocked or not supported
      console.log('Vibration not available:', error);
    }
  }

  static async requestNotificationPermission(): Promise<NotificationPermission> {
    try {
      if ('Notification' in window) {
        return await Notification.requestPermission();
      }
    } catch (error) {
      console.log('Notification permission request failed:', error);
    }
    return 'denied';
  }

  static showNotification(title: string, options: NotificationOptions = {}): boolean {
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          silent: true, // Don't make sound unless specified
          ...options
        });
        return true;
      }
    } catch (error) {
      console.log('Failed to show notification:', error);
    }
    return false;
  }

  static hapticFeedback(type: 'light' | 'medium' | 'heavy' = 'medium'): void {
    try {
      // iOS Haptic Feedback (Capacitor/Cordova)
      if ('HapticFeedback' in window) {
        switch (type) {
          case 'light':
            (window as any).HapticFeedback.impact({ style: 'light' });
            break;
          case 'medium':
            (window as any).HapticFeedback.impact({ style: 'medium' });
            break;
          case 'heavy':
            (window as any).HapticFeedback.impact({ style: 'heavy' });
            break;
        }
      } else {
        // Fallback vibration pattern
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [30]
        };
        this.vibrate(patterns[type]);
      }
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  }
}

// Network status management
export class NetworkManager {
  private static listeners: Array<(online: boolean) => void> = [];

  static init(): void {
    window.addEventListener('online', () => {
      console.log('Network: Back online');
      this.notifyListeners(true);
      this.syncOfflineData();
    });

    window.addEventListener('offline', () => {
      console.log('Network: Gone offline');
      this.notifyListeners(false);
    });
  }

  static addNetworkListener(callback: (online: boolean) => void): void {
    this.listeners.push(callback);
  }

  static removeNetworkListener(callback: (online: boolean) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private static notifyListeners(online: boolean): void {
    this.listeners.forEach(listener => listener(online));
  }

  static async syncOfflineData(): Promise<void> {
    if (!navigator.onLine) {
      console.log('Cannot sync: Still offline');
      return;
    }

    const pendingData = OfflineDataManager.getKYCData().filter(
      item => item.status === 'pending'
    );

    console.log(`Syncing ${pendingData.length} offline KYC records...`);

    for (const data of pendingData) {
      try {
        OfflineDataManager.updateKYCDataStatus(data.id, 'uploading');
        
        // Here you would implement the actual API call
        // const response = await uploadKYCData(data);
        
        // Simulate successful upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        OfflineDataManager.updateKYCDataStatus(data.id, 'completed');
        console.log(`Synced KYC data: ${data.id}`);
        
      } catch (error) {
        console.error(`Failed to sync KYC data ${data.id}:`, error);
        OfflineDataManager.updateKYCDataStatus(data.id, 'failed');
      }
    }

    // Clean up completed data after successful sync
    setTimeout(() => {
      OfflineDataManager.clearCompletedData();
    }, 5000);
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }

  static async checkConnectivity(): Promise<boolean> {
    try {
      const response = await fetch('/manifest.json', {
        method: 'HEAD',
        cache: 'no-cache'
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// App lifecycle management
export class AppLifecycle {
  private static backgroundTime: number = 0;
  private static isAppVisible: boolean = true;

  static init(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.onAppBackground();
      } else {
        this.onAppForeground();
      }
    });

    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.onAppClosing();
    });

    // Handle focus/blur
    window.addEventListener('focus', () => {
      this.onAppFocus();
    });

    window.addEventListener('blur', () => {
      this.onAppBlur();
    });
  }

  private static onAppBackground(): void {
    console.log('App went to background');
    this.backgroundTime = Date.now();
    this.isAppVisible = false;
    
    // Save current state
    const currentState = {
      timestamp: this.backgroundTime,
      url: window.location.href
    };
    OfflineDataManager.saveUserPreferences({ lastState: currentState });
  }

  private static onAppForeground(): void {
    console.log('App came to foreground');
    this.isAppVisible = true;
    
    const timeInBackground = Date.now() - this.backgroundTime;
    console.log(`App was in background for ${timeInBackground}ms`);
    
    // If app was in background for more than 5 minutes, check for updates
    if (timeInBackground > 5 * 60 * 1000) {
      NetworkManager.syncOfflineData();
    }
  }

  private static onAppFocus(): void {
    console.log('App gained focus');
  }

  private static onAppBlur(): void {
    console.log('App lost focus');
  }

  private static onAppClosing(): void {
    console.log('App is closing');
    // Final save of any pending data
  }

  static isVisible(): boolean {
    return this.isAppVisible;
  }
}

// Initialize mobile app utilities
export async function initializeMobileApp(): Promise<void> {
  console.log('Initializing mobile app utilities...');
  
  try {
    NetworkManager.init();
    AppLifecycle.init();
    
    // Log device capabilities
    const deviceInfo = DeviceCapabilities.getDeviceInfo();
    console.log('Device capabilities:', deviceInfo);
    
    // Log mobile-specific capabilities
    console.log('Mobile features available:');
    console.log('- Camera:', DeviceCapabilities.hasCamera());
    console.log('- Notifications:', DeviceCapabilities.hasNotificationSupport());
    console.log('- Wake Lock:', DeviceCapabilities.hasWakeLockSupport());
    console.log('- Vibration:', DeviceCapabilities.hasVibrationSupport());
    console.log('- Geolocation:', DeviceCapabilities.hasGeolocationSupport());
    console.log('- Standalone mode:', DeviceCapabilities.isStandalone());
    
    // Request notification permission if supported (but don't block initialization)
    if (DeviceCapabilities.hasNotificationSupport()) {
      try {
        const permission = await MobileInteractions.requestNotificationPermission();
        console.log('Notification permission:', permission);
      } catch (error) {
        console.log('Could not request notification permission:', error);
      }
    }
    
    console.log('Mobile app initialization complete');
    
  } catch (error) {
    console.error('Error during mobile app initialization:', error);
    // Don't throw - allow app to continue working
  }
}