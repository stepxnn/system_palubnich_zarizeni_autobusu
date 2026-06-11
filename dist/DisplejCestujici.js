// ============================================================
// TŘÍDA: Displejcestujici
// ------------------------------------------------------------
// Model vnitřního displeje pro cestující. Drží informace o aktuální
// zastávce, seznamu zastávek, čísle linky a časech.
// Vykreslování do HTML řeší samostatný skript stranky/displej-cestujici.ts.
// ============================================================
import { PalubniZarizeni } from './PalubniZarizeni.js';
// Dědičnost (Inheritance): Třída Displejcestujici rozšiřuje (extends) základní PalubniZarizeni.
// Přebírá tak ID, název a metody aktivuj/deaktivuj.
class Displejcestujici extends PalubniZarizeni {
    // Konstruktor: super() volá konstruktor rodičovské třídy (PalubniZarizeni).
    constructor(id, nazev, jeAktivni, aktualniZastavka, seznamZastavek, cisloLinky, aktualniCas, predpokladanyCas) {
        super(id, nazev, jeAktivni);
        this.aktualniZastavka = aktualniZastavka;
        this.seznamZastavek = seznamZastavek;
        this.cisloLinky = cisloLinky;
        this.aktualniCas = aktualniCas;
        this.predpokladanyCas = predpokladanyCas;
    }
    // Logický posun na další zastávku.
    // Metoda shift() odstraní PRVNÍ prvek pole - pole se tak "posune"
    // a na indexu 0 je nová aktuální zastávka.
    aktualizujZastavku() {
        this.seznamZastavek.shift();
        this.aktualniZastavka = this.seznamZastavek[0];
    }
    // Změna linky: nastaví nové číslo linky, cíl a seznam zastávek.
    // Volá se při přepnutí autobusu na jinou linku.
    zmenLinku(cisloLinky, cil, zastavky) {
        this.cisloLinky = cisloLinky;
        this.aktualniZastavka = cil;
        this.seznamZastavek = zastavky;
    }
    // Implementace povinné abstraktní metody z rodiče - výpis stavu do konzole.
    // .join(', ') spojí pole textů do jednoho řetězce odděleného čárkami.
    zobrazInfo() {
        console.log('Aktuální zastávka: ' + this.aktualniZastavka);
        console.log('Seznam zastávek: ' + this.seznamZastavek.join(', '));
        console.log('Číslo linky: ' + this.cisloLinky);
        console.log('Aktuální čas: ' + this.aktualniCas);
        console.log('Předpokládaný čas příjezdu do následující zastávky: ' + this.predpokladanyCas);
    }
    // ---------- Gettery: bezpečné čtení soukromých hodnot zvenčí ----------
    getCisloLinky() {
        return this.cisloLinky;
    }
    getSeznamZastavek() {
        return this.seznamZastavek;
    }
    getAktualniZastavka() {
        return this.aktualniZastavka;
    }
    getAktualniCas() {
        return this.aktualniCas;
    }
    getPredpokladanyCas() {
        return this.predpokladanyCas;
    }
    // ---------- Settery: kontrolovaná změna soukromých hodnot ----------
    setAktualniCas(d) {
        this.aktualniCas = d;
    }
    setPredpokladanyCas(d) {
        this.predpokladanyCas = d;
    }
    // Nastaví aktuální zastávku podle indexu v seznamu (seznam zůstane netknutý).
    setAktualniZastavkaByIndex(index) {
        // Kontrola mezí pole (bounds check), aby nedošlo k chybě (undefined), pokud index neexistuje.
        if (index >= 0 && index < this.seznamZastavek.length) {
            this.aktualniZastavka = this.seznamZastavek[index];
        }
    }
}
// Export: umožňuje třídu importovat v jiných souborech.
export { Displejcestujici };
