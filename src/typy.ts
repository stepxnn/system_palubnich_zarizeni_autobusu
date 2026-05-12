// Základní typ pro jízdenku
export interface Jizdenka {
    id: number;
    destinace?: string;
    cena?: number;
}

// Jednotlivé typy dokladů pro validaci
enum TypDokladu {
    LITACKA_KUPON,
    APLIKACE_JIZDENKA,
    APLIKACE_KUPON,
    PLATEBNI_KARTA
}

class PlatebniKarta {
    id: number;
    majitel: string;
    platnost: Date;
    zustatek: number;

    // Constructor pro inicializaci atributů platební karty
    constructor(id: number, majitel: string, platnost: Date, zustatek: number) {
        this.id = id;
        this.majitel = majitel;
        this.platnost = platnost;
        this.zustatek = zustatek;
    }
    // Metoda pro stržení částky z karty, vrací true pokud je stržení úspěšné, jinak false
    strhniCastku(castka: number): boolean {
        if (this.zustatek >= castka) {
            this.zustatek -= castka;
            return true;
        }
        return false;
    }
}

// Exportujeme TypDokladu a PlatebniKarta, aby ho mohly používat jiné soubory, například Validator.ts
export { TypDokladu, PlatebniKarta };