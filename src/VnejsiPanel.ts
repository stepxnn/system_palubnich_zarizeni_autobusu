// Import třídy PalubniZarizeni, protože VnejsiPanel je její potomek.
import { PalubniZarizeni } from "./PalubniZarizeni.js";

// Potomek třídy PalubniZarizeni, reprezentující vnější panel pro cestující.
class VnejsiPanel extends PalubniZarizeni {

    // Atributy specifické pro vnější panel
    private cisloLinky: number;
    private cilovaZastavka: string;
    private meziZastavky: string[];

    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id: number, nazev: string, jeAktivni: boolean, cisloLinky: number, cilovaZastavka: string, meziZastavky: string[]) {
        super(id, nazev, jeAktivni);
        this.cisloLinky = cisloLinky;
        this.cilovaZastavka = cilovaZastavka;
        this.meziZastavky = meziZastavky;
    }

    // Metoda pro aktualizaci zastávky - musí být volána, když vozidlo odjíždí ze zastávky.
    public aktualizujZastavku(): void {
        this.meziZastavky.shift();
    }

    // Metoda pro změnu linky - aktualizuje číslo linky, cílovou zastávku a mezi zastávky.
    public zmenLinku(cislo: number, cil: string, meziZastavky: string[]): void {
        this.cisloLinky = cislo;
        this.cilovaZastavka = cil;
        this.meziZastavky = meziZastavky;
    }

    // Implementace abstraktní metody zobrazInfo - vypíše informace o vnějším panelu pro cestující.
    public zobrazInfo(): void {
        console.log('Číslo linky: ' + this.cisloLinky);
        console.log('Cílová zastávka: ' + this.cilovaZastavka);
        console.log('Mezi zastávky: ' + this.meziZastavky.join(', '));
    }
    
    // Veřejné gettery pro získání hodnot z konzole / testů
    public getCisloLinky(): number {
        return this.cisloLinky;
    }

    public getCilovaZastavka(): string {
        return this.cilovaZastavka;
    }

    public getMeziZastavky(): string[] {
        return this.meziZastavky;
    }
}

export { VnejsiPanel };