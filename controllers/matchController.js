//importo el modelo


import MatchModel from "../models/MatchModel.js";
import UserModel from "../models/UserModel.js";

/* METODOS DEL CRUD */


//campos


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
        const usersLikedsByEntry = await UserModel.findAll({where:{id: idUserEntry}});
        const allMatches = await MatchModel.findAll();
        let usersMatches = []
        // allMatches.map((match, index)=>{
        //     let idActualA = match.id_user_matchA;
        //     let idActualB = match.id_user_matchB;
        //     let userByIdA = users.filter((us)=>us.id === idActualA)[0].name
        //     let userByIdB = users.filter((us)=>us.id === idActualB)[0].name
        //     allMatches.map((matchJ, jndex)=>{
        //         if(matchJ.id_user_matchB === idActualA && matchJ.id_user_matchA === idActualB){
        //             console.log(`${userByIdA} y ${userByIdB} hicieron match!`)
        //         }
        //     })

        // })

        res.json(usersLikedsByEntry)
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