import { TiskarnaJizdenek } from './TiskarnaJizdenek.js';
import { Validator } from './Validator.js';
import { Displejcestujici } from './DisplejCestujici.js';
import { VnejsiPanel } from './VnejsiPanel.js';
import { DispecerKomunikace } from './DispecerKomunikace.js';
import { PalubniPocitac } from './PalubniPocitac.js';
import { linky } from './data.js';
const tiskarna = new TiskarnaJizdenek(1, 'Tiskárna', true, 100, 0);
const validator = new Validator(2, 'Validator', true, 0, new Date());
const linka = linky[0]; // Předpokládáme, že chceme použít první linku z dat pro zobrazení informací na displeji cestujícího.
const displejCestujici = new Displejcestujici(3, 'Displej cestující', true, linka.zastavky[0], linka.zastavky, linka.cislo, new Date(), 1, ['P6', 'P7'], new Date());
const vnejsiPanel = new VnejsiPanel(4, 'Vnější panel', true, linka.cislo, linka.smer, linka.zastavky);
const dispecerKomunikace = new DispecerKomunikace(5, 'Dispečer komunikace', true, [], 80);
const palubniPocitac = new PalubniPocitac(tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace);
function renderZastavky() {
    const list = document.getElementById('zastavkovy-list');
    if (!list)
        return;
    list.innerHTML = ''; // vymaže obsah
    list.classList.add('list-group');
    linka.zastavky.forEach((zastavka, index) => {
        const el = document.createElement('button');
        el.type = 'button';
        // add our touch-friendly stop class plus existing list-group classes
        el.className = 'stop-item list-group-item list-group-item-action';
        el.textContent = zastavka;
        el.addEventListener('click', () => vyberZastavku(index));
        list.appendChild(el);
    });
}
function vyberZastavku(index) {
    const list = document.getElementById('zastavkovy-list');
    if (!list)
        return;
    const items = Array.from(list.querySelectorAll('.list-group-item'));
    items.forEach((item, i) => item.classList.toggle('active', i === index));
    const vybrana = linka.zastavky[index];
    console.log('Vybraná zastávka:', index, vybrana);
    // Po výběru můžeme aktualizovat interní stav palubního počítače (pokud to dává smysl)
    // zde jen zavoláme aktualizaci, pokud chceme posunout aktuální zastávku
    // palubniPocitac.aktualizujZastavku();
}
// Nastavení odhlášení
function setupLogoutAndClock() {
    const odhl = document.getElementById('odhlasit-btn');
    if (odhl) {
        odhl.addEventListener('click', function (ev) {
            ev.preventDefault();
            try {
                sessionStorage.clear();
                localStorage.removeItem('prihlasenRidic');
            }
            catch (e) { }
            window.location.href = 'index.html';
        });
    }
    // Funkce pro aktualizaci zobrazení data a času
    function updateDateTime() {
        const now = new Date();
        const dateEl = document.getElementById('date');
        const timeEl = document.getElementById('time');
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString('cs-CZ', { year: 'numeric', month: 'numeric', day: 'numeric' });
        }
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('cs-CZ', { hour12: false });
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
    renderZastavky();
    setupLogoutAndClock();
});
