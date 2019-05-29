exports.creds = {
  identityMetadata: 'https://login.microsoftonline.com/mindtreeonline.onmicrosoft.com/.well-known/openid-configuration',
  // clientID: '6583a1d7-a120-4703-9188-b69793cdbff1',
  clientID: '6583a1d7-a120-4703-9188-b69793cdbff1',
  validateIssuer: true,
  passReqToCallback: false,
  issuer: null,
  audience: null,
  allowMultiAudiencesInToken: false,
  loggingLevel: 'info',
  endpoints: {
    sharepoint: 'https://mindtreeonline.sharepoint.com',
    graph: '00000002-0000-0000-c000-000000000000',
    storage: 'https://storage.microsoft.com',
    powerbi: 'https://analysis.windows.net/powerbi/api',
    graphNew: 'https://graph.microsoft.com',
  },
};