import mongoose from 'mongoose'
import { CATEGORIAS, LIMITES } from '@/lib/constantes'

const itemSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      maxlength: [LIMITES.TITULO, `El título no puede superar los ${LIMITES.TITULO} caracteres`],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [LIMITES.DESCRIPCION, `La descripción no puede superar los ${LIMITES.DESCRIPCION} caracteres`],
      default: '',
    },
    categoria: {
      type: String,
      enum: {
        values: CATEGORIAS,
        message: 'Categoría no válida',
      },
      default: 'general',
    },
    completado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export default mongoose.models.Item || mongoose.model('Item', itemSchema)