const express = require("express")();
const { json } = require("body-parser");
const conexion = require("./Sequelize");
const usuario_router = require("../routes/usuario");
const { Server } = require("socket.io");
const http = require("http");
const { Tarea } = require("./Relaciones");

module.exports = class ServerBack {
  constructor() {
    this.app = express;
    this.puerto = process.env.PORT || 5000;
    this.httpServer = new http.Server(this.app);
    this.io = new Server(this.httpServer, { cors: { origin: "*" } });
    this.bodyParser();
    this.CORS();
    this.rutas();
    this.sockets();
  }
  bodyParser() {
    this.app.use(json());
  }
  CORS() {
    // los cors son el control de acceso a nuestra api, aca definimos que dominios pueden acceder, que metodos se pueden acceder y que headers se puede enviar
    this.app.use((req, res, next) => {
      // Access-Control-Allow-Origin => indica que dominio o dominios pueden acceder a mi API
      res.header("Access-Control-Allow-Origin", "*");
      // Access-Control-Allow-Headers => sirve para indicar que tipos de cabeceras me puede mandar el front
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      // Access-Control-Allow-Methods => sirve para indicar que metodos pueden acceder a mi API
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      // si todo cumple con lo solicitado pasara al siguiente controlador
      next();
    });
  }
  rutas() {
    this.app.get("/", (req, res) => {
      res.json({
        message: "Bienvenido a mi API de Webinar Task Manager😎",
      });
    });
    this.app.use(usuario_router);
  }
  sockets() {
    this.io.on("connect", (client) => {
      console.log("se conecto el cliente");
      console.log(client.id);
      // Socket para registrar una nueva tarea
      client.on("nueva_tarea", async (data) => {
        const { titulo, descripcion, estado, usuario } = data;
        await Tarea.create({
          tareaTitulo: titulo,
          tareaDescripcion: descripcion,
          tareaEstado: estado,
          usuario_id: usuario,
        });
        const tareas = await Tarea.findAll({
          where: { usuario_id: usuario },
          order: [["tareaFecha", "DESC"]],
        });
        client.emit("tareas", tareas);
      });

      // Socket para editar una tarea segun su id, la data debe ser:
      // {
      //   id: int,
      //   tarea:{
      //        titulo: str,
      //        estado: bool,
      //        descripcion: str,
      //        usuario: int
      //   }
      // }
      client.on("editar_tarea", async (data) => {
        const { tarea, id } = data;
        const { titulo, descripcion, estado, usuario } = tarea;
        await Tarea.update(
          {
            tareaTitulo: titulo,
            tareaDescripcion: descripcion,
            tareaEstado: estado,
            usuario_id: usuario,
          },
          { where: { tareaId: id } }
        );
        const tareas = await Tarea.findAll({
          where: { usuario_id: usuario },
          order: [["tareaFecha", "DESC"]],
        });
        client.emit("tareas", tareas);
      });
      // Socket para devolver todas las tareas ni bien el usuario inicia sesión
      client.on("tareas", async (usuarioId) => {
        const tareas = await Tarea.findAll({
          where: { usuario_id: usuarioId },
          order: [["tareaFecha", "DESC"]],
        });
        client.emit("tareas", tareas);
      });
    });
  }
  start() {
    this.httpServer.listen(this.puerto, async () => {
      console.log(
        `Servidor corriendo exitosamente en el puerto ${this.puerto}`
      );
      try {
        // el metodo sync es el encargado de hacer la validacion entre mi proyecto y mi bd y verificar que todas las tablas que tengo en mi proyecto esten presentes en la bd
        await conexion.sync();
        console.log("Base de datos sincronizada correctamente");
      } catch (error) {
        console.log(error);
      }
    });
  }
};
