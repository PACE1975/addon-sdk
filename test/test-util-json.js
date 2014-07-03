/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { stringify } = require("sdk/util/json");
const tabs = require("sdk/tabs");
const { Bookmark, save } = require("sdk/places/bookmarks");

const testURL = 'data:text/html;charset=utf-8,' + encodeURIComponent('<html><head><title>test</title></head></html>');

exports.testOject = function(assert) {
  let obj = { num: 1, str: "x", bool: true };
  assert.equal(JSON.stringify(obj), stringify(obj), "stringify(Object) works");
};

exports.testArray = function(assert) {
  let arr = [ 1, "2", true ];
  assert.equal(JSON.stringify(arr), stringify(arr), "stringify(Array) works");
};

exports.testTab = function(assert, done) {
  let expected = {
    url: testURL,
    title: "test"
  };

  tabs.open({
    url: testURL,
    inBackground: true,
    onReady: tab => {
      assert.equal(stringify(tab), stringify(expected), "stringify(Tab) works");
      tab.close(done);
    }
  });
};

exports.testBookmark = function(assert) {
  let bookmarkDetails = {
    url: testURL,
    title: "test"
  };
  let expected = stringify(bookmarkDetails);

  let bm = Bookmark(bookmarkDetails);
  assert.equal(stringify(bm), expected, 'stringify(Bookmark) works');
}

require("sdk/test").run(exports);
