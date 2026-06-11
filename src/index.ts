// ============================================================
// STRÁNKA: index.html (přihlašovací obrazovka)
// ------------------------------------------------------------
// Hlavní vstupní bod aplikace. Sestaví palubní systém a obsluhuje
// přihlašovací formulář řidiče. Po úspěšném přihlášení přesměruje
// na panel řidiče (panel-ridice.html).
// ============================================================

import { vytvorPalubniSystem } from './sestaveniSystemu.js';

// Vytvoření všech zařízení na jednom místě (viz sestaveniSystemu.ts).
// Destrukturalizace: z vráceného objektu si vybalíme jednotlivé proměnné.
const { tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace, palubniPocitac } = vytvorPalubniSystem();

// Debugování přes konzoli prohlížeče: instance přidáme do globálního objektu window.
// (window as any) říká TypeScriptu: "Vím, co dělám, dovol mi tam přidat tuhle vlastnost."
(window as any).tiskarna = tiskarna;
(window as any).validator = validator;
(window as any).displejCestujici = displejCestujici;
(window as any).vnejsiPanel = vnejsiPanel;
(window as any).dispecerKomunikace = dispecerKomunikace;
(window as any).palubniPocitac = palubniPocitac;

// Rozšíření typu Window, aby TypeScript znal naši pomocnou funkci zobrazinfo.
declare global {
    interface Window {
        zobrazinfo: () => void;
    }
}

// Zavoláním zobrazinfo() v konzoli se vypíše stav všech zařízení.
// Výpis deleguje na palubní počítač, který obejde všechna zařízení.
window.zobrazinfo = () => palubniPocitac.zobrazInfo();

// Připojí obsluhu přihlášení: najde tlačítko, načte inputy a zavolá prihlasRidice.
function setupLogin(): void {
    // DOM manipulace: hledáme HTML elementy na stránce podle jejich ID.
    const loginBtn = document.getElementById('login-btn');
    if (!loginBtn) return;

    // Skryjeme chybovou hlášku při načtení stránky.
    const initialError = document.getElementById('error-msg');
    if (initialError) initialError.style.display = 'none';

    // Event Listener (posluchač událostí): čeká, až uživatel klikne na tlačítko.
    loginBtn.addEventListener('click', (ev: Event) => {
        ev.preventDefault(); // Zamezí obnovení stránky (výchozí chování formuláře).

        // Přetypování (casting): říkáme, že element je vstupní pole
        // (HTMLInputElement), abychom mohli číst jeho .value.
        const usernameEl = document.getElementById('username') as HTMLInputElement | null;
        const passwordEl = document.getElementById('password') as HTMLInputElement | null;

        const username = usernameEl ? usernameEl.value.trim() : ''; // .trim() odstraní mezery na krajích
        const password = passwordEl ? passwordEl.value : '';

        try {
            // Ověření kódu a hesla deleguje palubní počítač (hledá v data.ts).
            const ok = palubniPocitac.prihlasRidice(username, password);
            if (ok) {
                // Úspěch: přesměrování na panel řidiče.
                window.location.href = 'panel-ridice.html';
            } else {
                // Neúspěch: zobrazení chybové hlášky změnou CSS stylu.
                const errorMsg = document.getElementById('error-msg');
                if (errorMsg) errorMsg.style.display = 'block';
            }
        } catch (err) {
            console.error('Chyba při přihlášení:', err);
        }
    });
}

// DOMContentLoaded zajistí, že se skript spustí až po načtení celého HTML.
document.addEventListener('DOMContentLoaded', setupLogin);
