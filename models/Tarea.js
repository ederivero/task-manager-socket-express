const { DataTypes } = require("sequelize");
const conexion = require("../config/Sequelize");

module.exports = tarea_model = () => {
  return conexion.define(
    "tareas",
    {
      tareaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "tarea_id",
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      tareaTitulo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "tarea_titulo",
      },
      tareaDescripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "tarea_descripcion",
      },
      tareaEstado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "tarea_estado",
      },
      tareaFecha: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "tarea_fecha",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "t_tarea",
      timestamps: false,
    }
  );
};
