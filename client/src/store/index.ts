import Dinero from 'dinero.js';
import { action, IObservableArray, observable, ObservableSet } from 'mobx';
import { DatabaseIdType } from '../classes';
import Expense from '../classes/expenses/Expense';
import Project from '../classes/projects/Project';
import * as Schema from '../classes/Schema'
import axios from 'axios'

class Store {
    @observable project: Project | {} = {};
    @observable expenses: IObservableArray<Schema.Expense> = observable([]);

    @action setProject(projectId: DatabaseIdType){
        axios.get(`/api/project/${projectId}`).then(
            ({data})=>{
                Object.assign(this.project, data)
            }
        )

        this.getExpenses(projectId);
    }

    @action private getExpenses(projectId: DatabaseIdType) {
        axios.get(`/api/${projectId}/expenses`).then(
            ({data})=>{
                this.expenses.replace(data);
            }


        )

    }

    makeExpense(expenseSchema: Schema.Expense) : Expense {
        const {_id, userId, projectId, description, vendor, amount, hst} = expenseSchema;

        const newExpenseData: Expense = {
            _id: _id + "",
            userId: userId + "",
            projectId: projectId + "",
            description,
            vendor,
            amount: Dinero(amount),
            hst: Dinero(hst),
        };

        return newExpenseData;




    }
}

const store = new Store()

export default store;