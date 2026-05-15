class PalubniPocitac {
    constructor(tiskarna, validator, displejCestujici, vnejsiPanel, dispecerKomunikace) {
        this.tiskarna = tiskarna;
        this.validator = validator;
        this.displejCestujici = displejCestujici;
        this.vnejsiPanel = vnejsiPanel;
        this.dispecerKomunikace = dispecerKomunikace;
    }
    zmenLinku(cislo, smer, zastavky) {
        this.displejCestujici.zmenLinku(cislo, smer, zastavky);
        this.vnejsiPanel.zmenLinku(cislo, smer, zastavky);
    }
}
export { PalubniPocitac };
