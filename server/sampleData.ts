import * as Schema from './classes/Schema';

export const sampleData: Schema.Database = {
    people: [
        {
            _id: "person1_id",
            name: "Bobby Sue",
            email: "bobbysue@gmail.com",
            customerOf: [],
        },
        {
            _id: "person2_id",
            name: "Billy Joe",
            email: "billyjoe@gmail.com",
            customerOf: ["person1_id"],
        },
        {
            _id: "person3_id",
            name: "Jimmy Shoe",
            email: "jimmyShoe@gmail.com",
            customerOf: ["person1_id"],
        },
    ],
    expenses: [
        {
            _id: "expense1_id",
            description: "expense1_description",
            userId: "person1_id",
            projectId: "project1_id",
            vendor: "expense1_vendor",
            amount: {amount: 500, currency: "CAD"},
            hst: {amount: 65, currency: "CAD"},
        },
        {
            _id: "expense2_id",
            description: "expense2_description",
            userId: "person1_id",
            vendor: "expense2_vendor",
            projectId: "project1_id",
            amount: {amount: 700, currency: "CAD"},
            hst: {amount: 91, currency: "CAD"}
        }, {
            _id: "expense3_id",
            description: "expense3_description",
            userId: "person1_id",
            projectId: "project2_id",
            vendor: "expense3_vendor",
            amount: {amount: 500, currency: "CAD"},
            hst: {amount: 65, currency: "CAD"},
        },
        {
            _id: "expense4_id",
            description: "expense4_description",
            userId: "person1_id",
            vendor: "expense4_vendor",
            projectId: "project2_id",
            amount: {amount: 700, currency: "CAD"},
            hst: {amount: 91, currency: "CAD"},
        },

    ],
    orders: [
        {
            _id: "order1_id",
            userId: "person1_id",
            customerId: "person2_id",
            vendor: "person1_id",
            projectId: "project1_id",
            items: [
                {
                    description: "item1_description",
                    quantity: 1,
                    price: {amount: 1000, currency: "CAD"},
                    hst: {amount: 130, currency: "CAD"},
                },
                {
                    description: "item2_description",
                    quantity: 2,
                    price: {amount: 1000, currency: "CAD"},
                    hst: {amount: 130, currency: "CAD"},
                },
            ],
            paid: true,
            paymentMethod: "cash",
            subtotal: {amount: 3000, currency: "CAD"},
            hst: {amount: 390, currency: "CAD"},
        },
        {
            _id: "order2_id",
            userId: "person1_id",
            customerId: "person3_id",
            vendor: "person1_id",
            projectId: "project1_id",
            items: [
                {
                    description: "item1_description",
                    quantity: 1,
                    price: {amount: 1000, currency: "CAD"},
                    hst: {amount: 130, currency: "CAD"},
                },
            ],
            paid: false,
            paymentMethod: null,
            subtotal: {amount: 1000, currency: "CAD"},
            hst:{amount: 130, currency: "CAD"},
        },
        {
            _id: "order3_id",
            userId: "person1_id",
            customerId: "person2_id",
            vendor: "person1_id",
            projectId: "project2_id",
            items: [
                {
                    description: "item1_description",
                    quantity: 1,
                    price: {amount: 1000, currency: "CAD"},
                    hst: {amount: 130, currency: "CAD"},
                },
                {
                    description: "item2_description",
                    quantity: 2,
                    price: {amount: 1000, currency: "CAD"},
                    hst: {amount: 130, currency: "CAD"},
                },
            ],
            paid: true,
            paymentMethod: "cash",
            subtotal: {amount: 3000, currency: "CAD"},
            hst: {amount: 390, currency: "CAD"},
        },
        {
            _id: "order4_id",
            userId: "person1_id",
            customerId: "person3_id",
            vendor: "person1_id",
            projectId: "project2_id",
            items: [
                {
                    description: "item1_description",
                    quantity: 1,
                    price: {amount: 1000, currency: "CAD"},
                    hst: {amount: 130, currency: "CAD"},
                },
            ],
            paid: false,
            paymentMethod: null,
            subtotal: {amount: 1000, currency: "CAD"},
            hst: {amount: 130, currency: "CAD"},
        },

    ],
    projects: [
        {
            '_id': "project1_id",
            "name":"Project One",
            'userId': "person1_id",
            "startDate": "Sun May 17 2020 00:02:37 GMT-0400 (Eastern Daylight Time)",
            "endDate": "Sun May 17 2020 00:02:37 GMT-0400 (Eastern Daylight Time)",
            "totalRevenue": {amount: 4000, currency: "CAD"},
            "totalHSTCollected": {amount: 520, currency: "CAD"},
            "totalHSTSpent": {amount: 156, currency: "CAD"},
            "totalExpenses": {amount: 1200, currency: "CAD"},
            "incomeTaxRate": 0.2,
            "numberOfOrders": 2,
        },
        {
            _id: "project2_id",
            "name":"Project Two",
            'userId': "person1_id",
            'startDate': new Date().toISOString(),
            endDate: new Date().toISOString(),
            "totalRevenue": {amount: 4000, currency: "CAD"},
            "totalHSTCollected": {amount: 520, currency: "CAD"},
            "totalHSTSpent": {amount: 156, currency: "CAD"},
            "totalExpenses": {amount: 1200, currency: "CAD"},
            incomeTaxRate: 0.2,
            numberOfOrders: 2,
        },
    ],
    transfers: [
        {
            _id: "transfer1_id",
            userId: "person1_id",
            date: new Date().toString(),
            taxType: "hst",
            amount: {amount: 364, currency: "CAD"},
            fromAccount: "Business Expenses",
            toAccount: "Tax Withholding",
        },

    ],

};
