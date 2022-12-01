import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import { getAllMatches, getMatchById, crearMatch } from "../controllers/matchController.js"

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.get("/matches", getAllMatches)
router.get("/matches/:id", getMatchById)
router.post("/createMatch", crearMatch)




export default router