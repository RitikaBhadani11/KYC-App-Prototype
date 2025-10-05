import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kycrural.india',
  appName: 'KYC Rural India',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#FFF8E7",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#8B4513"
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#8B4513'
    },
    Camera: {
      permissions: ["camera", "photos"]
    },
    Geolocation: {
      permissions: ["location"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#8B4513"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    },
    Device: {},
    Network: {},
    Storage: {},
    Filesystem: {},
    Share: {},
    App: {
      launchUrl: "com.kycrural.india"
    }
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: true,
    minWebViewVersion: 60
  },
  ios: {
    scheme: "KYC Rural India",
    preferredContentMode: "mobile"
  }
};

export default config;