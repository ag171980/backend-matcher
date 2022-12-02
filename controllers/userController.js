//importo el modelo


import { EmptyResultError, UUIDV4 } from "sequelize";
import UserModel from "../models/UserModel.js";
import {v4 as uuidv4} from 'uuid'
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
export const getRandomUsers = async(req, res)=>{
    let usersTemp = []
    try{
        let users = await UserModel.findOne({ where: { genderInterest: 'woman' } })
        console.log(users)
        let contador = 0;
        users.sort(()=> Math.random() - 0.5)
        while( contador < 9){
            usersTemp.push(users[contador])
            contador++;
        }
        users = usersTemp
        
        res.json(users)
    }catch(error){
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
                    id_user: uuidv4(),
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email,
                    gender: req.body.gender,
                    genderInterest: req.body.genderInterest,
                    password: req.body.password,
                    description: req.body.description,
                    img1: req.files[0].filename,
                    img2: req.files[1].filename,
                    img3: req.files[2].filename,
                    img4: req.files[3].filename,
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt
                }, { fields: ['id_user','name', 'email', 'gender', 'genderInterest', 'age', 'password', 'description', 'img1', 'img2', 'img3', 'img4', 'createdAt', 'updatedAt'] })
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