import { Router } from 'express'
import multer from 'multer'
import { deleteFile, getFile, listFiles, uploadFile } from '../controllers/fileController'
import { requireAuth } from '../middleware/auth'
export const fileRoutes = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 100 * 1024 * 1024 } })
fileRoutes.use(requireAuth)
fileRoutes.get('/', listFiles)
fileRoutes.get('/:id', getFile)
fileRoutes.post('/', upload.single('file'), uploadFile)
fileRoutes.delete('/:id', deleteFile)
