(function () {
    if (window._catbellLoaded) return;
    window._catbellLoaded = true;

    function catbell1() {
        var style = document.createElement('style');
        style.textContent = `
            #cb-widget { position: fixed; bottom: 24px; right: 20px; z-index: 2147483647; font-family: 'Segoe UI', Inter, sans-serif; user-select: none; }
            #cb-panel { background: #07070d; border: 1px solid #ffffff0e; border-radius: 16px; width: 240px; box-shadow: 0 12px 40px #000000dd; transition: opacity .25s, transform .25s; margin-bottom: 8px; overflow: hidden; }
            #cb-panel.hidden { opacity: 0; transform: translateY(8px) scale(0.97); pointer-events: none; }
            #cb-drag { display: flex; align-items: center; justify-content: space-between; padding: 10px 13px 8px; cursor: grab; border-bottom: 1px solid #ffffff07; background: #0a0a14; }
            .cb-drag-left { display: flex; align-items: center; gap: 8px; }
            .cb-name { font-size: 13px; font-weight: 900; background: linear-gradient(90deg, #5aa8ff, #9d7aff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .cb-name-sub { font-size: 8.5px; color: #9d7aff55; }
            .cb-badge { font-size: 7.5px; font-weight: 700; color: #9d7aff; background: #9d7aff12; padding: 2px 7px; border-radius: 20px; }
            .cb-body { padding: 11px 13px 12px; }
            .cb-toggleRow { display: flex; align-items: center; justify-content: space-between; background: #0d0d18; border: 1px solid #ffffff08; border-radius: 10px; padding: 9px 11px; margin-bottom: 9px; }
            .cb-toggleRow.on { border-color: #3a6fc430; background: #0b1020; }
            .cb-dot { width: 6px; height: 6px; border-radius: 50%; background: #1e1e2e; }
            .cb-dot.on { background: #00e676; box-shadow: 0 0 7px #00e676; }
            .cb-rlbl { font-size: 11px; font-weight: 700; color: #ffffffbb; }
            .cb-statusSub { font-size: 9px; color: #ffffff28; }
            .cb-statusSub.on { color: #00e67666; }
            .cb-switch { position: relative; width: 40px; height: 22px; }
            .cb-switch input { opacity: 0; width: 0; height: 0; }
            .cb-slider { position: absolute; inset: 0; background: #111120; border-radius: 50px; cursor: pointer; border: 1px solid #ffffff10; }
            .cb-slider::before { content: ''; position: absolute; width: 17px; height: 17px; left: 2px; top: 2px; background: #252538; border-radius: 50%; transition: .3s; }
            .cb-switch input:checked + .cb-slider { background: linear-gradient(135deg, #112244, #1e0e44); }
            .cb-switch input:checked + .cb-slider::before { transform: translateX(18px); background: linear-gradient(135deg, #5aa8ff, #9d7aff); }
            .cb-task-box { background: #0d0d18; border: 1px solid #ffffff07; border-radius: 10px; padding: 8px 11px; margin-bottom: 9px; }
            .cb-task-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
            .cb-task-lbl { font-size: 9px; color: #ffffff22; }
            .cb-task-name { font-size: 10px; font-weight: 700; color: #5aa8ff; }
            .cb-step-list { display: flex; gap: 5px; }
            .cb-step { font-size: 8.5px; font-weight: 700; padding: 2px 8px; border-radius: 20px; background: #151525; color: #ffffff20; }
            .cb-step.active { background: linear-gradient(135deg, #112244, #1e0e44); color: #5aa8ff; border: 1px solid #5aa8ff44; }
            .cb-step.done { background: #0d2218; color: #00e676; }
            #cb-countdown-box { display: none; background: #0d0d18; border-radius: 10px; padding: 8px 11px; margin-bottom: 9px; }
            #cb-countdown-box.show { display: flex; }
            .cb-cd-right { flex: 1; }
            .cb-cd-top { display: flex; align-items: center; justify-content: space-between; }
            .cb-cd-label { font-size: 8.5px; color: #ffffff22; }
            .cb-cd-text { font-size: 10px; font-weight: 800; color: #5aa8ff; }
            .cb-cd-bar-wrap { height: 2px; background: #ffffff08; width: 100%; margin-top: 5px; }
            .cb-cd-bar { height: 100%; background: linear-gradient(90deg, #5aa8ff, #9d7aff); width: 100%; }
            #cb-redirect-box { display: none; flex-direction: column; gap: 7px; margin-bottom: 9px; }
            #cb-redirect-box.show { display: flex; }
            .cb-redirect-label { font-size: 9px; background: #0d0d18; border-radius: 9px; padding: 8px 11px; }
            .cb-redirect-btns { display: flex; gap: 7px; }
            .cb-redir-btn { flex: 1; padding: 9px 6px; border-radius: 9px; cursor: pointer; font-size: 10px; text-align: center; }
            .cb-redir-btn.maxtask { background: #112244; color: #5aa8ff; }
            .cb-redir-btn.kiemoney { background: #1e0e44; color: #9d7aff; }
            .cb-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #ffffff06; padding-top: 8px; }
            .cb-author { font-size: 9px; color: #ffffff15; }
            .cb-phase { font-size: 8px; color: #ffffff12; background: #ffffff05; padding: 1px 7px; border-radius: 20px; }
            .cb-phase.running { color: #00e67655; background: #00e6760a; }
            #cb-fab { display: flex; align-items: center; justify-content: center; margin-left: auto; height: 28px; padding: 0 14px; background: #0a0a14; border-radius: 20px; border: 1px solid #ffffff0e; cursor: pointer; font-size: 10px; color: #ffffff35; }
            #cb-fab.open { color: #ff444455; }
        `;
        document.head.appendChild(style);
    }

    function catbell2() {
        var widget = document.createElement('div');
        widget.id = 'cb-widget';
        widget.innerHTML = `
            <div id="cb-panel" class="hidden">
                <div id="cb-drag"><div class="cb-drag-left"><div class="cb-name">Cat Bell</div></div><div class="cb-badge">Beta</div></div>
                <div class="cb-body">
                    <div class="cb-toggleRow" id="cb-toggleRow">
                        <div class="cb-tleft"><div class="cb-dot" id="cb-dot"></div><div><div class="cb-rlbl">Auto Link</div><div class="cb-statusSub" id="cb-statusSub">Dừng</div></div></div>
                        <label class="cb-switch"><input type="checkbox" id="cb-tog"><span class="cb-slider"></span></label>
                    </div>
                    <div class="cb-task-box">
                        <div class="cb-task-top"><div class="cb-task-lbl">Nhiệm vụ</div><div class="cb-task-name" id="cb-taskname">Chưa chạy</div></div>
                        <div class="cb-step-list">
                            <div class="cb-step" id="cb-s1">Step 1</div>
                            <div class="cb-step" id="cb-s2">Step 2</div>
                            <div class="cb-step" id="cb-s3" style="display:none;">Step 3</div>
                        </div>
                    </div>
                    <div id="cb-countdown-box"><div class="cb-cd-right"><div class="cb-cd-top"><div class="cb-cd-label">VUI LÒNG ĐỢI</div><div class="cb-cd-text" id="cb-cd-text">--</div></div><div class="cb-cd-bar-wrap"><div class="cb-cd-bar" id="cb-cd-bar"></div></div></div></div>
                    <div id="cb-redirect-box">
                        <div class="cb-redirect-label">⚠️ Không thể tiếp tục</div>
                        <div class="cb-redirect-btns"><div class="cb-redir-btn maxtask" id="cb-goto-maxtask">MaxTask</div><div class="cb-redir-btn kiemoney" id="cb-goto-kiemoney">KiemMoney</div></div>
                    </div>
                    <div class="cb-footer"><div class="cb-author">@catdzs1vn</div><div class="cb-phase" id="cb-phase">Idle</div></div>
                </div>
            </div>
            <div id="cb-fab">Open</div>
        `;
        document.body.appendChild(widget);
    }

    function initGiaoDien() {
        if (document.getElementById('cb-widget')) return;
        catbell1();
        catbell2();

        var panel = document.getElementById('cb-panel');
        var fab = document.getElementById('cb-fab');
        var tog = document.getElementById('cb-tog');
        var dot = document.getElementById('cb-dot');
        var statusSub = document.getElementById('cb-statusSub');
        var toggleRow = document.getElementById('cb-toggleRow');
        var step3UI = document.getElementById('cb-s3');

        fab.onclick = function () {
            var wasHidden = panel.classList.contains('hidden');
            panel.classList.toggle('hidden');
            fab.textContent = wasHidden ? 'Close' : 'Open';
            fab.classList.toggle('open', wasHidden);
        };

        chrome.storage.local.get('catbell_active', function (d) {
            var on = !!d.catbell_active;
            tog.checked = on;
            capNhatUI(on);
            if (on) catbell38();
        });

        tog.onchange = function () {
            var on = tog.checked;
            chrome.storage.local.set({ catbell_active: on }, function() {
                capNhatUI(on);
                if (on) catbell38();
            });
        };

        function capNhatUI(on) {
            if (on) {
                dot.className = 'cb-dot on';
                statusSub.textContent = 'Chạy';
                toggleRow.classList.add('on');
            } else {
                dot.className = 'cb-dot';
                statusSub.textContent = 'Dừng';
                toggleRow.classList.remove('on');
            }
        }
    }

    function catbell38() {
        var tog = document.getElementById('cb-tog');
        if (!tog || !tog.checked) return;

        var body = document.body.innerText;
        var step3UI = document.getElementById('cb-s3');
        var taskName = document.getElementById('cb-taskname');

        if (body.includes('STEP 3') || body.includes('LẤY MÃ STEP 3')) {
            if (step3UI) step3UI.style.display = 'block';
            if (taskName) taskName.textContent = 'Uptolink 3 Steps';
        } else if (body.includes('STEP 2') || body.includes('LẤY MÃ STEP 2')) {
            if (step3UI) step3UI.style.display = 'none';
            if (taskName) taskName.textContent = 'Uptolink 2 Steps';
        }

        // Logic xử lý Click tự động kế thừa từ phiên bản trước
        xuLyClickUptolink();
    }

    function xuLyClickUptolink() {
        var body = document.body.innerText;
        var els = document.querySelectorAll('*');
        
        // Quét lấy mã Step
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el.childElementCount === 0 && (el.textContent.includes('LẤY MÃ STEP') || el.textContent.includes('LẤY MÃ'))) {
                el.scrollIntoView();
                el.click();
                setTimeout(catbell38, 2000);
                return;
            }
        }
        
        // Quét nhấn để tiếp tục
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el.childElementCount === 0 && el.textContent.includes('NHẤN ĐỂ TIẾP TỤC')) {
                el.click();
                var closest = el.closest('button, a');
                if (closest) closest.click();
                return;
            }
        }

        setTimeout(catbell38, 1500);
    }

    // Đảm bảo chạy Render bất kể trạng thái DOM
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initGiaoDien();
    } else {
        window.addEventListener('DOMContentLoaded', initGiaoDien);
    }
})();
