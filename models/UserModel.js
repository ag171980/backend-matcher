// importar la conexion a la base de datos

import db from "../database/db.js"

//sequelize

import { DataTypes } from "sequelize"

const UserModel = db.define("users", {
    id: {type: DataTypes.INTEGER, primaryKey:true},
    id_user: {type: DataTypes.STRING},
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.STRING },
    genderInterest: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    img1: { type: DataTypes.STRING },
    img2: { type: DataTypes.STRING },
    img3: { type: DataTypes.STRING },
    img4: { type: DataTypes.STRING },

})

export default UserModel