import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    energyLevel: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    lifeSpan: {
      type: Number,
      required: true,
      default:1,
    },

    kidsFriendly: {
      type: Boolean,
      default: false,
    },

    apartmentFriendly: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
    //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

const catModel = mongoose.model("catModel", catSchema);
export default catModel;
