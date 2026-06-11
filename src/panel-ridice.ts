// ============================================================
// STRÁNKA: panel-ridice.html (hlavní panel řidiče)
// ------------------------------------------------------------
// Propojuje TypeScriptovou logiku palubních zařízení s HTML prvky.
// Řeší: seznam zastávek, posun na další zastávku, hodiny, odhlášení,
// prodej jízdenek a synchronizaci displeje cestujícího přes localStorage.
// ============================================================

import { vytvorPalubniSystem } from './sestaveniSystemu.js';
import { zastavky, cenik, koeficientyTypu } from './data.js';

// Vytvoření všech zařízení na jednom místě (viz sestaveniSystemu.ts).
const { linka, displejCestujici } = vytvorPalubniSystem();

// Pozice autobusu v seznamu zastávek.
// Indexy pole začínají od 0: první zastávka má index 0, druhá 1 atd.
let aktualniIndexZastavky = 0;

// ------------------------------------------------------------
// POMOCNÉ FUNKCE (používají se na více místech, aby se kód neopakoval)
// ------------------------------------------------------------

// Zkratka za document.getElementById - ušetří opakované psaní.
function el(id: string): HTMLElement | null {
    return document.getElementById(id);
}

// Zvýrazní zastávku s daným indexem v seznamu (CSS třída 'active').
// classList.toggle přidá/odebere třídu podle podmínky i === index.
function zvyrazniZastavku(index: number): void {
    const list = el('zastavkovy-list');
    if (!list) return;
    const items = Array.from(list.querySelectorAll('.list-group-item')) as HTMLElement[];
    items.forEach((item, i) => item.classList.toggle('active', i === index));
}

// Nastaví texty výběru trasy (odkud / kam / počet pásem) v horní části seznamu.
function nastavTextyVyberu(od: string, kam: string, pasma: number): void {
    const odEl = el('zastavka-od');
    const kamEl = el('zastavka-kam');
    const pasemEl = el('pocet-pasem');
    if (odEl) odEl.textContent = od;
    if (kamEl) kamEl.textContent = kam;
    if (pasemEl) pasemEl.textContent = String(pasma);
}

// Přepnutí barvy tlačítka: zelená = vybrané, modrá = nevybrané.
function obarviTlacitko(btn: HTMLElement, vybrane: boolean): void {
    btn.classList.toggle('w3-green', vybrane);
    btn.classList.toggle('w3-blue', !vybrane);
}

// ------------------------------------------------------------
// SEZNAM ZASTÁVEK
// ------------------------------------------------------------

// Vykreslí seznam zastávek do HTML.
// document.createElement vytvoří nový HTML prvek, appendChild ho vloží do stránky.
function renderZastavky(): void {
    const list = el('zastavkovy-list');
    if (!list) return;
    list.innerHTML = '';
    list.classList.add('list-group');

    linka.zastavky.forEach((zastavka, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'stop-item list-group-item list-group-item-action';
        btn.textContent = zastavka;
        // Arrow funkce si "zapamatuje" index zastávky, na kterou uživatel klikl.
        btn.onclick = () => vyberZastavku(index);
        list.appendChild(btn);
    });
}

// Klik na zastávku v seznamu: jen ji zvýrazní v panelu, neposunuje displej.
function vyberZastavku(index: number): void {
    zvyrazniZastavku(index);
    aktualniIndexZastavky = index;
    console.log('Vybraná zastávka (klik):', index, linka.zastavky[index]);
}

// Tlačítko "Další zastávka": posune autobus o jednu zastávku dál
// a promítne změnu i na displej cestujícího.
function dalsiZastavka(): void {
    // Na poslední zastávce už není kam jet.
    if (aktualniIndexZastavky >= linka.zastavky.length - 1) return;

    aktualniIndexZastavky += 1;
    console.log('Další zastávka (tlačítko):', aktualniIndexZastavky, linka.zastavky[aktualniIndexZastavky]);

    try {
        displejCestujici.setAktualniZastavkaByIndex(aktualniIndexZastavky);
        // Uložíme stav, aby si ho mohlo přečíst okno displeje cestujícího.
        syncDisplayState();
    } catch (e) {
        console.warn('Nelze aktualizovat displej:', e);
    }

    zvyrazniZastavku(aktualniIndexZastavky);
}

// ------------------------------------------------------------
// HLAVIČKA: HODINY A ODHLÁŠENÍ
// ------------------------------------------------------------

