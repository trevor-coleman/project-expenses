import TransferFactory, { TransferSchema, TransferInterface, TransferType } from '../../classes/transfers/TransferFactory';
import ADbList from './ADbList';

export default class TransferList extends ADbList<TransferType, TransferSchema, TransferInterface> {
    make(transferSchema:TransferSchema):TransferType{
        return TransferFactory.makeTransfer(transferSchema);
    }

    public collectionName(): string {
        return 'transfers';
    }
}