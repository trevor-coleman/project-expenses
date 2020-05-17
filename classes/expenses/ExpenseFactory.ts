import { AFactory } from '../abstract/AFactory';
import { CAD } from '../CAD';
import { InvalidOr, Validate } from '../errors';
import Expense, { IExpense } from './Expense';
import * as Schema from '../Schema'

export type ExpenseSchema = Schema.Expense;
export type ExpenseInterface = IExpense;
export type ExpenseType = Expense

export default class ExpenseFactory extends AFactory<ExpenseType, ExpenseSchema, ExpenseInterface> {

    static makeExpense(expenseSchema: ExpenseSchema): ExpenseType  {
        const {_id, userId, projectId, description,vendor, amount, hst} = expenseSchema;

        const newExpenseData: ExpenseInterface = {
            _id: _id+"", userId: userId + "", projectId: projectId + "", description,vendor, amount: new CAD(amount), hst: new CAD(hst)
        };

        return new Expense(newExpenseData);
    }

    public validate(item: ExpenseInterface): InvalidOr<ExpenseInterface> {
        if(item)


    }

    public validateSchema(schema: ExpenseSchema): InvalidOr<ExpenseSchema> {
        return undefined;
    }




}