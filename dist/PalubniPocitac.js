import { ridici } from "./data.js";
class PalubniPocitac {
    constructor(tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace) {
        this.tiskarna = tiskarna;
        this.validator = validator;
        this.displejCestujici = displejCestujici;
        this.vnejsiPanel = vnejsiPanel;
        this.dispecerKomunikace = dispecerKomunikace;
        this.kodRidice = '';
        this.hesloRidice = '';
    }
    vydejJizdenku(jizdenka) {
        this.tiskarna.tiskJizdenku(jizdenka);
    }
    aktualizujZastavku() {
        this.displejCestujici.aktualizujZastavku();
        this.vnejsiPanel.aktualizujZastavku();
    }
    zmenLinku(cislo, smer, zastavky) {
        this.displejCestujici.zmenLinku(cislo, smer, zastavky);
        this.vnejsiPanel.zmenLinku(cislo, smer, zastavky);
    }
    odesliZpravu(zprava) {
        this.dispecerKomunikace.odeslaniZprav(zprava);
    }
    prihlasRidice(kod, heslo) {
        const ridic = ridici.find(r => r.kod === kod && r.heslo === heslo);
        return ridic !== undefined;
    }
    zobrazinfo() {
        this.tiskarna.zobrazInfo();
        this.displejCestujici.zobrazInfo();
        this.vnejsiPanel.zobrazInfo();
        this.dispecerKomunikace.zobrazInfo();
        this.validator.zobrazInfo();
    }
}
export { PalubniPocitac };
