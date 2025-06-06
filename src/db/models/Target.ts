import { DataTypes, Model } from "sequelize";
import sequelize from "../client";

class Target extends Model {
  declare id: string;
  declare userId: string;
  declare name: string;
  declare url: string;
  declare protocol: "http" | "https";
  declare checkInterval: number;
  declare isActive: boolean;
}

Target.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    protocol: {
      type: DataTypes.ENUM("http", "https"),
      allowNull: false,
    },
    checkInterval: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 1440,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "target",
  }
);

export default Target;
