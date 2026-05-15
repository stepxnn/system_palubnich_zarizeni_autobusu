// Displej cestujícího - zobrazuje informace o aktuální zastávce, seznamu zastávek, čísle linky, aktuálním čase, pásmu a předpokládaném čase příjezdu do následující zastávky.
import { PalubniZarizeni } from './PalubniZarizeni.js';

// Potomek třídy PalubniZarizeni, reprezentující displej pro cestujícího.
class Displejcestujici extends PalubniZarizeni {

    private aktualniZastavka: string;
    private seznamZastavek: string[];
    private cisloLinky: number;
    private aktualniCas: Date;
    private aktualniPasmo: number;
    private seznamPasem: string[];
    private predpokladanyCas: Date;

    // Constructor - volá konstruktor rodiče a nastaví specifické atributy.
    constructor(id: number, nazev: string, jeAktivni: boolean, aktualniZastavka: string, seznamZastavek: string[], cisloLinky: number, aktualniCas: Date, aktualniPasmo: number, seznamPasem: string[], predpokladanyCas: Date) {
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
    public aktualizujZastavku(): void {
        this.seznamZastavek.shift();
        this.aktualniZastavka = this.seznamZastavek[0];
    }

    // Metoda pro aktualizaci čísla linky - měla by být volána při změně linky autobusu.
    public zmenLinku(cisloLinky: number, cil: string, zastavky: string[]): void {
        this.cisloLinky = cisloLinky;
        this.aktualniZastavka = cil;
        this.seznamZastavek = zastavky;
    }

    // Metoda pro aktualizaci času - měla by být volána pravidelně, například každou minutu, aby se aktualizoval aktuální čas a předpokládaný čas příjezdu do následující zastávky.
    public aktualizujPredpokladanyCas(): Date {
        return this.predpokladanyCas;
    }

    // Metoda pro aktualizaci času - měla by být volána pravidelně, například každou minutu, aby se aktualizoval aktuální čas a předpokládaný čas příjezdu do následující zastávky.
    public aktualizujPasmo(): number {
        return this.aktualniPasmo;
    }

    // Implementace abstraktní metody zobrazInfo - vypíše informace o displeji pro cestujícího.
    public zobrazInfo(): void {
        console.log('Aktuální zastávka: ' + this.aktualniZastavka);
        console.log('Seznam zastávek: ' + this.seznamZastavek.join(', '));
        console.log('Číslo linky: ' + this.cisloLinky);
        console.log('Aktuální čas: ' + this.aktualniCas);
        console.log('Aktuální pásmo: ' + this.aktualniPasmo);
        console.log('Seznam pásem: ' + this.seznamPasem.join(', '));
        console.log('Předpokládaný čas příjezdu do následující zastávky: ' + this.predpokladanyCas);
    }

    // Veřejné gettery pro získání hodnot z konzole / testů
    public getCisloLinky(): number {
        return this.cisloLinky;
    }

    public getSeznamZastavek(): string[] {
        return this.seznamZastavek;
    }

    public getSeznamPasem(): string[] {
        return this.seznamPasem;
    }
}

// export třídy, aby ji mohly používat jiné soubory
export { Displejcestujici };