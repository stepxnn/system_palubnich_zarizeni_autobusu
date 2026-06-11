// ============================================================
// TŘÍDA: PalubniZarizeni (společný předek všech zařízení)
// ============================================================

// Abstraktní třída (Abstract Class): Slouží jako šablona nebo společný základ pro ostatní zařízení.
// Nelze vytvořit instanci přímo (např. new PalubniZarizeni()), musí se z ní vždy dědit.
abstract class PalubniZarizeni {
    
    // Atributy s modifikátorem 'protected': Jsou viditelné pro tuto třídu a všechny její potomky (dědice),
    // ale nejsou přístupné zvenčí (z jiných částí programu).
    protected id: number;
    protected nazev: string;
    protected jeAktivni: boolean;

    // Konstruktor: Spouští se při vytváření instance (new ...). 
    // Inicializuje základní vlastnosti, které má každé palubní zařízení (ID, název, stav).
    constructor(id: number, nazev: string, jeAktivni: boolean) {
        this.id = id;
        this.nazev = nazev;
        this.jeAktivni = jeAktivni;
    }

    // Veřejná metoda pro aktivaci zařízení.
    public aktivuj(): void {
        this.jeAktivni = true;
    }

    // Veřejná metoda pro deaktivaci zařízení.
    public deaktivuj(): void {
        this.jeAktivni = false;
    }

    // Abstraktní metoda: Definujeme, ŽE každé zařízení musí umět zobrazit info, 
    // ale JAK to udělá, si musí definovat každý potomek sám (vlastní implementace).
    public abstract zobrazInfo(): void;

}

// Export: Umožňuje tuto třídu importovat v jiných souborech pomocí 'import'.
export { PalubniZarizeni };