
import TestModel from "../models/TestModel.js";


export const getTest = async (req, res) => {
    try {
        const test = await TestModel.findAll()
        res.json(test)
    } catch (error) {
        res.json({ message: error.message })
    }
}