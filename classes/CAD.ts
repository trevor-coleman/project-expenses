import { Currencies, Money } from 'ts-money';

export class CAD extends Money {
    constructor(amount: number) {super(amount, Currencies.CAD);}

}