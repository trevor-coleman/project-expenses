import * as Schema from '../Schema';
import Transfer, { ITransfer } from './Transfer';
import Dinero from 'dinero.js';

export type TransferSchema = Schema.Transfer;
export type TransferInterface = ITransfer;
export type TransferType = Transfer

export default class TransferFactory {

    static makeTransfer(transferSchema: TransferSchema): TransferType {
        const {_id, userId, date, taxType, amount, fromAccount, toAccount} = transferSchema;

        const newTransferData: TransferInterface = {
            _id: _id + "",
            userId: userId + "",
            date: new Date(date),
            taxType,
            amount: Dinero({amount: amount, currency:"CAD"}),
            fromAccount,
            toAccount,
        };

        return new Transfer(newTransferData);
    }

}