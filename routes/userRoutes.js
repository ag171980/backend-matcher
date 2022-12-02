import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import { getAllUsers,getRandomUsers, getUserById, crearUsuario, validarUsuario } from "../controllers/userController.js"
import multer from "multer"
const upload = multer({dest:"./uploads/"})
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.get("/user", getAllUsers)
router.get("/users", getRandomUsers)
router.get("/users/:id", getUserById)
router.post("/createUser",upload.any("imagenes"), crearUsuario)
router.post("/validateUser", validarUsuario)



export default router