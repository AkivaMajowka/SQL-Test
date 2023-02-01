import { Sequelize } from "sequelize";
import { createTable as createClient} from "./schemas/client"
import { createTable as createProduct} from "./schemas/product";


export function dbConnector() {
    const sequelize = new Sequelize({
        database: 'store_managment',
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: (sql) => { console.log('query: %s', sql)  }
    })
    return sequelize
}

export async function createTables() {
    const connection = dbConnector()
    const client = await createClient(connection)
    const product = await createProduct(connection)
    return {client, product}
}