import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ClientModel } from "../../model/client-model";


type ClientSchemaModel = Model<ClientModel>

export interface ClientInterface {
    Schema: ModelStatic<ClientSchemaModel>
    createClient: (user: Omit<ClientModel, "id">) => Promise<ClientModel> 
}

export async function createTable(sequelize: Sequelize): Promise<ClientInterface> {

    const ClientSchema = sequelize.define<ClientSchemaModel>('client', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        idNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            createdAt: false
        });

    await ClientSchema.sync();
    return {
        Schema: ClientSchema,
        async createClient(client) {
            const result = await ClientSchema.create(client as ClientModel);
            return result.toJSON()
        } 
    };
}
export type ClientTable = Awaited<ReturnType<typeof createTable>>;

