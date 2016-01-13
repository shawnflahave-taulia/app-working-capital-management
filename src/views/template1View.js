define([
  'jquery',
  'underscore',
  'marionette',
  'appWorkingCapitalManagement/config',
  'hbs!appWorkingCapitalManagement/templates/template1'
], function($, _, Marionette, config, campaignTemplate){

  return Marionette.ItemView.extend({

    template: campaignTemplate,

    events: {
      'click .action.buttons' : 'doSomething'
    },

    initialize: function() {
      console.log("initializing...");
    },

    doSomthing: function(event) {
      console.log("ok, did something");
    }

  });

});
