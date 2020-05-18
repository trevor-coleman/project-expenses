import { runValidations, Validate } from '@codeallnight/falidator';
import Database from 'database';
import database from 'database';
import * as Schema from '../Schema';
import Expense, { IExpense } from './Expense';
import Dinero from "dinero.js";

export type ExpenseSchema = Schema.Expense;
export type ExpenseInterface = IExpense;
export type ExpenseType = Expense

export default class ExpenseFactory  {

    static makeExpense(expenseSchema: ExpenseSchema): ExpenseType {
        const {_id, userId, projectId, description, vendor, amount, hst} = expenseSchema;

        const newExpenseData: ExpenseInterface = {
            _id: _id + "",
            userId: userId + "",
            projectId: projectId + "",
            description,
            vendor,
            amount: Dinero(amount),
            hst: Dinero(hst),
        };

        return new Expense(newExpenseData);
    }

    public static makeSchema(expense: ExpenseType): ExpenseSchema {
        const {_id, userId, projectId, description, vendor, amount, hst} = expense;

        const expenseSchema: ExpenseSchema = {
            _id: database.makeId(_id),
            userId: database.makeId(userId ? userId : ""),
            projectId: database.makeId(projectId? projectId:""),
            description,
            vendor,
            amount: amount.toObject(),
            hst: hst.toObject(),
        };

        return expenseSchema;
    }

    static validateSchema(expenseSchema:ExpenseSchema) : ExpenseSchema {
        try{
            const {_id, userId, projectId, description, vendor, amount, hst} = expenseSchema;

            Database.validateIds([_id, userId, projectId]);
            [amount, hst].forEach(
                (item)=>{
                    Database.validateMoney(item);
                }
            )
        } catch (e){
            throw new Error(`Schema Failed Validation - ${e}`);
        }



        return expenseSchema;
    }
}