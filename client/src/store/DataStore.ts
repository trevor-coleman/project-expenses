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

type EmptyProject = { name: "No Project" }

type newExpenseData = {
    date: moment.Moment; amount: Dinero.Dinero; vendor: string; hst: Dinero.Dinero; description: string
}

export default class DataStore {
    private readonly rootStore: RootStore;
    @observable totals = observable({
        totalAmount: Dinero({amount: 0}), totalHST: Dinero({amount: 0}),
    });

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.getProjects('5ec1d99c73b4e52eeab42346');
    }

    @observable projects: IObservableArray<Project> = observable([]);
    @observable project: Project | EmptyProject = {name: "No Project"};
    @observable expenses: IObservableArray<Expense> = observable([]);


    @action setProject = (projectId: DatabaseIdType) => {
        const {ui} = this.rootStore;
        ui.viewType.root = "default";
        ui.setProjectLoaded(false);


        axios.get(`/api/project/${projectId}`).then(
            ({data}) => {
                this.handleRecieveProject(data);
            },
        );

        this.getExpenses(projectId);
    };

    @action handleRecieveProject(projectSchema: Schema.Project){
        const {ui} = this.rootStore;
        const project = ProjectFactory.makeProject(projectSchema)
        Object.assign(this.project, project);
        ui.viewType.root = "project";
        ui.setProjectLoaded(true);
    }

    @action getProjects = (userId: DatabaseIdType = "5ec1d99c73b4e52eeab42346") => {
        axios.get(`/api/${userId.toString()}/projects`).then((response) => {
            {this.projects.replace(response.data);}
        });
    };

    public submitNewExpense(expenseFormData: newExpenseData): void {
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

        axios.get(`/api/${projectId}/expenses`)
             .then((response: AxiosResponse<Schema.Expense[]>) => {
                     if (response.data) {
                         this.expenses.replace(response.data.map(ExpenseFactory.makeExpense));
                         const totalAmount = Dinero({amount: 0});
                         const totalHST = Dinero({amount: 0});
                         response.data.forEach((expense) => {
                             totalAmount.add(Dinero(expense.amount));
                             totalHST.add(Dinero(expense.hst));
                         });

                         this.totals.totalAmount = totalAmount;
                         this.totals.totalHST = totalHST;

                     } else {
                         this.expenses.replace([]);
                     }
                 }
                 )

    }
}

