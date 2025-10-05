// Wake Lock Management with proper error handling
export class WakeLockManager {
  private static wakeLock: WakeLockSentinel | null = null;
  private static isSupported: boolean | null = null;
  private static hasUserGesture: boolean = false;

  // Check if wake lock is supported and available
  static async checkSupport(): Promise<boolean> {
    if (this.isSupported !== null) {
      return this.isSupported;
    }

    // Basic feature detection
    if (!('wakeLock' in navigator)) {
      console.log('Wake Lock API not supported in this browser');
      this.isSupported = false;
      return false;
    }

    // Check secure context
    if (!window.isSecureContext) {
      console.log('Wake Lock requires HTTPS or localhost');
      this.isSupported = false;
      return false;
    }

    // Test actual availability
    try {
      const testLock = await (navigator as any).wakeLock.request('screen');
      await testLock.release();
      console.log('Wake Lock is supported and available');
      this.isSupported = true;
      return true;
    } catch (error: any) {
      console.log('Wake Lock not available:', error.name, error.message);
      this.isSupported = false;
      
      // Log specific error types for debugging
      if (error.name === 'NotAllowedError') {
        console.log('Wake Lock blocked by permissions policy or user settings');
      } else if (error.name === 'NotSupportedError') {
        console.log('Wake Lock not supported on this device');
      }
      
      return false;
    }
  }

  // Request wake lock (with user gesture requirement)
  static async request(): Promise<boolean> {
    try {
      // Check if supported first
      const isSupported = await this.checkSupport();
      if (!isSupported) {
        return false;
      }

      // Check if we already have a wake lock
      if (this.wakeLock && !this.wakeLock.released) {
        console.log('Wake lock already active');
        return true;
      }

      // Request new wake lock
      this.wakeLock = await (navigator as any).wakeLock.request('screen');
      
      // Listen for release events
      this.wakeLock.addEventListener('release', () => {
        console.log('Wake lock released');
        this.wakeLock = null;
      });

      console.log('Wake lock acquired successfully');
      return true;

    } catch (error: any) {
      console.log('Failed to acquire wake lock:', error.name, error.message);
      
      // Handle specific error cases
      if (error.name === 'NotAllowedError') {
        console.log('Wake lock requires user gesture or is blocked by policy');
        
        // Try to request on next user interaction
        this.setupUserGestureListener();
      }
      
      return false;
    }
  }

  // Release wake lock
  static async release(): Promise<void> {
    if (this.wakeLock && !this.wakeLock.released) {
      try {
        await this.wakeLock.release();
        console.log('Wake lock released manually');
      } catch (error) {
        console.log('Error releasing wake lock:', error);
      }
    }
    this.wakeLock = null;
  }

  // Set up listener for user gesture to enable wake lock
  private static setupUserGestureListener(): void {
    if (this.hasUserGesture) {
      return; // Already set up
    }

    const handleUserGesture = async () => {
      this.hasUserGesture = true;
      console.log('User gesture detected, retrying wake lock...');
      
      const success = await this.request();
      if (success) {
        // Remove listeners once successful
        document.removeEventListener('click', handleUserGesture);
        document.removeEventListener('touchstart', handleUserGesture);
        document.removeEventListener('keydown', handleUserGesture);
      }
    };

    // Listen for various user interactions
    document.addEventListener('click', handleUserGesture, { once: true, passive: true });
    document.addEventListener('touchstart', handleUserGesture, { once: true, passive: true });
    document.addEventListener('keydown', handleUserGesture, { once: true, passive: true });

    console.log('Listening for user gesture to enable wake lock...');
  }

  // Check if wake lock is currently active
  static isActive(): boolean {
    return this.wakeLock !== null && !this.wakeLock.released;
  }

  // Get current wake lock status
  static getStatus(): {
    supported: boolean | null;
    active: boolean;
    hasUserGesture: boolean;
  } {
    return {
      supported: this.isSupported,
      active: this.isActive(),
      hasUserGesture: this.hasUserGesture
    };
  }

  // Initialize wake lock management
  static async init(): Promise<void> {
    console.log('Initializing Wake Lock Manager...');
    
    // Check support on init
    await this.checkSupport();
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', async () => {
      if (document.hidden) {
        // Page hidden, wake lock will be automatically released
        console.log('Page hidden, wake lock will be released');
      } else {
        // Page visible again, try to re-acquire wake lock
        console.log('Page visible, attempting to re-acquire wake lock');
        if (this.isSupported) {
          await this.request();
        }
      }
    });

    // Set up user gesture listener if needed
    if (this.isSupported === false) {
      this.setupUserGestureListener();
    }

    console.log('Wake Lock Manager initialized');
  }
}