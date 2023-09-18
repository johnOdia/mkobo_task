import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: Phone.PHONE_TABLE_NAME,
})
export class Phone extends Model {
  public static PHONE_TABLE_NAME = "phone_number" as string;
  public static PHONE_ID = "id" as string;
  public static NUMBER = "number" as string;
  public static ACCOUNT_ID = "account_id" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Phone.PHONE_ID,
  })
  id!: number;

  @Column({
    type: DataType.CHAR(40),
    field: Phone.ACCOUNT_ID,
  })
  auth_id!: string;

  @Column({
    type: DataType.INTEGER,
    field: Phone.NUMBER,
  })
  username!: number;

}
