import Database from '../database';
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

        const newPersonData: PersonInterface = {
            _id: _id + "",
            name,
            email: this.validateAndNormalizeEmail(email),
            customerOf: Database.stringifyIds(customerOf),
        };

        return new Person(newPersonData);
    }

    public static makeSchema(person: PersonType): PersonSchema {
        const {_id, name, email, customerOf} = person;

        const personSchema: PersonSchema = {
            _id: Database.makeId(_id),
            name,
            email: this.validateAndNormalizeEmail(email),
            customerOf: Database.makeIds(customerOf),
        };

        return personSchema;
    }

    static validateAndNormalizeEmail(email:string){
        if (!isEmail(email) || !normalizeEmail(email)) {
            throw new InvalidPropertyError('Invalid contact email address.');
        }
        const normalizedEmail = normalizeEmail(email);
        return normalizedEmail as string;
    }
}