// Displej cestujícího - zobrazuje informace o aktuální zastávce, seznamu zastávek, čísle linky, aktuálním čase, pásmu a předpokládaném čase příjezdu do následující zastávky.
import { PalubniZarizeni } from './PalubniPocitac.js';
// Potomek třídy PalubniZarizeni, reprezentující displej pro cestujícího.
class Displejcestujici extends PalubniZarizeni {
    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id, nazev, jeAktivni, aktualniZastavka, seznamZastavek, cisloLinky, aktualniCas, aktualniPasmo, seznamPasem, predpokladanyCas) {
        super(id, nazev, jeAktivni);
        this.aktualniZastavka = aktualniZastavka;
        this.seznamZastavek = seznamZastavek;
        this.cisloLinky = cisloLinky;
        this.aktualniCas = aktualniCas;
        this.aktualniPasmo = aktualniPasmo;
        this.seznamPasem = seznamPasem;
        this.predpokladanyCas = predpokladanyCas;
    }
    // Metody pro aktualizaci informací na displeji - tyto metody by měly být volány při změně zastávky, linky, času nebo pásma.
    aktualizujZastavku() {
        this.seznamZastavek.shift();
        this.aktualniZastavka = this.seznamZastavek[0];
    }
    // Metoda pro aktualizaci čísla linky - měla by být volána při změně linky autobusu.
    zmenLinku(cisloLinky, cil) {
        this.cisloLinky = cisloLinky;
        this.aktualniZastavka = cil;
    }
    // Metoda pro aktualizaci času - měla by být volána pravidelně, například každou minutu, aby se aktualizoval aktuální čas a předpokládaný čas příjezdu do následující zastávky.
    aktualizujPredpokladanyCas() {
        return this.predpokladanyCas;
    }
    // Metoda pro aktualizaci času - měla by být volána pravidelně, například každou minutu, aby se aktualizoval aktuální čas a předpokládaný čas příjezdu do následující zastávky.
    aktualizujPasmo() {
        return this.aktualniPasmo;
    }
    // Implementace abstraktní metody zobrazInfo - vypíše informace o displeji pro cestujícího.
    zobrazInfo() {
        console.log('Aktuální zastávka: ' + this.aktualniZastavka);
        console.log('Seznam zastávek: ' + this.seznamZastavek.join(', '));
        console.log('Číslo linky: ' + this.cisloLinky);
        console.log('Aktuální čas: ' + this.aktualniCas);
        console.log('Aktuální pásmo: ' + this.aktualniPasmo);
        console.log('Seznam pásem: ' + this.seznamPasem.join(', '));
        console.log('Předpokládaný čas příjezdu do následující zastávky: ' + this.predpokladanyCas);
    }
    // Veřejné gettery pro získání hodnot z konzole / testů
    getCisloLinky() {
        return this.cisloLinky;
    }
    getSeznamZastavek() {
        return this.seznamZastavek;
    }
    getSeznamPasem() {
        return this.seznamPasem;
    }
}
// export třídy, aby ji mohly používat jiné soubory
export { Displejcestujici };
