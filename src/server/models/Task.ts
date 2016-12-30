/**
 * Created by ngerakines on 4/11/16.
 */

import * as Promise from "bluebird";
import * as Sequelize from "sequelize";
import {AccountAttribute, AddressAttribute} from "../../models/Models";



export interface AccountInstance extends Sequelize.Instance<AccountAttribute>, AccountAttribute {
    getAddresses: Sequelize.HasManyGetAssociationsMixin<AddressAttribute>;
    setAddresses: Sequelize.HasManySetAssociationsMixin<AddressAttribute, string>;
    addAddresses: Sequelize.HasManyAddAssociationsMixin<AddressAttribute, string>;
    addAddress: Sequelize.HasManyAddAssociationMixin<AddressAttribute, string>;
    createAddress: Sequelize.HasManyCreateAssociationMixin<AddressAttribute>;
    removeAddress: Sequelize.HasManyRemoveAssociationMixin<AddressAttribute, string>;
    removeAddresses: Sequelize.HasManyRemoveAssociationsMixin<AddressAttribute, string>;
    hasAddress: Sequelize.HasManyHasAssociationMixin<AddressAttribute, string>;
    hasAddresses: Sequelize.HasManyHasAssociationsMixin<AddressAttribute, string>;
    countAddresses: Sequelize.HasManyCountAssociationsMixin;
}

export interface AddressInstance extends Sequelize.Instance<AddressAttribute>, AddressAttribute {
    getAccount: Sequelize.BelongsToGetAssociationMixin<AccountInstance>;
    setAccount: Sequelize.BelongsToSetAssociationMixin<AccountInstance, string>;
    createAccount: Sequelize.BelongsToCreateAssociationMixin<AccountInstance>;
}

export interface AccountModel extends Sequelize.Model<AccountInstance, AccountAttribute> { }

export interface AddresstModel extends Sequelize.Model<AddressInstance, AddressAttribute> { }

export interface SequelizeStorageConfig {
    database:string;
    username:string;
    password:string
}

export interface StorageManager {
    init(force?:boolean):Promise<any>;
    getAccountById(id:string):Promise<any>;
    getAccountByEmail(email:string):Promise<any>;
    addAddress(account:any, street:string, city:string, state:string, zip:string):Promise<any>;
}

export class SequelizeStorageManager implements StorageManager {
    public sequelize:Sequelize.Sequelize;
    /* tslint:disable */
    public Account:AccountModel;
    public Address:AddresstModel;

    private config:SequelizeStorageConfig;

    constructor(config:SequelizeStorageConfig) {
        this.config = config;

        this.sequelize = new Sequelize(this.config.database, this.config.username, this.config.password, { dialect: "postgres" });
        this.Account = this.sequelize.define<AccountInstance, AccountAttribute>("Account", {
                "id": {
                    "type": Sequelize.UUID,
                    "allowNull": false,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false,
                    "unique": true,
                    "validate": {
                        "isEmail": true
                    }
                },
                "password": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false
                }
            },
            {
                "tableName": "accounts",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.Address = this.sequelize.define<AddressInstance, AddressAttribute>("Address", {
                "id": {
                    "type": Sequelize.UUID,
                    "allowNull": false,
                    "primaryKey": true
                },
                "street": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false
                },
                "city": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false
                },
                "state": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false
                },
                "zip": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                }
            },
            {
                "tableName": "addresses",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });

        this.Address.belongsTo(this.Account);
        this.Account.hasMany(this.Address);
    }

    init(force?:boolean):Promise<any> {
        force = force || false;
        return this.sequelize.sync({force: force, logging: true});
    }

    getAccountById(id:string):Promise<AccountInstance> {
        return this.Account.find({where: {id: id}});
    }

    getAccountByEmail(email:string):Promise<AccountInstance> {
        return this.Account.find({where: {email: email}});
    }

    addAddress(account:any, street:string, city:string, state:string, zip:string):Promise<any> {
        account = <AccountInstance>account;
        return account
            .createAddress({
                id: 9,
                street:street,
                city: city,
                state: state,
                zip: zip
            });
    }

    private hashPassword(password:string):Promise<any> {
        return new Promise((resolve) => {
            resolve(password);
        });
    }

}
