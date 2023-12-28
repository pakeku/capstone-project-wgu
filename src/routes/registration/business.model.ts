import mongoose, { Schema, Document } from 'mongoose';
import { iBusinessInfo } from '@utils/interface';

export interface iBusinessInfoDocument extends iBusinessInfo, Document {
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
    aud: string;
}

const BusinessInfoSchema = new Schema<iBusinessInfoDocument>({
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    businessAddress: { type: String, required: true },
    businessPhoneNumber: { type: String, required: true },
    businessEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String, required: true },
    aud: {
        type: String, required: true, unique: true
    }
});

// Update 'updatedAt' field before each save
BusinessInfoSchema.pre<iBusinessInfoDocument>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Set 'createdAt' when a new document is created
BusinessInfoSchema.pre<iBusinessInfoDocument>('validate', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const BusinessInfoModel = mongoose.model<iBusinessInfoDocument>('BusinessInfo', BusinessInfoSchema);