function setupLogoutAndClock(): void {
    const odhl = el('odhlasit-btn');
    if (odhl) {
        odhl.onclick = (ev) => {
            ev.preventDefault();
            // Smažeme informaci o přihlášeném řidiči a vrátíme se na přihlášení.
            try {
                sessionStorage.clear();
                localStorage.removeItem('prihlasenRidic');
            } catch (e) { /* úložiště nemusí být dostupné, odhlášení proběhne i tak */ }
            window.location.href = 'index.html';
        };
    }

    // Vnořená funkce pro aktualizaci data a času v horní liště.
    function updateDateTime(): void {
        const now = new Date();
        const dateEl = el('date');
        const timeEl = el('time');

        if (dateEl) dateEl.textContent = now.toLocaleDateString('cs-CZ', { year: 'numeric', month: 'numeric', day: 'numeric' });
        if (timeEl) timeEl.textContent = now.toLocaleTimeString('cs-CZ', { hour12: false });
    }

    updateDateTime();
    // setInterval spouští funkci opakovaně; 1000 ms = každou sekundu.
    setInterval(updateDateTime, 1000);
}

// ------------------------------------------------------------
// TLAČÍTKA LEVÉ LIŠTY (navigace na další obrazovky)
// ------------------------------------------------------------

function setupNavigaci(): void {
    const nastaveniBtn = el('nastaveni-btn');
    if (nastaveniBtn) nastaveniBtn.onclick = () => { window.location.href = 'nastaveni.html'; };

    const dalsiBtn = el('dalsi-zastavka-btn');
    // .onclick přepíše případný předchozí handler - kliknutí se nemůže násobit.
    if (dalsiBtn) dalsiBtn.onclick = dalsiZastavka;

    // window.open otevře samostatné okno/kartu (displej a validator visí jinde v autobuse).
    const openDisplejBtn = el('open-displej-btn');
    if (openDisplejBtn) openDisplejBtn.onclick = () => window.open('displej-cestujici.html', '_blank');

    const validatorBtn = el('open-validator-btn');
    if (validatorBtn) validatorBtn.onclick = () => window.open('validator.html', '_blank');

    // Dispečink se otevírá ve stejném okně (řidič se pak vrací tlačítkem Zpět).
    const dispecBtn = el('dispecink-btn');
    if (dispecBtn) dispecBtn.onclick = () => { window.location.href = 'dispecer-komunikace.html'; };
}

// ------------------------------------------------------------
// PRODEJ JÍZDENEK
// ------------------------------------------------------------

