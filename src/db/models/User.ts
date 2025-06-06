import { DataTypes, Model } from "sequelize";
import sequelize from "../client";
import bcrypt from "bcryptjs";

class User extends Model {
  declare id: string;
  declare email: string;
  declare password: string;
  declare comparePassword: (candidatePassword: string) => Promise<boolean>;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default User;
