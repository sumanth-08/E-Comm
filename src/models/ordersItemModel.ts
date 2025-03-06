import { DataTypes } from "sequelize";
import { getDBConnection } from "../config/dbConnection";
import { STATE } from "../config/constants";
import initProductModel from "./productModel";
import initAccountModel from "./accountModel";
import initOrdersMasterModel from "./ordersMasterModel";

let OrderItem: any | null = null;
const initOrdersItemModel = async () => {
  try {
    if (OrderItem) return OrderItem;
    const sequelize = await getDBConnection();
    const ProductModel = await initProductModel();
    const OrderMaster = await initOrdersMasterModel();
    OrderItem = sequelize.define(
      "ordersitem",
      {
        order_item_id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        cart_amt: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        orderId: {
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

    OrderItem.belongsTo(OrderMaster, {
      as: "orderInfo",
      foreignKey: {
        allowNull: false,
        name: "orderId",
      },
      targetKey: "order_id",
      onDelete: "CASCADE",
    });
    OrderMaster.hasMany(OrderItem, {
      as: "orderItemInfo",
      foreignKey: "orderId",
      sourceKey: "order_id",
      onDelete: "CASCADE",
    });
    OrderItem.belongsTo(ProductModel, {
      as: "productInfo",
      foreignKey: {
        allowNull: false,
        name: "productId",
      },
      targetKey: "product_id",
      onDelete: "CASCADE",
    });

    await OrderItem.sync({ alter: true });
    return OrderItem;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to to init order item model");
  }
};

export default initOrdersItemModel;
