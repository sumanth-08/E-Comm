import { DataTypes, Sequelize } from "sequelize";
import { getDBConnection } from "../config/dbConnection";
import { ACCOUNTS, STATE } from "../config/constants";

const initAccountModel = async () => {
  try {
    const sequelize = await getDBConnection();
    const Account = sequelize.define(
      "accounts",
      {
        account_id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        role: {
          type: DataTypes.INTEGER,
          defaultValue: ACCOUNTS.USER,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.INTEGER,
          defaultValue: STATE.ACTIVE,
        },
      },
      {
        freezeTableName: true,
      }
    );

    await Account.sync({ alter: true });
    return Account;
  } catch (err) {
    console.log("account model", err);
  }
};

export default initAccountModel;
