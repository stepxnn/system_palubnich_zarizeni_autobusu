class Validator extends PalubniZarizeni {
    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, pocetOdbavenych, posledniOdbaveni) {
        super(id, nazev, jeAktivni);
        this.pocetOdbavenych = pocetOdbavenych;
        this.posledniOdbaveni = posledniOdbaveni;
    }
    overiDoklad(typ) {
    }
    zpracujPlatbu(karta, castka) {
    }
    odbavHotovosti() {
    }
    zobrazInfo() {
    }
}
