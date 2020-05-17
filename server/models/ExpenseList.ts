import ExpenseFactory, { ExpenseSchema, ExpenseInterface, ExpenseType } from '../../classes/expenses/ExpenseFactory'
import ADbList from './ADbList';

export default class ExpenseList extends ADbList<ExpenseType, ExpenseSchema, ExpenseInterface> {
    make(expenseSchema:ExpenseSchema):ExpenseType{
        return ExpenseFactory.makeExpense(expenseSchema);
    }

    public collectionName(): string {
        return 'expenses';
    }

    public validate(suspect: Partial<ExpenseInterface> | Partial<ExpenseSchema> | ExpenseInterface | ExpenseSchema): boolean {
        return false;
    }




    
}