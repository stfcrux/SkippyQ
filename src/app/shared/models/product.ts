export class Product{
    name: string;
    price: number;
    image;
    imagePath: string;
    id: string;
    category: string;
    vegetarian: boolean;

    constructor(name: string, price: number, image, id?: string){
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = id;
    }
}