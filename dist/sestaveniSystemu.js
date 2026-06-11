// ============================================================
// SESTAVENÍ SYSTÉMU
// ------------------------------------------------------------
// Tento soubor obsahuje jedinou funkci, která vytvoří všechna
// palubní zařízení a propojí je s palubním počítačem.
// Dříve byl stejný kód zkopírovaný v index.ts i panel-ridice.ts,
// teď je na jednom místě (zásada DRY - Don't Repeat Yourself).
// ============================================================
import { TiskarnaJizdenek } from './TiskarnaJizdenek.js';
import { Validator } from './Validator.js';
import { Displejcestujici } from './DisplejCestujici.js';
import { VnejsiPanel } from './VnejsiPanel.js';
import { DispecerKomunikace } from './DispecerKomunikace.js';
import { PalubniPocitac } from './PalubniPocitac.js';
import { linky } from './data.js';
// Funkce vytvoří instance všech zařízení a vrátí je v jednom objektu.
// Volající si pak vybere, co potřebuje (tzv. tovární funkce / factory).
export function vytvorPalubniSystem() {
    // Načteme linku zvolenou v nastaveni.html; při prvním spuštění je to linka 0.
    const ulozenyIndex = localStorage.getItem('nastaveniLinkaIndex');
    const linkaIndex = ulozenyIndex !== null ? parseInt(ulozenyIndex, 10) : 0;
    const linka = linky[linkaIndex >= 0 && linkaIndex < linky.length ? linkaIndex : 0];
    // Každé zařízení dostane své ID, název, stav (aktivní) a vlastní parametry.
    const tiskarna = new TiskarnaJizdenek(1, 'Tiskárna', true, 100, 0);
    const validator = new Validator(2, 'Validator', true, 0, new Date());
    const displejCestujici = new Displejcestujici(3, 'Displej cestující', true, linka.zastavky[0], // začínáme na první zastávce linky
    linka.zastavky, linka.cislo, new Date(), new Date());
    const vnejsiPanel = new VnejsiPanel(4, 'Vnější panel', true, linka.cislo, linka.smer, linka.zastavky);
    const dispecerKomunikace = new DispecerKomunikace(5, 'Dispečer komunikace', true, [], 80);
    // Palubní počítač (Mediator/Facade): sdružuje všechna zařízení pod jedno rozhraní.
    const palubniPocitac = new PalubniPocitac(tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace);
    // Vrátíme vše najednou - volající si pomocí destrukturalizace vezme, co chce.
    return { linka, tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace, palubniPocitac };
}
