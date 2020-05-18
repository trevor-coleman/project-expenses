import { action, IObservableObject, observable } from 'mobx';
import RootStore from './Rootstore';

export type ViewType = { root: "default" | "project" }

export default class UiStore {
    private readonly rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable public projectInspector = observable({
        projectLoaded: false
})

    @observable viewType: ViewType & IObservableObject = observable({root: "default"});

    @action public setProjectLoaded(newState: boolean): void {
        this.projectInspector.projectLoaded = newState;
    }
}

