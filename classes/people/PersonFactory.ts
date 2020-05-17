import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { InvalidPropertyError } from '../errors';
import * as Schema from '../Schema';
import Person, { IPerson } from './Person';

export type PersonSchema = Schema.Person;
export type PersonInterface = IPerson;
export type PersonType = Person

export default class PersonFactory {

    static makePerson(personSchema: PersonSchema): PersonType {
        const {_id, name, email, customerOf} = personSchema;

        if (!isEmail(email) || !normalizeEmail(email)) {
            throw new InvalidPropertyError('Invalid contact email address.');
        }
        const normalizedEmail = normalizeEmail(email);

        const customerOfStrings: string[] = customerOf.map((vendorId) => {return vendorId + "";});

        const newPersonData: PersonInterface = {
            _id: _id + "",
            name,
            email: normalizedEmail as string,
            customerOf: customerOfStrings,
        };

        return new Person(newPersonData);
    }

}