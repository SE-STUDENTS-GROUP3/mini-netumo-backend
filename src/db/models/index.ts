import sequelize from "../client";
import User from "./User";
import Target from "./Target";
import StatusCheck from "./StatusCheck";
import ExpiryCheck from "./ExpiryCheck";
import Alert from "./Alert";

// Define associations
User.hasMany(Target, { foreignKey: "userId" });
Target.belongsTo(User, { foreignKey: "userId" });

Target.hasMany(StatusCheck, { foreignKey: "targetId" });
StatusCheck.belongsTo(Target, { foreignKey: "targetId" });

Target.hasOne(ExpiryCheck, { foreignKey: "targetId" });
ExpiryCheck.belongsTo(Target, { foreignKey: "targetId" });

User.hasMany(Alert, { foreignKey: "userId" });
Alert.belongsTo(User, { foreignKey: "userId" });

Target.hasMany(Alert, { foreignKey: "targetId" });
Alert.belongsTo(Target, { foreignKey: "targetId" });

export { sequelize, User, Target, StatusCheck, ExpiryCheck, Alert };
