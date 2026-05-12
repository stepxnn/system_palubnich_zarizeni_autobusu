// Importujeme třídy TiskarnaJizdenek a Validator, které jsou definovány v samostatných souborech, aby mohly být použity v tomto hlavním souboru pro zobrazení informací o těchto zařízeních.
import { TiskarnaJizdenek } from './TiskarnaJizdenek.js';
import { Validator } from './Validator.js';
// Vytvoření instancí TiskarnaJizdenek a Validator, které budou použity pro zobrazení informací v konzoli.
const tiskarna = new TiskarnaJizdenek(1, 'Tiskárna', true, 100, 0);
const validator = new Validator(2, 'Validator', true, 0, new Date());
// Přidání instancí do globálního objektu window, aby byly přístupné z konzole pro testování a zobrazení informací.
window.tiskarna = tiskarna;
window.validator = validator;
// Přidání funkce zobrazinfo do globálního objektu window, která umožní zobrazení informací o tiskárně jízdenek v konzoli po jejím zavolání.
window.zobrazinfo = () => {
    tiskarna.zobrazInfo();
    validator.zobrazInfo();
};
export { TiskarnaJizdenek, Validator };
