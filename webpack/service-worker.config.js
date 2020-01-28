const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = (settings) => ({
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      offlineGoogleAnalytics: true,
      importWorkboxFrom: 'local',
      offlineGoogleAnalytics: true,
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /theme\/content-images/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /theme\/css\/chunks/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /theme\/js\/chunks/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /^((?!(\/theme)).)*/,
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
  ]
});
