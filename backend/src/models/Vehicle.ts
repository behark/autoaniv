import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

export interface IVehicleImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface IVehicle extends Document {
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: 'EUR' | 'USD';
  mileage: number;
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Pickup';
  color: string;
  engineSize: number;
  horsepower: number;
  description: string;
  features: string[];
  images: IVehicleImage[];
  status: 'Available' | 'Sold' | 'Reserved' | 'Coming Soon';
  featured: boolean;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const VehicleImageSchema = new Schema<IVehicleImage>({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  isPrimary: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
});

const VehicleSchema = new Schema<IVehicle>({
  title: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 200
  },
  brand: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 50
  },
  model: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 100
  },
  year: { 
    type: Number, 
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 2
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  currency: { 
    type: String, 
    enum: ['EUR', 'USD'], 
    default: 'EUR' 
  },
  mileage: { 
    type: Number, 
    required: true,
    min: 0
  },
  transmission: { 
    type: String, 
    enum: ['Manual', 'Automatic', 'CVT'], 
    required: true 
  },
  fuelType: { 
    type: String, 
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], 
    required: true 
  },
  bodyType: { 
    type: String, 
    enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup'], 
    required: true 
  },
  color: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  engineSize: { 
    type: Number, 
    required: true,
    min: 0.1,
    max: 10.0
  },
  horsepower: { 
    type: Number, 
    required: true,
    min: 1
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 2000
  },
  features: [{ 
    type: String, 
    trim: true,
    maxlength: 100
  }],
  images: [VehicleImageSchema],
  status: { 
    type: String, 
    enum: ['Available', 'Sold', 'Reserved', 'Coming Soon'], 
    default: 'Available' 
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  slug: { 
    type: String, 
    unique: true,
    lowercase: true
  },
  seoTitle: { 
    type: String, 
    trim: true,
    maxlength: 60
  },
  seoDescription: { 
    type: String, 
    trim: true,
    maxlength: 160
  },
  seoKeywords: [{ 
    type: String, 
    trim: true 
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
VehicleSchema.index({ brand: 1, model: 1 });
VehicleSchema.index({ price: 1 });
VehicleSchema.index({ year: 1 });
VehicleSchema.index({ status: 1 });
VehicleSchema.index({ featured: 1 });
VehicleSchema.index({ slug: 1 });
VehicleSchema.index({ 
  title: 'text', 
  description: 'text', 
  brand: 'text', 
  model: 'text' 
});

// Pre-save middleware to generate slug
VehicleSchema.pre('save', async function(next) {
  if (this.isModified('title') || this.isNew) {
    let baseSlug = slugify(this.title, { 
      lower: true, 
      strict: true 
    });
    
    let slug = baseSlug;
    let counter = 1;
    
    // Ensure unique slug
    while (await mongoose.models.Vehicle?.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  next();
});

// Virtual for full image URLs
VehicleSchema.virtual('imageUrls').get(function() {
  return this.images.map(img => ({
    ...img.toObject(),
    url: `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${img.url}`
  }));
});

// Ensure virtuals are included in JSON output
VehicleSchema.set('toJSON', { virtuals: true });
VehicleSchema.set('toObject', { virtuals: true });

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
