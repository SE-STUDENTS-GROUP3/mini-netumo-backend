import { DataTypes, Model } from "sequelize";
import sequelize from "../client";

class StatusCheck extends Model {
  declare id: string;
  declare targetId: string;
  declare statusCode: number;
  declare responseTime: number;
  declare isUp: boolean;
  declare errorMessage: string;
}

StatusCheck.init(
  {
    statusCode: {
      type: DataTypes.INTEGER,
    },
    responseTime: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    isUp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    errorMessage: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "status_check",
  }
);

export default StatusCheck;
