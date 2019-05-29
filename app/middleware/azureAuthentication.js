const passport = require('passport');
var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;

var config = require('../config/authenticationConfig');
var userDao = require('../dao/userDao');

var options = {
    identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    tenantId: 'mindtreeonline.onmicrosoft.com',
    endpoints: config.endpoints,
    passReqToCallback: config.creds.passReqToCallback
};

var bearerStrategy = new OIDCBearerStrategy(options,
    function (token, done) {
        console.log(token, 'was the token retreived');
        if (!token.oid)
            done(new Error('oid is not found in token'));
        else {
            owner = token.oid;
            var user = { mid: token.unique_name.substring(0, 8), name: token.name };
            done(null, user);
        }
    }
);

passport.use(bearerStrategy);

// function disabled (req, res, next) {
//     next();
// }

module.exports = passport.authenticate('oauth-bearer', {
    session: false
})
