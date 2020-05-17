import { InvalidOr } from '../errors';

export abstract class AFactory<Item, ItemSchema, ItemInterface> {
    abstract validate(item: ItemInterface): InvalidOr<ItemInterface>;
    abstract validate(partialItem:Partial<ItemInterface>):InvalidOr<Partial<ItemInterface>>;

    abstract validateSchema(schema: ItemSchema): InvalidOr<ItemSchema>;
    abstract validateSchema(partialSchema: Partial<ItemSchema>): InvalidOr<Partial<ItemSchema>>;

}