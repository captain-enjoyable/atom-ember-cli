'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'meal-manager',
    podModulePrefix: 'meal-manager/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    bugsnag: {
      apiKey: 'f4bd3c5dce482f789a4a5f4768054a65',
      notifyReleaseStages: ['production']
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      apiHost: ''
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['production'],
        config: {
          id: 'UA-40123593-7',
          siteSpeedSampleRate: 25
        },
      },
    ],
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {

    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
