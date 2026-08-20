import type { Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_CONFIG } from '../config'
import { MediaFileModel } from '../models/MediaFile'
import type { AuthRequest } from '../middleware/auth'

cloudinary.config(CLOUDINARY_CONFIG)

export async function listFiles(req: AuthRequest, res: Response) {
  const query = String(req.query.q || '').trim()
  const filter: Record<string, unknown> = { userId: req.user?.id }
  if (query) filter.$or = [{ name: new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }, { type: new RegExp(query, 'i') }]
  const files = await MediaFileModel.find(filter).sort({ createdAt: -1 }).lean()
  return res.json(files)
}

export async function getFile(req: AuthRequest, res: Response) {
  const file = await MediaFileModel.findOne({ _id: req.params.id, userId: req.user?.id })
  if (!file) return res.status(404).json({ message: 'File not found' })
  file.views += 1
  await file.save()
  return res.json(file)
}

export async function uploadFile(req: AuthRequest, res: Response) {
  const uploadedFile = req.file
  if (!uploadedFile) return res.status(400).json({ message: 'File is required' })
  const result: any = await new Promise((resolve, reject) => cloudinary.uploader.upload_stream({ resource_type: 'auto', folder: 'multimedia-manager', use_filename: true, unique_filename: true }, (error, uploaded) => error ? reject(error) : resolve(uploaded)).end(uploadedFile.buffer))
  const file = await MediaFileModel.create({ userId: req.user?.id, name: uploadedFile.originalname, type: uploadedFile.mimetype, size: uploadedFile.size, url: result.secure_url, publicId: result.public_id })
  return res.status(201).json(file)
}

export async function deleteFile(req: AuthRequest, res: Response) {
  const file = await MediaFileModel.findOneAndDelete({ _id: req.params.id, userId: req.user?.id })
  if (!file) return res.status(404).json({ message: 'File not found' })
  await cloudinary.uploader.destroy(file.publicId, { resource_type: 'auto' })
  return res.status(204).send()
}
