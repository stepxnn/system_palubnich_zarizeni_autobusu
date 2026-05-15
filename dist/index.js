// Tento soubor slouží jako hlavní vstupní bod pro aplikaci, kde jsou importovány třídy TiskarnaJizdenek, Validator a Displejcestujici, a jsou vytvořeny jejich instance. Tyto instance jsou pak přidány do globálního objektu window, aby byly přístupné z konzole pro testování a zobrazení informací. Také je zde definována funkce zobrazinfo, která umožňuje zobrazit informace o všech třech zařízeních v konzoli po jejím zavolání.
import { TiskarnaJizdenek } from './TiskarnaJizdenek.js';
import { Validator } from './Validator.js';
import { Displejcestujici } from './DisplejCestujici.js';
import { VnejsiPanel } from './VnejsiPanel.js';
import { DispecerKomunikace } from './DispecerKomunikace.js';
import { PalubniPocitac } from './PalubniPocitac.js';
import { linky } from './data.js';
// Vytvoření instancí tiskárny jízdenek, validatoru a displeje pro cestujícího s příslušnými parametry. Tyto instance reprezentují zařízení používaná v systému veřejné dopravy a jsou připraveny k použití pro zobrazení informací a testování funkcionality.
const tiskarna = new TiskarnaJizdenek(1, 'Tiskárna', true, 100, 0);
const validator = new Validator(2, 'Validator', true, 0, new Date());
const linka = linky[0]; // Předpokládáme, že chceme použít první linku z dat pro zobrazení informací na displeji cestujícího.
const displejCestujici = new Displejcestujici(3, 'Displej cestující', true, linka.zastavky[0], linka.zastavky, linka.cislo, new Date(), 1, ['P6', 'P7'], new Date());
const vnejsiPanel = new VnejsiPanel(4, 'Vnější panel', true, linka.cislo, linka.smer, linka.zastavky);
const dispecerKomunikace = new DispecerKomunikace(5, 'Dispečer komunikace', true, [], 80);
const palubniPocitac = new PalubniPocitac(tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace);
// Přidání instancí tiskárny, validatoru a displeje cestujícího do globálního objektu window, aby byly přístupné z konzole pro testování a zobrazení informací.
window.tiskarna = tiskarna;
window.validator = validator;
window.displejCestujici = displejCestujici;
window.vnejsiPanel = vnejsiPanel;
window.dispecerKomunikace = dispecerKomunikace;
window.palubniPocitac = palubniPocitac;
// Přidání funkce zobrazinfo do globálního objektu window, která umožní zobrazení informací o tiskárně jízdenek v konzoli po jejím zavolání.
window.zobrazinfo = () => {
    tiskarna.zobrazInfo();
    validator.zobrazInfo();
    displejCestujici.zobrazInfo();
    vnejsiPanel.zobrazInfo();
    dispecerKomunikace.zobrazInfo();
};
export { TiskarnaJizdenek, Validator, Displejcestujici, VnejsiPanel, DispecerKomunikace };
