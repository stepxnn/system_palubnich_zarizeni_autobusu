// ============================================================
// TŘÍDA: TiskarnaJizdenek
// ------------------------------------------------------------
// Model tiskárny jízdenek - hlídá zásobu papíru a počítá výtisky.
// ============================================================

// Import třídy PalubniZarizeni, protože TiskarnaJizdenek je její potomek.
import { PalubniZarizeni } from './PalubniZarizeni.js';
import { Jizdenka } from './typy.js';

// Potomek třídy PalubniZarizeni, reprezentující tiskárnu jízdenek.
class TiskarnaJizdenek extends PalubniZarizeni {

    // Atributy specifické pro tiskárnu jízdenek
    private zbyvajiciPapir: number;
    private pocetVytisteno: number;

    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor (id: number, nazev: string, jeAktivni: boolean, zbyvajiciPapir: number, pocetVytisteno: number) {
        super(id, nazev, jeAktivni); // Volá konstruktor rodiče pro nastavení společných atributů.
        this.zbyvajiciPapir = zbyvajiciPapir;
        this.pocetVytisteno = pocetVytisteno;
    }

    // Tisk jízdenky: pokud došel papír, vrátí false (tisk se nepovedl).
    // Jinak zvýší počítadlo vytištěných jízdenek, ubere papír a vrátí true.
    public tiskJizdenku(jizdenka: Jizdenka): boolean {
        if (this.zbyvajiciPapir <= 0) {
            return false;
        }
        this.pocetVytisteno++;
        this.zbyvajiciPapir--;
        return true;
    }

    // Vrací true, když zbývá 20 % papíru nebo méně (čas na výměnu role).
    // Výsledek porovnání je rovnou boolean, takže není potřeba if/else.
    public dochaziPapir(): boolean {
        return this.zbyvajiciPapir <= 20;
    }
    
    // Implementace abstraktní metody zobrazInfo - vypíše informace o tiskárně jízdenek.
    public zobrazInfo(): void {
        console.log('Počet Vytisknutých jízdenek: ' + this.pocetVytisteno);
        console.log('Zbývající papír: ' + this.zbyvajiciPapir + '%');
    }

    // Veřejné gettery pro získání hodnot z konzole / testů
    public getPocetVytisteno(): number {
        return this.pocetVytisteno;
    }

    public getZbyvajiciPapir(): number {
        return this.zbyvajiciPapir;
    }
}
// export třídy, aby ji mohly používat jiné soubory
export { TiskarnaJizdenek };