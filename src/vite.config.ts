import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?mobile=true`;
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'KYC Rural India - Digital Identity Verification',
        short_name: 'KYC Rural',
        description: 'Culturally appropriate KYC app for rural and semi-urban Indian users',
        theme_color: '#8B4513',
        background_color: '#FFF8E7',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['finance', 'identity', 'government', 'utilities'],
        lang: 'hi',
        shortcuts: [
          {
            name: 'Start KYC Process',
            short_name: 'Start KYC',
            description: 'Begin identity verification process',
            url: '/kyc-method',
            icons: [{ src: '/shortcut-kyc.png', sizes: '96x96' }]
          },
          {
            name: 'Language Settings',
            short_name: 'Languages',
            description: 'Change app language',
            url: '/language',
            icons: [{ src: '/shortcut-language.png', sizes: '96x96' }]
          }
        ]
      }
    })
  ],
  define: {
    global: 'globalThis'
  },
  server: {
    host: true, // Allow external connections for mobile testing
    port: 3000,
    https: false // Set to true for testing PWA features
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react'
    ]
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});