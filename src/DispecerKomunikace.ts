// ============================================================
// TŘÍDA: DispecerKomunikace
// ------------------------------------------------------------
// Simuluje spojení mezi autobusem a dispečinkem.
// Ukládá historii zpráv a hlídá sílu signálu.
// Chatové rozhraní řeší samostatný skript stranky/dispecer-komunikace.ts.
// ============================================================

import { PalubniZarizeni } from "./PalubniZarizeni.js";

// Potomek třídy PalubniZarizeni, reprezentující dispečerskou komunikaci.
class DispecerKomunikace extends PalubniZarizeni {

    // Atributy specifické pro dispečerskou komunikaci.
    private historieZprav: string[];
    private silaSignalu: number;

    // Konstruktor: volá konstruktor rodiče (super) a nastaví specifické atributy.
    constructor(id: number, nazev: string, jeAktivni: boolean, historieZprav: string[], silaSignalu: number) {
        super(id, nazev, jeAktivni);
        this.historieZprav = historieZprav;
        this.silaSignalu = silaSignalu;
    }

    // Příjem zprávy od dispečera - uloží ji do historie s označením směru.
    // push() přidá nový prvek na konec pole.
    public prijemZprav(zprava: string): void {
        this.historieZprav.push('[Příjem]' + zprava);
    }

    // Odeslání zprávy dispečerovi - uloží ji do historie s označením směru.
    public odeslaniZprav(zprava: string): void {
        this.historieZprav.push('[Odeslání]' + zprava);
    }

    // Kontrola síly signálu: vrací true, pokud je signál silnější než 50 %.
    public kontrolaSignalu(): boolean {
        return this.silaSignalu > 50;
    }

    // Implementace abstraktní metody zobrazInfo - výpis stavu do konzole.
    public zobrazInfo(): void {
        console.log('Historie zpráv: ' + this.historieZprav.join(', '));
        console.log('Síla signálu: ' + this.silaSignalu + '%');
    }

    // ---------- Gettery: bezpečné čtení soukromých hodnot zvenčí ----------

    public getHistorieZprav(): string[] {
        return this.historieZprav;
    }

    public getSilaSignalu(): number {
        return this.silaSignalu;
    }
}

// Export: umožňuje třídu importovat v jiných souborech.
export { DispecerKomunikace };
