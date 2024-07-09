import mongoose from "mongoose";

const Schema = mongoose.Schema;

const travelStorySchema = new Schema(
  {
    userId: {
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
        day: {
          type: Number,
          required: true,
        },
        activities: [
          {
            type: String,
            required: true,
          },
        ],
        notes: String,
      },
    ],
    foodsToTry: {
      type: String,
    },
    bestTimeToVisit: {
      type: String,
    },
    placesToVisit: {
      type: String,
    },
    tips: {
      type: String,
    },
    photos: [String],
    comments: [
      {
        userId: {
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
