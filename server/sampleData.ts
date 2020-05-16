import { DatabaseSchema } from '../classes/schema';

export const sampleData: DatabaseSchema = {
    people: [
        {  _id: "person1_id",
            name: "Bobby Sue",
            email: "bobbysue@gmail.com",
            customerOf: []
        },
        {  _id: "person2_id",
            name: "Billy Joe",
            email: "billyjoe@gmail.com",
            customerOf: ["person1_id"],
        },
        {  _id: "person3_id",
            name: "Jimmy Shoe",
            email: "jimmyShoe@gmail.com",
            customerOf: ["person1_id"],
        }
    ],
    expenses: [
        {
            _id: "expense1_id",
            description: "expense1_description",
            user: "person1_id",
            project: "project1_id",
            vendor: "expense1_vendor",
            amount: 5,
            hst: .65,
        },
        {
            _id: "expense2_id",
            description: "expense2_description",
            user: "person1_id",
            vendor: "expense2_vendor",
            project: "project1_id",
            amount: 7,
            hst: .91,
        }, {
            _id: "expense3_id",
            description: "expense3_description",
            user: "person1_id",
            project: "project2_id",
            vendor: "expense3_vendor",
            amount: 5,
            hst: .65,
        },
        {
            _id: "expense4_id",
            description: "expense4_description",
            user: "person1_id",
            vendor: "expense4_vendor",
            project: "project2_id",
            amount: 7,
            hst: .91,
        }

    ],
    orders: [
        {
            _id: "order1_id",
            customer: "person2_id" ,
            vendor: "person1_id",
            project: "project1_id",
            items: [
                {description: "item1_description",
                    quantity: 1,
                    price: 10,
                    hst: 1.3,
                },
                {description: "item2_description",
                    quantity: 2,
                    price: 10,
                    hst: 1.3,
                }
            ],
            paid: true,
            paymentMethod: "cash",
            subtotal: 30,
            hst: 3.9,
        },
        {
            _id: "order2_id",
            customer: "person3_id" ,
            vendor: "person1_id",
            project: "project1_id",
            items: [
                {description: "item1_description",
                    quantity: 1,
                    price: 10,
                    hst: 1.3,
                },
            ],
            paid: false,
            paymentMethod: null,
            subtotal: 10,
            hst: 1.3,
        },
        {
            _id: "order3_id",
            customer: "person2_id" ,
            vendor: "person1_id",
            project: "project2_id",
            items: [
                {description: "item1_description",
                    quantity: 1,
                    price: 10,
                    hst: 1.3,
                },
                {description: "item2_description",
                    quantity: 2,
                    price: 10,
                    hst: 1.3,
                }
            ],
            paid: true,
            paymentMethod: "cash",
            subtotal: 30,
            hst: 3.9,
        },
        {
            _id: "order4_id",
            customer: "person3_id" ,
            vendor: "person1_id",
            project: "project2_id",
            items: [
                {description: "item1_description",
                    quantity: 1,
                    price: 10,
                    hst: 1.3,
                },
            ],
            paid: false,
            paymentMethod: null,
            subtotal: 10,
            hst: 1.3,
        }

    ],
    projects: [
        {_id: "project1_id",
            owner: "person1_id",
            startDate: new Date().toString(),
            endDate: new Date().toString(),
            totalRevenue: 40,
            totalHSTCollected: 5.2,
            totalHSTSpent: 1.56,
            totalExpenses: 12,
            incomeTaxRate: 0.2,
            numberOfOrders: 2,
        },
        {_id: "project2_id",
            owner: "person1_id",
            startDate: new Date().toString(),
            endDate: new Date().toString(),
            totalRevenue: 40,
            totalHSTCollected: 5.2,
            totalHSTSpent: 1.56,
            totalExpenses: 12,
            incomeTaxRate: 0.2,
            numberOfOrders: 2,
        }
    ],
    transfers: [
        {date: new Date().toString(),
        taxType: "hst",
        amount: 3.64}

    ]

}
