const { Usuario } = require("../config/Relaciones");

const crearUsuario = async (req, res) => {
  const nuevoUsuario = await Usuario.create(req.body);
  res.status(201).json({
    success: true,
    content: nuevoUsuario,
    message: "Usuario creado exitosamente",
  });
};
const usuarioPorId = async (req, res) => {
  const { id } = req.params;
  const usuarioEncontrado = await Usuario.findByPk(id);
  res.status(200).json({
    success: true,
    content: usuarioEncontrado,
    message: null,
  });
};
const usuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.status(200).json({
    success: true,
    content: usuarios,
    message: null,
  });
};

module.exports = {
  crearUsuario,
  usuarioPorId,
  usuarios,
};
