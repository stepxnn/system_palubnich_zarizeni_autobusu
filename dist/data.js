// ============================================================
// STATICKÁ DATA
// ------------------------------------------------------------
// Data nahrazující databázi: řidiči, zastávky, linky, ceník a slevy.
// V reálné aplikaci by podobné údaje přicházely z databáze nebo API.
// ============================================================
// Seznam řidičů pro přihlášení (kód + heslo + jméno).
const ridici = [
    { kod: '1111', heslo: '8689', jmeno: 'Štěpán Němeček' },
    { kod: '2222', heslo: '8691', jmeno: 'Jan Novák' },
];
// Seznam zastávek s jejich tarifními pásmy.
// Každý prvek pole je objekt s názvem zastávky a číslem pásma.
const zastavky = [
    { nazev: "Kutná Hora,aut.st.", pasmo: 7 },
    { nazev: "Kutná Hora,Žižkov,u hřbitova", pasmo: 7 },
    { nazev: "Miskovice,Hořany", pasmo: 6 },
    { nazev: "Červené Pečky,Čertovka", pasmo: 6 },
    { nazev: "Červené Pečky,Dolany", pasmo: 6 },
    { nazev: "Červené Pečky,škola", pasmo: 6 },
    { nazev: "Červené Pečky,nám.", pasmo: 6 },
    { nazev: "Červené Pečky,Amálka", pasmo: 6 },
    { nazev: "Červené Pečky,Dobešovice", pasmo: 6 },
    { nazev: "Červené Pečky,žel.st.", pasmo: 6 },
    { nazev: "Polepy", pasmo: 6 },
    { nazev: "Kolín,nemocnice", pasmo: 6 },
    { nazev: "Kolín,Bezovka", pasmo: 6 },
    { nazev: "Kolín,Družstevní dům", pasmo: 6 },
    { nazev: "Kolín,U Červených", pasmo: 6 },
    { nazev: "Kolín,nádraží", pasmo: 6 }
];
// Pole objektů reprezentující linky. Každá linka má své číslo, směr a seznam zastávek.
// Pořadí zastávek v poli určuje směr jízdy.
const linky = [
    {
        cislo: 705,
        smer: 'Kolín, nádraží',
        zastavky: ['Kutná Hora,aut.st.', 'Kutná Hora,Žižkov,u hřbitova', 'Miskovice,Hořany', 'Červené Pečky,Čertovka', 'Červené Pečky,Dolany', 'Červené Pečky,škola', 'Červené Pečky,nám.', 'Červené Pečky,Amálka', 'Červené Pečky,Dobešovice', 'Červené Pečky,žel.st.', 'Polepy', 'Kolín,nemocnice', 'Kolín,Bezovka', 'Kolín,Družstevní dům', 'Kolín,U Červených', 'Kolín,nádraží']
    },
    {
        cislo: 705,
        smer: 'Kutná Hora, aut.st.',
        zastavky: ['Kolín,nádraží', 'Kolín,U Červených', 'Kolín,Družstevní dům', 'Kolín,Bezovka', 'Kolín,nemocnice', 'Polepy', 'Červené Pečky,žel.st.', 'Červené Pečky,Dobešovice', 'Červené Pečky,Amálka', 'Červené Pečky,nám.', 'Červené Pečky,Dolany', 'Červené Pečky,Čertovka', 'Miskovice,Hořany', 'Kutná Hora,Žižkov,u hřbitova', 'Kutná Hora,aut.st.']
    }
];
// Ceník definovaný jako pole objektů. V kódu se pak dá snadno najít cena podle počtu pásem.
// pocetPasem znamená, přes kolik tarifních pásem cestující jede.
const cenik = [
    { pocetPasem: 1, cena: 12 },
    { pocetPasem: 2, cena: 24 },
    { pocetPasem: 3, cena: 36 },
    { pocetPasem: 4, cena: 48 },
    { pocetPasem: 5, cena: 60 },
    { pocetPasem: 6, cena: 72 },
    { pocetPasem: 7, cena: 84 },
    { pocetPasem: 8, cena: 96 },
    { pocetPasem: 9, cena: 108 },
    { pocetPasem: 10, cena: 120 },
];
// Koeficienty slev pro jednotlivé typy jízdenek (1.0 = plná cena, 0.5 = polovina, 0.0 = zdarma)
const koeficientyTypu = {
    'dospeli': 1.0,
    'senior': 0.5,
    'student': 0.5,
    'junior': 0.5,
    'dite6-14': 0.5,
    'dite': 0.0,
    'ztp-p': 0.0,
    'ztp': 0.5
};
// Exportovaný seznam umožní ostatním souborům použít stejná data přes import.
export { zastavky, linky, cenik, ridici, koeficientyTypu };
