import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
      maxlength: [120, 'El título no puede superar los 120 caracteres'],
    },
    contenido: {
      type: String,
      required: [true, 'El contenido es obligatorio'],
      trim: true,
      minlength: [10, 'El contenido debe tener al menos 10 caracteres'],
      maxlength: [5000, 'El contenido no puede superar los 5000 caracteres'],
    },
    imagen: {
      type: String,
      required: [true, 'La imagen es obligatoria y debe estar en formato Base64'],
      validate: {
        validator: (valor) => typeof valor === 'string' && valor.startsWith('data:image/'),
        message: 'La imagen es obligatoria y debe estar en formato Base64',
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El autor es obligatorio'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
