import { TypDokladu } from "./typy.js";
import { PalubniZarizeni } from "./PalubniPocitac.js";
class Validator extends PalubniZarizeni {
    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, pocetOdbavenych, posledniOdbaveni) {
        super(id, nazev, jeAktivni);
        this.pocetOdbavenych = pocetOdbavenych;
        this.posledniOdbaveni = posledniOdbaveni;
    }
    overiDoklad(typ) {
        if (typ === TypDokladu.LITACKA_KUPON || typ === TypDokladu.APLIKACE_JIZDENKA || typ === TypDokladu.APLIKACE_KUPON || typ === TypDokladu.PLATEBNI_KARTA) {
            return true;
        }
        return false;
    }
    zpracujPlatbu(karta, castka) {
        return karta.strhniCastku(castka);
    }
    odbavHotovosti() {
        this.pocetOdbavenych++;
        this.posledniOdbaveni = new Date();
    }
    zobrazInfo() {
        console.log('Počet odbavených cestujících: ' + this.pocetOdbavenych);
        console.log('Poslední odbavení: ' + this.posledniOdbaveni);
    }
    // Veřejné gettery pro získání hodnot z konzole / testů
    getPocetOdbavenych() {
        return this.pocetOdbavenych;
    }
    getPosledniOdbaveni() {
        return this.posledniOdbaveni;
    }
}
export { Validator };
