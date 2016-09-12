const SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      cert: config.passport.saml.cert
    },
    function (profile, done) {
      var roles = config.passport.roleMapper(profile['member-of'] || []);
      return done(null,
        {id: profile.nameID, roles: roles, adGroups: profile['member-of']}
      );
    })
  );

};
