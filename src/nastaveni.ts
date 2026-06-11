// ============================================================
// STRÁNKA: nastaveni.html
// ------------------------------------------------------------
// Umožňuje řidiči vybrat linku a směr jízdy.
// Výběr se ukládá do localStorage pod klíčem 'nastaveniLinkaIndex'
// a při návratu na panel-ridice.html se použije automaticky.
// ============================================================

import { linky } from './data.js';

const STORAGE_KEY = 'nastaveniLinkaIndex';

function nacteniIndexLinky(): number {
    const ulozeno = localStorage.getItem(STORAGE_KEY);
    const index = ulozeno !== null ? parseInt(ulozeno, 10) : 0;
    // Ochrana proti zastaralé hodnotě (např. po smazání linky z dat).
    return index >= 0 && index < linky.length ? index : 0;
}

function renderLinky(aktivniIndex: number): void {
    const list = document.getElementById('linky-list');
    if (!list) return;
    list.innerHTML = '';

    linky.forEach((linka, index) => {
        const prvni = linka.zastavky[0];
        const posledni = linka.zastavky[linka.zastavky.length - 1];

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'linka-karta' + (index === aktivniIndex ? ' aktivni' : '');
        btn.innerHTML = `
            <div class="linka-cislo">${linka.cislo}</div>
            <div class="linka-info">
                <div class="linka-smer">Směr: ${linka.smer}</div>
                <div class="linka-zastávky">${prvni} → ${posledni}</div>
            </div>
            <div class="linka-check">✓</div>
        `;
        btn.onclick = () => vyberLinku(index);
        list.appendChild(btn);
    });
}

function vyberLinku(index: number): void {
    localStorage.setItem(STORAGE_KEY, String(index));
    renderLinky(index);
}

document.addEventListener('DOMContentLoaded', () => {
    const aktivniIndex = nacteniIndexLinky();
    renderLinky(aktivniIndex);

    const zpetBtn = document.getElementById('zpet-btn');
    if (zpetBtn) zpetBtn.onclick = () => { window.location.href = 'panel-ridice.html'; };
});
