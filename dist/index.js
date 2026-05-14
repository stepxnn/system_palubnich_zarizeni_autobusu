// Tento soubor slouží jako hlavní vstupní bod pro aplikaci, kde jsou importovány třídy TiskarnaJizdenek, Validator a Displejcestujici, a jsou vytvořeny jejich instance. Tyto instance jsou pak přidány do globálního objektu window, aby byly přístupné z konzole pro testování a zobrazení informací. Také je zde definována funkce zobrazinfo, která umožňuje zobrazit informace o všech třech zařízeních v konzoli po jejím zavolání.
import { TiskarnaJizdenek } from './TiskarnaJizdenek.js';
import { Validator } from './Validator.js';
import { Displejcestujici } from './DisplejCestujici.js';
import { VnejsiPanel } from './VnejsiPanel.js';
import { DispecerKomunikace } from './DispecerKomunikace.js';
// Vytvoření instancí TiskarnaJizdenek a Validator, které budou použity pro zobrazení informací v konzoli.
const tiskarna = new TiskarnaJizdenek(1, 'Tiskárna', true, 100, 0);
const validator = new Validator(2, 'Validator', true, 0, new Date());
const displejCestujici = new Displejcestujici(3, 'Displej cestujícího', true, 'Nádraží', ['Nádraží', 'Hlavní nádraží', 'Městská stanice'], 1, new Date(), 1, ['Pásmo 1', 'Pásmo 2'], new Date());
const vnejsiPanel = new VnejsiPanel(4, 'Vnější panel', true, 1, 'Nádraží', ['Nádraží', 'Hlavní nádraží', 'Městská stanice']);
const dispecerKomunikace = new DispecerKomunikace(5, 'Dispečer komunikace', true, [], 80);
// Přidání instancí tiskárny, validatoru a displeje cestujícího do globálního objektu window, aby byly přístupné z konzole pro testování a zobrazení informací.
window.tiskarna = tiskarna;
window.validator = validator;
window.displejCestujici = displejCestujici;
window.vnejsiPanel = vnejsiPanel;
window.dispecerKomunikace = dispecerKomunikace;
// Přidání funkce zobrazinfo do globálního objektu window, která umožní zobrazení informací o tiskárně jízdenek v konzoli po jejím zavolání.
window.zobrazinfo = () => {
    tiskarna.zobrazInfo();
    validator.zobrazInfo();
    displejCestujici.zobrazInfo();
    vnejsiPanel.zobrazInfo();
    dispecerKomunikace.zobrazInfo();
};
export { TiskarnaJizdenek, Validator, Displejcestujici, VnejsiPanel, DispecerKomunikace };
