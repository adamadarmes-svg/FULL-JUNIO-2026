import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    contenido: {
      type: String,
      required: [true, 'El comentario es obligatorio'],
      trim: true,
      minlength: [1, 'El comentario no puede estar vacío'],
      maxlength: [500, 'El comentario no puede superar los 500 caracteres'],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'La publicación es obligatoria'],
      index: true,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El autor es obligatorio'],
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

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
