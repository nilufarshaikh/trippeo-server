import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "default.jpg",
    },
    bio: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      default: "Content Creator and Film Maker",
    },
    location: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      default: "Toronto, ON",
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("travelStories", {
  ref: "TravelStory",
  localField: "_id",
  foreignField: "userId",
});

const User = mongoose.model("User", userSchema);

export default User;
