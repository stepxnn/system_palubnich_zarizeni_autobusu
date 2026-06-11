// ============================================================
// STRÁNKA: displej-cestujici.html
// ------------------------------------------------------------
// Skript pro obrazovku displeje uvnitř autobusu (styl PID).
// Nepracuje přímo s třídami zařízení - čte hotový stav z localStorage,
// kam ho ukládá panel řidiče (funkce syncDisplayState v panel-ridice.ts).
// Díky tomu může displej běžet v samostatném okně prohlížeče.
// ============================================================
// Pomocná funkce: bezpečně nastaví text elementu podle jeho ID.
// Pokud hodnota chybí, zobrazí se pomlčka.
function setText(id, value) {
    const el = document.getElementById(id);
    if (el)
        el.textContent = value !== null && value !== void 0 ? value : '—';
}
// Pomocná funkce: převede datum na český čas ve formátu HH:MM.
function formatujCas(datum) {
    return datum.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', hour12: false });
}
// Hlavní funkce: vykreslí celý stav displeje do HTML.
function renderState(state) {
    var _a;
    if (!state)
        return;
    setText('cislo-linky', String(state.cisloLinky));
    // || [] znamená: pokud seznam neexistuje, použij prázdné pole (ochrana proti chybě).
    const stops = state.seznamZastavek || [];
    // Cílová zastávka = poslední prvek seznamu.
    setText('cilovy-nazev', stops.length ? stops[stops.length - 1] : '—');
    setText('aktualni-zastavka-val', state.aktualniZastavka || '—');
    // Seznam nejbližších zastávek (zobrazujeme maximálně 5).
    const list = document.getElementById('seznam-zastavek');
    const moreInd = document.getElementById('more-ind');
    if (list) {
        list.innerHTML = '';
        // Najdeme index aktuální zastávky; když ji nenajdeme, začneme od začátku.
        let idx = stops.indexOf(state.aktualniZastavka);
        if (idx < 0)
            idx = 0;
        const MAX = 5;
        const slice = stops.slice(idx, idx + MAX);
        slice.forEach((s) => {
            const li = document.createElement('li');
            li.textContent = s;
            // Aktuální (příští) zastávka je zvýrazněná tučně.
            if (s === state.aktualniZastavka)
                li.style.fontWeight = 'bold';
            list.appendChild(li);
        });
        // Indikátor "↓ a X dalších", pokud se všechny zastávky nevejdou.
        const remaining = Math.max(0, stops.length - (idx + slice.length));
        if (moreInd) {
            moreInd.style.display = remaining > 0 ? 'block' : 'none';
            moreInd.textContent = `↓ a ${remaining} dalších`;
        }
    }
    // Časy v patičce. ISO text převedeme zpět na Date a naformátujeme.
    setText('aktualni-cas', state.aktualniCas ? formatujCas(new Date(state.aktualniCas)) : '—');
    setText('predpokladany-cas', state.predpokladanyCas ? formatujCas(new Date(state.predpokladanyCas)) : '—');
    setText('aktualni-pasmo', String((_a = state.aktualniPasmo) !== null && _a !== void 0 ? _a : '—'));
    // Tarifní pásma jako malé "štítky" vedle sebe.
    const pasList = document.getElementById('seznam-pasem');
    if (pasList) {
        pasList.innerHTML = '';
        (state.seznamPasem || []).forEach((p) => {
            const li = document.createElement('li');
            li.textContent = p;
            li.className = 'w3-border w3-border-dark-grey w3-round-small w3-white w3-center';
            li.style.padding = '2px 8px';
            li.style.minWidth = '35px';
            pasList.appendChild(li);
        });
    }
}
// Bezpečné načtení stavu z textu (JSON.parse může vyhodit chybu u poškozených dat).
function nactiStav(raw) {
    try {
        renderState(JSON.parse(raw));
    }
    catch (e) {
        console.warn('Neplatný stav displeje', e);
    }
}
// Spuštění po načtení HTML stránky.
document.addEventListener('DOMContentLoaded', () => {
    // 1) Při otevření okna zobrazíme poslední uložený stav.
    const raw = localStorage.getItem('displejState');
    if (raw)
        nactiStav(raw);
    // 2) Událost 'storage' přijde, když JINÉ okno (panel řidiče) změní localStorage.
    //    Díky tomu se displej aktualizuje okamžitě bez obnovování stránky.
    window.addEventListener('storage', (ev) => {
        if (ev.key === 'displejState' && ev.newValue)
            nactiStav(ev.newValue);
    });
    // 3) Hodiny reálného času - aktualizují se každou sekundu i bez změny stavu.
    setInterval(() => setText('aktualni-cas', formatujCas(new Date())), 1000);
});
export {};
