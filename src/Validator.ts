import { TypDokladu, PlatebniKarta } from "./typy.js";
import { PalubniZarizeni } from "./PalubniZarizeni.js";

// Potomek třídy PalubniZarizeni, reprezentující validator pro odbavení cestujících.
class Validator extends PalubniZarizeni {

    // Atributy specifické pro Validator
    private pocetOdbavenych: number;
    private posledniOdbaveni: Date

    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id: number, nazev: string, jeAktivni: boolean, pocetOdbavenych: number, posledniOdbaveni: Date) {
        super(id, nazev, jeAktivni);
        this.pocetOdbavenych = pocetOdbavenych;
        this.posledniOdbaveni = posledniOdbaveni;
    }

    public overiDoklad(typ: TypDokladu): boolean {
        if  (typ === TypDokladu.LITACKA_KUPON || typ === TypDokladu.APLIKACE_JIZDENKA || typ === TypDokladu.APLIKACE_KUPON || typ === TypDokladu.PLATEBNI_KARTA) {
            return true;
        }
        return false;

    }

    public zpracujPlatbu(karta: PlatebniKarta, castka: number): boolean {
        return karta.strhniCastku(castka);
    }

    public odbavHotovosti(): void {
        this.pocetOdbavenych++; 
        this.posledniOdbaveni = new Date();
    }

    public zobrazInfo(): void {
        console.log('Počet odbavených cestujících: ' + this.pocetOdbavenych);
        console.log('Poslední odbavení: ' + this.posledniOdbaveni);
    }
    
    // Veřejné gettery pro získání hodnot z konzole / testů
    public getPocetOdbavenych(): number {
        return this.pocetOdbavenych;
    }

    public getPosledniOdbaveni(): Date {
        return this.posledniOdbaveni;
    }
}

export { Validator };