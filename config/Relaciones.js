const tarea_model = require("../models/Tarea");
const usuario_model = require("../models/Usuario");
const Tarea = tarea_model();
const Usuario = usuario_model();

Usuario.hasMany(Tarea, {
  foreignKey: { name: "usuario_id", allowNull: false },
});
Tarea.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = {
  Usuario,
  Tarea,
};
