import axios, { AxiosResponse } from 'axios';
import { action, IObservableArray, observable } from 'mobx';
import { DatabaseIdType } from '../classes';
import Database from '../classes/database';
import Expense from '../classes/expenses/Expense';
import ExpenseFactory, { ExpenseSchema } from '../classes/expenses/ExpenseFactory';
import Dinero from '../classes/MyDinero';
import Project from '../classes/projects/Project';
import ProjectFactory from '../classes/projects/ProjectFactory';
import * as Schema from '../classes/Schema';
import RootStore from './Rootstore';

const userId = '5ec1d99c73b4e52eeab42346';

type EmptyProject = { name: 'No Project'; _id: ''; incomeTaxRate:number }

type newExpenseData = {
    date: moment.Moment; amount: Dinero.Dinero; vendor: string; hst: Dinero.Dinero; description: string
}

export default class DataStore {
    @observable projects: IObservableArray<Project> = observable([]);
    @observable project: Project | EmptyProject = { name: 'No Project', _id: '', incomeTaxRate:0 };
    @observable expenses: IObservableArray<Expense> = observable([]);

    @observable totals = {
        totalExpenses: Dinero({amount: 0}),
        totalHstPaid: Dinero({amount: 0}),
        totalCollected: Dinero({amount: 0}),
        totalHstCollected: Dinero({amount: 0}),
        totalRevenue: Dinero({amount: 0}),
        expensesWithoutHst: Dinero({amount: 0}),
        totalProfit: Dinero({amount: 0}),
        hstRemittance: Dinero({amount: 0}),
        incomeTax: Dinero({amount: 0}),
    };

    private readonly rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.getProjects('5ec1d99c73b4e52eeab42346');
    }

    @action setProject = async (projectId: DatabaseIdType) => {

        if (projectId.toString() === this.project._id.toString()) {
            return;
        }

        const {ui} = this.rootStore;
        ui.viewType.root = 'default';
        ui.setProjectLoaded(false);

        axios.get(`/api/project/${projectId}`).then(({data})=>this.handleRecieveProject(data));
        this.getExpenses(projectId);
        this.getTotals(projectId);
    };

    @action handleRecieveProject(projectSchema: Schema.Project) {
        const {ui} = this.rootStore;
        const project = ProjectFactory.makeProject(projectSchema);
        Object.assign(this.project, project);
        ui.viewType.root = 'project';
        ui.setProjectLoaded(true);
    }

    @action getProjects = async (userId: DatabaseIdType = '5ec1d99c73b4e52eeab42346') => {
        axios.get(`/api/${userId.toString()}/projects`).then((response) => {
            {
                this.projects.replace(response.data);
                return response.data;
            }
        });
    };

    @action public submitNewExpense(expenseFormData: newExpenseData): void {
        const project = this.project as Project;

        const newExpenseSchema: ExpenseSchema = {
            _id: Database.makeId(),
            date: expenseFormData.date.toISOString(),
            amount: expenseFormData.amount.toObject(),
            description: expenseFormData.description,
            hst: expenseFormData.hst.toObject(),
            projectId: project._id,
            userId: userId,
            vendor: expenseFormData.vendor,
        };

        axios.post('/api/expense', newExpenseSchema).then(({data}) => this.getExpenses(data.projectId));

    }

    @action
    private getExpenses(projectId: DatabaseIdType) {

        axios.get(`/api/project/${projectId}/expenses`)
             .then((response: AxiosResponse<Schema.Expense[]>) => {
                 if (response.data) {
                     this.expenses.replace(response.data.map(ExpenseFactory.makeExpense));
                 } else {
                     this.expenses.replace([]);
                 }
             });

    }

    @action private getTotals(projectId: DatabaseIdType): void {
        axios.get(`/api/project/${projectId}/totals`).then(({data}) => {

            const {expenses, orders} = data;


            const totalExpenses = Dinero({amount: expenses.amount});
            const totalHstPaid = Dinero({amount: expenses.hst});
            const totalCollected = Dinero({amount: orders.amount});
            const totalHstCollected = Dinero({amount: orders.hst});

            const totalRevenue: Dinero.Dinero = totalCollected.subtract(totalHstCollected);
            const expensesWithoutHst: Dinero.Dinero = totalExpenses.subtract(totalHstPaid);
            const totalProfit: Dinero.Dinero = totalRevenue.subtract(expensesWithoutHst);
            const hstRemittance: Dinero.Dinero = totalHstCollected.subtract(totalHstPaid);
            const incomeTax: Dinero.Dinero = totalRevenue.multiply(0.2);

            this.totals.totalRevenue = totalRevenue;
            this.totals.totalExpenses = totalExpenses;
            this.totals.expensesWithoutHst = expensesWithoutHst;
            this.totals.totalHstPaid = totalHstCollected;
            this.totals.totalCollected = totalCollected;
            this.totals.totalHstCollected = totalHstCollected;
            this.totals.totalProfit = totalProfit;
            this.totals.hstRemittance = hstRemittance;
            this.totals.incomeTax = incomeTax;

        })
    }
}
