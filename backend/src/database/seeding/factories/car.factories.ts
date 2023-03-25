import { faker }from '@faker-js/faker';
import { define } from "typeorm-seeding";
import { CarEntity } from 'src/database/entities/car.entity';

define(CarEntity, () => {
    const car = new CarEntity();
    const name = faker.commerce.productName()
    const price = faker.datatype.number()
    const category = faker.commerce.product()
    const status = faker.datatype.boolean()
    const image = faker.image.imageUrl()
    const createdAt = faker.date.past(1);
    const updatedAt = faker.date.past(1);
    const dateObjCreated = new Date(createdAt);
    const dateObjUpdatedAt = new Date(updatedAt);

    car.name = name
    car.category = category
    car.price = price
    car.status = status
    car.image = image
    car.createdAt = dateObjCreated
    car.updateAt =dateObjUpdatedAt
    
    
    return car;
});
