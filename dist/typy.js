// Jednotlivé typy dokladů pro validaci
var TypDokladu;
(function (TypDokladu) {
    TypDokladu[TypDokladu["LITACKA_KUPON"] = 0] = "LITACKA_KUPON";
    TypDokladu[TypDokladu["APLIKACE_JIZDENKA"] = 1] = "APLIKACE_JIZDENKA";
    TypDokladu[TypDokladu["APLIKACE_KUPON"] = 2] = "APLIKACE_KUPON";
    TypDokladu[TypDokladu["PLATEBNI_KARTA"] = 3] = "PLATEBNI_KARTA";
})(TypDokladu || (TypDokladu = {}));
class PlatebniKarta {
    // Constructor pro inicializaci atributů platební karty
    constructor(id, majitel, platnost, zustatek) {
        this.id = id;
        this.majitel = majitel;
        this.platnost = platnost;
        this.zustatek = zustatek;
    }
    // Metoda pro stržení částky z karty, vrací true pokud je stržení úspěšné, jinak false
    strhniCastku(castka) {
        if (this.zustatek >= castka) {
            this.zustatek -= castka;
            return true;
        }
        return false;
    }
}
// Exportujeme TypDokladu a PlatebniKarta, aby ho mohly používat jiné soubory, například Validator.ts
export { TypDokladu, PlatebniKarta };
