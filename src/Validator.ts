class Validator extends PalubniZarizeni {

    // Atributy specifické pro Validator
    private pocetOdbavenych: number;
    private posledniOdbaveni: Date

    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id: number, nazev: string, jeAktivni: boolean, pocetOdbavenych: number, posledniOdbaveni: Date) {
        super(id, nazev, jeAktivni);
        this.pocetOdbavenych = pocetOdbavenych;
        this.posledniOdbaveni = posledniOdbaveni;
    }

    public overiDoklad(typ: TypDokladu): boolean {

    }

    public zpracujPlatbu(karta: PlatebniKarta, castka: number): boolean {

    }

    public odbavHotovosti(): void {

    }

    public zobrazInfo(): void {
        
    }
}