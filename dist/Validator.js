// ============================================================
// TŘÍDA: Validator
// ------------------------------------------------------------
// Model validatoru u dveří - ověřuje doklady a počítá odbavené cestující.
// Obrazovku validatoru řeší samostatný skript stranky/validator.ts.
// ============================================================
import { TypDokladu } from "./typy.js";
import { PalubniZarizeni } from "./PalubniZarizeni.js";
// Potomek třídy PalubniZarizeni, reprezentující validator pro odbavení cestujících.
class Validator extends PalubniZarizeni {
    // Konstruktor: volá konstruktor rodiče (super) a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, pocetOdbavenych, posledniOdbaveni) {
        super(id, nazev, jeAktivni);
        this.pocetOdbavenych = pocetOdbavenych;
        this.posledniOdbaveni = posledniOdbaveni;
    }
    // Validace dokladu: pomocí logického operátoru || (NEBO) ověří,
    // že typ dokladu je jeden z podporovaných. Výsledek podmínky je
    // rovnou boolean, takže ho můžeme vrátit bez if/else.
    overiDoklad(typ) {
        return typ === TypDokladu.LITACKA_KUPON
            || typ === TypDokladu.APLIKACE_JIZDENKA
            || typ === TypDokladu.APLIKACE_KUPON
            || typ === TypDokladu.PLATEBNI_KARTA;
    }
    // Delegování platby: validator sám peníze nestrhává,
    // požádá o to objekt PlatebniKarta (metoda strhniCastku).
    zpracujPlatbu(karta, castka) {
        return karta.strhniCastku(castka);
    }
    // Odbavení hotovostí: zvýší počítadlo o 1 (inkrementace ++) a uloží aktuální čas.
    odbavHotovosti() {
        this.pocetOdbavenych++;
        this.posledniOdbaveni = new Date();
    }
    // Implementace abstraktní metody zobrazInfo - výpis stavu do konzole.
    zobrazInfo() {
        console.log('Počet odbavených cestujících: ' + this.pocetOdbavenych);
        console.log('Poslední odbavení: ' + this.posledniOdbaveni);
    }
    // ---------- Gettery: bezpečné čtení soukromých hodnot zvenčí ----------
    getPocetOdbavenych() {
        return this.pocetOdbavenych;
    }
    getPosledniOdbaveni() {
        return this.posledniOdbaveni;
    }
}
// Export: umožňuje třídu importovat v jiných souborech.
export { Validator };
