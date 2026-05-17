// ==UserScript==
// @name         Cat Bell - Tampermonkey Loader
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Cầu nối tự động tải và chạy ổn định content.js từ GitHub Extension Repo - @catdzs1tg
// @author       catdzs1vn
// @match        http://*/*
// @match        https://*/*
//
// --- GIỮ QUYỀN MÔ PHỎNG EXTENSION STORAGE CHO TAMPERMONKEY ---
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 1. THIẾT LẬP GIẢ LẬP MÔI TRƯỜNG EXTENSION TRƯỚC (CHẠY ĐỒNG BỘ)
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
                        setTimeout(() => callback(result), 10);
                    }
                },
                set: function(items, callback) {
                    for (let key in items) {
                        GM_setValue(key, items[key]);
                    }
                    if (typeof callback === 'function') {
                        setTimeout(() => callback(), 10);
                    }
                },
                remove: function(keys, callback) {
                    if (typeof keys === 'string') {
                        GM_deleteValue(keys);
                    } else if (Array.isArray(keys)) {
                        keys.forEach(key => GM_deleteValue(key));
                    }
                    if (typeof callback === 'function') {
                        setTimeout(() => callback(), 10);
                    }
                }
            }
        };
    }

    if (!chrome.runtime) {
        chrome.runtime = {
            onMessage: {
                addListener: function(callback) {
                    // Hàm rỗng bảo vệ luồng dữ liệu tránh lỗi crash
                }
            }
        };
    }

    console.log("🛠️ [Cat Bell Loader] Đã thiết lập xong môi trường nền cô lập.");

    // 2. NẠP CODE CONTENT.JS TỪ GITHUB SAU KHI MÔI TRƯỜNG ĐÃ SẴN SÀNG
    // Thay vì dùng @require bị lỗi thứ tự, dùng GM_xmlhttpRequest để kiểm soát luồng chạy
    const GITHUB_CONTENT_URL = "https://raw.githubusercontent.com/Asustv123/Auto-uptolink1/main/content.js";

    GM_xmlhttpRequest({
        method: "GET",
        url: GITHUB_CONTENT_URL,
        onload: function(response) {
            if (response.status === 200) {
                try {
                    // Khởi chạy mã nguồn content.js một cách an toàn
                    eval(response.responseText);
                    console.log("🚀 [Cat Bell Loader] Tải và kích hoạt giao diện thành công!");
                } catch (e) {
                    console.error("❌ [Cat Bell Loader] Lỗi thực thi tệp lệnh content.js:", e);
                }
            } else {
                console.error("❌ [Cat Bell Loader] Không thể lấy mã từ GitHub. Mã lỗi:", response.status);
            }
        },
        onerror: function(err) {
            console.error("❌ [Cat Bell Loader] Lỗi kết nối mạng tới GitHub:", err);
        }
    });

})();
