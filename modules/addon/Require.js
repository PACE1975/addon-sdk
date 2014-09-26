/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var EXPORTED_SYMBOLS = [ "exports", "Require" ];

const { utils: Cu, interfaces: Ci, classes: Cc } = Components;
const { Services } = Cu.import("resource://gre/modules/Services.jsm", {});
const { XulApp } = Cu.import("resource://gre/modules/sdk/system/XulApp.js", {});
const { AddonManager } = Cu.import("resource://gre/modules/AddonManager.jsm", {});

var Require = {};
var exports = Require;
var requires = {};

function getRequireByAddonID(id) {
  return requires[id];
}
exports.getRequireByAddonID = getRequireByAddonID;

function addAddonRequire(loader) {
  const { require } = loader;
  const { id } = require("sdk/self");

  requires[id] = require;
  require("sdk/system/unload").when(() => {
    delete requires[id];
  });
}
exports.addAddonRequire = addAddonRequire;
