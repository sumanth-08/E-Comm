import { DataTypes } from "sequelize";
import { getDBConnection } from "../config/dbConnection";
import { STATE } from "../config/constants";
import initCategoryModel from "./categoryModel";

const initProductModel = async () => {
  try {
    const sequelize = await getDBConnection();
    const Product = sequelize.define(
      "product",
      {
        product_id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        categoryId: {
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

    const Category = await initCategoryModel();
    Product.belongsTo(Category, {
      as: "categoryInfo",
      foreignKey: {
        allowNull: false,
        name: "categoryId",
      },
      targetKey: "category_id",
      onDelete: "CASCADE",
    });

    await Product.sync({ alter: true });
    return Product;
  } catch (err) {
    throw new Error("Failed to to init product model");
  }
};

export default initProductModel;
