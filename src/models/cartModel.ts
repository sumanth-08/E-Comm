import { DataTypes } from "sequelize";
import { getDBConnection } from "../config/dbConnection";
import { STATE } from "../config/constants";
import initProductModel from "./productModel";
import initAccountModel from "./accountModel";

const initCartModel = async () => {
  try {
    const sequelize = await getDBConnection();
    const Cart = sequelize.define(
      "cart",
      {
        cart_id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        productId: {
          type: DataTypes.UUID,
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

    const Product = await initProductModel();
    const User = await initAccountModel();

    Cart.belongsTo(Product, {
      as: "productInfo",
      foreignKey: {
        allowNull: false,
        name: "productId",
      },
      targetKey: "product_id",
      onDelete: "CASCADE",
    });
    Cart.belongsTo(User, {
      as: "userInfo",
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      targetKey: "account_id",
      onDelete: "CASCADE",
    });

    await Cart.sync({ alter: true });
    return Cart;
  } catch (err) {
    throw new Error("Failed to to init cart model");
  }
};

export default initCartModel;
