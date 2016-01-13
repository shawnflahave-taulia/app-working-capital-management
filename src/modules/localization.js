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
  'require',
  'appWorkingCapitalManagement/config',
  'base/libs/taulia/Localization'
], function(require, config, Localization) {

  var localization = new Localization(require.toUrl('appWorkingCapitalManagement/i18n/locales/'), config.get('locale'));

  config.on('change:locale', function(model, value) {
    localization.locale = value;
  });

  return localization;

});
