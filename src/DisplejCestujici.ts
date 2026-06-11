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

    // Zapouzdření (Encapsulation): Vlastnosti jsou 'private', takže k nim nelze přistupovat
    // napřímo z jiných souborů. Musí se použít gettery nebo settery níže.
    private aktualniZastavka: string;
    private seznamZastavek: string[];
    private cisloLinky: number;
    private aktualniCas: Date;
    private predpokladanyCas: Date;

    // Konstruktor: super() volá konstruktor rodičovské třídy (PalubniZarizeni).
    constructor(id: number, nazev: string, jeAktivni: boolean, aktualniZastavka: string, seznamZastavek: string[], cisloLinky: number, aktualniCas: Date, predpokladanyCas: Date) {
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
    public aktualizujZastavku(): void {
        this.seznamZastavek.shift();
        this.aktualniZastavka = this.seznamZastavek[0];
    }

    // Změna linky: nastaví nové číslo linky, cíl a seznam zastávek.
    // Volá se při přepnutí autobusu na jinou linku.
    public zmenLinku(cisloLinky: number, cil: string, zastavky: string[]): void {
        this.cisloLinky = cisloLinky;
        this.aktualniZastavka = cil;
        this.seznamZastavek = zastavky;
    }

    // Implementace povinné abstraktní metody z rodiče - výpis stavu do konzole.
    // .join(', ') spojí pole textů do jednoho řetězce odděleného čárkami.
    public zobrazInfo(): void {
        console.log('Aktuální zastávka: ' + this.aktualniZastavka);
        console.log('Seznam zastávek: ' + this.seznamZastavek.join(', '));
        console.log('Číslo linky: ' + this.cisloLinky);
        console.log('Aktuální čas: ' + this.aktualniCas);
        console.log('Předpokládaný čas příjezdu do následující zastávky: ' + this.predpokladanyCas);
    }

    // ---------- Gettery: bezpečné čtení soukromých hodnot zvenčí ----------

    public getCisloLinky(): number {
        return this.cisloLinky;
    }

    public getSeznamZastavek(): string[] {
        return this.seznamZastavek;
    }

    public getAktualniZastavka(): string {
        return this.aktualniZastavka;
    }

    public getAktualniCas(): Date {
        return this.aktualniCas;
    }

    public getPredpokladanyCas(): Date {
        return this.predpokladanyCas;
    }

    // ---------- Settery: kontrolovaná změna soukromých hodnot ----------

    public setAktualniCas(d: Date): void {
        this.aktualniCas = d;
    }

    public setPredpokladanyCas(d: Date): void {
        this.predpokladanyCas = d;
    }

    // Nastaví aktuální zastávku podle indexu v seznamu (seznam zůstane netknutý).
    public setAktualniZastavkaByIndex(index: number): void {
        // Kontrola mezí pole (bounds check), aby nedošlo k chybě (undefined), pokud index neexistuje.
        if (index >= 0 && index < this.seznamZastavek.length) {
            this.aktualniZastavka = this.seznamZastavek[index];
        }
    }
}

// Export: umožňuje třídu importovat v jiných souborech.
export { Displejcestujici };
