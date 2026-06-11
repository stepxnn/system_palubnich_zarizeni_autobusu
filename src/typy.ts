// ============================================================
// SDÍLENÉ TYPY
// ------------------------------------------------------------
// Datové typy a malé třídy, které používá více souborů projektu
// (jízdenka, typy dokladů, platební karta).
// ============================================================

// Základní typ pro jízdenku
// Interface (Rozhraní): Definuje strukturu objektu bez implementace. 
// Je to "smlouva", která říká, že jízdenka musí mít určité vlastnosti.
// Otazník (cena?) znamená, že vlastnost je volitelná.
export interface Jizdenka {
    id: number;
    destinace?: string;
    cena?: number;
}

// Jednotlivé typy dokladů pro validaci
// Enum (Výčet): Definuje pojmenované konstanty. 
// Místo čísel 0, 1, 2 používáme srozumitelné názvy. To zabraňuje chybám, 
// protože TypeScript hlídá, abys nepoužil jinou hodnotu než tu z výčtu.
enum TypDokladu {
    LITACKA_KUPON,
    APLIKACE_JIZDENKA,
    APLIKACE_KUPON,
    PLATEBNI_KARTA
}

// Třída reprezentující platební kartu jako samostatný objekt.
class PlatebniKarta {
    private id: number;
    private majitel: string;
    private platnost: Date;
    private zustatek: number;

    // Constructor pro inicializaci atributů platební karty
    constructor(id: number, majitel: string, platnost: Date, zustatek: number) {
        this.id = id;
        this.majitel = majitel;
        this.platnost = platnost;
        this.zustatek = zustatek;
    }
    // Metoda pro stržení částky z karty, vrací true pokud je stržení úspěšné, jinak false

    // Logická metoda se stavovým výsledkem (boolean): 
    // Logická metoda: Zkontroluje, zda je na kartě dostatek peněz.
    // Pokud ano, odečte je a potvrdí operaci (true).
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