//importo el modelo


import { EmptyResultError } from "sequelize";
import UserModel from "../models/UserModel.js";
/* METODOS DEL CRUD */


//campos


//MOSTRAR TODOS LOS REGISTROS
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getUserById = async (req, res) => {
    try {
        const users = await UserModel.findByPk(req.params.id)
        res.json(users)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const crearUsuario = async (req, res) => {
    try {
        const userExists = await UserModel.findOne({ where: { email: req.body.email } })
        if (userExists === null) {
            const users = await UserModel.create(
                {
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email,
                    gender: req.body.gender,
                    genderInterest: req.body.genderInterest,
                    password: req.body.password,
                    description: req.body.description,
                    img1: "imagen1.jpg",
                    img2: "imagen2.jpg",
                    img3: "imagen3.jpg",
                    img4: "imagen4.jpg",
                    // img1: req.body.img1,
                    // img2: req.body.img2,
                    // img3: req.body.img3,
                    // img4: req.body.img4,

                    // gender: "default",
                    // genderInterest: "default",
                    // password: "default",
                    // description: "default",
                    // img1: "imagen1.jpg",
                    // img2: "imagen2.jpg",
                    // img3: "imagen3.jpg",
                    // img4: "imagen4.jpg",
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt
                }, { fields: ['name', 'email', 'gender', 'genderInterest', 'age', 'password', 'description', 'img1', 'img2', 'img3', 'img4', 'createdAt', 'updatedAt'] })
            // { fields: ['name', 'email', 'gender', 'genderInterest', 'age', 'password', 'description', 'img1', 'img2', 'img3', 'img4', 'createdAt', 'updatedAt'] }
            res.json({ message: "Usuario registrado correctamente" })
        } else {
            res.json({ message: "hay un usuario con este correo" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const validarUsuario = async (req, res) => {
    try {
        const userExists = await UserModel.findOne(
            {
                where:
                {
                    email: req.body.email,
                    password: req.body.password
                }
            })
        if (userExists === null) {
            res.json({ message: "El usuario y/o email no coinciden" })
        } else {
            res.json(userExists)
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}