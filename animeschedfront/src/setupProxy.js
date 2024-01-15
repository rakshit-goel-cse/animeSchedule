const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log('Setting up proxy...');
  app.use(
    '/api',  // The path you want to proxy (change it based on your needs)
    createProxyMiddleware({
      target: 'https://animeschedule.net/',
      changeOrigin: true,
    })
  );
};
