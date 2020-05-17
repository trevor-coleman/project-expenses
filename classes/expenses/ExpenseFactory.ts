import { runValidations, Validate } from '@codeallnight/falidator';
import database from 'database';
import { AFactory } from '../abstract/AFactory';
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

    public static validate(item: ExpenseSchema):ExpenseSchema {
        const result = runValidations<ExpenseSchema>([
            ExpenseFactory.hasID,
            ExpenseFactory.hasUserId,
            ExpenseFactory.hasProjectId,
            ExpenseFactory.hasDescription
        ], item)

        if(ExpenseFactory.isExpenseSchema(result)) return result;

        throw new Error('invalid Expense Schema' + result);

    }

    static isExpenseSchema (object: any): object is ExpenseSchema {
        return true;
    }

    static hasID: Validate<ExpenseSchema> = (item: ExpenseSchema) =>
    {
        return (
            ('_id' in item)
            && (item._id + "" !== ""))
               ? item
               : {errorMessage: "expense requires _id"};
    };

    static hasUserId: Validate<ExpenseSchema> = (item: ExpenseSchema) => {
        return (
            ('userId' in item)
            && (item.userId + "" !== "")
              ? item
              : {errorMessage: "expense requires userId"})
    };

    static hasProjectId: Validate<ExpenseSchema> = (item: ExpenseSchema) => {
        return (
            ('projectId' in item)
            && (item.projectId + "" !== ""))
               ? item
               : {errorMessage: "expense requires projectId"};
    };

    static hasDescription: Validate<ExpenseSchema> = (item: ExpenseSchema) =>
    {return (
        ('description' in item)
        && (item.description !== "")
        ? item
        : {errorMessage: "item requires description"})
    };


}