import mongoose from 'mongoose';

const toJSON = {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
};

const submenuSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    previewImage: { type: String, trim: true },
  },
  { toJSON }
);

const menuItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    orden: { type: Number, required: true },
    tipo: { type: String, enum: ['principal', 'secundario'], default: 'principal' },
    submenu: { type: [submenuSchema], default: [] },
  },
  { timestamps: true, toJSON }
);

export default mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);
