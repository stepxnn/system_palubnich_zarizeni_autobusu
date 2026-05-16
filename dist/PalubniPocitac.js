class PalubniPocitac {
    constructor(tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace, kodRidice, hesloRidice) {
        this.tiskarna = tiskarna;
        this.validator = validator;
        this.displejCestujici = displejCestujici;
        this.vnejsiPanel = vnejsiPanel;
        this.dispecerKomunikace = dispecerKomunikace;
        this.kodRidice = kodRidice;
        this.hesloRidice = hesloRidice;
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
        if (this.kodRidice === kod && this.hesloRidice === heslo) {
            return true;
        }
        else {
            return false;
        }
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
