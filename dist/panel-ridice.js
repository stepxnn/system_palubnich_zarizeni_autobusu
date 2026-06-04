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
// Vytvoření instance vnějšího panelu, který bude zobrazovat informace pro cestující venku. Předáváme mu informace z linky, aby mohl zobrazit správné údaje.
const vnejsiPanel = new VnejsiPanel(4, 'Vnější panel', true, linka.cislo, linka.smer, linka.zastavky);
// Pro dispečera komunikace zatím nemáme žádné specifické informace, takže mu předáme prázdný seznam zastávek a pásem, a nějaké základní hodnoty pro číslo linky a pásmo.
const dispecerKomunikace = new DispecerKomunikace(5, 'Dispečer komunikace', true, [], 80);
// Vytvoření instance palubního počítače, který bude koordinovat všechna zařízení. Předáváme mu odkazy na všechna zařízení, aby mohl mezi nimi komunikovat a aktualizovat jejich stav.
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
        // Přidáme event listener pro kliknutí, který zavolá funkci pro výběr zastávky s indexem této zastávky
        el.addEventListener('click', () => vyberZastavku(index));
        list.appendChild(el);
    });
}
// Funkce pro výběr zastávky z listu a aktualizaci displeje cestujícího a případně dalších zařízení. Tato funkce bude volána při kliknutí na zastávku v seznamu.
function vyberZastavku(index) {
    const list = document.getElementById('zastavkovy-list');
    if (!list)
        return;
    // Aktualizuj vizuální stav seznamu zastávek, aby bylo vidět, která zastávka je aktuálně vybraná
    const items = Array.from(list.querySelectorAll('.list-group-item'));
    items.forEach((item, i) => item.classList.toggle('active', i === index));
    // Získání názvu vybrané zastávky pro případné další zpracování
    const vybrana = linka.zastavky[index];
    console.log('Vybraná zastávka:', index, vybrana);
    // Aktualizuj stav displeje cestujícího a ulož pro druhé okno
    try {
        displejCestujici.setAktualniZastavkaByIndex(index);
        syncDisplayState();
    }
    catch (e) {
        console.warn('Nelze aktualizovat displej:', e);
    }
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
        // Zobrazí datum ve formátu dd.mm.yyyy
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString('cs-CZ', { year: 'numeric', month: 'numeric', day: 'numeric' });
        }
        // Zobrazí čas ve formátu hh:mm:ss bez AM/PM
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
    // Export initial state so other windows can read it
    syncDisplayState();
    // jednoduchý listener: tlačítko otevře displej v nové kartě
    const openBtn = document.getElementById('open-displej-btn');
    if (openBtn) {
        openBtn.addEventListener('click', () => window.open('displej-cestujici.html', '_blank'));
    }
    // Aktualizuj čas a předpokladaný čas každou sekundu
    setInterval(() => {
        const now = new Date();
        displejCestujici.setAktualniCas(now);
        // jednoduchý odhad: příští zastávka za 5 minut
        const pred = new Date(now.getTime() + 5 * 60 * 1000);
        displejCestujici.setPredpokladanyCas(pred);
        syncDisplayState();
    }, 1000);
});
// Export state of passenger display to localStorage for synchronization
// Jednoduchá funkce: uloží aktuální stav displeje do localStorage.
// Jiné okno (displej) tento klíč sleduje a aktualizuje zobrazení.
function syncDisplayState() {
    try {
        const state = {
            cisloLinky: displejCestujici.getCisloLinky(),
            aktualniZastavka: displejCestujici.getAktualniZastavka(),
            seznamZastavek: displejCestujici.getSeznamZastavek(),
            aktualniCas: displejCestujici.getAktualniCas().toISOString(),
            predpokladanyCas: displejCestujici.getPredpokladanyCas().toISOString(),
            aktualniPasmo: displejCestujici.getAktualniPasmo(),
            seznamPasem: displejCestujici.getSeznamPasem()
        };
        localStorage.setItem('displejState', JSON.stringify(state));
    }
    catch (e) {
        console.warn('Chyba pri exportu stavu displeje:', e);
    }
}
