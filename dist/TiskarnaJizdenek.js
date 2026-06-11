// ============================================================
// TŘÍDA: TiskarnaJizdenek
// ------------------------------------------------------------
// Model tiskárny jízdenek - hlídá zásobu papíru a počítá výtisky.
// ============================================================
// Import třídy PalubniZarizeni, protože TiskarnaJizdenek je její potomek.
import { PalubniZarizeni } from './PalubniZarizeni.js';
// Potomek třídy PalubniZarizeni, reprezentující tiskárnu jízdenek.
class TiskarnaJizdenek extends PalubniZarizeni {
    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, zbyvajiciPapir, pocetVytisteno) {
        super(id, nazev, jeAktivni); // Volá konstruktor rodiče pro nastavení společných atributů.
        this.zbyvajiciPapir = zbyvajiciPapir;
        this.pocetVytisteno = pocetVytisteno;
    }
    // Tisk jízdenky: pokud došel papír, vrátí false (tisk se nepovedl).
    // Jinak zvýší počítadlo vytištěných jízdenek, ubere papír a vrátí true.
    tiskJizdenku(jizdenka) {
        if (this.zbyvajiciPapir <= 0) {
            return false;
        }
        this.pocetVytisteno++;
        this.zbyvajiciPapir--;
        return true;
    }
    // Vrací true, když zbývá 20 % papíru nebo méně (čas na výměnu role).
    // Výsledek porovnání je rovnou boolean, takže není potřeba if/else.
    dochaziPapir() {
        return this.zbyvajiciPapir <= 20;
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
