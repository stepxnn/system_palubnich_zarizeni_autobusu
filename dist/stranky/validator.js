// ============================================================
// STRÁNKA: validator.html
// ------------------------------------------------------------
// Obrazovka validatoru u dveří autobusu.
// Zobrazuje aktuální zastávku, cíl cesty a poslední vydanou jízdenku.
// Stejně jako displej cestujícího čte data z localStorage:
//  - 'displejState'  ... stav linky (ukládá panel řidiče)
//  - 'currentTicket' ... poslední vydaná jízdenka (ukládá panel řidiče)
// ============================================================
// Pomocná funkce: nastaví text elementu podle ID (pokud element existuje).
function setText(id, value) {
    const el = document.getElementById(id);
    if (el)
        el.textContent = value;
}
// Aktualizuje hodiny v horní liště (formát HH:MM).
function updateHeaderTime() {
    setText('aktualni-cas', new Date().toLocaleTimeString('cs-CZ', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }));
}
// Načte z localStorage stav linky a zobrazí aktuální zastávku + cíl cesty.
function updateStopInfo() {
    try {
        const raw = localStorage.getItem('displejState');
        if (!raw)
            return;
        // Stejný stav používá i displej cestujícího, validator nemá vlastní kopii dat.
        const state = JSON.parse(raw);
        if (state.aktualniZastavka) {
            setText('aktualni-zastavka-validator', state.aktualniZastavka);
        }
        // Cíl cesty = poslední zastávka v seznamu.
        if (state.seznamZastavek && state.seznamZastavek.length > 0) {
            setText('cil-cesty', state.seznamZastavek[state.seznamZastavek.length - 1]);
        }
    }
    catch (e) {
        console.warn('Chyba při načítání stavu validatoru:', e);
    }
}
// Načte z localStorage poslední vydanou jízdenku a vypíše její údaje.
// Pokud žádná jízdenka neexistuje, celá sekce se skryje.
function updateTicketInfo() {
    try {
        const raw = localStorage.getItem('currentTicket');
        const ticketSection = document.getElementById('ticket-section');
        if (!raw) {
            if (ticketSection)
                ticketSection.style.display = 'none';
            return;
        }
        const ticket = JSON.parse(raw);
        // || '-' znamená: pokud údaj chybí, zobrazí se pomlčka.
        setText('ticket-from', ticket.zastavkaOd || '-');
        setText('ticket-to', ticket.zastavkaDo || '-');
        setText('ticket-type', ticket.typJizdneho || '-');
        setText('ticket-price', `${ticket.cena} Kč`);
        setText('ticket-time', ticket.cas || '-');
        setText('ticket-zones', String(ticket.pocetPasem || '-'));
        // Doplňky (kolo, kufr...) zobrazíme jen tehdy, když nějaké jsou.
        const addonsContainer = document.getElementById('ticket-addons-container');
        if (ticket.doplnky && ticket.doplnky.length > 0) {
            setText('ticket-addons', ticket.doplnky.join(', '));
            if (addonsContainer)
                addonsContainer.style.display = 'block';
        }
        else if (addonsContainer) {
            addonsContainer.style.display = 'none';
        }
        if (ticketSection)
            ticketSection.style.display = 'block';
    }
    catch (e) {
        console.warn('Chyba při načítání jízdenky:', e);
    }
}
// Hodiny aktualizujeme přesně na začátku každé minuty:
// nejdřív spočítáme, kolik milisekund zbývá do další minuty,
// počkáme (setTimeout) a pak spustíme opakování po minutě (setInterval).
function alignAndSchedule() {
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(() => {
        updateHeaderTime();
        setInterval(updateHeaderTime, 60 * 1000);
    }, msToNextMinute);
}
// Spuštění po načtení HTML stránky.
document.addEventListener('DOMContentLoaded', () => {
    // První vykreslení.
    updateHeaderTime();
    updateStopInfo();
    updateTicketInfo();
    alignAndSchedule();
    // Událost 'storage' přijde, když panel řidiče (jiné okno) změní localStorage.
    window.addEventListener('storage', (ev) => {
        if (ev.key === 'displejState')
            updateStopInfo();
        if (ev.key === 'currentTicket')
            updateTicketInfo();
    });
    // Pojistka: každých 5 sekund zkontrolujeme změny i bez události storage.
    setInterval(() => {
        updateStopInfo();
        updateTicketInfo();
    }, 5000);
});
export {};
