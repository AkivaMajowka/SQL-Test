import { createTables } from "./DB/database";

async function main() {
    const DB = await createTables();

    // Example of client creation
    const client = await DB.client.createClient({
        fullName: "akiva",
        idNum: 339621237,
        address: "Ha-reem, 7, Guivat Zeev",
        phoneNumber: 559708244
    });
    console.log(client);

    // Example of product creation
    const product = await DB.product.createProduct({
        SKU: 132432,
        name: "Nike Shirt",
        description: "The great nike shirt in a new series inspired my Mike Jordan",
        clientPrice: 45,
        supplierPrice: 29,
        amountInStock: 13
    });
}

main()
.then(() => console.log('connected sucessfuly'))
.catch(err => console.log(err))