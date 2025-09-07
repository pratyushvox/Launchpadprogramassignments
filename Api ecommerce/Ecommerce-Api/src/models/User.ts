import mongoose, { Document, Schema } from 'mongoose';

interface IDevice {
  type: string;
  os: string;
  last_seen: Date;
}

interface ISubscription {
  tier: string;
  start_date: Date;
}

interface IProfile {
  theme: string;
  bio?: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  age: number;
  country: string;
  last_login: Date;
  followers: number;
  interests: string[];
  profile: IProfile;
  devices?: IDevice[];
  subscription?: ISubscription;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  last_login: {
    type: Date,
    default: Date.now
  },
  followers: {
    type: Number,
    default: 0,
    min: 0
  },
  interests: [{
    type: String,
    trim: true
  }],
  profile: {
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'light'
    },
    bio: {
      type: String,
      trim: true
    }
  },
  devices: [{
    type: {
      type: String,
      enum: ['mobile', 'desktop', 'tablet'],
      required: true
    },
    os: {
      type: String,
      required: true
    },
    last_seen: {
      type: Date,
      default: Date.now
    }
  }],
  subscription: {
    tier: {
      type: String,
      enum: ['basic', 'premium', 'pro']
    },
    start_date: {
      type: Date
    }
  }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;