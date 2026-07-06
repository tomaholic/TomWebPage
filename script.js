
// === REVEAL ANIMATIONS ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// === COUNTER ANIMATION ===
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = match[2];
    let current = 0;
    const step = target / (1500 / 16);
    const interval = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target + suffix; clearInterval(interval); }
        else { el.textContent = Math.floor(current) + suffix; }
    }, 16);
}

// === SCROLL TO TOP ===
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) scrollBtn.classList.add('visible');
        else scrollBtn.classList.remove('visible');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// === MOBILE MENU ===
function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('open');
}

// === COOKIE CONSENT + CLARITY ===
const cookieBanner = document.getElementById('cookieBanner');
const consent = localStorage.getItem('cookie-consent');
if (cookieBanner) {
    if (!consent) setTimeout(() => cookieBanner.classList.add('show'), 1500);
    else if (consent === 'accepted') loadClarity();
}

function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    cookieBanner.classList.remove('show');
    loadClarity();
}

function declineCookies() {
    localStorage.setItem('cookie-consent', 'declined');
    cookieBanner.classList.remove('show');
}

function loadClarity() {
    if (window.clarityLoaded) return;
    window.clarityLoaded = true;
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xglxnos622");
}

// === LEVEL SLIDER (auf /technology) ===
const levelSlider = document.getElementById('levelSlider');
if (levelSlider) {
    const levels = [
        { num: '0', name: 'Manuell', desc: 'Der gute alte Spaten. Mensch macht alles. Schweiss, Rückenschmerzen, gelegentlicher Erfolg.', emoji: '🛠' },
        { num: '1', name: 'Connected', desc: 'Smarte Sensoren melden Bodenfeuchte, Licht und Temperatur an deine App. Du entscheidest noch.', emoji: '📡' },
        { num: '2', name: 'Assisted', desc: 'Mähroboter, Sprinkler und Lichtsteuerung laufen automatisch – aber begrenzt.', emoji: '🌾' },
        { num: '3', name: 'Cooperative', desc: 'Mehrere KI-Roboter koordinieren sich: Unkrautjäter, Schneider, Düngerroboter arbeiten im Team.', emoji: '🤖' },
        { num: '4', name: 'Autonomous', desc: 'Der Garten pflegt sich selbst. Bäume schneiden, Schädlinge bekämpfen, Nährstoffe ergänzen – alles automatisch.', emoji: '🌳' },
        { num: '5', name: 'Symbiotic', desc: 'Der lebende Garten. KI lernt und optimiert das gesamte Ökosystem eigenständig. Du bist Geniesser.', emoji: '🌸' }
    ];

    function updateSlider(val) {
        const l = levels[val];
        document.getElementById('sliderLevelNum').textContent = l.num;
        document.getElementById('sliderLevelName').textContent = l.emoji + ' ' + l.name;
        document.getElementById('sliderLevelDesc').textContent = l.desc;
    }

    levelSlider.addEventListener('input', (e) => updateSlider(e.target.value));
    updateSlider(2);
}
