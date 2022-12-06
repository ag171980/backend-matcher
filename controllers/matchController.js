//importo el modelo


import MatchModel from "../models/MatchModel.js";
import UserModel from "../models/UserModel.js";

/* METODOS DEL CRUD */


//campos

const eliminarItemEspecifico = async (nombre, arr)=>{
    let arrResponse = []
    let cantRep = 0
     arr.map((ar)=>{
        if(ar === nombre){
            cantRep++;
        }
    })

    console.log(cantRep)
    let contador = 0;
    // while(contador <= cantRep){
    //     let indexOf = arr.indexOf(nombre)
    //     arrResponse = arr.splice(indexOf, 1)
    //     contador++;
    // }
    return arr
}

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
    let idUserEntry = 1;
    try{
        const users = await UserModel.findAll();
        const allMatches = await MatchModel.findAll();
        let filterMatchesById = allMatches.filter((match)=>match.id_user_matchA === idUserEntry || match.id_user_matchB === idUserEntry)
        let usersMatches = []
        
        filterMatchesById.map((match, index)=>{
            let idActualA = match.id_user_matchA;
            let idActualB = match.id_user_matchB;
            let userByIdB = users.filter((us)=>us.id === idActualB)[0].name
            filterMatchesById.map((matchJ, jndex)=>{
                if(matchJ.id_user_matchB === idActualA && matchJ.id_user_matchA === idActualB){
                    usersMatches.push(userByIdB)
                }
            })

        })

        let userActual = users.filter((match)=> match.id === idUserEntry)
        
        let result = eliminarItemEspecifico(userActual, usersMatches)

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