// Import třídy PalubniZarizeni, protože TiskarnaJizdenek je její potomek.
import { PalubniZarizeni } from './PalubniPocitac.js';
// Potomek třídy PalubniZarizeni, reprezentující tiskárnu jízdenek.
class TiskarnaJizdenek extends PalubniZarizeni {
    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, zbyvajiciPapir, pocetVytisteno) {
        super(id, nazev, jeAktivni); // Volá konstruktor rodiče pro nastavení společných atributů.
        this.zbyvajiciPapir = zbyvajiciPapir;
        this.pocetVytisteno = pocetVytisteno;
    }
    // Metoda pro tisk jízdenky - zkontroluje dostatek papíru a aktualizuje počet vytisknutých jízdenek a zbývající papír.
    tiskJizdenku(jizdenka) {
        if (this.zbyvajiciPapir <= 0) {
            return false;
        }
        this.pocetVytisteno++;
        this.zbyvajiciPapir--;
        return true;
    }
    // Metoda pro tisk jízdenky - zkontroluje dostatek papíru.
    dochaziPapir() {
        if (this.zbyvajiciPapir > 20) {
            return true;
        }
        return false;
    }
    // Implementace abstraktní metody zobrazInfo - vypíše informace o tiskárně jízdenek.
    zobrazInfo() {
        console.log('Počet Vytisknutých jízdenek: ' + this.pocetVytisteno);
        console.log('Zbývající papír: ' + this.zbyvajiciPapir + '%');
    }
    // Veřejné gettery pro získání hodnot z konzole / testů
    getPocetVytisteno() {
        return this.pocetVytisteno;
    }
    getZbyvajiciPapir() {
        return this.zbyvajiciPapir;
    }
}
// export třídy, aby ji mohly používat jiné soubory
export { TiskarnaJizdenek };
