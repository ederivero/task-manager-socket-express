const { Sequelize } = require("sequelize");
const conexion = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL, {
      timezone: "-05:00",
      logging: false, // asi evitamos que las sentencias SQL se muestren en la terminal
      dialectOptions: {
        // sirve para que al momento de mostrar fechas, automaticamente las vuelva string y no tener que hacer la conversion manual como en flask
        dateStrings: true,
      },
    })
  : new Sequelize(`sqlite:db.db`, {
      logging: false, // asi evitamos que las sentencias SQL se muestren en la terminal
      dialectOptions: {
        // sirve para que al momento de mostrar fechas, automaticamente las vuelva string y no tener que hacer la conversion manual como en flask
        dateStrings: true,
      },
    });

module.exports = conexion;
