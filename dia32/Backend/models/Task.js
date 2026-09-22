import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      maxlength: [100, 'El título no puede superar los 100 caracteres'],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede superar los 500 caracteres'],
      default: '',
    },
    completada: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false, 
      transform: (doc, ret) => {
        ret.id = ret._id.toString(); 
        delete ret._id;
        return ret;
      },
    },
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
