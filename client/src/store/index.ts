import { action, observable } from 'mobx';
import { DatabaseIdType } from '../../../classes';
import { Project } from '../../../classes/Schema';
import axios from 'axios'

class Store {
    @observable project: Project | {} = {};

    @action setProject(_id: DatabaseIdType){
        axios.get(`/api/project/${_id}`).then(
            ({data})=>{
                Object.assign(this.project, data)
            }
        )
    }


}

const store = new Store()

export default store;