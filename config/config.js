const fs = require('fs');

module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 8001
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/login/callback',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://stg01-useast1-sso.identitynow.com/sso/SSORedirect/metaAlias/ww-sandbox/idp',
        issuer: 'passport-saml',
        cert: process.env.SAML_CERT || fs.readFileSync('./cert-qat2.pem', 'utf-8'),
        logoutUrl: 'https://ww-sandbox.identitynow.com/logout'
      }
    }
  }
};
