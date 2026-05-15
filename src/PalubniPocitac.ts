import { DispecerKomunikace } from "./DispecerKomunikace.js";
import { Displejcestujici } from "./DisplejCestujici.js";
import { TiskarnaJizdenek } from "./TiskarnaJizdenek.js";
import { Validator } from "./Validator.js";
import { VnejsiPanel } from "./VnejsiPanel.js";

class PalubniPocitac {

    private tiskarna: TiskarnaJizdenek;
    private validator: Validator;
    private displejCestujici: Displejcestujici;
    private vnejsiPanel: VnejsiPanel;
    private dispecerKomunikace: DispecerKomunikace;

    constructor(tiskarna: TiskarnaJizdenek, validator: Validator, displejCestujici: Displejcestujici, vnejsiPanel: VnejsiPanel, dispecerKomunikace: DispecerKomunikace) {
        this.tiskarna = tiskarna;
        this.validator = validator;
        this.displejCestujici = displejCestujici;
        this.vnejsiPanel = vnejsiPanel;
        this.dispecerKomunikace = dispecerKomunikace;
    }

    public zmenLinku(cislo: number, smer: string, zastavky: string[]): void {
        this.displejCestujici.zmenLinku(cislo, smer, zastavky);
        this.vnejsiPanel.zmenLinku(cislo, smer, zastavky);
    }
}

export { PalubniPocitac };