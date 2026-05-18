import { DispecerKomunikace } from "./DispecerKomunikace.js";
import { Displejcestujici } from "./DisplejCestujici.js";
import { TiskarnaJizdenek } from "./TiskarnaJizdenek.js";
import { Jizdenka } from "./typy.js";
import { Validator } from "./Validator.js";
import { VnejsiPanel } from "./VnejsiPanel.js";
import { ridici } from "./data.js";

class PalubniPocitac {

    private tiskarna: TiskarnaJizdenek;
    private validator: Validator;
    private displejCestujici: Displejcestujici;
    private vnejsiPanel: VnejsiPanel;
    private dispecerKomunikace: DispecerKomunikace;
    private kodRidice: string;
    private hesloRidice: string;

    constructor(tiskarna: TiskarnaJizdenek, validator: Validator, displejCestujici: Displejcestujici, vnejsiPanel: VnejsiPanel, dispecerKomunikace: DispecerKomunikace) {
        this.tiskarna = tiskarna;
        this.validator = validator;
        this.displejCestujici = displejCestujici;
        this.vnejsiPanel = vnejsiPanel;
        this.dispecerKomunikace = dispecerKomunikace;
        this.kodRidice = '';
        this.hesloRidice = '';
    }

    public vydejJizdenku (jizdenka: Jizdenka): void {
        this.tiskarna.tiskJizdenku(jizdenka);
    }

    public aktualizujZastavku(): void {
        this.displejCestujici.aktualizujZastavku();
        this.vnejsiPanel.aktualizujZastavku();
    }

    public zmenLinku(cislo: number, smer: string, zastavky: string[]): void {
        this.displejCestujici.zmenLinku(cislo, smer, zastavky);
        this.vnejsiPanel.zmenLinku(cislo, smer, zastavky);
    }

    public odesliZpravu(zprava: string): void {
        this.dispecerKomunikace.odeslaniZprav(zprava);
    }

    public prihlasRidice(kod: string, heslo: string): boolean {
        const ridic = ridici.find(r => r.kod === kod && r.heslo === heslo);
        return ridic !== undefined;
    }

    public zobrazinfo(): void {
        this.tiskarna.zobrazInfo();
        this.displejCestujici.zobrazInfo();
        this.vnejsiPanel.zobrazInfo();
        this.dispecerKomunikace.zobrazInfo();
        this.validator.zobrazInfo();
    }
}

export { PalubniPocitac };