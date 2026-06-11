// ============================================================
// TŘÍDA: PalubniZarizeni (společný předek všech zařízení)
// ============================================================
// Abstraktní třída (Abstract Class): Slouží jako šablona nebo společný základ pro ostatní zařízení.
// Nelze vytvořit instanci přímo (např. new PalubniZarizeni()), musí se z ní vždy dědit.
class PalubniZarizeni {
    // Konstruktor: Spouští se při vytváření instance (new ...). 
    // Inicializuje základní vlastnosti, které má každé palubní zařízení (ID, název, stav).
    constructor(id, nazev, jeAktivni) {
        this.id = id;
        this.nazev = nazev;
        this.jeAktivni = jeAktivni;
    }
    // Veřejná metoda pro aktivaci zařízení.
    aktivuj() {
        this.jeAktivni = true;
    }
    // Veřejná metoda pro deaktivaci zařízení.
    deaktivuj() {
        this.jeAktivni = false;
    }
}
// Export: Umožňuje tuto třídu importovat v jiných souborech pomocí 'import'.
export { PalubniZarizeni };
