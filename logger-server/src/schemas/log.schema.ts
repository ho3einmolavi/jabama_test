import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema(
  {
    body: mongoose.Schema.Types.Mixed,
    method: String,
    originalUrl: String,
    statusCode: Number,
    userAgent: String,
    ip: String,
    date: Date,
  },
  { timestamps: true },
);
