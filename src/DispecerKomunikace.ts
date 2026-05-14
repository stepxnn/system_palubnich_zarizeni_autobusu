import { PalubniZarizeni } from "./PalubniPocitac.js";

// Potomek třídy PalubniZarizeni, reprezentující dispečerskou komunikaci.
class DispecerKomunikace extends PalubniZarizeni {

    // Atributy specifické pro dispečerskou komunikaci
    private historieZprav: string[];
    private silaSignalu: number;

    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id: number, nazev: string, jeAktivni: boolean, historieZprav: string[], silaSignalu: number) {
        super(id, nazev, jeAktivni);
        this.historieZprav = historieZprav;
        this.silaSignalu = silaSignalu;
    }

    // Metoda pro příjem zpráv - měla by být volána, když dispečer obdrží zprávu od řidiče nebo jiného zařízení.
    public prijemZprav(zprava: string): void {
        this.historieZprav.push('[Příjem]' + zprava);

    }

    // Metoda pro odesílání zpráv - měla by být volána, když dispečer potřebuje odeslat zprávu řidiči nebo jinému zařízení.
    public odeslaniZprav(zprava: string): void {
        this.historieZprav.push('[Odeslání]' + zprava);
    }

    // Metoda pro kontrolu síly signálu - měla by být volána pravidelně, například každou minutu, aby se zajistilo, že dispečerská komunikace funguje správně.
    public kontrolaSignalu(): boolean {
        return this.silaSignalu > 50; // Příklad podmínky, může být upraveno podle potřeby
    }

    // Implementace abstraktní metody zobrazInfo - vypíše informace o dispečerské komunikaci.
    public zobrazInfo(): void {
        console.log('Historie zpráv: ' + this.historieZprav.join(', '));
        console.log('Síla signálu: ' + this.silaSignalu + '%');
    }

    // Veřejné gettery pro získání hodnot z konzole / testů
    public getHistorieZprav(): string[] {
        return this.historieZprav;
    }

    public getSilaSignalu(): number {
        return this.silaSignalu;
    }
}

export { DispecerKomunikace };