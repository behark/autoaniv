import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  logo: string;
  description: string;
  featured: boolean;
  vehicleCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    maxlength: 50
  },
  logo: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: 500
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  vehicleCount: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

// Index for better query performance
BrandSchema.index({ name: 1 });
BrandSchema.index({ featured: 1 });

export default mongoose.model<IBrand>('Brand', BrandSchema);
