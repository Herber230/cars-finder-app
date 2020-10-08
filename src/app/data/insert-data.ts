import { Brand, Car } from "../cars/model/inderface-models";


export const insertData : Array<{brand:Brand, cars: Array<Car>}> = 
[
    {
        brand: {name: "Ferrari", country: "Italy" },
        cars: [
            {
                lineName: 'Enzo',
                year: 2002,
                color: 'Red',
            },
            {
                lineName: 'LaFerrari',
                year: 2016,
                color: 'Red'
            },
            {
                lineName: 'F40',
                year: 1992,
                color: 'Red'
            }
        ]
    },
    {
        brand: {name: "BMW", country: "Germany" },
        cars: [
            {
                lineName: 'M6',
                year: 2020,
                color: 'Black'
            },
            {
                lineName: 'X6',
                year: 2020,
                color: 'Black'
            },
            {
                lineName: 'M3',
                year: 2020,
                color: 'Blue'
            }
        ]
    },
    {
        brand: {name: "Mercedes Benz", country: "Germany" },
        cars: [
            {
                lineName: 'SL Class',
                year: 2020,
                color: 'Gray'
            },
            {
                lineName: 'SLS AMG',
                year: 2020,
                color: 'Gray'
            },
            {
                lineName: 'C 63 S',
                year: 2020,
                color: 'White'
            }
        ]
    },
    {
        brand: {name: "Lamborghini", country: "Italy" },
        cars: [
            {
                lineName: 'Aventador',
                year: 2016,
                color: 'Gray'
            },
            {
                lineName: 'Murcielago',
                year: 2009,
                color: 'Black'
            },
            {
                lineName: 'Veneno',
                year: 2014,
                color: 'Blue'
            }
        ]
    }
];