function setupTickets(): void {
    // Stav rozpracovaného odbavení.
    let zastavkaOd: number | null = null;       // index výchozí zastávky
    let zastavkaDo: number | null = null;       // index cílové zastávky
    let pocetPasem = 0;                         // přes kolik tarifních pásem se jede
    let vybranyTypJizdneho: HTMLElement | null = null;  // zvolené tlačítko typu jízdného
    let vybraneDoplnky: HTMLElement[] = [];     // zvolená tlačítka doplňků (kolo, kufr...)

    const typyTlacitka = document.querySelectorAll<HTMLElement>('.ticket-type-btn');
    const doplnkyTlacitka = document.querySelectorAll<HTMLElement>('.ticket-addon-btn');
    const vydatBtn = el('vydat-btn');
    const stornoBtn = el('storno-btn');

    // Typ jízdného: lze vybrat jen jeden. Opakovaný klik výběr zruší.
    typyTlacitka.forEach(btn => {
        btn.onclick = () => {
            if (vybranyTypJizdneho === btn) {
                obarviTlacitko(btn, false);
                vybranyTypJizdneho = null;
            } else {
                typyTlacitka.forEach(b => obarviTlacitko(b, false));
                obarviTlacitko(btn, true);
                vybranyTypJizdneho = btn;
            }
        };
    });

    // Doplňky: lze vybrat více najednou. Klik přidá nebo odebere.
    doplnkyTlacitka.forEach(btn => {
        btn.onclick = () => {
            const index = vybraneDoplnky.indexOf(btn);
            if (index > -1) {
                vybraneDoplnky.splice(index, 1); // splice odebere prvek z pole
                obarviTlacitko(btn, false);
            } else {
                vybraneDoplnky.push(btn);
                obarviTlacitko(btn, true);
            }
        };
    });

    // Storno: vrátí celé odbavení do výchozího stavu.
    function resetOdbaveni(): void {
        vybranyTypJizdneho = null;
        vybraneDoplnky = [];
        zastavkaOd = null;
        zastavkaDo = null;
        pocetPasem = 0;
        document.querySelectorAll<HTMLElement>('.ticket-type-btn, .ticket-addon-btn')
            .forEach(b => obarviTlacitko(b, false));
        nastavTextyVyberu('--', '--', 0);
        zobrazVybranyTah();
    }

    if (stornoBtn) stornoBtn.onclick = resetOdbaveni;

    // Spočítá, přes kolik RŮZNÝCH tarifních pásem trasa vede.
    // Set je množina - stejné pásmo se v ní objeví jen jednou.
    function vypocitejPocetPasem(od: number, do_: number): number {
        const start = Math.min(od, do_);
        const end = Math.max(od, do_);
        const pasmaSet = new Set<number>();
        for (let i = start; i <= end; i++) {
            if (zastavky[i]) pasmaSet.add(zastavky[i].pasmo);
        }
        return Math.max(1, pasmaSet.size); // minimálně 1 pásmo
    }

    // Najde cenu v ceníku podle počtu pásem (záloha: 12 Kč za pásmo).
    function getCenaZaCenik(pocet: number): number {
        const item = cenik.find(c => c.pocetPasem === pocet);
        return item ? item.cena : pocet * 12;
    }

    // Zobrazí/skryje rámeček s vybranou trasou a obarví vybrané zastávky v seznamu.
    function zobrazVybranyTah(): void {
        const tah = el('vybrany-tah');
        if (tah) tah.style.display = (zastavkaOd !== null && zastavkaDo !== null) ? 'block' : 'none';

        const list = el('zastavkovy-list');
        if (!list) return;
        Array.from(list.querySelectorAll<HTMLElement>('.stop-item')).forEach((btn, index) => {
            btn.classList.remove('w3-blue', 'w3-light-green', 'w3-pale-green', 'active', 'stop-od', 'stop-kam');
            if (index === zastavkaOd) btn.classList.add('stop-od');          // výchozí = modrá
            else if (index === zastavkaDo) btn.classList.add('stop-kam');    // cílová = zelená
        });
    }

    // Výběr trasy klikáním na zastávky: první klik = odkud, druhý klik = kam.
    // Klik na již vybranou výchozí zastávku výběr zruší.
    const zastavkovyList = el('zastavkovy-list');
    if (zastavkovyList) {
        // Delegování událostí: jeden posluchač na celém seznamu místo posluchače
        // na každém tlačítku. closest() najde nejbližší tlačítko zastávky od místa kliku.
        zastavkovyList.addEventListener('click', (e) => {
            const button = (e.target as HTMLElement).closest<HTMLElement>('.stop-item');
            if (!button) return;

            const buttons = Array.from(zastavkovyList.querySelectorAll<HTMLElement>('.stop-item'));
            const index = buttons.indexOf(button);
            if (index === -1) return;

            const nazev = button.textContent?.trim() || '';

            if (zastavkaOd === null) {
                // 1. klik: nastavíme výchozí zastávku.
                zastavkaOd = index;
                zastavkaDo = null;
                pocetPasem = 0;
                nastavTextyVyberu(nazev, '--', 0);
            } else if (zastavkaOd === index) {
                // Klik na stejnou zastávku: zrušení výběru.
                zastavkaOd = null;
                zastavkaDo = null;
                pocetPasem = 0;
                nastavTextyVyberu('--', '--', 0);
            } else if (zastavkaDo === null) {
                // 2. klik: nastavíme cíl a spočítáme pásma.
                zastavkaDo = index;
                pocetPasem = vypocitejPocetPasem(zastavkaOd, zastavkaDo);
                const odNazev = linka.zastavky[zastavkaOd];
                nastavTextyVyberu(odNazev, nazev, pocetPasem);
            } else {
                // Trasa už byla kompletní: začínáme nový výběr od této zastávky.
                zastavkaOd = index;
                zastavkaDo = null;
                pocetPasem = 0;
                nastavTextyVyberu(nazev, '--', 0);
            }

            zobrazVybranyTah();
        });
    }

    // Tlačítko "Vydat jízdenku": zkontroluje výběr, spočítá cenu a jízdenku "vytiskne".
    if (vydatBtn) {
        vydatBtn.onclick = () => {
            // Kontroly vstupu - bez trasy a bez položek nelze jízdenku vydat.
            if (zastavkaOd === null || zastavkaDo === null) {
                alert('Chyba: Musíte vybrat dvě zastávky (odkud a kam)!');
                return;
            }
            if (!vybranyTypJizdneho && vybraneDoplnky.length === 0) {
                alert('Chyba: Nebyla vybrána žádná jízdenka ani zavazadlo!');
                return;
            }

            let celkovaCena = 0;
            const polozkyVypisu: string[] = [];

            // Cena jízdného = cena z ceníku podle pásem × koeficient slevy (data.ts).
            if (vybranyTypJizdneho) {
                const koeficient = koeficientyTypu[vybranyTypJizdneho.id] ?? 1.0;
                const nazevTypu = vybranyTypJizdneho.getAttribute('data-nazev');
                const cenaZaCenik = getCenaZaCenik(pocetPasem);
                const cenaTypu = Math.round(cenaZaCenik * koeficient);
                celkovaCena += cenaTypu;
                polozkyVypisu.push(`${nazevTypu} (${pocetPasem} pásmem → ${cenaZaCenik} Kč × ${Math.round(koeficient * 100)}% = ${cenaTypu} Kč)`);
            }

            // Doplňky mají pevnou cenu uloženou v HTML atributu data-cena.
            vybraneDoplnky.forEach(btn => {
                const cenaDoplnku = parseInt(btn.getAttribute('data-cena') || '0');
                const nazevDoplnku = btn.getAttribute('data-nazev');
                celkovaCena += cenaDoplnku;
                polozkyVypisu.push(`${nazevDoplnku} (${cenaDoplnku} Kč)`);
            });

            const zastavkaOdNazev = zastavky[zastavkaOd]?.nazev || '?';
            const zastavkaDoNazev = zastavky[zastavkaDo]?.nazev || '?';

            // Souhrn jízdenky pro řidiče (zjednodušený "tisk" přes alert).
            alert(
                `--- JÍZDENKA PID ---\n` +
                `Trasa: ${zastavkaOdNazev} → ${zastavkaDoNazev}\n` +
                `Počet pásem: ${pocetPasem}\n\n` +
                `Položky:\n- ${polozkyVypisu.join('\n- ')}\n` +
                `---------------------\n` +
                `CELKEM K ÚHRADĚ: ${celkovaCena} Kč`
            );

            // Jízdenku uložíme do localStorage, aby ji zobrazil validator (jiné okno).
            const ticketData = {
                zastavkaOd: zastavkaOdNazev,
                zastavkaDo: zastavkaDoNazev,
                pocetPasem,
                cena: celkovaCena,
                typJizdneho: vybranyTypJizdneho ? vybranyTypJizdneho.getAttribute('data-nazev') : null,
                doplnky: vybraneDoplnky.map(btn => btn.getAttribute('data-nazev')),
                polozkyVypisu,
                cas: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            };
            localStorage.setItem('currentTicket', JSON.stringify(ticketData));

            resetOdbaveni();
        };
    }
}

