// importar la conexion a la base de datos

import db from "../database/db.js"

//sequelize

import { DataTypes } from "sequelize"

const UserModel = db.define("tests", {
    name: { type: DataTypes.STRING },
})

export default UserModel