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

    // Metoda pro tisk jízdenky - zkontroluje dostatek papíru a aktualizuje počet vytisknutých jízdenek a zbývající papír.
    public tiskJizdenku(jizdenka: Jizdenka): boolean {
        if (this.zbyvajiciPapir <= 0) {
            return false
        }
            this.pocetVytisteno++;
            this.zbyvajiciPapir--;
            return true;
    }

    // Metoda pro tisk jízdenky - zkontroluje dostatek papíru.
    public dochaziPapir(): boolean{
        if (this.zbyvajiciPapir <= 20) {
            return true;
        }
        return false;
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