// Import třídy PalubniZarizeni, protože VnejsiPanel je její potomek.
import { PalubniZarizeni } from "./PalubniPocitac.js";
// Potomek třídy PalubniZarizeni, reprezentující vnější panel pro cestující.
class VnejsiPanel extends PalubniZarizeni {
    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, cisloLinky, cilovaZastavka, meziZastavky) {
        super(id, nazev, jeAktivni);
        this.cisloLinky = cisloLinky;
        this.cilovaZastavka = cilovaZastavka;
        this.meziZastavky = meziZastavky;
    }
    // Metoda pro aktualizaci zastávky - musí být volána, když vozidlo odjíždí ze zastávky.
    aktualizujZastavku() {
        this.meziZastavky.shift();
    }
    // Metoda pro změnu linky - aktualizuje číslo linky, cílovou zastávku a mezi zastávky.
    zmenLinku(cislo, cil) {
        this.cisloLinky = cislo;
        this.cilovaZastavka = cil;
    }
    // Implementace abstraktní metody zobrazInfo - vypíše informace o vnějším panelu pro cestující.
    zobrazInfo() {
        console.log('Číslo linky: ' + this.cisloLinky);
        console.log('Cílová zastávka: ' + this.cilovaZastavka);
        console.log('Mezi zastávky: ' + this.meziZastavky.join(', '));
    }
    // Veřejné gettery pro získání hodnot z konzole / testů
    getCisloLinky() {
        return this.cisloLinky;
    }
    getCilovaZastavka() {
        return this.cilovaZastavka;
    }
    getMeziZastavky() {
        return this.meziZastavky;
    }
}
export { VnejsiPanel };
