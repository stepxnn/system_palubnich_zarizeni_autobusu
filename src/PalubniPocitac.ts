// ============================================================
// TŘÍDA: PalubniPocitac
// ------------------------------------------------------------
// Funguje jako tzv. Mediator (prostředník): místo aby UI komunikovalo
// s každým zařízením zvlášť, komunikuje jen s palubním počítačem,
// který požadavky rozesílá dál správným zařízením.
// ============================================================

import { DispecerKomunikace } from "./DispecerKomunikace.js";
import { Displejcestujici } from "./DisplejCestujici.js";
import { TiskarnaJizdenek } from "./TiskarnaJizdenek.js";
import { Jizdenka } from "./typy.js";
import { Validator } from "./Validator.js";
import { VnejsiPanel } from "./VnejsiPanel.js";
import { ridici } from "./data.js";

class PalubniPocitac {

    // Private atributy: dostupné pouze uvnitř této třídy.
    // Ostatní části aplikace s nimi pracují přes veřejné metody níže.
    private tiskarna: TiskarnaJizdenek;
    private validator: Validator;
    private displejCestujici: Displejcestujici;
    private vnejsiPanel: VnejsiPanel;
    private dispecerKomunikace: DispecerKomunikace;

    // Dependency Injection (vstřikování závislostí): počítač dostává hotové
    // instance zařízení v konstruktoru - sám si je nevytváří.
    constructor(tiskarna: TiskarnaJizdenek, validator: Validator, displejCestujici: Displejcestujici, vnejsiPanel: VnejsiPanel, dispecerKomunikace: DispecerKomunikace) {
        this.tiskarna = tiskarna;
        this.validator = validator;
        this.displejCestujici = displejCestujici;
        this.vnejsiPanel = vnejsiPanel;
        this.dispecerKomunikace = dispecerKomunikace;
    }

    // Přijme objekt jízdenky a předá ho tiskárně.
    // Palubní počítač neřeší detaily tisku, jen požadavek deleguje.
    public vydejJizdenku(jizdenka: Jizdenka): void {
        this.tiskarna.tiskJizdenku(jizdenka);
    }

    // Posun zastávky musí vidět vnitřní displej i vnější panel autobusu.
    public aktualizujZastavku(): void {
        this.displejCestujici.aktualizujZastavku();
        this.vnejsiPanel.aktualizujZastavku();
    }

    // Změna linky aktualizuje číslo linky, směr a seznam zastávek
    // ve všech zobrazovacích zařízeních najednou.
    public zmenLinku(cislo: number, smer: string, zastavky: string[]): void {
        this.displejCestujici.zmenLinku(cislo, smer, zastavky);
        this.vnejsiPanel.zmenLinku(cislo, smer, zastavky);
    }

    // Komunikaci s dispečerem zprostředkuje třída DispecerKomunikace.
    public odesliZpravu(zprava: string): void {
        this.dispecerKomunikace.odeslaniZprav(zprava);
    }

    // Ověření řidiče v lokálních datech (data.ts).
    // find() vrátí první záznam splňující podmínku, nebo undefined, když nic nenajde.
    public prihlasRidice(kod: string, heslo: string): boolean {
        const ridic = ridici.find(r => r.kod === kod && r.heslo === heslo);
        return ridic !== undefined;
    }

    // Pomocná metoda: vypíše stav všech zařízení do konzole.
    public zobrazInfo(): void {
        this.tiskarna.zobrazInfo();
        this.displejCestujici.zobrazInfo();
        this.vnejsiPanel.zobrazInfo();
        this.dispecerKomunikace.zobrazInfo();
        this.validator.zobrazInfo();
    }
}

// Export: umožňuje třídu importovat v jiných souborech.
export { PalubniPocitac };
