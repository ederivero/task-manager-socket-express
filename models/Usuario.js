const { DataTypes } = require("sequelize");
const conexion = require("../config/Sequelize");

module.exports = usuario_model = () => {
  return conexion.define(
    "usuarios",
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: "usuario_id",
        primaryKey: true,
        unique: true,
      },
      usuarioNombre: {
        type: DataTypes.STRING(25),
        allowNull: false,
        field: "usuario_nombre",
      },
    },
    {
      timestamps: false,
      tableName: "t_usuario",
    }
  );
};
