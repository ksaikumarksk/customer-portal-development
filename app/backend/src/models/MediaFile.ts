import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const mediaFileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true },
  size: { type: Number, required: true, min: 1 },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  views: { type: Number, default: 0 },
}, { timestamps: true })

export type MediaFile = InferSchemaType<typeof mediaFileSchema> & { _id: mongoose.Types.ObjectId }
export const MediaFileModel = mongoose.models.MediaFile || mongoose.model('MediaFile', mediaFileSchema)
