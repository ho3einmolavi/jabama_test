import { VERIFICATION_CODE_EXPIRY_DURATION } from './../../common/constants';
import { UserStatus } from '../../common/enums';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { VerificationTokenSchema } from './subDocuments/verificationToken.schema';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: { type: String, required: true },

    status: {
      type: Number,
      enum: Object.values(UserStatus).filter((el) => typeof el === 'number'),
      default: UserStatus.Unverified,
    },

    verificationToken: VerificationTokenSchema,
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.verificationToken;
  return obj;
};

UserSchema.pre('save', function (next) {
  const user = this;
  user.email = user.email.toLowerCase();
  user.verificationToken = {
    value: user.generateVerificationToken(),
    expirationDate: user.generateExpirationDate(),
  };
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.generateVerificationToken = function () {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

UserSchema.methods.generateExpirationDate = function () {
  //set verification code expiry
  const duration = VERIFICATION_CODE_EXPIRY_DURATION / 60000;
  let verification_code_expiry = new Date();
  verification_code_expiry = new Date(verification_code_expiry);
  verification_code_expiry.setMinutes(
    verification_code_expiry.getMinutes() + duration,
  );
  return verification_code_expiry;
};