// ------------------------------------------------------------
// SYNCHRONIZACE S DISPLEJEM CESTUJÍCÍHO
// ------------------------------------------------------------

// Uloží aktuální stav displeje do localStorage.
// JSON.stringify převede objekt na text, protože localStorage umí ukládat jen text.
// Okno displeje cestujícího si stav přečte (viz stranky/displej-cestujici.ts).
function syncDisplayState(): void {
    try {
        const state = {
            cisloLinky: displejCestujici.getCisloLinky(),
            aktualniZastavka: displejCestujici.getAktualniZastavka(),
            seznamZastavek: displejCestujici.getSeznamZastavek(),
            aktualniCas: displejCestujici.getAktualniCas().toISOString(),
            predpokladanyCas: displejCestujici.getPredpokladanyCas().toISOString(),
        };
        localStorage.setItem('displejState', JSON.stringify(state));
    } catch (e) {
        console.warn('Chyba při exportu stavu displeje:', e);
    }
}

// ------------------------------------------------------------
// SPUŠTĚNÍ STRÁNKY
// ------------------------------------------------------------

// DOMContentLoaded se spustí, jakmile je HTML načtené a prvky existují.
document.addEventListener('DOMContentLoaded', () => {
    renderZastavky();
    setupLogoutAndClock();
    setupNavigaci();
    setupTickets();
    syncDisplayState();

    // Každou sekundu aktualizujeme časy na displeji cestujícího.
    setInterval(() => {
        const now = new Date();
        displejCestujici.setAktualniCas(now);
        // Předpokládaný příjezd je zjednodušeně nastaven na 5 minut od teď.
        displejCestujici.setPredpokladanyCas(new Date(now.getTime() + 5 * 60 * 1000));
        syncDisplayState();
    }, 1000);
});
