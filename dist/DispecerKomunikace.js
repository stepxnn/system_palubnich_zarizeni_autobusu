import { PalubniZarizeni } from "./PalubniZarizeni.js";
// Potomek třídy PalubniZarizeni, reprezentující dispečerskou komunikaci.
class DispecerKomunikace extends PalubniZarizeni {
    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, historieZprav, silaSignalu) {
        super(id, nazev, jeAktivni);
        this.historieZprav = historieZprav;
        this.silaSignalu = silaSignalu;
    }
    // Metoda pro příjem zpráv - měla by být volána, když dispečer obdrží zprávu od řidiče nebo jiného zařízení.
    prijemZprav(zprava) {
        this.historieZprav.push('[Příjem]' + zprava);
    }
    // Metoda pro odesílání zpráv - měla by být volána, když dispečer potřebuje odeslat zprávu řidiči nebo jinému zařízení.
    odeslaniZprav(zprava) {
        this.historieZprav.push('[Odeslání]' + zprava);
    }
    // Metoda pro kontrolu síly signálu - měla by být volána pravidelně, například každou minutu, aby se zajistilo, že dispečerská komunikace funguje správně.
    kontrolaSignalu() {
        return this.silaSignalu > 50; // Příklad podmínky, může být upraveno podle potřeby
    }
    // Implementace abstraktní metody zobrazInfo - vypíše informace o dispečerské komunikaci.
    zobrazInfo() {
        console.log('Historie zpráv: ' + this.historieZprav.join(', '));
        console.log('Síla signálu: ' + this.silaSignalu + '%');
    }
    // Veřejné gettery pro získání hodnot z konzole / testů
    getHistorieZprav() {
        return this.historieZprav;
    }
    getSilaSignalu() {
        return this.silaSignalu;
    }
}
export { DispecerKomunikace };
