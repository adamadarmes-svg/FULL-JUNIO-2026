import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El formato del email no es válido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false, 
      transform: (doc, ret) => {
        ret.id = ret._id.toString(); 
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.compararPassword = function (passwordPlano) {
  return bcrypt.compare(passwordPlano, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
