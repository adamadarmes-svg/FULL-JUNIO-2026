import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    orden: { type: Number, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    designerName: { type: String, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    link: { type: String, trim: true, default: '#' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
