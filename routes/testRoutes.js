import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from "multer"
import { getTest } from "../controllers/testController.js"
const upload = multer({dest:"./uploads/"})
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.get("/test", getTest)



export default router