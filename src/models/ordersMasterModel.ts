import { DataTypes } from "sequelize";
import { getDBConnection } from "../config/dbConnection";
import { STATE } from "../config/constants";
import initProductModel from "./productModel";
import initAccountModel from "./accountModel";
import initOrdersItemModel from "./ordersItemModel";

const initOrdersMasterModel = async () => {
  try {
    const sequelize = await getDBConnection();
    const OrderMaster = sequelize.define(
      "ordersmaster",
      {
        order_id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        total_amt: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        payment_type: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
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

    const User = await initAccountModel();
    OrderMaster.belongsTo(User, {
      as: "userInfo",
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      targetKey: "account_id",
      onDelete: "CASCADE",
    });

    await OrderMaster.sync({ alter: true });

    return OrderMaster;
  } catch (err) {
    throw new Error("Failed to to init order master model");
  }
};

export default initOrdersMasterModel;
