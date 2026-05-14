//seznam zatávek s jejich pásmy
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
export { zastavky, linky, cenik };
