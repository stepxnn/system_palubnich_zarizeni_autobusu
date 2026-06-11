// ============================================================
// TŘÍDA: Validator
// ------------------------------------------------------------
// Model validatoru u dveří - ověřuje doklady a počítá odbavené cestující.
// Obrazovku validatoru řeší samostatný skript stranky/validator.ts.
// ============================================================

import { TypDokladu, PlatebniKarta } from "./typy.js";
import { PalubniZarizeni } from "./PalubniZarizeni.js";

// Potomek třídy PalubniZarizeni, reprezentující validator pro odbavení cestujících.
class Validator extends PalubniZarizeni {

    // Atributy specifické pro validator.
    private pocetOdbavenych: number;
    private posledniOdbaveni: Date;

    // Konstruktor: volá konstruktor rodiče (super) a nastaví specifické atributy.
    constructor(id: number, nazev: string, jeAktivni: boolean, pocetOdbavenych: number, posledniOdbaveni: Date) {
        super(id, nazev, jeAktivni);
        this.pocetOdbavenych = pocetOdbavenych;
        this.posledniOdbaveni = posledniOdbaveni;
    }

    // Validace dokladu: pomocí logického operátoru || (NEBO) ověří,
    // že typ dokladu je jeden z podporovaných. Výsledek podmínky je
    // rovnou boolean, takže ho můžeme vrátit bez if/else.
    public overiDoklad(typ: TypDokladu): boolean {
        return typ === TypDokladu.LITACKA_KUPON
            || typ === TypDokladu.APLIKACE_JIZDENKA
            || typ === TypDokladu.APLIKACE_KUPON
            || typ === TypDokladu.PLATEBNI_KARTA;
    }

    // Delegování platby: validator sám peníze nestrhává,
    // požádá o to objekt PlatebniKarta (metoda strhniCastku).
    public zpracujPlatbu(karta: PlatebniKarta, castka: number): boolean {
        return karta.strhniCastku(castka);
    }

    // Odbavení hotovostí: zvýší počítadlo o 1 (inkrementace ++) a uloží aktuální čas.
    public odbavHotovosti(): void {
        this.pocetOdbavenych++;
        this.posledniOdbaveni = new Date();
    }

    // Implementace abstraktní metody zobrazInfo - výpis stavu do konzole.
    public zobrazInfo(): void {
        console.log('Počet odbavených cestujících: ' + this.pocetOdbavenych);
        console.log('Poslední odbavení: ' + this.posledniOdbaveni);
    }

    // ---------- Gettery: bezpečné čtení soukromých hodnot zvenčí ----------

    public getPocetOdbavenych(): number {
        return this.pocetOdbavenych;
    }

    public getPosledniOdbaveni(): Date {
        return this.posledniOdbaveni;
    }
}

// Export: umožňuje třídu importovat v jiných souborech.
export { Validator };
