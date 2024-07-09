import mongoose from "mongoose";

const Schema = mongoose.Schema;

const travelStorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    itinerary: [
      {
        days: {
          type: String,
        },
        activities: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    foods_to_try: {
      type: String,
    },
    best_time_to_visit: {
      type: String,
    },
    places_to_visit: {
      type: String,
    },
    tips: {
      type: String,
    },
    photos: [String],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const travelStory = mongoose.model("TravelStory", travelStorySchema);

export default travelStory;
