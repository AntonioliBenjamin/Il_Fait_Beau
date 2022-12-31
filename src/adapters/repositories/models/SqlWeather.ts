import { DataTypes, Model, Sequelize } from "sequelize";
const pass = process.env.PASS

const sequelize = new Sequelize('weather', 'root', pass, {
  dialect: 'mysql',
  logging: false
});

export type weatherAtribute = {
  city: string;
  tempInCelcius: number;
  humidity: number;
  windSpeed: number;
  lat: number;
  lon: number;
  createdAt: number;
};

export class WeatherSqlModel extends Model<weatherAtribute> {
  declare tempInCelcius: number;
  declare city: string;
  declare humidity: number;
  declare windSpeed: number;
  declare lat: number;
  declare lon: number;
  declare createdAt: number;
}

WeatherSqlModel.init(
  {
    city: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
    },
    tempInCelcius: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
    },
    humidity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
    },
    lon: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
    },
    windSpeed: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "weather",
    sequelize,
    updatedAt: false, 
  }
);
