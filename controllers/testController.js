
import TestModel from "../models/TestModel.js";


export const getTest = async (req, res) => {
    try {
        const test = await TestModel.findAll()
        console.log(test)
        res.json(test)
    } catch (error) {
        res.json({ message: error.message })
    }
}