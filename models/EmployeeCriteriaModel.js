import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Employee from "./EmployeeModel.js";

const { DataTypes } = Sequelize;

const EmployeeCriteria = db.define(
  "employee_criteria",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    effectiveness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: 0,
        max: 10,
      },
    },
    efficiency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: 0,
        max: 10,
      },
    },
    innovation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: 0,
        max: 10,
      },
    },
    collaboration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: 0,
        max: 10,
      },
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: 0,
        max: 10,
      },
    },
    responsibility: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: 0,
        max: 10,
      },
    },
    compliance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: 0,
        max: 10,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Employee.hasOne(EmployeeCriteria);
EmployeeCriteria.belongsTo(Employee, { foreignKey: "employeeId" });

export default EmployeeCriteria;
