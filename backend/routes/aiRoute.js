import express from "express"
import { aiSearchProducts, aiStylistAssistant } from "../controllers/aiController.js"

const aiRouter = express.Router()

aiRouter.post("/search", aiSearchProducts)
aiRouter.post("/stylist", aiStylistAssistant)

export default aiRouter
