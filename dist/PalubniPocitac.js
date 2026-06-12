// ============================================================
// TŘÍDA: PalubniPocitac
// ------------------------------------------------------------
// Funguje jako tzv. Mediator (prostředník): místo aby UI komunikovalo
// s každým zařízením zvlášť, komunikuje jen s palubním počítačem,
// který požadavky rozesílá dál správným zařízením.
// ============================================================
import { ridici } from "./data.js";
class PalubniPocitac {
    // Dependency Injection (vstřikování závislostí): počítač dostává hotové
    // instance zařízení v konstruktoru - sám si je nevytváří.
    constructor(validator, displejCestujici, dispecerKomunikace) {
        this.validator = validator;
        this.displejCestujici = displejCestujici;
        this.dispecerKomunikace = dispecerKomunikace;
    }
    // Přijme objekt jízdenky a předá ho tiskárně.
    // Palubní počítač neřeší detaily tisku, jen požadavek deleguje.
    vydejJizdenku(jizdenka) {
    }
    // Posun zastávky musí vidět vnitřní displej i vnější panel autobusu.
    aktualizujZastavku() {
        this.displejCestujici.aktualizujZastavku();
    }
    // Změna linky aktualizuje číslo linky, směr a seznam zastávek
    // ve všech zobrazovacích zařízeních najednou.
    zmenLinku(cislo, smer, zastavky) {
        this.displejCestujici.zmenLinku(cislo, smer, zastavky);
    }
    // Komunikaci s dispečerem zprostředkuje třída DispecerKomunikace.
    odesliZpravu(zprava) {
        this.dispecerKomunikace.odeslaniZprav(zprava);
    }
    // Ověření řidiče v lokálních datech (data.ts).
    // find() vrátí první záznam splňující podmínku, nebo undefined, když nic nenajde.
    prihlasRidice(kod, heslo) {
        const ridic = ridici.find(r => r.kod === kod && r.heslo === heslo);
        return ridic !== undefined;
    }
    // Pomocná metoda: vypíše stav všech zařízení do konzole.
    zobrazInfo() {
        this.displejCestujici.zobrazInfo();
        this.dispecerKomunikace.zobrazInfo();
        this.validator.zobrazInfo();
    }
}
// Export: umožňuje třídu importovat v jiných souborech.
export { PalubniPocitac };
