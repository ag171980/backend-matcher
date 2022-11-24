import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import { getAllUsers, getUserById, crearUsuario, validarUsuario } from "../controllers/userController.js"

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.get("/user", getAllUsers)
router.get("/users/:id", getUserById)

router.post("/createUser", crearUsuario)
router.post("/validateUser", validarUsuario)



export default router