import Dinero, { Dinero as DineroType } from 'dinero.js';

Dinero.defaultCurrency = 'CAD';
Dinero.globalLocale = 'en-CA';

export default Dinero;

export const parseDinero = (valueString: string): DineroType => {
    return Dinero({amount: Math.round(Number(valueString) * 100)});
};