import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ProductModel } from "../../model/product-model";


type ProductSchemaModel = Model<ProductModel>

export interface ProductInterface {
    Schema: ModelStatic<ProductSchemaModel>
    createProduct: (product: Omit<ProductModel, 'id'>) => Promise<ProductModel>
}

export async function createTable(sequelize: Sequelize): Promise<ProductInterface> {

    const ProductSchema = sequelize.define<ProductSchemaModel> ('product', {
        id: { 
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        SKU: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        clientPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        supplierPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amountInStock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            createdAt: false
        });

    await ProductSchema.sync();
    return {
        Schema: ProductSchema,
        async createProduct(product) {
            const result = await ProductSchema.create(product as ProductModel);
            return result.toJSON()
        }
    }

}
export type ProductTable = Awaited<ReturnType<typeof createTable>>;