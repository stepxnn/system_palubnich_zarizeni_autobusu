import { TiskarnaJizdenek } from './TiskarnaJizdenek.js';

const tiskarna = new TiskarnaJizdenek(1, 'Tiskárna', true, 100, 0);

(window as any).tiskarna = tiskarna;

declare global {
    interface Window {
        zobrazinfo: () => void;
    }
}

window.zobrazinfo = () => {
    tiskarna.zobrazInfo();
};

