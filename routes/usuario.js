const { Router } = require("express");
const usuario_controller = require("../controllers/usuario");

const usuario_router = Router();

usuario_router.post("/usuario", usuario_controller.crearUsuario);
usuario_router.get("/usuarios", usuario_controller.usuarios);
usuario_router.get("/usuario/:id", usuario_controller.usuarioPorId);

module.exports = usuario_router;
