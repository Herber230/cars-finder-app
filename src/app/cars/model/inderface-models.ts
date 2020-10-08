

interface Car
{
    idBrand?: string,
    lineName: string,
    year: number,
    color: string,
    $brand?: string,
    id?: string
}

interface Brand
{
    id?: string,
    name: string,
    country: string
}

interface Characteristic
{
    charName: string,
    charValue: any
}

export {
    Car, Brand, Characteristic
}
