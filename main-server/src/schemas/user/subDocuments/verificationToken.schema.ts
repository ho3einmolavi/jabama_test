import * as mongoose from 'mongoose';

export const VerificationTokenSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },

    expirationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, _id: false },
);
