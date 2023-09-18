import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: Account.ACCOUNT_TABLE_NAME,
})
export class Account extends Model {
  public static ACCOUNT_TABLE_NAME = "account" as string;
  public static ACCOUNT_ID = "id" as string;
  public static USERNAME = "username" as string;
  public static AUTH_ID = "auth_id" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Account.ACCOUNT_ID,
  })
  id!: number;

  @Column({
    type: DataType.CHAR(40),
    field: Account.AUTH_ID,
  })
  auth_id!: string;

  @Column({
    type: DataType.CHAR(30),
    field: Account.USERNAME,
  })
  username!: string;

}
