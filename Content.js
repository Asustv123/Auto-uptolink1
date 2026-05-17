(function () {
    if (window._catbellLoaded) return;
    window._catbellLoaded = true;

    // --- 1. KHỞI TẠO STYLE ---
    function catbell1() {
        var style = document.createElement('style');
        style.textContent = `
            #cb-widget {
                position: fixed;
                bottom: 24px;
                right: 20px;
                z-index: 2147483647;
                font-family: 'Segoe UI', Inter, sans-serif;
                user-select: none;
            }
            #cb-panel {
                background: #07070d;
                border: 1px solid #ffffff0e;
                border-radius: 16px;
                width: 240px;
                box-shadow: 0 12px 40px #000000dd, 0 0 0 1px #ffffff05;
                transition: opacity .25s, transform .25s;
                margin-bottom: 8px;
                overflow: hidden;
            }
            #cb-panel.hidden {
                opacity: 0;
                transform: translateY(8px) scale(0.97);
                pointer-events: none;
            }
            #cb-drag {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 13px 8px;
                cursor: grab;
                border-bottom: 1px solid #ffffff07;
                background: #0a0a14;
            }
            #cb-drag:active { cursor: grabbing; }
            .cb-drag-left { display: flex; align-items: center; gap: 8px; }
            .cb-name {
                font-size: 13px;
                font-weight: 900;
                line-height: 1;
                background: linear-gradient(90deg, #5aa8ff, #9d7aff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .cb-name-sub { font-size: 8.5px; color: #9d7aff55; margin-top: 2px; letter-spacing: 0.3px; }
            .cb-badge {
                font-size: 7.5px;
                font-weight: 700;
                color: #9d7aff;
                background: #9d7aff12;
                border: 1px solid #9d7aff22;
                padding: 2px 7px;
                border-radius: 20px;
            }
            .cb-body { padding: 11px 13px 12px; }
            .cb-toggleRow {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #0d0d18;
                border: 1px solid #ffffff08;
                border-radius: 10px;
                padding: 9px 11px;
                margin-bottom: 9px;
                transition: border-color .3s, background .3s;
            }
            .cb-toggleRow.on { border-color: #3a6fc430; background: #0b1020; }
            .cb-tleft { display: flex; align-items: center; gap: 8px; }
            .cb-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #1e1e2e;
                flex-shrink: 0;
                transition: all .3s;
            }
            .cb-dot.on { background: #00e676; box-shadow: 0 0 7px #00e676bb; }
            .cb-rlbl { font-size: 11px; font-weight: 700; color: #ffffffbb; line-height: 1; }
            .cb-statusSub { font-size: 9px; color: #ffffff28; margin-top: 2px; transition: color .3s; line-height: 1; }
            .cb-statusSub.on { color: #00e67666; }
            .cb-switch { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
            .cb-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
            .cb-slider {
                position: absolute;
                inset: 0;
                background: #111120;
                border-radius: 50px;
                cursor: pointer;
                border: 1px solid #ffffff10;
                transition: all .3s cubic-bezier(.4, 0, .2, 1);
            }
            .cb-slider::before {
                content: '';
                position: absolute;
                width: 17px;
                height: 17px;
                left: 2px;
                top: 2px;
                background: #252538;
                border-radius: 50%;
                transition: all .3s cubic-bezier(.4, 0, .2, 1);
                box-shadow: 0 2px 5px #777;
            }
            .cb-switch input:checked + .cb-slider {
                background: linear-gradient(135deg, #112244, #1e0e44);
                border-color: #4a80c040;
            }
            .cb-switch input:checked + .slider::before, .cb-switch input:checked + .cb-slider::before {
                transform: translateX(18px);
                background: linear-gradient(135deg, #5aa8ff, #9d7aff);
                box-shadow: 0 2px 8px #5a8fff99;
            }
            .cb-task-box {
                background: #0d0d18;
                border: 1px solid #ffffff07;
                border-radius: 10px;
                padding: 8px 11px;
                margin-bottom: 9px;
            }
            .cb-task-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 6px;
            }
            .cb-task-lbl { font-size: 9px; color: #ffffff22; }
            .cb-task-name {
                font-size: 10px;
                font-weight: 700;
                color: #5aa8ff;
                max-width: 140px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .cb-task-name.idle { color: #ffffff20; font-weight: 400; font-style: italic; }
            .cb-step-list { display: flex; gap: 5px; flex-wrap: wrap; }
            .cb-step {
                font-size: 8.5px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 20px;
                background: #151525;
                color: #ffffff20;
                border: 1px solid #ffffff08;
                transition: all .3s;
            }
            .cb-step.active {
                background: linear-gradient(135deg, #112244, #1e0e44);
                color: #5aa8ff;
                border-color: #5aa8ff44;
                box-shadow: 0 0 8px #5aa8ff22;
            }
            .cb-step.done { background: #0d2218; color: #00e676; border-color: #00e67628; }
            #cb-countdown-box {
                display: none;
                opacity: 0;
                align-items: center;
                background: #0d0d18;
                border: 1px solid #ffffff08;
                border-radius: 10px;
                padding: 8px 11px;
                margin-bottom: 9px;
                transition: opacity .3s;
            }
            #cb-countdown-box.show { display: flex; opacity: 1; }
            .cb-cd-right { flex: 1; min-width: 0; }
            .cb-cd-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
            .cb-cd-label { font-size: 8.5px; color: #ffffff22; white-space: nowrap; letter-spacing: 0.3px; }
            .cb-cd-text { font-size: 10px; font-weight: 800; color: #5aa8ff; white-space: nowrap; }
            .cb-cd-bar-wrap { height: 2px; background: #ffffff08; border-radius: 2px; overflow: hidden; width: 100%; }
            .cb-cd-bar {
                height: 100%;
                background: linear-gradient(90deg, #5aa8ff, #9d7aff);
                border-radius: 2px;
                transition: width 1s linear;
                width: 100%;
            }
            #cb-redirect-box {
                display: none;
                flex-direction: column;
                gap: 7px;
                margin-bottom: 9px;
            }
            #cb-redirect-box.show { display: flex; }
            .cb-redirect-label {
                font-size: 9px;
                font-weight: 500;
                color: #ffffff40;
                background: #0d0d18;
                border: 1px solid #ffffff0c;
                border-radius: 9px;
                padding: 8px 11px;
                line-height: 1.5;
            }
            .cb-redirect-label .cb-rd-title {
                font-size: 10px;
                font-weight: 800;
                color: #ff8080cc;
                margin-bottom: 3px;
                display: block;
            }
            .cb-redirect-label .cb-rd-sub { font-size: 8.5px; color: #ffffff28; display: block; }
            .cb-redirect-btns { display: flex; gap: 7px; }
            .cb-redir-btn {
                flex: 1;
                padding: 9px 6px;
                border-radius: 9px;
                cursor: pointer;
                font-size: 10px;
                font-weight: 800;
                transition: all .2s;
                text-align: center;
                border: 1px solid transparent;
                line-height: 1.2;
            }
            .cb-redir-btn .cb-btn-label { font-size: 8px; font-weight: 500; opacity: 0.6; display: block; margin-top: 1px; }
            .cb-redir-btn.maxtask {
                background: linear-gradient(135deg, #112244, #1e0e44);
                color: #5aa8ff;
                border-color: #5aa8ff33;
            }
            .cb-redir-btn.maxtask:hover { opacity: 0.85; }
            .cb-redir-btn.kiemoney {
                background: linear-gradient(135deg, #1e0e44, #112244);
                color: #9d7aff;
                border-color: #9d7aff33;
            }
            .cb-redir-btn.kiemoney:hover { opacity: 0.85; }
            .cb-redir-btn:active { transform: scale(0.96); }
            .cb-footer {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-top: 8px;
                border-top: 1px solid #ffffff06;
            }
            .cb-author { font-size: 9px; color: #ffffff15; font-weight: 500; }
            .cb-author el { color: #9d7aff35; font-weight: 700; }
            .cb-phase {
                font-size: 8px;
                color: #ffffff12;
                background: #ffffff05;
                border: 1px solid #ffffff07;
                padding: 1px 7px;
                border-radius: 20px;
                transition: all .3s;
            }
            .cb-phase.running { color: #00e67655; border-color: #00e67620; background: #00e6760a; }
            #cb-fab {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;
                height: 28px;
                padding: 0 14px;
                background: #0a0a14;
                border-radius: 20px;
                border: 1px solid #ffffff0e;
                box-shadow: 0 4px 16px #000000dd;
                cursor: pointer;
                font-size: 10px;
                font-weight: 700;
                color: #ffffff35;
                letter-spacing: 0.5px;
                transition: all .2s;
                width: fit-content;
            }
            #cb-fab:hover { color: #5aa8ff99; border-color: #5aa8ff22; }
            #cb-fab.open { color: #ff444455; border-color: #ff444420; }
        `;
        document.head.appendChild(style);
    }

    // --- 2. KHỞI TẠO PANEL GIAO DIỆN ---
    function catbell2() {
        var widget = document.createElement('div');
        widget.id = 'cb-widget';
        widget.innerHTML = `
            <div id="cb-panel" class="hidden">
                <div id="cb-drag">
                    <div class="cb-drag-left">
                        <div>
                            <div class="cb-name">Cat Bell</div>
                            <div class="cb-name-sub">@catdzs1vn</div>
                        </div>
                    </div>
                    <div class="cb-badge">Beta</div>
                </div>
                <div class="cb-body">
                    <div class="cb-toggleRow" id="cb-toggleRow">
                        <div class="cb-tleft">
                            <div class="cb-dot" id="cb-dot"></div>
                            <div>
                                <div class="cb-rlbl">Auto Link</div>
                                <div class="cb-statusSub" id="cb-statusSub">Dừng</div>
                            </div>
                        </div>
                        <label class="cb-switch">
                            <input type="checkbox" id="cb-tog">
                            <span class="cb-slider"></span>
                        </label>
                    </div>
                    <div class="cb-task-box">
                        <div class="cb-task-top">
                            <div class="cb-task-lbl">Nhiệm vụ</div>
                            <div class="cb-task-name idle" id="cb-taskname">Chưa chạy</div>
                        </div>
                        <div class="cb-step-list" id="cb-step-container">
                            <div class="cb-step" id="cb-s1">Step 1</div>
                            <div class="cb-step" id="cb-s2">Step 2</div>
                            <div class="cb-step" id="cb-s3" style="display:none;">Step 3</div>
                        </div>
                    </div>
                    <div id="cb-countdown-box">
                        <div class="cb-cd-right">
                            <div class="cb-cd-top">
                                <div class="cb-cd-label">VUI LÒNG ĐỢI TRONG</div>
                                <div class="cb-cd-text" id="cb-cd-text">--</div>
                            </div>
                            <div class="cb-cd-bar-wrap">
                                <div class="cb-cd-bar" id="cb-cd-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div id="cb-redirect-box">
                        <div class="cb-redirect-label">
                            <span class="cb-rd-title" id="cb-rd-title">⚠️ Không thể tiếp tục</span>
                            <span class="cb-rd-sub" id="cb-rd-sub">Chọn trang để tiếp tục làm nhiệm vụ</span>
                        </div>
                        <div class="cb-redirect-btns">
                            <div class="cb-redir-btn maxtask" id="cb-goto-maxtask">MaxTask<span class="cb-btn-label">maxtask.net</span></div>
                            <div class="cb-redir-btn kiemoney" id="cb-goto-kiemoney">KiemMoney<span class="cb-btn-label">kiemmoney.com</span></div>
                        </div>
                    </div>
                    <div class="cb-footer">
                        <div class="cb-author"><el>@</el>catdzs1vn</div>
                        <div class="cb-phase" id="cb-phase">Idle</div>
                    </div>
                </div>
            </div>
            <div id="cb-fab">Open</div>
        `;
        document.body.appendChild(widget);
        return widget;
    }

    catbell1();
    var catbell3 = catbell2();

    var panel     = document.getElementById('cb-panel');
    var fab       = document.getElementById('cb-fab');
    var tog       = document.getElementById('cb-tog');
    var dot       = document.getElementById('cb-dot');
    var statusSub = document.getElementById('cb-statusSub');
    var toggleRow = document.getElementById('cb-toggleRow');
    var taskName  = document.getElementById('cb-taskname');
    var phase     = document.getElementById('cb-phase');
    var cdBox     = document.getElementById('cb-countdown-box');
    var cdText    = document.getElementById('cb-cd-text');
    var cdBar     = document.getElementById('cb-cd-bar');
    var rdBox     = document.getElementById('cb-redirect-box');
    var rdTitle   = document.getElementById('cb-rd-title');
    var rdSub     = document.getElementById('cb-rd-sub');
    var step3UI   = document.getElementById('cb-s3');
    var steps     = {
        1: document.getElementById('cb-s1'),
        2: document.getElementById('cb-s2'),
        3: document.getElementById('cb-s3')
    };

    function catbell4(title, sub) {
        rdTitle.textContent = title || '⚠️ Không thể tiếp tục';
        rdSub.textContent   = sub   || 'Chọn trang để tiếp tục làm nhiệm vụ';
        rdBox.classList.add('show');
        if (panel.classList.contains('hidden')) {
            panel.classList.remove('hidden');
            fab.textContent = 'Close';
            fab.classList.add('open');
        }
    }

    document.getElementById('cb-goto-maxtask').onclick = function () { window.location.href = 'https://maxtask.net/home/tasks'; };
    document.getElementById('cb-goto-kiemoney').onclick = function () { window.location.href = 'https://kiemmoney.com'; };

    // --- 3. LOGIC KÉO THẢ VÀ TRIGGER ẨN/HIỆN ---
    function catbell6() {
        var drag     = document.getElementById('cb-drag');
        var dragging = false;
        var ox = 0, oy = 0;

        drag.addEventListener('mousedown', function (e) {
            dragging = true;
            var rect = catbell3.getBoundingClientRect();
            ox = e.clientX - rect.left;
            oy = e.clientY - rect.top;
            e.preventDefault();
        });
        document.addEventListener('mousemove', function (e) {
            if (!dragging) return;
            var nx = Math.max(0, Math.min(window.innerWidth  - catbell3.offsetWidth,  e.clientX - ox));
            var ny = Math.max(0, Math.min(window.innerHeight - catbell3.offsetHeight, e.clientY - oy));
            catbell3.style.left   = nx + 'px';
            catbell3.style.top    = ny + 'px';
            catbell3.style.right  = 'auto';
            catbell3.style.bottom = 'auto';
        });
        document.addEventListener('mouseup', function () { dragging = false; });

        fab.onclick = function () {
            var wasHidden = panel.classList.contains('hidden');
            panel.classList.toggle('hidden');
            fab.textContent = wasHidden ? 'Close' : 'Open';
            fab.classList.toggle('open', wasHidden);
        };
    }

    // --- 4. TÍNH TOÁN COUNTDOWN TIME TRÊN TRANG VÀ CHẠY CLICK ---
    var catbell7  = 0;
    var catbell8  = 0;
    var catbell9  = null;

    function catbell10() {
        var secs   = null;
        var allEls = document.querySelectorAll('*');
        for (var i = 0; i < allEls.length; i++) {
            var el  = allEls[i];
            var txt = el.textContent.trim();
            var m1 = txt.match(/vui lòng đợi(?: trong)?\s+(\d{1,3})\s*$/i);
            if (m1) { secs = parseInt(m1[1]); break; }
            var m2 = txt.match(/^đợi\s+(\d{1,3})\s*(?:giây)?$/i);
            if (m2) { secs = parseInt(m2[1]); break; }
        }
        if (!secs) {
            for (var i = 0; i < allEls.length; i++) {
                var el  = allEls[i];
                var txt = el.textContent.trim();
                if (el.childElementCount === 0 && /^\d{1,2}$/.test(txt)) {
                    var n = parseInt(txt);
                    if (n >= 1 && n <= 99) {
                        var parent = el.parentElement;
                        var pTxt   = parent ? parent.textContent : '';
                        var pCls   = parent ? (parent.className || '') + (parent.id || '') : '';
                        pCls = pCls.toLowerCase();
                        if (pTxt.toLowerCase().includes('đợi') || pTxt.toLowerCase().includes('wait') || pTxt.toLowerCase().includes('timer') || pCls.includes('timer') || pCls.includes('count') || pCls.includes('wait')) {
                            secs = n;
                            break;
                        }
                    }
                }
            }
        }
        if (secs && secs > 0) {
            if (catbell7 === 0 || secs > catbell8) catbell7 = secs;
            if (secs !== catbell8) {
                catbell8 = secs;
                cdBox.classList.add('show');
                cdText.textContent = secs + 's';
                var pct = catbell7 > 0 ? (secs / catbell7) * 100 : 100;
                cdBar.style.width = Math.max(2, pct) + '%';
            }
        } else {
            var wasShowing = catbell8 !== 0;
            catbell8 = 0;
            catbell7 = 0;
            if (wasShowing) {
                cdBox.classList.remove('show');
                if (catbell13()) setTimeout(function () { catbell22(); }, 350);
            }
        }
    }

    function catbell16(n, state) {
        for (var k in steps) steps[k].className = 'cb-step';
        if (n && state) steps[n].className = 'cb-step ' + state;
    }

    function catbell17(name) {
        if (name) {
            taskName.textContent = name;
            taskName.className   = 'cb-task-name';
        } else {
            taskName.textContent = 'Chưa chạy';
            taskName.className   = 'cb-task-name idle';
        }
    }

    function catbell18(txt, running) {
        phase.textContent = txt;
        phase.className   = 'cb-phase' + (running ? ' running' : '');
    }

    function catbell19(on) {
        tog.checked = on;
        if (on) {
            dot.className         = 'cb-dot on';
            statusSub.textContent = 'Chạy';
            statusSub.className   = 'cb-statusSub on';
            toggleRow.classList.add('on');
            if (!catbell9) catbell9 = setInterval(catbell10, 800);
        } else {
            dot.className         = 'cb-dot';
            statusSub.textContent = 'Dừng';
            statusSub.className   = 'cb-statusSub';
            toggleRow.classList.remove('on');
            catbell17(null);
            catbell16(null);
            catbell18('Idle', false);
            if (catbell9) { clearInterval(catbell9); catbell9 = null; }
            cdBox.classList.remove('show');
        }
    }

    function catbell13() { return tog.checked; }

    // --- 5. ĐỒNG BỘ CHUẨN EXTENSION STORAGE ---
    chrome.storage.local.get('catbell_active', function (d) {
        var on = !!d.catbell_active;
        catbell19(on);
        if (on) catbell32();
    });

    tog.onchange = function () {
        var on = tog.checked;
        chrome.storage.local.set({ catbell_active: on }, function() {
            catbell19(on);
            if (on) catbell32();
        });
    };

    chrome.runtime.onMessage.addListener(function (msg) {
        if (msg.action === 'toggleWidget') {
            var wasHidden = panel.classList.contains('hidden');
            panel.classList.toggle('hidden');
            fab.textContent = wasHidden ? 'Close' : 'Open';
            fab.classList.toggle('open', wasHidden);
        }
    });

    // --- 6. LOGIC XỬ LÝ KHỚP LỆNH CLICK VÀ STEP ---
    function catbell20() {
        var canvas = document.querySelector('canvas');
        if (!canvas) return false;
        catbell18('Xác thực...', true);
        var r  = canvas.getBoundingClientRect();
        var cx = r.left + r.width  / 2;
        var cy = r.top  + r.height / 2;
        canvas.dispatchEvent(new PointerEvent('pointerdown', { clientX: cx, clientY: cy, bubbles: true, isPrimary: true }));
        canvas.dispatchEvent(new MouseEvent('mousedown',     { clientX: cx, clientY: cy, bubbles: true }));
        var hTimer = setInterval(function () {
            if (!catbell13()) { clearInterval(hTimer); return; }
            var c2 = document.querySelector('canvas');
            if (!c2) {
                clearInterval(hTimer);
                catbell21();
            } else {
                c2.dispatchEvent(new PointerEvent('pointermove', { clientX: cx, clientY: cy, bubbles: true, isPrimary: true }));
            }
        }, 300);
        return true;
    }

    function catbell21() {
        catbell18('Chờ duyệt...', true);
        var timer = setInterval(function () {
            if (!catbell13()) { clearInterval(timer); return; }
            if (document.body.innerText.includes('Quay về Nhiệm vụ')) {
                clearInterval(timer);
                catbell16(null);
                catbell17(null);
                catbell18('Xong ✓', false);
                setTimeout(function () { window.location.href = 'https://maxtask.net/home/tasks'; }, 1200);
            }
        }, 500);
    }

    function catbell22() {
        var body = document.body.innerText;
        if (body.includes('NHẤN LINK BẤT KỲ')) {
            catbell18('Reload trang...', true);
            window.location.href = window.location.href;
            return true;
        }
        var els = document.querySelectorAll('*');
        for (var i = 0; i < els.length; i++) {
            var el  = els[i];
            var txt = el.textContent;
            if (el.childElementCount === 0 && txt.includes('NHẤN ĐỂ TIẾP TỤC')) {
                el.scrollIntoView();
                el.click();
                try { if (el.parentElement) el.parentElement.click(); } catch (e) {}
                var closest = el.closest('button, a, [role=button], [onclick]');
                if (closest) closest.click();
                catbell18('Đã click...', true);
                return true;
            }
        }
        return false;
    }

    function catbell23(txt) {
        return (txt.includes('NHẤN LINK BẤT KỲ') || txt.includes('NHẤN ĐỂ TIẾP TỤC') || txt.includes('NHẤN LINK BẤT KỲ ĐỂ TIẾP TỤC'));
    }

    function catbell24(n, cb) {
        catbell18('Chờ nút tiếp tục...', true);
        var firstSeen = false;
        var lastClick = 0;
        var timer = setInterval(function () {
            if (!catbell13()) { clearInterval(timer); return; }
            var body       = document.body.innerText;
            var hasBtn     = catbell23(body);
            var processing = body.includes('ĐANG XỬ LÝ') || body.includes('đang xử lý');
            if (hasBtn) {
                var now = Date.now();
                if (!firstSeen || (now - lastClick > 10000)) {
                    firstSeen = true;
                    lastClick = now;
                    catbell22();
                }
            } else if (processing) {
                catbell18('Đang xử lý...', true);
            } else if (firstSeen) {
                clearInterval(timer);
                if (n) catbell16(n, 'done');
                cb();
            }
        }, 600);
    }

    function catbell25(n) {
        var els = document.querySelectorAll('*');
        for (var i = 0; i < els.length; i++) {
            var el  = els[i];
            var txt = el.textContent;
            var match = txt.includes('LẤY MÃ STEP ' + n) || (n === 1 && txt.includes('LẤY MÃ'));
            if (el.childElementCount === 0 && match) {
                var target = el.closest('[id]') || el.parentElement;
                target.scrollIntoView();
                target.click();
                return true;
            }
        }
        return false;
    }

    function catbell26(n, cb) {
        catbell16(n, 'active');
        catbell18('Step ' + n, true);
        var timer = setInterval(function () {
            if (!catbell13()) { clearInterval(timer); return; }
            if (catbell25(n)) { clearInterval(timer); cb(); }
        }, 1000);
    }

    function catbell34() {
        var divs = document.querySelectorAll('div, section');
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];
            if (!div.innerText || !div.innerText.includes('Uptolink')) continue;
            var btn = Array.from(div.querySelectorAll('button, a, span')).find(function (el) {
                return el.innerText && el.innerText.includes('Làm nhiệm vụ');
            });
            if (btn) {
                btn.scrollIntoView();
                btn.click();
                catbell18('Bắt đầu...', true);
                return true;
            }
        }
        return false;
    }

    // --- 7. QUÉT KIỂM TRA TRANG HOẠT ĐỘNG (2 STEP / 3 STEP CHUẨN) ---
    var url = window.location.href;

    function catbell38() {
        if (!catbell13()) return;
        if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
            catbell18('Đợi trang load...', true);
            window.addEventListener('load', function () { catbell38(); }, { once: true });
            return;
        }

        var body = document.body.innerText;

        // Tự động điều chỉnh giao diện UI theo loại nhiệm vụ
        if (body.includes('STEP 3')) {
            step3UI.style.display = 'block';
            catbell17('Uptolink — 3 Steps');
        } else if (body.includes('STEP 2') || body.includes('LẤY MÃ STEP 2')) {
            step3UI.style.display = 'none';
            catbell17('Uptolink — 2 Steps');
        }

        if (document.querySelector('canvas')) { catbell20(); return; }

        if (body.includes('Quay về Nhiệm vụ')) {
            setTimeout(function () { window.location.href = 'https://maxtask.net/home/tasks'; }, 1000);
            return;
        }

        if (url.includes('maxtask.net/home/tasks')) {
            catbell18('Tìm nhiệm vụ...', true);
            catbell34();
            return;
        }

        if (url.includes('maxtask.net/task/') || url.includes('kiemmoney.com/rewards/')) return;

        // Kiểm tra chuyển tiếp link
        var links = document.querySelectorAll('a[href]');
        for (var i = 0; i < links.length; i++) {
            var href = links[i].href;
            if (href.includes('maxtask.net/task/') || href.includes('kiemmoney.com/rewards/')) {
                window.location.href = href;
                return;
            }
        }

        if (body.includes('Bấm vào đây để tiếp tục') || document.getElementById('invisibleCaptchaShortlink')) {
            catbell18('Captcha...', true);
            var timer = setInterval(function () {
                if (!catbell13()) { clearInterval(timer); return; }
                var captchaDone = document.querySelector('[name="wasHidden-captcha-response"]')?.value?.length > 0 || !document.querySelector('iframe[src*="hcaptcha"]');
                if (captchaDone) {
                    var btn = document.getElementById('invisibleCaptchaShortlink');
                    if (btn) { btn.scrollIntoView(); btn.click(); clearInterval(timer); }
                }
            }, 1000);
        } else if (body.includes('NHẤN LINK BẤT KỲ') || body.includes('NHẤN LINK BẤT KỲ ĐỂ TIẾP TỤC')) {
            catbell18('Reload...', true);
            window.location.href = window.location.href;
        } else if (catbell23(body)) {
            catbell24(null, function () { window.location.href = url; });
        } else if (body.includes('LẤY MÃ STEP 3')) {
            catbell26(3, function () { catbell24(3, function () { window.location.href = url; }); });
        } else if (body.includes('LẤY MÃ STEP 2')) {
            catbell26(2, function () { catbell24(2, function () { window.location.href = url; }); });
        } else if (body.includes('LẤY MÃ STEP 1') || body.includes('LẤY MÃ')) {
            catbell26(1, function () { catbell24(1, function () { window.location.href = url; }); });
        } else if (body.includes('ĐANG XỬ LÝ') || body.includes('ĐANG XỬ LY') || body.includes('đang xử lý')) {
            catbell18('Đang xử lý...', true);
            setTimeout(catbell38, 1000);
        } else {
            setTimeout(catbell38, 1500);
        }
    }

    function catbell32() {
        catbell38();
    }

    catbell6();
})();
