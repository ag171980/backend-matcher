//importo el modelo


import MatchModel from "../models/MatchModel.js";
import UserModel from "../models/UserModel.js";
import  { Op } from "sequelize";
/* METODOS DEL CRUD */


//campos

// const eliminarItemEspecifico = async (nombre, arr)=>{
//     console.log(arr)
//     let indexOf = arr.indexOf(nombre)
//     console.log(nombre)
//     console.log(indexOf)
//     arr.splice(indexOf, 1)
// }

//MOSTRAR TODOS LOS REGISTROS
export const getAllMatches = async (req, res) => {
    try {
        const matches = await MatchModel.findAll()
        res.json(matches)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getMatchById = async (req, res) => {
    try {
        const matches = await MatchModel.findByPk(req.params.id)
        res.json(matches)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const verifyMatchesUserById = async (req, res)=>{
    let idUserEntry = req.query.idUser;
    try{
        const users = await UserModel.findAll();
        const allMatches = await MatchModel.findAll();
        const userActual = await UserModel.findAll({where:{id: idUserEntry}})
        const filterMatchesById = await MatchModel.findAll({where: 
            {[Op.or]: [
                    {
                        id_user_matchA: {[Op.eq]: Number(idUserEntry)}
                    }, 
                    {
                        id_user_matchB: {[Op.eq]: Number(idUserEntry)}
                    }
                ]
            }
            })
        // let filterMatchesById = allMatches.filter((match)=>match.id_user_matchA === idUserEntry || match.id_user_matchB === idUserEntry)
        let usersMatches = []
        
        filterMatchesById.map((match, index)=>{
            let idActualA = match.id_user_matchA;
            let idActualB = match.id_user_matchB;
            let userByIdB = users.filter((us)=>us.id === idActualB)[0].name
            filterMatchesById.map((matchJ, jndex)=>{
                if(matchJ.id_user_matchB === idActualA && matchJ.id_user_matchA === idActualB){
                    if(userByIdB !== userActual[0].name){
                        let dataUserToMatch = users.filter((user)=>user.name === userByIdB)
                        usersMatches.push(dataUserToMatch)
                    }
                    // eliminarItemEspecifico(userActual, usersMatches)
                }
            })

        })
        res.json(usersMatches)
    }catch(error){
        res.json({message: error.message })
    }
}

export const crearMatch = async (req, res) => {
    
    try {
        
            const matches = await MatchModel.create(
                {
                    id_user_matchA: req.body.id_user_matchA,
                    id_user_matchB: req.body.id_user_matchB,
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt
                }, { fields: ['id_user_matchA','id_user_matchB', 'createdAt', 'updatedAt'] })
            res.json({ message: "le has dado un like!" })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}