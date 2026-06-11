// ============================================================
// STRÁNKA: dispecer-komunikace.html
// ------------------------------------------------------------
// Jednoduchý "chat" mezi řidičem a dispečinkem.
// Zprávy se ukládají do objektu DispecerKomunikace (pole historieZprav).
// Stránka běží samostatně, proto si vytváří vlastní instanci třídy.
// ============================================================

import { DispecerKomunikace } from '../DispecerKomunikace.js';

// Jediná instance dispečerské komunikace pro tuto stránku.
const dispecer = new DispecerKomunikace(999, 'Dispečer (lokální)', true, [], 80);

// Překreslí celou historii zpráv do chatového okna.
function renderHistory(): void {
    const body = document.getElementById('chat-body');
    if (!body) return;

    body.innerHTML = '';
    dispecer.getHistorieZprav().forEach((msg: string) => {
        // Každá zpráva je samostatný <div> se CSS třídou pro vzhled bubliny.
        const div = document.createElement('div');
        div.className = 'msg in';
        div.textContent = msg;
        body.appendChild(div);
    });

    // Posune chat dolů na nejnovější zprávu.
    body.scrollTop = body.scrollHeight;
}

// Aktualizuje text a barvu ukazatele síly signálu.
function updateSignal(): void {
    const el = document.getElementById('signal');
    if (!el) return;

    const sila = dispecer.getSilaSignalu();
    el.textContent = 'Síla signálu: ' + sila + '%';
    // Zelená = dobrý signál (nad 50 %), červená = slabý signál.
    el.style.color = sila > 50 ? '#15803d' : '#b91c1c';
}

// Spuštění po načtení HTML stránky.
document.addEventListener('DOMContentLoaded', () => {
    const back = document.getElementById('back-btn');
    const send = document.getElementById('send-btn');
    const msgInput = document.getElementById('msg-input') as HTMLInputElement | null;

    // Tlačítko Zpět vrátí řidiče na hlavní panel.
    back?.addEventListener('click', () => {
        window.location.href = 'panel-ridice.html';
    });

    // Odeslání zprávy: text z inputu uložíme do historie a chat překreslíme.
    send?.addEventListener('click', () => {
        const text = msgInput?.value.trim() || '';
        if (!text) return; // prázdné zprávy neodesíláme

        dispecer.odeslaniZprav(text);
        if (msgInput) msgInput.value = '';
        renderHistory();
    });

    // První vykreslení při otevření stránky.
    renderHistory();
    updateSignal();

    // Sílu signálu kontrolujeme jednou za minutu.
    setInterval(updateSignal, 60 * 1000);
});
