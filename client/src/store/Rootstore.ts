import DataStore from './DataStore'
import UiStore from './UiStore';

export default class RootStore {
    public ui: UiStore;
    public data: DataStore;

    constructor() {
        this.ui =  new UiStore(this);
        this.data =  new DataStore(this);
    }
}

