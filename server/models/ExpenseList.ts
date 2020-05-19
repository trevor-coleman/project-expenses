import Expense from '../classes/expenses/Expense';
import ExpenseFactory, { ExpenseInterface, ExpenseSchema, ExpenseType } from '../classes/expenses/ExpenseFactory';
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

    public makeSchema(expense: ExpenseType): ExpenseSchema {
        return ExpenseFactory.makeSchema(expense);
    }

    public async findExpensesByProjectId(projectId: string): Promise<Expense[] | null>  {
        const db = await this.db;
        let collection: string = this.collectionName();
        const filter = {projectId: projectId}
    console.log("find by projectID:", filter)

        const found = await db
            .collection(collection)
            .find(filter).sort('date', -1);
        const foundArray: Expense[] = await found.map(this.make).toArray();


    if (foundArray.length >0) {
        return foundArray;
    }


    return null;
}
}