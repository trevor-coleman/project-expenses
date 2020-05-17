import { CAD } from '../CAD';
import Transfer, { ITransfer } from './Transfer';
import * as Schema from '../Schema'

export type TransferSchema = Schema.Transfer;
export type TransferInterface = ITransfer;
export type TransferType = Transfer

export default class TransferFactory {

    static makeTransfer(transferSchema: TransferSchema): TransferType  {
        const {_id, userId, date, taxType, amount,fromAccount,toAccount} = transferSchema;

        const newTransferData: TransferInterface = {_id: _id+"", userId: userId+"", date: new Date(date), taxType, amount: new CAD(amount),fromAccount,toAccount};

        return new Transfer(newTransferData);
    }


}