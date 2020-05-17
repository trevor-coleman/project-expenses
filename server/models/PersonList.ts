import PersonFactory, { PersonSchema, PersonInterface, PersonType } from '../../classes/people/PersonFactory'
import ADbList from './ADbList';

export default class PersonList extends ADbList<PersonType, PersonSchema, PersonInterface> {
    make(personSchema:PersonSchema):PersonType{
        return PersonFactory.makePerson(personSchema);
    }

    public collectionName(): string {
        return 'people';
    }

}