const fs = require('fs');

var roleMapper = function (groupFilter, groupToRole) {
  return function (groups) {
    return groups.filter(function (entry) {
      return entry.indexOf(groupFilter) > -1;
    }).map(function (entry) {
      return groupToRole[entry.split(',')[0].split('=')[1]];
    });
  }
};

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
      },
      roleMapper: roleMapper('OU=whisper,OU=Groups,OU=Site-Independent,OU=ManagedOU,DC=NA,DC=weightwatchers,DC=net',
        {
          'whisper_dev_editor': 'editor',
          'whisper_dev_admin': 'admin',
          'whisper_dev_viewer': 'viewer'
        })
    }
  }
};
