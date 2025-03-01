import { DataTypes } from "sequelize";
import { getDBConnection } from "../config/dbConnection";
import { STATE } from "../config/constants";

const initCategoryModel = async () => {
  try {
    const sequelize = await getDBConnection();
    const Category = sequelize.define(
      "category",
      {
        category_id: {
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
        is_active: {
          type: DataTypes.INTEGER,
          defaultValue: STATE.ACTIVE,
        },
      },
      {
        freezeTableName: true,
      }
    );

    await Category.sync({ alter: true });
    return Category;
  } catch (err) {
    // console.log("Category model", err);
    throw new Error("Failed to to create category model");
  }
};

export default initCategoryModel;
