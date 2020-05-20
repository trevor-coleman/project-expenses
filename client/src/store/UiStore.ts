import { action, IObservableObject, observable } from 'mobx';
import RootStore from './Rootstore';

export type ViewType = { root: "default" | "project" }

export default class UiStore {
    private readonly rootStore: RootStore;
    @observable public expensesList = observable({
        addingNewExpense: false,
        editingExpenseList: false,
    });

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable public projectInspector = observable({
        projectLoaded: false,
    });

    @observable viewType: ViewType & IObservableObject = observable({root: 'default'});

    @action
    public setProjectLoaded(newState: boolean): void {
        this.projectInspector.projectLoaded = newState;
    }

    @action setAddingNewExpense(newState: boolean) {
        this.expensesList.addingNewExpense = newState;
    }

    @action
    public setExpenseListEditMode(newState: boolean): any {
        this.expensesList.editingExpenseList = newState;
    }
}

