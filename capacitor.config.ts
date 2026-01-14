import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cindyzody.feelingsneeds',
  appName: 'Feelings & Needs',
  webDir: 'dist',
  server: {
    // For development, allow loading from localhost
    androidScheme: 'https',
    iosScheme: 'https',
    // Production URL for API calls and auth redirects
    hostname: 'app.cindyzody.com'
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#ffffff',
    preferredContentMode: 'mobile',
    // URL scheme for deep linking (Clerk OAuth redirects)
    scheme: 'feelingsneeds'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      showSpinner: false
    },
    Keyboard: {
      resize: 'body',
      style: 'light'
    }
  }
};

export default config;
