import { DataTypes, Model } from "sequelize";
import sequelize from "../client";

class Alert extends Model {
  declare id: string;
  declare userId: string;
  declare targetId: string;
  declare type: "downtime" | "ssl_expiry" | "domain_expiry";
  declare message: string;
  declare isRead: boolean;
}

Alert.init(
  {
    type: {
      type: DataTypes.ENUM("downtime", "ssl_expiry", "domain_expiry"),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "alert",
  }
);

export default Alert;
