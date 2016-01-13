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
  'marionette',
  'appWorkingCapitalManagement/config',
  'appWorkingCapitalManagement/views/Template1',
  'appWorkingCapitalManagement/modules/localization'
], function(Marionette, config, Template1View, localization) {

  // This just suck.
  // Done to add application context to template data, before template is rendered, because
  // helper in template need to know where from get data.
  // Other way is to add method `templateHelpers` to view. But since we use external views(lib-base-js),
  // which can't have locale aware method `templateHelpers`...
  // way to add this method is to extend external view with our method,
  // which means have copy of every external view locally, just to make it context aware.
  var originalMarionetteRender = Marionette.Renderer.render;
  Marionette.Renderer.render = function(template, data) {
    return originalMarionetteRender.call(this, template, _.extend(data || {}, {
      _config: config.toJSON(),
      _i18n: localization
    }));
  };

  return Marionette.Application.extend({

    toString: function() {
      return 'App';
    },

    view: null,

    initialize: function(options) {
      config.set(options);

      this.initializeViews();
      this.registerEvents();
    },

    initializeViews: function() {
      this.view = new Template1View({
        el: config.get('el'),
        model: new Backbone.Model(config.get('template1Model'))
      });
    },

    registerEvents: function() {
      var app = this;

      this.on('start', function() {
        localization.load().done(function() {
          app.view.render();
        });
      });
    }

  });

});
