
        lucide.createIcons();

        // --- TRANSLATIONS CONFIG ---
        const translations = {
            es: { welcome: "Desliza para empezar", mail: "Mail", calendar: "Calendario", photos: "Fotos", camera: "Cámara", maps: "Mapas", clock: "Reloj", weather: "Clima", wallet: "Cartera", notes: "Notas", calculator: "Calculadora", settings: "Ajustes", lang_region: "Idioma y Región", dark_mode: "Modo Oscuro", charging: "⚡ Super Charge 200W", face_id: "Face ID", changing_lang: "Cambiando Idioma..." },
            en: { welcome: "Swipe to start", mail: "Mail", calendar: "Calendar", photos: "Photos", camera: "Camera", maps: "Maps", clock: "Clock", weather: "Weather", wallet: "Wallet", notes: "Notes", calculator: "Calculator", settings: "Settings", lang_region: "Language & Region", dark_mode: "Dark Mode", charging: "⚡ Super Charge 200W", face_id: "Face ID", changing_lang: "Changing Language..." },
            fr: { welcome: "Balayez pour commencer", mail: "Mail", calendar: "Calendrier", photos: "Photos", camera: "Appareil photo", maps: "Plans", clock: "Horloge", weather: "Météo", wallet: "Cartes", notes: "Notes", calculator: "Calculatrice", settings: "Réglages", lang_region: "Langue et région", dark_mode: "Mode sombre", charging: "⚡ Super Charge 200W", face_id: "Face ID", changing_lang: "Changement de langue..." },
            it: { welcome: "Scorri per iniziare", mail: "Mail", calendar: "Calendario", photos: "Foto", camera: "Fotocamera", maps: "Mappe", clock: "Orologio", weather: "Meteo", wallet: "Wallet", notes: "Note", calculator: "Calcolatrice", settings: "Impostazioni", lang_region: "Lingua e zona", dark_mode: "Modalità scura", charging: "⚡ Super Charge 200W", face_id: "Face ID", changing_lang: "Cambio lingua..." },
            jp: { welcome: "スワイプして始める", mail: "メール", calendar: "カレンダー", photos: "写真", camera: "カメラ", maps: "マップ", clock: "時計", weather: "天気", wallet: "ウォレット", notes: "メモ", calculator: "電卓", settings: "設定", lang_region: "言語と地域", dark_mode: "ダークモード", charging: "⚡ Super Charge 200W", face_id: "Face ID", changing_lang: "言語を変更中..." },
            cn: { welcome: "向上轻扫以开始", mail: "邮件", calendar: "日历", photos: "照片", camera: "相机", maps: "地图", clock: "时钟", weather: "天气", wallet: "钱包", notes: "备忘录", calculator: "计算器", settings: "设置", lang_region: "语言与地区", dark_mode: "深色模式", charging: "⚡ Super Charge 200W", face_id: "Face ID", changing_lang: "正在更改语言..." }
        };
        let currentLang = 'es';

        // --- HELLO SEQUENCE ---
        const greetings = ["Pride", "hello", "hola", "bonjour", "ciao", "hallo", "olá", "你好", "こんにちは"];
        let greetIdx = 0;
        const welcomeText = document.getElementById('welcomeText');
        let greetInterval;

        // VERIFICAR SI YA VIO LA BIENVENIDA
        const hasSeenWelcome = localStorage.getItem('wtc_liquid_welcome_seen');

        if (hasSeenWelcome === 'true') {
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('notch').classList.remove('welcome-aura');
        } else {
            greetInterval = setInterval(() => {
                welcomeText.style.opacity = 0;
                setTimeout(() => {
                    greetIdx = (greetIdx + 1) % greetings.length;
                    welcomeText.innerText = greetings[greetIdx];
                    welcomeText.style.opacity = 1;
            }, 500);
        }, 2000);
    }

    function startSetup() {
        if (greetInterval) clearInterval(greetInterval);
        document.getElementById('notch').classList.remove('welcome-aura');
        document.getElementById('welcomeScreen').style.transform = "translateY(-100%)";
        localStorage.setItem('wtc_liquid_welcome_seen', 'true');
    }

    // --- SUPER CHARGE 200W ANIMATION ---
        function triggerSuperCharge() {
            const n = document.getElementById('notch');
            const percentEl = document.getElementById('chargePercent');
            const speedEl = document.getElementById('chargeSpeed');

            n.classList.add('expanded-charge');

            let percent = 0;
            const chargeInterval = setInterval(() => {
                percent += 2;
                percentEl.textContent = percent + '%';
                const wattage = Math.floor(180 + Math.random() * 40);
                speedEl.textContent = `${wattage}W`;

                if (percent >= 100) {
                    clearInterval(chargeInterval);
                    speedEl.textContent = 'Carga Completa';
                    setTimeout(() => {
                        n.classList.remove('expanded-charge');
                        percentEl.textContent = '100%';
                    }, 2000);
                }
            }, 50);
        }

        // --- LANGUAGE LOGIC ---
        function setLanguage(lang) {
            currentLang = lang;
            const t = translations[lang];
            const n = document.getElementById('notch');
            n.classList.add('expanded-language');

            document.getElementById('langNotchText').textContent = t.changing_lang;
            document.querySelectorAll('[data-key]').forEach(el => {
                const key = el.getAttribute('data-key');
                if (t[key]) el.textContent = t[key];
            });
            document.getElementById('swipeText').textContent = t.welcome;
            document.querySelectorAll('.lang-check').forEach(i => i.style.display = 'none');
            document.getElementById('check-' + lang).style.display = 'block';

            const langNames = { es: "Español", en: "English", fr: "Français", it: "Italiano", jp: "日本語", cn: "中文" };
            document.getElementById('currentLangDisplay').innerHTML = langNames[lang] + ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>';

            setTimeout(() => {
                navSettings('back');
                n.classList.remove('expanded-language');
            }, 2000);
        }

        // --- SETTINGS NAVIGATION ---
        function navSettings(target) {
            const main = document.getElementById('setMain');
            const langs = document.getElementById('setLangs');
            const personalize = document.getElementById('setPersonalize');
            const backBtn = document.getElementById('setBackBtn');
            const title = document.getElementById('setTitle');

            if (target === 'langs') {
                main.classList.add('hidden');
                langs.classList.add('hidden');
                personalize.classList.remove('hidden');
                backBtn.style.visibility = 'visible';
                backBtn.innerText = translations[currentLang].settings || "Ajustes";
                backBtn.onclick = () => navSettings('back');
                title.innerText = "Personalización";
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } else if (target === 'personalize') {
                main.classList.add('hidden');
                langs.classList.add('hidden');
                personalize.classList.remove('hidden');
                backBtn.style.visibility = 'visible';
                backBtn.innerText = translations[currentLang].settings || "Ajustes";
                backBtn.onclick = () => navSettings('back');
                title.innerText = "Personalización";
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } else if (target === 'back') {
                main.classList.remove('hidden');
                langs.classList.add('hidden');
                personalize.classList.add('hidden');
                backBtn.innerText = "Atrás";
                backBtn.onclick = () => closeApp('settings');
                title.innerText = translations[currentLang].settings || "Ajustes";
            }
        }

        // --- PRIDE WALLPAPERS CONFIGURATION ---
        const prideStyles = [
            { // Estilo 1: Predeterminado original
                name: "Estilo 1",
                home: "url('https://i.ibb.co/rNK6kjH/Wallpaper-IOS-1.jpg')",
                lock: "url('https://i.ibb.co/hFFPG4Qp/Wallpaper-IOS-2.jpg')"
            },
            { // Estilo 2
                name: "Estilo 2",
                home: "url('https://www.iclarified.com/images/news/93554/447511/447511-640.avif')",
                lock: "url('https://www.iclarified.com/images/news/93554/447517/447517-640.avif')"
            },
            { // Estilo 3
                name: "Estilo 3",
                home: "url('https://www.iclarified.com/images/news/93554/447526/447526-640.avif')",
                lock: "url('https://www.iclarified.com/images/news/93554/447529/447529-640.avif')"
            },
            { // Estilo 4
                name: "Estilo 4",
                home: "url('https://www.iclarified.com/images/news/93554/447538/447538-640.avif')",
                lock: "url('https://www.iclarified.com/images/news/93554/447541/447541-640.avif')"
            },
            { // Estilo 5
                name: "Estilo 5",
                home: "url('https://www.iclarified.com/images/news/93554/447549/447549-640.avif')",
                lock: "url('https://www.iclarified.com/images/news/93554/447552/447552-640.avif')"
            }
        ];

        let currentStyleIndex = parseInt(localStorage.getItem('wtc_pride_style_index')) || 0;
        let currentLockBg = prideStyles[currentStyleIndex].lock;
        let currentHomeBg = prideStyles[currentStyleIndex].home;

        function applyStyle(index) {
            currentStyleIndex = index;
            currentHomeBg = prideStyles[index].home;
            currentLockBg = prideStyles[index].lock;
            
            updateWallpapers();
            localStorage.setItem('wtc_pride_style_index', index);
            
            showStyleIndicator(prideStyles[index].name);
            
            document.querySelectorAll('.style-check').forEach(el => { el.style.display = 'none'; });
            const check = document.getElementById('style-check-' + index);
            if(check) check.style.display = 'block';
        }

        // --- ANIMACIÓN DE LA ISLA DINÁMICA PARA EL CAMBIO DE ESTILO ---
        function showStyleIndicator(text) {
            const ind = document.getElementById('styleNotchText');
            const n = document.getElementById('notch');
            if(ind && n) {
                ind.textContent = text;
                n.classList.remove('expanded-charge', 'expanded-faceid', 'expanded-language', 'expanded-music', 'expanded-cc');
                n.classList.add('expanded-style');
                
                if (typeof lucide !== 'undefined') lucide.createIcons();

                if(window.styleIndTimeout) clearTimeout(window.styleIndTimeout);
                window.styleIndTimeout = setTimeout(() => {
                    n.classList.remove('expanded-style');
                }, 2000); // Desaparece la Isla Dinámica después de 2 segundos
            }
        }

        function updateWallpapers() {
            document.getElementById('lockScreen').style.background = currentLockBg;
            document.getElementById('lockScreen').style.backgroundSize = 'cover';
            document.getElementById('lockScreen').style.backgroundPosition = 'center';
            
            document.getElementById('wallpaper').style.background = currentHomeBg;
            document.getElementById('wallpaper').style.backgroundSize = 'cover';
            document.getElementById('wallpaper').style.backgroundPosition = 'center';
            
            localStorage.setItem('wtc_lock_bg', currentLockBg);
            localStorage.setItem('wtc_home_bg', currentHomeBg);
        }

        function swapWallpapers() {
            let temp = currentLockBg;
            currentLockBg = currentHomeBg;
            currentHomeBg = temp;
            updateWallpapers();
        }

        function matchToLock() {
            currentHomeBg = currentLockBg;
            updateWallpapers();
        }

        function matchToHome() {
            currentLockBg = currentHomeBg;
            updateWallpapers();
        }

        function initWallpapers() {
            let savedIndex = localStorage.getItem('wtc_pride_style_index');
            const savedLock = localStorage.getItem('wtc_lock_bg');
            const savedHome = localStorage.getItem('wtc_home_bg');
            
            if (savedIndex !== null) {
                applyStyle(parseInt(savedIndex));
            } else if (savedLock && savedHome) {
                currentLockBg = savedLock;
                currentHomeBg = savedHome;
                updateWallpapers();
            } else {
                applyStyle(0);
            }
        }

        // --- GESTURES FOR WALLPAPER CHANGE ---
        let touchStartX = 0;
        let touchStartY = 0;
        let isLongPress = false;
        let longPressTimer;
        let gestureActive = false;

        const swipeDetector = document.getElementById('swipeDetector');
        if(swipeDetector) {
            swipeDetector.addEventListener('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                isLongPress = false;
                gestureActive = false;

                longPressTimer = setTimeout(() => {
                    isLongPress = true;
                    gestureActive = true;
                    if (navigator.vibrate) navigator.vibrate(50);
                    
                    document.getElementById('appGrid').style.transform = 'scale(0.95)';
                    document.getElementById('appGrid').style.transition = 'transform 0.3s';
                    document.querySelector('.dock-bar').style.transform = 'scale(0.95)';
                    document.querySelector('.dock-bar').style.transition = 'transform 0.3s';
                }, 500);
            });

            swipeDetector.addEventListener('touchmove', function(e) {
                if (!isLongPress) {
                    let dx = Math.abs(e.touches[0].clientX - touchStartX);
                    let dy = Math.abs(e.touches[0].clientY - touchStartY);
                    if (dx > 10 || dy > 10) clearTimeout(longPressTimer);
                    return;
                }
                if (gestureActive) e.preventDefault(); 
            }, { passive: false });

            swipeDetector.addEventListener('touchend', function(e) {
                clearTimeout(longPressTimer);
                document.getElementById('appGrid').style.transform = 'scale(1)';
                document.querySelector('.dock-bar').style.transform = 'scale(1)';

                if (gestureActive) {
                    let touchEndX = e.changedTouches[0].clientX;
                    let diffX = touchEndX - touchStartX;

                    if (Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            let newIndex = currentStyleIndex - 1;
                            if (newIndex < 0) newIndex = prideStyles.length - 1;
                            applyStyle(newIndex);
                        } else {
                            let newIndex = currentStyleIndex + 1;
                            if (newIndex >= prideStyles.length) newIndex = 0;
                            applyStyle(newIndex);
                        }
                    }
                }
                gestureActive = false;
                isLongPress = false;
            });

            swipeDetector.addEventListener('touchcancel', function(e) {
                clearTimeout(longPressTimer);
                document.getElementById('appGrid').style.transform = 'scale(1)';
                document.querySelector('.dock-bar').style.transform = 'scale(1)';
                gestureActive = false;
                isLongPress = false;
            });

            swipeDetector.addEventListener('mousedown', function(e) {
                touchStartX = e.clientX;
                touchStartY = e.clientY;
                isLongPress = false;
                gestureActive = false;

                longPressTimer = setTimeout(() => {
                    isLongPress = true;
                    gestureActive = true;
                    document.getElementById('appGrid').style.transform = 'scale(0.95)';
                    document.getElementById('appGrid').style.transition = 'transform 0.3s';
                    document.querySelector('.dock-bar').style.transform = 'scale(0.95)';
                    document.querySelector('.dock-bar').style.transition = 'transform 0.3s';
                }, 500);
            });

            swipeDetector.addEventListener('mousemove', function(e) {
                if (!isLongPress) {
                    let dx = Math.abs(e.clientX - touchStartX);
                    let dy = Math.abs(e.clientY - touchStartY);
                    if (dx > 10 || dy > 10) clearTimeout(longPressTimer);
                }
            });

            window.addEventListener('mouseup', function(e) {
                if(longPressTimer) clearTimeout(longPressTimer);
                
                let grid = document.getElementById('appGrid');
                if(grid) grid.style.transform = 'scale(1)';
                let dock = document.querySelector('.dock-bar');
                if(dock) dock.style.transform = 'scale(1)';

                if (gestureActive) {
                    let touchEndX = e.clientX;
                    let diffX = touchEndX - touchStartX;

                    if (Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            let newIndex = currentStyleIndex - 1;
                            if (newIndex < 0) newIndex = prideStyles.length - 1;
                            applyStyle(newIndex);
                        } else {
                            let newIndex = currentStyleIndex + 1;
                            if (newIndex >= prideStyles.length) newIndex = 0;
                            applyStyle(newIndex);
                        }
                    }
                }
                gestureActive = false;
                isLongPress = false;
            });
        }

        const FONTS = { system: '-apple-system, BlinkMacSystemFont, sans-serif', inter: "'Inter', sans-serif", dancing: "'Dancing Script', cursive", roboto: "'Roboto', sans-serif" };
        const DEFAULT_APP_ORDER = ['mail', 'calendar', 'photos', 'camera', 'maps', 'clock', 'weather', 'wallet', 'notes', 'calculator', 'files', 'settings'];
        const APP_NAMES = { mail: 'Mail', calendar: 'Calendario', photos: 'Fotos', camera: 'Cámara', maps: 'Mapas', clock: 'Reloj', weather: 'Clima', wallet: 'Cartera', notes: 'Notas', calculator: 'Calculadora', files: 'Archivos', settings: 'Ajustes' };

        function applyFont(id) {
            const font = FONTS[id] || FONTS.system;
            document.body.style.fontFamily = font;
            document.querySelectorAll('.font-opt').forEach(el => { el.classList.remove('font-selected'); const c = el.querySelector('.font-check'); if (c) c.style.display = 'none'; });
            const sel = document.querySelector('.font-opt[data-font="' + id + '"]');
            if (sel) { sel.classList.add('font-selected'); const c = sel.querySelector('.font-check'); if (c) c.style.display = 'block'; }
            localStorage.setItem('wtc_liquid_font', id);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function loadAppOrder() {
            try {
                const s = localStorage.getItem('wtc_liquid_app_order');
                return s ? JSON.parse(s) : [...DEFAULT_APP_ORDER];
            } catch { return [...DEFAULT_APP_ORDER]; }
        }

        function renderAppGrid() {
            const order = loadAppOrder();
            const grid = document.getElementById('appGrid');
            const items = Array.from(grid.querySelectorAll('.app-item[data-app-id]'));
            const byId = {};
            items.forEach(el => { byId[el.getAttribute('data-app-id')] = el; });
            order.forEach(id => { if (byId[id]) grid.appendChild(byId[id]); });
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // SYSTEM CLOCK
        function updateClock() {
            const d = new Date();
            const t = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('lockTime').innerText = t;
            document.getElementById('statusBarClock').innerText = t;
            const o = { weekday: 'long', day: 'numeric', month: 'long' };
            document.getElementById('lockDate').innerText = d.toLocaleDateString(currentLang === 'es' ? 'es-ES' : 'en-US', o);
        }
        setInterval(updateClock, 1000); updateClock();

        // CALENDAR
        function updateCalendar() {
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const dayNames = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
            const d = new Date();
            const calDisplay = document.getElementById('calMonthDisplay');
            if (calDisplay) calDisplay.innerText = monthNames[d.getMonth()];
            const iconDayName = document.getElementById('calIconDayName');
            const iconDayNum = document.getElementById('calIconDayNum');
            if (iconDayName) iconDayName.innerText = dayNames[d.getDay()];
            if (iconDayNum) iconDayNum.innerText = d.getDate();
        }

        // WEATHER
        async function fetchWeather() {
            try {
                const res = await fetch('https://api.weatherapi.com/v1/current.json?key=4b02f5f27ef04701a4b205249252911&q=Ojo de Agua, Mexico&lang=es');
                const data = await res.json();
                document.getElementById('weatherTemp').innerHTML = `<h1 style="font-size: 80px; margin-bottom: 0;">${Math.round(data.current.temp_c)}°</h1>`;
                document.getElementById('weatherDesc').innerText = data.current.condition.text;
                const humEl = document.getElementById('weatherHum');
                if (humEl) humEl.innerText = data.current.humidity + '%';
                const windEl = document.getElementById('weatherWind');
                if (windEl) windEl.innerText = data.current.wind_kph + ' km/h';
            } catch (e) {
                console.log('Error al obtener clima', e);
                document.getElementById('weatherDesc').innerText = "Sin conexión";
            }
        }

        // NOTES
        function initNotes() {
            const notesArea = document.getElementById('notesTextarea');
            const savedNote = localStorage.getItem('wtc_liquid_notes');
            if (savedNote !== null) {
                notesArea.value = savedNote;
            }
            notesArea.addEventListener('input', function () {
                localStorage.setItem('wtc_liquid_notes', this.value);
            });
        }

        function resize() {
            const s = Math.min((window.innerWidth - 20) / 380, (window.innerHeight - 20) / 800, 1);
            document.getElementById('scaler').style.transform = `scale(${s})`;
        }
        window.onresize = resize;

        (function initPersonalization() {
            initWallpapers();
            applyFont(localStorage.getItem('wtc_liquid_font') || 'system');
            renderAppGrid();
        })();

        window.onload = function () {
            resize();
            lucide.createIcons();
            updateCalendar();
            fetchWeather();
            initNotes();
        };

        function unlockPhone() {
            const n = document.getElementById('notch');
            n.classList.add('expanded-faceid');
            setTimeout(() => {
                n.classList.remove('expanded-faceid');
                document.getElementById('lockScreen').classList.add('unlocked');
            }, 1000);
        }

        function goHome() {
            document.querySelectorAll('.app-window').forEach(w => w.classList.remove('open'));
            clearInterval(cvcInterval);
            document.getElementById('homeIndicator').classList.remove('dark');
            document.getElementById('statusBar').classList.remove('dark');
        }

        const lightApps = ['mail', 'calendar', 'photos', 'maps', 'notes', 'settings', 'phone', 'safari', 'messages'];

        function openApp(id) {
            if (id === 'wallet') startWallet();
            if (id === 'camera') startCamera();
            const app = document.getElementById('app-' + id);
            if (app) {
                app.classList.add('open');
                if (lightApps.includes(id)) {
                    document.getElementById('homeIndicator').classList.add('dark');
                    document.getElementById('statusBar').classList.add('dark');
                }
            }
            if (id === 'music') {
                document.getElementById('notch').classList.add('expanded-music');
            }
        }
        function closeApp(id) {
            document.getElementById('app-' + id).classList.remove('open');
            if (id === 'wallet') clearInterval(cvcInterval);
            if (id === 'camera') stopCamera();
            if (id === 'music') {
                document.getElementById('notch').classList.remove('expanded-music');
            }
            goHome();
        }

        function toggleDark() {
            document.getElementById('iphoneFrame').classList.toggle('dark-mode');
            document.getElementById('darkToggle').classList.toggle('active');
        }

        // CAMERA
        let videoStream;
        let filterIdx = 0;
        const filters = ['none', 'grayscale(1)', 'sepia(1)', 'saturate(2)'];
        async function startCamera() {
            try {
                videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                document.getElementById('camFeed').srcObject = videoStream;
            } catch (e) { }
        }
        function stopCamera() {
            if (videoStream) videoStream.getTracks().forEach(t => t.stop());
        }
        function toggleFilter() {
            filterIdx = (filterIdx + 1) % filters.length;
            document.getElementById('camFeed').style.filter = filters[filterIdx];
        }
        function takePhoto() {
            const c = document.getElementById('photoCanvas');
            const v = document.getElementById('camFeed');
            c.width = v.videoWidth; c.height = v.videoHeight;
            const ctx = c.getContext('2d');
            ctx.filter = filters[filterIdx];
            ctx.drawImage(v, 0, 0);
            document.getElementById('lastPhoto').src = c.toDataURL('image/jpeg');
            document.getElementById('lastPhoto').style.display = 'block';
        }

        // WALLET
        let cvcInterval;
        function startWallet() {
            let num = "";
            for (let i = 0; i < 4; i++) num += Math.floor(1000 + Math.random() * 9000) + " ";
            document.getElementById('walletNum').innerText = num.trim();

            function updateCVC() {
                document.getElementById('walletCVC').innerText = Math.floor(100 + Math.random() * 900);
                const bar = document.getElementById('cvcProgress');
                bar.style.transition = 'none'; bar.style.width = '100%';
                setTimeout(() => { bar.style.transition = 'width 30s linear'; bar.style.width = '0%'; }, 10);
            }
            updateCVC();
            clearInterval(cvcInterval);
            cvcInterval = setInterval(updateCVC, 30000);
        }

        // AI TERMINAL
        function triggerAiTerminal() {
            const terminal = document.getElementById('aiTerminal');
            const termText = document.getElementById('aiText');
            terminal.style.display = 'block';
            termText.innerHTML = '';
            const msgs = ["INICIANDO WTC LIQUID AI CORE...", "BYPASSING APPLE SECURITY PROTOCOLS...", "ACCESS GRANTED.", "HELLO, USER.", "I AM ALIVE."];
            let i = 0;
            const intv = setInterval(() => {
                if (i >= msgs.length) { clearInterval(intv); return; }
                termText.innerHTML += "> " + msgs[i] + "<br/>";
                i++;
            }, 800);
        }

        document.addEventListener('keydown', (e) => {
            const phoneApp = document.getElementById('app-phone');
            if (phoneApp && phoneApp.classList.contains('open')) {
                const key = e.key.toUpperCase();
                if (/^[0-9A-Z*#]$/.test(key)) {
                    dial(key);
                }
            }
        });

        // CONTROL CENTER
        function toggleControlCenter() {
            const n = document.getElementById('notch');
            if (n.classList.contains('expanded-cc')) {
                n.classList.remove('expanded-cc');
            } else {
                n.className = 'notch expanded-cc';
                setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 100);
            }
        }
        function toggleCcBtn(id, e) {
            e.stopPropagation();
            const el = document.getElementById('cc-' + id);
            if (el) el.classList.toggle('active');
        }
        function changeBrightness(val) {
            const opacity = val / 100;
            const ifr = document.getElementById('iphoneFrame');
            ifr.style.filter = `brightness(${opacity})`;
            document.getElementById('wallpaper').style.filter = `brightness(${opacity})`;
        }

        // PHONE
        function dial(n) {
            const display = document.getElementById('phoneDisplay');
            display.innerText += n;
            if (display.innerText === '911') {
                window.location.href = 'new911.html';
            }
            if (display.innerText === '8080') {
                document.getElementById('wallpaper').style.background = 'url("https://www.transparenttextures.com/patterns/cubes.png"), #5e3a1f';
                document.body.style.fontFamily = 'monospace';
                alert('¡Minecraft Mode Activado!');
                display.innerText = '';
            }
            if (display.innerText === '*#*#AI#*#*') {
                triggerAiTerminal();
                display.innerText = '';
            }
            if (display.innerText.toLowerCase().replace(/[^a-z]/g, '') === 'assumptions') {
                window.location.href = 'assumptions.html';
            }
        }

        (function () {
            var dial4 = document.getElementById('dialKey4');
            if (!dial4) return;
            var t;
            function startHold() { t = setTimeout(function () { window.location.href = 'htlr.html'; }, 500); }
            function cancelHold() { clearTimeout(t); }
            dial4.addEventListener('mousedown', startHold);
            dial4.addEventListener('touchstart', startHold);
            dial4.addEventListener('mouseup', cancelHold);
            dial4.addEventListener('mouseleave', cancelHold);
            dial4.addEventListener('touchend', cancelHold);
        })();

        // CALCULATOR
        function safeMath(expr) {
            let tokens = expr.match(/(?:\d+\.?\d*|[\+\-\*\/])/g);
            if (!tokens) return "0";
            for (let i = 1; i < tokens.length - 1; i += 2) {
                if (tokens[i] === '*' || tokens[i] === '/') {
                    let a = parseFloat(tokens[i - 1]);
                    let b = parseFloat(tokens[i + 1]);
                    let r = tokens[i] === '*' ? (a * b) : (a / b);
                    tokens.splice(i - 1, 3, r);
                    i -= 2; 
                }
            }
            let res = parseFloat(tokens[0]);
            for (let i = 1; i < tokens.length - 1; i += 2) {
                if (tokens[i] === '+') res += parseFloat(tokens[i + 1]);
                if (tokens[i] === '-') res -= parseFloat(tokens[i + 1]);
            }
            return isNaN(res) ? "Error" : res.toString();
        }

        let cVal = "0";
        function calc(v) {
            const d = document.getElementById('calcRes');
            if (v === 'C') {
                cVal = "0";
            } else if (v === '=') {
                try {
                    cVal = safeMath(cVal);
                } catch {
                    cVal = "Error";
                }
            } else if (v === '+/-') {
                if (cVal !== "0" && cVal !== "Error") {
                    if (cVal.startsWith("-")) cVal = cVal.substring(1);
                    else cVal = "-" + cVal;
                }
            } else if (v === '%') {
                if (cVal !== "0" && cVal !== "Error") {
                    try { cVal = (parseFloat(safeMath(cVal)) / 100).toString(); } catch { cVal = "Error"; }
                }
            } else {
                if (cVal === "0" && v !== '.') cVal = "";
                cVal += v;
            }
            d.innerText = cVal;
        }

    
