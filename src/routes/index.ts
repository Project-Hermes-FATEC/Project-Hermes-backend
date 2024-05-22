import { Router } from "express"
import checklistRoutes from './checklist/checklist.routes'
import authRoutes from "./auth/auth.routes"

const routes = Router()

routes.use('/checklist', checklistRoutes)
routes.use('/auth', authRoutes)

export default routes