/*
 * Copyright (c) 2016. Taulia Inc. All rights reserved.
 *
 * All content of this file, its package and related information is to be treated
 * as confidential, proprietary information.
 *
 * This notice does not imply restricted, unrestricted or public access to these materials
 * which are a trade secret of Taulia Inc ('Taulia') and which may not be reproduced, used,
 * sold or transferred to any third party without Taulia's prior written consent.
 *
 * Any rights not expressly granted herein are reserved by Taulia.
 */

define([
  'backbone',
  'underscore',
  'base/libs/underscore/underscore.string.min',
  'base/libs/taulia/Log'
], function(Backbone, _, str, Log) {

  var config = new (Backbone.Model.extend(new Log));

  config.toString = function() {
    return 'config';
  };

  config.on('change', function(model) {
    var previousAttributes = model.previousAttributes(),
        changedAttributes = model.changedAttributes();

    if (!changedAttributes) {
      return;
    }

    for (var key in changedAttributes) {
      if (previousAttributes[key] === undefined) {
        this.log('Set [%s] to [%o]', key, changedAttributes[key]);
      } else {
        this.log('Change [%s] from [%o] to [%o]', key, previousAttributes[key], changedAttributes[key]);
      }
    }
  });

  config.on('change:appName', function(model, value) {
    config.set('appCssPrefix', str.camelize(value));
    this.logPrefix = value;
  });

  config.on('change:production', function(model, value) {
    config.set('debug', !value);
  });

  config.set({
    production: false,
    debug: false,
    appName: 'appWorkingCapitalManagement',
    locale: 'en_US',
    rootUrl: '/',
    appUrl: '/',
    resourcesUrl: '/',
    el: document.body
  });

  return config;

});
