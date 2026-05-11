"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalubniZarizeni = void 0;
// Abstraktní třída - nelze z ní vytvořit objekt přímo, slouží jako základ pro potomky
class PalubniZarizeni {
    // Constructor - zavolá se automaticky při vytvoření objektu, nastaví atributy
    constructor(id, nazev, jeAktivni) {
        this.id = id;
        this.nazev = nazev;
        this.jeAktivni = jeAktivni;
    }
    // Zapne zařízení - nastaví jeAktivni na true
    aktivuj() {
        this.jeAktivni = true;
    }
    // Vypne zařízení - nastaví jeAktivni na false
    deaktivuj() {
        this.jeAktivni = false;
    }
}
exports.PalubniZarizeni = PalubniZarizeni;
