import axios, { AxiosResponse } from 'axios';
import { action, IObservableArray, observable } from 'mobx';
import { DatabaseIdType } from '../classes';
import Expense from '../classes/expenses/Expense';
import ExpenseFactory from '../classes/expenses/ExpenseFactory';
import Project from '../classes/projects/Project';
import ProjectFactory from '../classes/projects/ProjectFactory';
import * as Schema from '../classes/Schema';
import RootStore from './Rootstore';

type EmptyProject = {name:"No Project"}

export default class DataStore {
    private readonly rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.getProjects('5ec1d99c73b4e52eeab42346')
    }

    @observable projects: IObservableArray<Project> = observable([]);
    @observable project: Project | EmptyProject  = {name: "No Project"};
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

    @action getProjects = (userId: DatabaseIdType) => {
        axios.get(`/api/${userId.toString()}/projects`).then((response) => {
            {this.projects.replace(response.data)}
        });
    };

    private getExpenses(projectId: DatabaseIdType) {

        axios.get(`/api/${projectId}/expenses`)
             .then(
                 (response:AxiosResponse<Schema.Expense[]>)=>
                 {
                     if(response.data) {
                         this.expenses.replace(response.data.map(ExpenseFactory.makeExpense));
                     } else {
                         this.expenses.replace([]);
                     }
                 }
                 )

    }
}

