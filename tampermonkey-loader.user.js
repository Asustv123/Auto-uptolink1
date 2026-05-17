// ==UserScript==
// @name         Cat Bell - Tampermonkey Loader
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Cầu nối tự động tải và chạy content.js từ GitHub Extension Repo - @catdzs1tg
// @author       catdzs1vn
// @match        http://*/*
// @match        https://*/*
//
// --- KẾT NỐI VỚI FILE TRÊN GITHUB ---
// @require      https://raw.githubusercontent.com/Asustv/auto-uptolink1/main/content.js
//
// --- CẤP QUYỀN MÔ PHỎNG EXTENSION STORAGE CHO TAMPERMONKEY ---
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // GIẢ LẬP ĐỐI TƯỢNG 'chrome.storage.local' CỦA EXTENSION CHO FILE CONTENT.JS
    if (typeof chrome === 'undefined') {
        window.chrome = {};
    }
    if (!chrome.storage) {
        chrome.storage = {
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
                    if (typeof callback === 'function') {
                        // Trả kết quả bất đồng bộ chuẩn theo luồng của Extension ban đầu
                        setTimeout(() => callback(result), 0);
                    }
                },
                set: function(items, callback) {
                    for (let key in items) {
                        GM_setValue(key, items[key]);
                    }
                    if (typeof callback === 'function') {
                        setTimeout(() => callback(), 0);
                    }
                },
                remove: function(keys, callback) {
                    if (typeof keys === 'string') {
                        GM_deleteValue(keys);
                    } else if (Array.isArray(keys)) {
                        keys.forEach(key => GM_deleteValue(key));
                    }
                    if (typeof callback === 'function') {
                        setTimeout(() => callback(), 0);
                    }
                }
            }
        };
    }

    // GIẢ LẬP ĐỐI TƯỢNG 'chrome.runtime.onMessage' ĐỂ TRÁNH LỖI KHI CODE GỌI ĐẾN
    if (!chrome.runtime) {
        chrome.runtime = {
            onMessage: {
                addListener: function(callback) {
                    // Tampermonkey chạy đơn luồng nên không cần nhận message từ background.js nữa,
                    // nhưng vẫn giữ hàm rỗng ở đây để file content.js không bị crash khi đăng ký sự kiện.
                }
            }
        };
    }

    console.log("🚀 [Cat Bell Loader] Đã giả lập môi trường Extension thành công và nạp dữ liệu từ GitHub.");
})();
