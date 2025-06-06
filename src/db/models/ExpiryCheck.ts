import { DataTypes, Model } from "sequelize";
import sequelize from "../client";

class ExpiryCheck extends Model {
  declare id: string;
  declare targetId: string;
  declare sslValidTo: Date;
  declare domainExpiry: Date;
  declare lastChecked: Date;
}

ExpiryCheck.init(
  {
    sslValidTo: {
      type: DataTypes.DATE,
    },
    domainExpiry: {
      type: DataTypes.DATE,
    },
    lastChecked: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "expiry_check",
  }
);

export default ExpiryCheck;
