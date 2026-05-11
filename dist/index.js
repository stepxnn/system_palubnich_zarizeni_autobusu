import { TiskarnaJizdenek } from './TiskarnaJizdenek.js';
const tiskarna = new TiskarnaJizdenek(1, 'Tiskárna', true, 100, 0);
window.tiskarna = tiskarna;
window.zobrazinfo = () => {
    tiskarna.zobrazInfo();
};
