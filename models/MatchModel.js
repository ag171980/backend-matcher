// importar la conexion a la base de datos

import db from "../database/db.js"

//sequelize

import { DataTypes } from "sequelize"

const UserModel = db.define("matches", {
    
    id_user_matchA: {type: DataTypes.INTEGER},
    id_user_matchB: {type: DataTypes.INTEGER}

})

export default UserModel