// Abstraktní třída - nelze z ní vytvořit objekt přímo, slouží jako základ pro potomky
abstract class PalubniZarizeni {
    
    // Atributy - každé zařízení má id, název a informaci jestli je aktivní
    private id: number;
    private nazev: string;
    private jeAktivni: boolean;

    // Constructor - zavolá se automaticky při vytvoření objektu, nastaví atributy
    constructor(id: number, nazev: string, jeAktivni: boolean) {
        this.id = id;
        this.nazev = nazev;
        this.jeAktivni = jeAktivni;
    }

    // Zapne zařízení - nastaví jeAktivni na true
    public aktivuj(): void {
        this.jeAktivni = true;
    }

    // Vypne zařízení - nastaví jeAktivni na false
    public deaktivuj(): void {
        this.jeAktivni = false;
    }

    // Abstraktní metoda - každý potomek ji musí implementovat sám
    public abstract zobrazInfo(): void;
}